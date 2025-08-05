import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const EmployeePreviousEmployment = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Name
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Designation
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Designation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                From Date
              </label>
              <Input 
                type="date"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                To Date
              </label>
              <div className="flex gap-2">
                <Input 
                  type="date"
                  className="bg-slate-700/50 border-slate-600 text-white flex-1"
                />
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span>Years</span>
                  <span>Months</span>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Relevant Experience
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Y"
                  className="bg-slate-700/50 border-slate-600 text-white w-16"
                />
                <Input 
                  placeholder="M"
                  className="bg-slate-700/50 border-slate-600 text-white w-16"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Company Address
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Company Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Nature Of Duties
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Nature Of Duties"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Leaving Reason
            </label>
            <Input 
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 max-w-md"
              placeholder="Leaving Reason"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                PF Member ID
              </label>
              <div className="flex gap-2">
                <Input 
                  placeholder="AA"
                  className="bg-slate-700/50 border-slate-600 text-white w-16"
                />
                <span className="text-slate-400 self-center">/</span>
                <Input 
                  placeholder="BBB"
                  className="bg-slate-700/50 border-slate-600 text-white w-20"
                />
                <span className="text-slate-400 self-center">/</span>
                <Input 
                  placeholder="1234567"
                  className="bg-slate-700/50 border-slate-600 text-white w-24"
                />
                <span className="text-slate-400 self-center">/</span>
                <Input 
                  placeholder="123"
                  className="bg-slate-700/50 border-slate-600 text-white w-16"
                />
                <span className="text-slate-400 self-center">/</span>
                <Input 
                  placeholder="1234567"
                  className="bg-slate-700/50 border-slate-600 text-white w-24"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Last Drawn Salary
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Last Drawn Salary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700">
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePreviousEmployment;