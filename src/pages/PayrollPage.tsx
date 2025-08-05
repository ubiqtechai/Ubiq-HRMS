
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PayrollPage() {
  return (
    <div className="animate-fade-in">
      <Card className="bg-slate-800/60 backdrop-blur-xl border-slate-700 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white">Payroll</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-200">
          <div className="text-lg font-bold mb-2">Payroll summary placeholder</div>
          <div className="text-slate-400">Salary sheet and payroll generation UI coming soon.</div>
        </CardContent>
      </Card>
    </div>
  );
}
