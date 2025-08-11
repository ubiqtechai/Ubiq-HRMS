import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AddFamilyMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFamilyMember: (member: FamilyMember) => void;
  editingMember?: FamilyMember | null;
}

export interface FamilyMember {
  id?: string;
  name: string;
  relation: string;
  dateOfBirth: string;
  age: number;
  bloodGroup: string;
  gender: string;
  nationality: string;
  profession: string;
  remarks: string;
}

const AddFamilyMemberModal = ({ open, onOpenChange, onAddFamilyMember, editingMember }: AddFamilyMemberModalProps) => {
  const [formData, setFormData] = useState<Omit<FamilyMember, 'id' | 'age'>>({
    name: "",
    relation: "",
    dateOfBirth: "",
    bloodGroup: "",
    gender: "",
    nationality: "",
    profession: "",
    remarks: "",
  });

  // Update form data when editing member changes
  useEffect(() => {
    if (editingMember) {
      setFormData({
        name: editingMember.name,
        relation: editingMember.relation,
        dateOfBirth: editingMember.dateOfBirth,
        bloodGroup: editingMember.bloodGroup,
        gender: editingMember.gender,
        nationality: editingMember.nationality,
        profession: editingMember.profession,
        remarks: editingMember.remarks,
      });
    } else {
      setFormData({
        name: "",
        relation: "",
        dateOfBirth: "",
        bloodGroup: "",
        gender: "",
        nationality: "",
        profession: "",
        remarks: "",
      });
    }
  }, [editingMember]);

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = calculateAge(formData.dateOfBirth);
    onAddFamilyMember({
      ...formData,
      age,
    });
    setFormData({
      name: "",
      relation: "",
      dateOfBirth: "",
      bloodGroup: "",
      gender: "",
      nationality: "",
      profession: "",
      remarks: "",
    });
    onOpenChange(false);
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            {editingMember ? 'Edit Family Member' : 'Add Family Member'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Relation *
              </label>
              <Select value={formData.relation} onValueChange={(value) => handleInputChange('relation', value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select Relation" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="father">Father</SelectItem>
                  <SelectItem value="mother">Mother</SelectItem>
                  <SelectItem value="son">Son</SelectItem>
                  <SelectItem value="daughter">Daughter</SelectItem>
                  <SelectItem value="brother">Brother</SelectItem>
                  <SelectItem value="sister">Sister</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Date of Birth *
              </label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Blood Group
              </label>
              <Select value={formData.bloodGroup} onValueChange={(value) => handleInputChange('bloodGroup', value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Gender *
              </label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Nationality
              </label>
              <Input
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Enter nationality"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Profession
            </label>
            <Input
              value={formData.profession}
              onChange={(e) => handleInputChange('profession', e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              placeholder="Enter profession"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Remarks
            </label>
            <Textarea
              value={formData.remarks}
              onChange={(e) => handleInputChange('remarks', e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              placeholder="Additional remarks..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {editingMember ? 'Update Family Member' : 'Add Family Member'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFamilyMemberModal;