import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AddFamilyMemberModal, { FamilyMember } from "@/components/AddFamilyMemberModal";

const EmployeeFamilyInfo = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const handleAddFamilyMember = (member: FamilyMember) => {
    const newMember = {
      ...member,
      id: Date.now().toString(), // Simple ID generation
    };
    setFamilyMembers(prev => [...prev, newMember]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AddFamilyMemberModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddFamilyMember={handleAddFamilyMember}
      />
      
      <div className="flex items-center justify-end">
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {familyMembers.length === 0 ? (
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
                </TableRow>
              ) : (
                familyMembers.map((member) => (
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