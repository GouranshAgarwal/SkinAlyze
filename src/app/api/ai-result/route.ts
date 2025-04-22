import { ApiResponse } from "@/helpers/ApiResponse";
import AiResult from "@/models/AiResult";
import Patient from "@/models/Patient";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { image, diseaseName, confidence } = await req.json();
  const diseaseName = predict(image);
  const allowedSkinDiseases = ["eczema", "psoriasis", "acne", "rosacea", "melanoma"];

  if (!diseaseName || !allowedSkinDiseases.includes(diseaseName)) {
    return ApiResponse.notFound("Couldn't diagnose the disease, please consult with a doctor.");
  }

  const promptText = `
    You are a professional dermatologist.

    Provide the following information about the skin disease "${diseaseName}" in layman's terms:

    - Explanation (what is it?),
    - Precautions (what should the patient do or avoid?), and
    - Prescription (suggest over-the-counter treatment).

    Respond in this **exact format**:
    Explanation:
    <your explanation>

    Precautions:
    <your points>

    Prescription:
    <your suggestions>

    Avoid small talk. Be medically sound but use calming and easy-to-understand language.
    `;

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "patient") {
      return ApiResponse.unauthorized();
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { maxOutputTokens: 400 },
      }),
    });

    const data = await response.json();
    const fullResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!fullResponse) {
      return ApiResponse.error("No content returned by Gemini");
    }

    function trimIncompleteSentence(text: string): string {
      const lastPeriod = text.lastIndexOf(".");
      const lastNewline = text.lastIndexOf("\n");
    
      // Use whichever comes later and seems like a better cut-off point
      const cutIndex = Math.max(lastPeriod, lastNewline);
      return cutIndex !== -1 ? text.slice(0, cutIndex + 1) : text;
    }
    
    const finalResponse = trimIncompleteSentence(fullResponse);
    

    // const patient = await Patient.findById(session.user.id);
    // if (!patient) return ApiResponse.notFound("Patient not found");

    await AiResult.create({
      patient:session.user.id, // patient id
      image,
      diseaseName,
      description: fullResponse,
      confidence,
    });

    return new Response(JSON.stringify({ result: finalResponse }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("ERROR::POST::ai_result::", error);
    return ApiResponse.error("Error while generating response");
  }
}

