import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import WithAuthLayout from "@/components/layout/WithAuthLayout";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    currentZillaParishad: "",
    currentPanchayatSamiti: "",
    currentGramPanchayatName: "",
    mobileNumber: "",
    whatsappMobileNumber: "",
    emailId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    // You can add your submission logic here
  };

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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentZillaParishad">
                Current Zilla Parishad
              </Label>
              <Input
                id="currentZillaParishad"
                name="currentZillaParishad"
                value={formData.currentZillaParishad}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentPanchayatSamiti">
                Current Panchayat Samiti
              </Label>
              <Input
                id="currentPanchayatSamiti"
                name="currentPanchayatSamiti"
                value={formData.currentPanchayatSamiti}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentGramPanchayatName">
                Current Gram Panchayat Name
              </Label>
              <Input
                id="currentGramPanchayatName"
                name="currentGramPanchayatName"
                value={formData.currentGramPanchayatName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              className="w-full"
            >
              Register
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default WithAuthLayout(Register);
