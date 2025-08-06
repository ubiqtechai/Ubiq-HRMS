import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Edit } from "lucide-react";

interface BankDetails {
  id: string;
  employeeName: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  ifscCode: string;
  iban: string;
  accountType: string;
  paymentType: string;
  ddPayableAt: string;
  nameAsPerBank: string;
}

// Mock data - replace with actual data fetching
const mockBankDetails: BankDetails[] = [
  {
    id: "1",
    employeeName: "John Doe",
    bankName: "State Bank of India",
    bankBranch: "MIDC AREA CHINCHWAD (PUNE)",
    accountNumber: "24242",
    ifscCode: "SBIN0007736",
    iban: "IN24242SBIN0007736",
    accountType: "Savings",
    paymentType: "NEFT",
    ddPayableAt: "Pune",
    nameAsPerBank: "John Doe"
  },
  {
    id: "2",
    employeeName: "Jane Smith",
    bankName: "HDFC Bank",
    bankBranch: "Main Branch Mumbai",
    accountNumber: "12345678",
    ifscCode: "HDFC0001234",
    iban: "IN12345HDFC0001234",
    accountType: "Current",
    paymentType: "RTGS",
    ddPayableAt: "Mumbai",
    nameAsPerBank: "Jane Smith"
  }
];

const EmployeeBankDetails = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<BankDetails | null>(null);
  const [employees] = useState<BankDetails[]>(mockBankDetails);
  const [formData, setFormData] = useState<Partial<BankDetails>>({});

  useEffect(() => {
    if (employees.length > 0) {
      setSelectedEmployee(employees[0]);
    }
  }, [employees]);

  const handleEdit = () => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
      setIsEditMode(true);
    }
  };

  const handleSave = () => {
    console.log("Saving bank details:", formData);
    // Here you would save to your database
    if (selectedEmployee) {
      const updatedEmployee = { ...selectedEmployee, ...formData };
      setSelectedEmployee(updatedEmployee);
    }
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setFormData({});
    setIsEditMode(false);
  };

  const handleInputChange = (field: keyof BankDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isEditMode) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Edit Bank Account</h2>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-slate-400 border-slate-600 hover:bg-slate-700"
            onClick={handleCancel}
          >
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
                <Select 
                  value={formData.bankName || ""} 
                  onValueChange={(value) => handleInputChange('bankName', value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="State Bank of India">State Bank of India</SelectItem>
                    <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                    <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bank Branch
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Branch Name"
                  value={formData.bankBranch || ""}
                  onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bank Account No
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Account Number"
                  value={formData.accountNumber || ""}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  IFSC CODE
                </label>
                <Input 
                  className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  placeholder="IFSC Code"
                  value={formData.ifscCode || ""}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
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
                  value={formData.iban || ""}
                  onChange={(e) => handleInputChange('iban', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Account Type
                </label>
                <Select 
                  value={formData.accountType || ""} 
                  onValueChange={(value) => handleInputChange('accountType', value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Current">Current</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Payment Type
                </label>
                <Select 
                  value={formData.paymentType || ""} 
                  onValueChange={(value) => handleInputChange('paymentType', value)}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="NEFT">NEFT</SelectItem>
                    <SelectItem value="RTGS">RTGS</SelectItem>
                    <SelectItem value="IMPS">IMPS</SelectItem>
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
                  value={formData.ddPayableAt || ""}
                  onChange={(e) => handleInputChange('ddPayableAt', e.target.value)}
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
                value={formData.nameAsPerBank || ""}
                onChange={(e) => handleInputChange('nameAsPerBank', e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // View mode - shows bank details as in the attached image
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Bank Details</h2>
        </div>
        <div className="flex gap-2">
          <Select value={selectedEmployee?.id || ""} onValueChange={(value) => {
            const employee = employees.find(emp => emp.id === value);
            setSelectedEmployee(employee || null);
          }}>
            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white w-48">
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id}>
                  {employee.employeeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {selectedEmployee && (
        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-slate-300">Bank Account</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="text-slate-400 hover:text-white hover:bg-slate-700 p-1"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3 text-slate-300">
              <div className="text-base font-medium">
                {selectedEmployee.bankName}, {selectedEmployee.bankBranch}
              </div>
              <div className="text-sm">
                {selectedEmployee.accountNumber}, IFSC CODE - {selectedEmployee.ifscCode}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-600">
                <div>
                  <span className="text-sm text-slate-400">IBAN:</span>
                  <div className="text-sm">{selectedEmployee.iban}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">Account Type:</span>
                  <div className="text-sm">{selectedEmployee.accountType}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">Payment Type:</span>
                  <div className="text-sm">{selectedEmployee.paymentType}</div>
                </div>
                <div>
                  <span className="text-sm text-slate-400">DD Payable At:</span>
                  <div className="text-sm">{selectedEmployee.ddPayableAt}</div>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm text-slate-400">Name As Per Bank Records:</span>
                  <div className="text-sm">{selectedEmployee.nameAsPerBank}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeBankDetails;