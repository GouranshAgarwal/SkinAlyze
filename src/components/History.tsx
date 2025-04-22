'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function History() {
  const pastDiagnoses = [
    {
      id: 1,
      date: "Apr 10, 2025",
      condition: "Contact Dermatitis",
      severity: "Mild",
      status: "Resolved"
    },
    {
      id: 2,
      date: "Mar 22, 2025",
      condition: "Tinea Corporis",
      severity: "Moderate",
      status: "Follow-up"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diagnosis History</CardTitle>
        <CardDescription>
          Review your previous skin condition diagnoses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastDiagnoses.map((diagnosis) => (
            <div
              key={diagnosis.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <h3 className="font-medium">{diagnosis.condition}</h3>
                <p className="text-sm text-slate-500">
                  {diagnosis.date} • Severity: {diagnosis.severity}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    diagnosis.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                  }
                >
                  {diagnosis.status}
                </Badge>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}