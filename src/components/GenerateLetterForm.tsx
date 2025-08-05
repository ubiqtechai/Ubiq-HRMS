import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useState } from "react";

const GenerateLetterForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [letterType, setLetterType] = useState("");

  const steps = [
    { id: 1, title: "General", isActive: currentStep === 1, isCompleted: currentStep > 1 },
    { id: 2, title: "Select Employees", isActive: currentStep === 2, isCompleted: currentStep > 2 },
    { id: 3, title: "Preview", isActive: currentStep === 3, isCompleted: currentStep > 3 },
    { id: 4, title: "Publish/Download", isActive: currentStep === 4, isCompleted: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 mr-8">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.isActive 
                    ? 'bg-blue-600 text-white' 
                    : step.isCompleted 
                    ? 'bg-green-600 text-white' 
                    : 'bg-slate-600 text-slate-300'
                }`}>
                  {step.isCompleted ? '✓' : step.id}
                </div>
                <span className={`text-sm ${step.isActive ? 'text-white' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <h3 className="text-white font-medium mb-3">Summary:</h3>
            <div className="space-y-2 text-sm text-slate-400">
              <div>
                <span className="text-slate-300">Letter Template</span>
                <div>-</div>
              </div>
              <div>
                <span className="text-slate-300">Employee</span>
                <div>-</div>
              </div>
              <div>
                <span className="text-slate-300">Signatory</span>
                <div>-</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
            <CardContent className="p-6">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Letter Template *
                    </label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="address-proof">Address Proof Letter</SelectItem>
                        <SelectItem value="offer">Offer Letter</SelectItem>
                        <SelectItem value="experience">Experience Letter</SelectItem>
                        <SelectItem value="termination">Termination Letter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Serial No.
                    </label>
                    <Input 
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Serial Number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Authorised Signatory
                    </label>
                    <Select>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="hr">HR Manager</SelectItem>
                        <SelectItem value="ceo">CEO</SelectItem>
                        <SelectItem value="director">Director</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Remarks
                    </label>
                    <Textarea 
                      placeholder="Type your description..."
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 min-h-[120px]"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-4">
                      Generate for
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="generateFor" 
                          value="single" 
                          defaultChecked
                          className="w-4 h-4 text-blue-600 border-slate-600 bg-slate-700"
                        />
                        <span className="text-slate-300">Single Employee</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="generateFor" 
                          value="multiple"
                          className="w-4 h-4 text-blue-600 border-slate-600 bg-slate-700"
                        />
                        <span className="text-slate-300">Multiple Employees</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Employee Type: <span className="text-slate-400">Current Employees</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Search Employee <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Input 
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 pl-10"
                        placeholder="Search by Emp No. / Name"
                      />
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300 mb-2 block">Summary</Label>
                    <Textarea
                      value={selectedEmployees.length > 0 
                        ? `Selected ${selectedEmployees.length} employee(s): ${selectedEmployees.join(', ')}. Letter type: ${letterType}. ${selectedEmployees.length === 1 ? 'Single employee' : 'Multiple employees'} selected for ${letterType.toLowerCase()} letter generation.`
                        : "Enter summary or additional details..."
                      }
                      placeholder="Enter summary or additional details..."
                      className="bg-slate-800 text-white border-slate-700 h-32"
                      readOnly={selectedEmployees.length > 0}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-12">
                  <p className="text-slate-400">Publish/Download step content</p>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  className="text-slate-300 border-slate-600 hover:bg-slate-700"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={currentStep === 4}
                >
                  {currentStep === 4 ? 'Generate' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GenerateLetterForm;