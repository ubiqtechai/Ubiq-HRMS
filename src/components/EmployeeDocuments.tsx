import { useState } from "react";
import { Upload, Download, Trash2, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  employeeId?: string;
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

  const handleDeleteDocument = () => {
    if (documentToDelete) {
      setDocuments(documents.filter(doc => doc.id !== documentToDelete));
      setDocumentToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleUploadDocument = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('document') as File;
    
    if (file) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.toUpperCase().includes('PDF') ? 'PDF' : 'IMAGE',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
      };
      
      setDocuments([...documents, newDocument]);
      setUploadDialogOpen(false);
    }
  };

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
              <div>
                <Label htmlFor="document" className="text-slate-300">
                  Select Document
                </Label>
                <Input
                  id="document"
                  name="document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="bg-slate-700 border-slate-600 text-white"
                  required
                />
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

      {/* Documents List */}
      <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(document.type)}
                    <div>
                      <p className="text-white font-medium">{document.name}</p>
                      <p className="text-slate-400 text-sm">
                        {document.type} • {document.size} • Uploaded {document.uploadDate}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                      onClick={() => {
                        // Download functionality would be implemented here
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