import WithLayout from "@/components/layout/WithLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const documentList = [
  { name: "Photo", isMandatory: true },
  { name: "ADHAAR Card", isMandatory: true },
  { name: "PAN Card", isMandatory: true },
  { name: "10th Passing Certificate", isMandatory: true },
  { name: "Leaving Certificate", isMandatory: true },
  { name: "Appointment Letter", isMandatory: true },
  { name: "Bank Passbook", isMandatory: true },
  { name: "Identity Proof", isMandatory: true },
  { name: "Ration Card", isMandatory: false },
  { name: "Birth Certificate", isMandatory: false },
  { name: "Caste Certificate", isMandatory: false },
  { name: "Passport", isMandatory: false },
  { name: "10th Certificate", isMandatory: false },
  { name: "12th Certificate", isMandatory: false },
  { name: "Degree Passing Certificate", isMandatory: false },
];

async function uploadDocuments(formData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const documents = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      documents[key] = value;
    }
  }

  // Here you would typically process and store the files
  // For this example, we'll just log the file names
  console.log("Uploaded documents:", Object.keys(documents));

  return { success: true, message: "Documents uploaded successfully!" };
}

function DocumentUpload() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    // action(formData);
  });
  return (
    <div className="min-h-screen flex items-center justify-start to-purple-100 ">
      <div className="w-full max-w-4xl p-8 space-y-6 ">
        <div>
          <h1 className="text-2xl font-bold ">Document Upload</h1>
          <p className="text-gray-600 mt-2">
            Please upload the following documents. Fields marked with an
            asterisk (*) are mandatory.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          {documentList.map((doc) => (
            <div key={doc.name} className="space-y-2">
              <Label htmlFor={doc.name} className="flex items-center">
                {doc.name}
                {doc.isMandatory && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              <Input
                id={doc.name}
                type="file"
                // {...register(doc.name, { required: doc.isMandatory })}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              {errors[doc.name] && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          ))}
          <Button
            onClick={() => {
              navigate("/");
            }}
            className="w-full"
          >
            Upload Documents
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WithLayout(DocumentUpload);
