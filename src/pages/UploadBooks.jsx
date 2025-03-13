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
import {
  getUploadedDocuments,
  uploadGovernmentDoc,
} from "@/services/governmentDoc";
import toast from "react-hot-toast";

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

        case "file":
          draft[name] = e.target.files[0];
          break;

        default:
          break;
      }
    });
    setDocument(nextState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document?.document) {
      toast.error("Please upload document");
      return;
    }

    const formData = new FormData();
    formData.append("date", document?.date);
    formData.append("departmentId", document?.department?.departmentId);
    formData.append("subject", document?.subject);
    formData.append("type", document?.type);
    formData.append("grNumber", document?.grNumber);
    formData.append("grCode", document?.geCode);
    formData.append("file", document?.file);

    //make api call
    let response = await uploadGovernmentDoc(formData);
    if (response?.status === "success") {
      toast.success("Uploaded succesfully");
    } else {
      toast.error("Unable to upload document, Please try again");
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
          <div className="space-y-2">
            <Label className="flex items-center">Document</Label>
            <Input
              onChange={handleChange("file")}
              type="file"
              className="file:mr-4 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </div>
          <Button type="submit">Upload</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UploadBooks() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await getUploadedDocuments(filter, search);
      if (response.status === "success") {
        setDocuments(response.data);
      } else {
        toast.error("Unable to get document, Please reload the page");
      }
    })();
  }, [filter, search]);

  const handleChangeFilter = (value) => {
    setFilter(value);
  };

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
            <Select value={filter} onValueChange={handleChangeFilter}>
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
            {documents.map((doc, index) => (
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
