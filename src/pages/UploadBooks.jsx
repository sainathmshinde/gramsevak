import WithLayout from "@/components/layout/WithLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { Book, FileText, Search, Upload } from "lucide-react";
import { produce } from "immer";
import RSelect from "@/components/ui/RSelect";
import { getDepartments } from "@/services/preset";
import DatePicker from "@/components/ui/datePicker";
import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";

export async function uploadDocument(formData) {
  const file = formData.get("file");
  const documentType = formData.get("documentType");
  const department = formData.get("department");
  const name = formData.get("name");

  if (!file || !documentType || !department || !name) {
    throw new Error("Missing required fields");
  }

  // Here you would typically save the document metadata to your database
  // For this example, we'll just log it
  console.log({
    type: documentType,
    department,
    name,
    url: blob.url,
  });
}

export async function getDocuments(search) {
  // In a real application, you would fetch this data from your database
  // For this example, we'll return mock data

  if (search) {
    return mockDocuments.filter(
      (doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.department.toLowerCase().includes(search.toLowerCase())
    );
  }

  return mockDocuments;
}

function UploadModal({ isOpen, onClose }) {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await getDepartments();
      if (response?.status === "success") {
        setDepartments(response.data);
      }
    })();
  }, []);

  const [document, setDocument] = useState({
    type: "book",
    date: "",
    subject: "",
    grNumber: "",
    grCode: "",
    file: null,
    department: null,
  });

  const handleChange = (name) => (e) => {
    const nextState = produce(document, (draft) => {
      switch (name) {
        case "type":
          draft[name] = e;
          break;

        case "date":
          draft[name] = e;
          break;

        case "subject":
        case "grNumber":
        case "grCode":
          draft[name] = e.target.value;
          break;

        case "file":
          draft[name] = e;
          break;

        case "department":
          draft[name] = e;
          break;

        default:
          break;
      }
    });
    setDocument(nextState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("department", department);
    formData.append("name", name);
    formData.append("file", file);

    try {
      await uploadDocument(formData);
      onClose();
      // Reset form
      setDocumentType("book");
      setDepartment("");
      setName("");
      setFile(null);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <RadioGroup
              value={document?.type}
              onValueChange={handleChange("type")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="book" id="book" />
                <Label htmlFor="book">Book</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gr" id="gr" />
                <Label htmlFor="gr">Government Resolution (GR)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <DatePicker onChange={handleChange("date")} />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <RSelect
              options={departments}
              nameProperty="departmentName"
              valueProperty="departmentId"
              onChange={handleChange("department")}
              placeholder="Select Department"
            />
          </div>

          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              type="text"
              value={document.subject}
              onChange={handleChange("subject")}
            />
          </div>

          {document?.type === "gr" ? (
            <div className="space-y-2">
              <Label>GR Number</Label>
              <Input
                type="text"
                value={document.grNumber}
                onChange={handleChange("grNumber")}
              />
            </div>
          ) : null}

          {document?.type === "gr" ? (
            <div className="space-y-2">
              <Label>GR Code</Label>
              <Input
                type="text"
                value={document.grCode}
                onChange={handleChange("grCode")}
              />
            </div>
          ) : null}
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const documents = [
  {
    documentName: "Policy Guidelines",
    type: "Book",
    documentLink: "https://example.com/policy-guidelines",
    grNumber: "",
    grCode: "",
    department: "Education",
    date: "2024-02-16",
  },
  {
    documentName: "Annual Report 2023",
    type: "Book",
    documentLink: "https://example.com/annual-report-2023",
    grNumber: "",
    grCode: "",
    department: "Finance",
    date: "2024-01-10",
  },
  {
    documentName: "Health Regulations",
    type: "GR",
    documentLink: "https://example.com/health-regulations",
    grNumber: "GR-2024-001",
    grCode: "HR001",
    department: "Health",
    date: "2024-02-12",
  },
  {
    documentName: "Infrastructure Development Plan",
    type: "GR",
    documentLink: "https://example.com/infrastructure-plan",
    grNumber: "GR-2024-002",
    grCode: "INFRA002",
    department: "Public Works",
    date: "2024-02-14",
  },
  {
    documentName: "Agricultural Subsidies Policy",
    type: "GR",
    documentLink: "https://example.com/agriculture-subsidies",
    grNumber: "GR-2024-003",
    grCode: "AGRI003",
    department: "Agriculture",
    date: "2024-02-15",
  },
  {
    documentName: "Technology Innovation Report",
    type: "Book",
    documentLink: "https://example.com/tech-innovation",
    grNumber: "",
    grCode: "",
    department: "Technology",
    date: "2024-01-25",
  },
  {
    documentName: "Environmental Protection Act",
    type: "GR",
    documentLink: "https://example.com/environment-act",
    grNumber: "GR-2024-004",
    grCode: "ENV004",
    department: "Environment",
    date: "2024-02-10",
  },
  {
    documentName: "Civic Planning Handbook",
    type: "Book",
    documentLink: "https://example.com/civic-planning",
    grNumber: "",
    grCode: "",
    department: "Urban Development",
    date: "2024-02-05",
  },
  {
    documentName: "Education Reform Strategy",
    type: "GR",
    documentLink: "https://example.com/education-reform",
    grNumber: "GR-2024-005",
    grCode: "EDU005",
    department: "Education",
    date: "2024-02-08",
  },
  {
    documentName: "Economic Growth Analysis",
    type: "Book",
    documentLink: "https://example.com/economic-growth",
    grNumber: "",
    grCode: "",
    department: "Finance",
    date: "2024-01-20",
  },
];

function UploadBooks() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDocuments = documents.filter((doc) => {
    const matchesFilter = filter === "all" || doc.type === filter;
    const matchesSearch =
      doc.documentName.toLowerCase().includes(search.toLowerCase()) ||
      doc.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Government Documents
            </h1>
            <Button onClick={() => setIsModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Search documents..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Documents</SelectItem>
                <SelectItem value="book">Books</SelectItem>
                <SelectItem value="gr">Government Resolutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDocuments.map((doc, index) => (
              <Card key={index} className="transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    {doc.type === "book" ? (
                      <Book className="h-5 w-5 text-primary" />
                    ) : (
                      <FileText className="h-5 w-5 text-primary" />
                    )}
                    {doc.documentName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Type:</span>
                      <span className="capitalize">{doc.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Department:</span>
                      <span className="capitalize">{doc.department}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80"
                  >
                    View Document
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default WithAuthentication(
  WithPermission("upload")(WithLayout(UploadBooks))
);
