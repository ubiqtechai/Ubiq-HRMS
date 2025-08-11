import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit2, Trash2 } from "lucide-react";
import AddFamilyMemberModal, { FamilyMember } from "@/components/AddFamilyMemberModal";

const EmployeeFamilyInfo = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relation: "spouse",
      dateOfBirth: "1990-05-15",
      age: 34,
      bloodGroup: "A+",
      gender: "female",
      nationality: "American",
      profession: "Teacher",
      remarks: "None"
    },
    {
      id: "2",
      name: "Tommy Johnson",
      relation: "child",
      dateOfBirth: "2015-08-20",
      age: 9,
      bloodGroup: "O+",
      gender: "male",
      nationality: "American",
      profession: "Student",
      remarks: "None"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all-employees");
  const [relationFilter, setRelationFilter] = useState("all-relations");

  const handleAddFamilyMember = (member: FamilyMember) => {
    if (editingMember) {
      // Edit existing member
      setFamilyMembers(prev => prev.map(m => 
        m.id === editingMember.id ? { ...member, id: editingMember.id } : m
      ));
      setEditingMember(null);
    } else {
      // Add new member
      const newMember = {
        ...member,
        id: Date.now().toString(),
      };
      setFamilyMembers(prev => [...prev, newMember]);
    }
  };

  const handleEditMember = (id: string) => {
    const member = familyMembers.find(m => m.id === id);
    if (member) {
      setEditingMember(member);
      setShowAddModal(true);
    }
  };

  const handleDeleteMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const filteredMembers = familyMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.relation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRelation = relationFilter === "all-relations" || member.relation === relationFilter;
    return matchesSearch && matchesRelation;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <AddFamilyMemberModal
        open={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) setEditingMember(null);
        }}
        onAddFamilyMember={handleAddFamilyMember}
        editingMember={editingMember}
      />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <Input
            placeholder="Search family members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
          />
          <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
            <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all-employees" className="text-white">All Employees</SelectItem>
              <SelectItem value="john-doe" className="text-white">John Doe</SelectItem>
              <SelectItem value="jane-smith" className="text-white">Jane Smith</SelectItem>
            </SelectContent>
          </Select>
          <Select value={relationFilter} onValueChange={setRelationFilter}>
            <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
              <SelectValue placeholder="Filter by Relation" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all-relations" className="text-white">All Relations</SelectItem>
              <SelectItem value="spouse" className="text-white">Spouse</SelectItem>
              <SelectItem value="child" className="text-white">Child</SelectItem>
              <SelectItem value="parent" className="text-white">Parent</SelectItem>
              <SelectItem value="sibling" className="text-white">Sibling</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddModal(true)}
        >
          New Family Member
        </Button>
      </div>
      
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-transparent">
                <TableHead className="text-slate-300 font-medium">Name</TableHead>
                <TableHead className="text-slate-300 font-medium">Relation</TableHead>
                <TableHead className="text-slate-300 font-medium">DOB</TableHead>
                <TableHead className="text-slate-300 font-medium">Age</TableHead>
                <TableHead className="text-slate-300 font-medium">Blood Group</TableHead>
                <TableHead className="text-slate-300 font-medium">Gender</TableHead>
                <TableHead className="text-slate-300 font-medium">Nationality</TableHead>
                <TableHead className="text-slate-300 font-medium">Profession</TableHead>
                <TableHead className="text-slate-300 font-medium">Remarks</TableHead>
                <TableHead className="text-slate-300 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                  <TableCell className="text-slate-300">-</TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id} className="border-slate-700 hover:bg-slate-700/50">
                    <TableCell className="text-slate-300">{member.name}</TableCell>
                    <TableCell className="text-slate-300 capitalize">{member.relation}</TableCell>
                    <TableCell className="text-slate-300">{member.dateOfBirth}</TableCell>
                    <TableCell className="text-slate-300">{member.age}</TableCell>
                    <TableCell className="text-slate-300">{member.bloodGroup || '-'}</TableCell>
                    <TableCell className="text-slate-300 capitalize">{member.gender}</TableCell>
                    <TableCell className="text-slate-300">{member.nationality || '-'}</TableCell>
                    <TableCell className="text-slate-300">{member.profession || '-'}</TableCell>
                    <TableCell className="text-slate-300">{member.remarks || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditMember(member.id)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20 h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-600/20 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeFamilyInfo;