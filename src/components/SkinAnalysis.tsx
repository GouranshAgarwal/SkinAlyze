'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadCloud, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

export default function SkinAnalysis() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState({});

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(URL.createObjectURL(file)); // Show image preview
  
      const formData = new FormData();
      formData.append("file", file); // Flask expects 'file'
  
      try {
        const response = await axios.post("http://localhost:5000/api/predict", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const { predicted_class, confidence } = response.data;

        const generatedData = await axios.post("/api/ai-result", {predicted_class, confidence})
  
        setDiagnosisResult({
          condition: predicted_class,
          confidence,
          summary:generatedData
        });
      } catch (err) {
        console.error("Prediction error:", err);
        alert("Failed to get prediction from model.");
      }
    }
  };
  
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Skin Image Upload</CardTitle>
          <CardDescription>
            Upload a clear image of the affected skin area for AI analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!uploadedImage ? (
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-2 text-sm text-slate-600">
                Drag and drop an image, or click to browse
              </p>
              <Input
                type="file"
                accept="image/*"
                className="mt-4"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="relative w-full h-64 mb-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded skin"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex justify-center gap-2">
                <Button onClick={() => setUploadedImage(null)} variant="outline">
                  Remove
                </Button>
                <Button onClick={() => setUploadedImage(null)}>
                  Upload New
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start text-sm text-slate-500">
          <p>• For best results, ensure good lighting and focus</p>
          <p>• Avoid shadows and blurry images</p>
          <p>• Your images are securely stored and processed</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            AI-powered skin condition assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!diagnosisResult && !uploadedImage && (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2 text-slate-500">
                Please upload an image to see analysis results
              </p>
            </div>
          )}

          {uploadedImage && !diagnosisResult && (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-blue-500 animate-pulse" />
              <p className="mt-2 text-slate-700">Analyzing your image...</p>
              <p className="text-sm text-slate-500">This usually takes a few seconds</p>
            </div>
          )}

          {diagnosisResult && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-medium">{diagnosisResult.condition}</h3>
                  <p className="text-slate-500 text-sm">
                    Severity: {diagnosisResult.severity}
                  </p>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                  {diagnosisResult.confidence}% Confidence
                </Badge>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700 mb-1">AI Summary</h4>
                <p className="text-sm text-slate-600">{diagnosisResult.summary}</p>
              </div>

              {/* <div>
                <h4 className="text-sm font-medium text-slate-700 mb-1">Recommendations</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  {diagnosisResult.recommendations.map((rec, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              <div className="pt-4">
                <Button className="w-full">Schedule Doctor Consultation</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}