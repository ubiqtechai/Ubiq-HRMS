import { useState, useEffect } from "react";
import { Upload, Download, Trash2, FileText, Plus, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEmployees, Employee } from "@/lib/firebase";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  employeeId?: string;
  category?: string;
}

const EmployeeDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Resume.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
    },
    {
      id: "2",
      name: "ID_Card.jpg",
      type: "IMAGE",
      size: "1.2 MB",
      uploadDate: "2024-01-10",
    },
    {
      id: "3",
      name: "Experience_Letter.pdf",
      type: "PDF",
      size: "892 KB",
      uploadDate: "2024-01-08",
    },
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("all-employees");
  const [typeFilter, setTypeFilter] = useState("all-types");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>("");

  useEffect(() => {
    getEmployees()
      .then(setEmployees)
      .catch((e) => console.error("Failed to load employees", e));
  }, []);
  const handleDeleteDocument = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete));
      setDocumentToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleUploadDocument = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('document') as File;
  
    if (!selectedEmployeeId || !selectedDocCategory) {
      console.warn('Please select Name, Employee ID and Document type');
      return;
    }
  
    if (file) {
      try {
        // Append extra fields for n8n
        formData.append("employeeId", selectedEmployeeId);
        formData.append("category", selectedDocCategory);
  
        const response = await fetch("https://adarshkr03.app.n8n.cloud/webhook/upload-doc", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }
  
        const result = await response.json(); // or text(), depending on n8n response
        console.log("Upload success:", result);
  
        // Optional: update local state so UI refreshes immediately
        const newDocument: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.toUpperCase().includes('PDF') ? 'PDF' : 'IMAGE',
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          employeeId: selectedEmployeeId,
          category: selectedDocCategory,
        };
  
        setDocuments([...documents, newDocument]);
        setSelectedEmployeeId("");
        setSelectedDocCategory("");
        setUploadDialogOpen(false);
  
      } catch (err) {
        console.error("Error uploading document:", err);
      }
    }
  };

  const handleEditDocument = (id: string) => {
    console.log("Edit document:", id);
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all-types" || document.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: string) => {
    return <FileText className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Employee Documents</h2>
          <p className="text-slate-400">Manage employee documents and files</p>
        </div>
        
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Upload New Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUploadDocument} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Name</Label>
                  <Select value={selectedEmployeeId} onValueChange={(v) => setSelectedEmployeeId(v)}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select Name" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {employees.map((emp) => (
                        <SelectItem key={emp.employeeId} value={emp.employeeId} className="text-white">
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Employee ID</Label>
                  <Select value={selectedEmployeeId} onValueChange={(v) => setSelectedEmployeeId(v)}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select Employee ID" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {employees.map((emp) => (
                        <SelectItem key={emp.employeeId} value={emp.employeeId} className="text-white">
                          {emp.employeeId}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Document</Label>
                  <Select value={selectedDocCategory} onValueChange={setSelectedDocCategory}>
                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select Document Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="PAN Card" className="text-white">PAN Card</SelectItem>
                      <SelectItem value="Aadhaar Card" className="text-white">Aadhaar Card</SelectItem>
                      <SelectItem value="Passport" className="text-white">Passport</SelectItem>
                      <SelectItem value="Offer Letter" className="text-white">Offer Letter</SelectItem>
                      <SelectItem value="Experience Letter" className="text-white">Experience Letter</SelectItem>
                      <SelectItem value="Salary Slip" className="text-white">Salary Slip</SelectItem>
                      <SelectItem value="Bank Statement" className="text-white">Bank Statement</SelectItem>
                      <SelectItem value="Other" className="text-white">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="document" className="text-slate-300">Select File</Label>
                  <Input
                    id="document"
                    name="document"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="bg-slate-700 border-slate-600 text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setUploadDialogOpen(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Upload
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Input
          placeholder="Search documents..."
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48 bg-slate-700/50 border-slate-600 text-white">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all-types" className="text-white">All Types</SelectItem>
            <SelectItem value="PDF" className="text-white">PDF</SelectItem>
            <SelectItem value="IMAGE" className="text-white">Image</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Documents List */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(document.type)}
                    <div>
                      <p className="text-white font-medium">{document.name}</p>
                      <p className="text-slate-400 text-sm">
                        {document.type} • {document.size} • {document.category ? `${document.category} • ` : ""}Uploaded {document.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-600/20"
                      onClick={() => handleEditDocument(document.id)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      onClick={() => {
                        console.log(`Downloading ${document.name}`);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    
                    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => setDocumentToDelete(document.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-800 border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Delete Document?</AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-400">
                            Are you sure you want to delete "{document.name}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel 
                            onClick={() => setDocumentToDelete(null)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                          >
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteDocument}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeDocuments;