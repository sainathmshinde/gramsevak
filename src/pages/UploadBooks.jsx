import WithLayout from "@/components/layout/WithLayout";
import { Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { put } from "@vercel/blob";
// import { revalidatePath } from "next/cache";

export async function uploadDocument(formData) {
  const file = formData.get("file");
  const documentType = formData.get("documentType");
  const department = formData.get("department");
  const name = formData.get("name");

  if (!file || !documentType || !department || !name) {
    throw new Error("Missing required fields");
  }

  //   const blob = await put(file.name, file, {
  //     access: "public",
  //   });

  // Here you would typically save the document metadata to your database
  // For this example, we'll just log it
  console.log({
    type: documentType,
    department,
    name,
    url: blob.url,
  });

  //   revalidatePath("/");
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
  const [documentType, setDocumentType] = useState("book");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

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
          <RadioGroup
            value={documentType}
            onValueChange={(value) => setDocumentType(value)}
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
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="agriculture">Agriculture</SelectItem>
              {/* Add more departments as needed */}
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Document name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UploadButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Upload Document</Button>
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

function SearchBar() {
  const [search, setSearch] = useState("");
  //   const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    // router.push(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <Input
        type="search"
        placeholder="Search books and GRs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}

function DocumentGrid() {
  const mockDocuments = [
    {
      id: "1",
      type: "book",
      department: "education",
      name: "Maharashtra Education Policy",
      url: "#",
    },
    {
      id: "2",
      type: "gr",
      department: "health",
      name: "COVID-19 Guidelines",
      url: "#",
    },
    {
      id: "3",
      type: "book",
      department: "agriculture",
      name: "Crop Management Techniques",
      url: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockDocuments.map((doc) => (
        <Card key={doc.id}>
          <CardHeader>
            <CardTitle>{doc.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Type: {doc.type}</p>
            <p>Department: {doc.department}</p>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Document
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function UploadBooks() {
  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Government Documents</h1>
      <div className="flex justify-between items-center mb-6">
        <SearchBar />
        <UploadButton />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DocumentGrid />
      </Suspense>
    </main>
  );
}

export default WithLayout(UploadBooks);
