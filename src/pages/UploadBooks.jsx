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
          draft[name] = e.target.files[0];
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
    if (!document?.file) {
      toast.error("कृपया दस्तऐवज अपलोड करा");
      return;
    }

    const formData = new FormData();
    if (document?.type === "book") {
      // formData.append("departmentId", document?.department?.departmentId);
      // formData.append("subject", document?.subject);
      formData.append("file", document?.file);
      formData.append("bookData", {
        subject: document?.file,
        departmentId: document?.department?.departmentId,
      });
    } else {
      formData.append("effectiveDate", new Date()?.toISOString());
      formData.append("departmentId", document?.department?.departmentId);
      formData.append("subject", document?.subject);
      formData.append("grNumber", document?.grNumber);
      formData.append("grCode", document?.grCode);
      formData.append("file", document?.file);
      formData.append("yojanaId", 1);
    }

    let response = await uploadGovernmentDoc(formData, document?.type);
    if (response?.status === "success") {
      toast.success("यशस्वीरित्या अपलोड केले");
    } else {
      toast.error("दस्तऐवज अपलोड करता आला नाही, कृपया पुन्हा प्रयत्न करा");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>दस्तऐवज अपलोड करा</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>दस्तऐवजाचा प्रकार</Label>
            <RadioGroup
              value={document?.type}
              onValueChange={handleChange("type")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="book" id="book" />
                <Label htmlFor="book">पुस्तक</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gr" id="gr" />
                <Label htmlFor="gr">शासकीय ठराव (GR)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>दिनांक</Label>
            <DatePicker onChange={handleChange("date")} />
          </div>

          <div className="space-y-2">
            <Label>विभाग</Label>
            <RSelect
              options={departments}
              nameProperty="departmentName"
              valueProperty="departmentId"
              onChange={handleChange("department")}
              placeholder="विभाग निवडा"
            />
          </div>

          <div className="space-y-2">
            <Label>विषय</Label>
            <Input
              type="text"
              value={document.subject}
              onChange={handleChange("subject")}
            />
          </div>

          {document?.type === "gr" && (
            <>
              <div className="space-y-2">
                <Label>GR क्रमांक</Label>
                <Input
                  type="text"
                  value={document.grNumber}
                  onChange={handleChange("grNumber")}
                />
              </div>

              <div className="space-y-2">
                <Label>GR कोड</Label>
                <Input
                  type="text"
                  value={document.grCode}
                  onChange={handleChange("grCode")}
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label>दस्तऐवज अपलोड करा</Label>
            <Input onChange={handleChange("file")} type="file" />
          </div>
          <Button type="submit">अपलोड करा</Button>
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
        toast.error("कागदपत्र मिळवता आले नाही, कृपया पृष्ठ रीफ्रेश करा");
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
              शासकीय कागदपत्रे
            </h1>
            <Button onClick={() => setIsModalOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              कागदपत्र अपलोड करा
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="कागदपत्रे शोधा..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={filter} onValueChange={handleChangeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="प्रकारानुसार फिल्टर करा" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">सर्व कागदपत्रे</SelectItem>
                <SelectItem value="book">पुस्तके</SelectItem>
                <SelectItem value="gr">शासकीय ठराव</SelectItem>
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
                      <span className="font-semibold">प्रकार:</span>
                      <span className="capitalize">{doc.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">विभाग:</span>
                      <span className="capitalize">{doc.department}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="text-primary hover:text-primary/80"
                  >
                    कागदपत्र पहा
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
