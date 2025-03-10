import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";
import WithLayout from "@/components/layout/WithLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { docUpload } from "@/services/gramsevak";
import { getDocuments } from "@/services/upload";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DocumentUpload() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    (async () => {
      let response = await getDocuments();
      if (response.status === "success") {
        setDocuments(response.data);
      } else {
        //toast
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    let formData = new FormData();
    formData.append("files", documents);

    let response = await docUpload(formData);

    if (response.status === "success") {
      //toast
      navigate("/");
    } else {
      //toast
    }
  };

  const handleChange = (index) => (e) => {
    let nextState = produce(documents, (draft) => {
      draft[index]["documents"] = e.target.files[0];
    });

    setDocuments(nextState);
  };

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
        <form className="space-y-6" onSubmit={handleSubmit}>
          {documents?.map((doc, index) => (
            <div key={doc.documentTypeName} className="space-y-2">
              <Label
                htmlFor={doc.documentTypeName}
                className="flex items-center"
              >
                {doc.documentTypeName}
                {doc.mendatory && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <Input
                onChange={handleChange(index)}
                id={doc.documentTypeName}
                type="file"
                required={doc.mendatory}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full">
            Upload Documents
          </Button>
        </form>
      </div>
    </div>
  );
}

export default WithAuthentication(
  WithPermission("upload")(WithLayout(DocumentUpload))
);
