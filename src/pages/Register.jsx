import WithAuthLayout from "@/components/layout/WithAuthLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RSelect from "@/components/ui/RSelect";
import { register } from "@/services/auth";
import {
  getBlocksByDistrictId,
  getDesignations,
  getDistricts,
  getPanchayatByBlockId,
} from "@/services/preset";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [designations, setDesignations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: null,
    currentZillaParishad: null,
    currentPanchayatSamiti: null,
    currentGramPanchayatName: null,
    mobileNumber: "",
    whatsappMobileNumber: "",
    emailId: "",
  });

  useEffect(() => {
    (async () => {
      let res1 = await getDesignations();
      let res2 = await getDistricts();

      setDesignations(res1?.data);
      setDistricts(res2?.data);
    })();
  }, []);

  const handleChange = (name) => async (e) => {
    let nextState = produce(formData, (draft) => {
      switch (name) {
        case "firstName":
        case "lastName":
          draft[name] = e.target.value;
          break;
        case "designation":
          draft[name] = e;
          break;
        case "currentZillaParishad":
          draft[name] = e;
          break;
        case "currentPanchayatSamiti":
          draft[name] = e;
          break;
        case "currentGramPanchayatName":
          draft[name] = e;
          break;
        case "mobileNumber":
          draft[name] = e.target.value;
          break;
        case "whatsappMobileNumber":
          draft[name] = e.target.value;
          break;
        case "emailId":
          draft[name] = e.target.value;
          break;

        default:
          break;
      }
    });
    setFormData(nextState);

    //get panchayat samiti
    if (name === "currentZillaParishad" && e) {
      let response = await getBlocksByDistrictId(e?.districtId);
      setBlocks(response?.data);
    }

    //get gram panchayat
    if (name === "currentPanchayatSamiti" && e) {
      let response = await getPanchayatByBlockId(e?.blockId);
      setPanchayats(response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await register(formData);
    if (response?.status === "success") {
      navigate("/login");
    } else {
      console.log("error");
    }
  };

  console.log(formData);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>
            Please fill in all the required information.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                required
                lang="mr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                required
                lang="mr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <RSelect
                id="designation"
                options={designations}
                nameProperty="designationName"
                valueProperty="designationId"
                value={formData.designation}
                onChange={handleChange("designation")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentZillaParishad">
                Current Zilla Parishad
              </Label>
              <RSelect
                id="ditrictName"
                options={districts}
                nameProperty="districtName"
                valueProperty="districtId"
                value={formData.currentZillaParishad}
                onChange={handleChange("currentZillaParishad")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentPanchayatSamiti">
                Current Panchayat Samiti
              </Label>
              <RSelect
                id="blocks"
                options={blocks}
                nameProperty="blockName"
                valueProperty="blockId"
                value={formData.currentPanchayatSamiti}
                onChange={handleChange("currentPanchayatSamiti")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentGramPanchayatName">
                Current Gram Panchayat Name
              </Label>
              <RSelect
                id="panchayat"
                options={panchayats}
                nameProperty="panchayatName"
                valueProperty="panchayatId"
                value={formData.currentGramPanchayatName}
                onChange={handleChange("currentGramPanchayatName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange("mobileNumber")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsappMobileNumber">
                WhatsApp Mobile Number
              </Label>
              <Input
                id="whatsappMobileNumber"
                name="whatsappMobileNumber"
                type="tel"
                value={formData.whatsappMobileNumber}
                onChange={handleChange("whatsappMobileNumber")}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailId">Email ID</Label>
              <Input
                id="emailId"
                name="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange("emailId")}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} className="w-full">
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default WithAuthLayout(Register);
