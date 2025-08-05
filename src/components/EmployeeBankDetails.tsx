import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const EmployeeBankDetails = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Bank Account</h2>
        </div>
        <Button variant="outline" size="sm" className="text-slate-400 border-slate-600 hover:bg-slate-700">
          ✕
        </Button>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bank Name
              </label>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bank Branch
              </label>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="branch1">Main Branch</SelectItem>
                  <SelectItem value="branch2">Secondary Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Bank Account No
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Account Number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                IFSC CODE
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="IFSC Code"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                IBAN
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="IBAN"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Account Type
              </label>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="current">Current</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Payment Type
              </label>
              <Select>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="neft">NEFT</SelectItem>
                  <SelectItem value="rtgs">RTGS</SelectItem>
                  <SelectItem value="imps">IMPS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                DD Payable At
              </label>
              <Input 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                placeholder="Location"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Name As Per Bank Records
            </label>
            <Input 
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 max-w-md"
              placeholder="Full Name"
            />
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

export default EmployeeBankDetails;