import WithLayout from "@/components/layout/WithLayout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const documents = [
  "Photo",
  "ADHAAR card",
  "PAN card",
  "10th Passing certificate",
  "Leaving certificate",
  "Appointment Letter",
  "Bank Passbook",
];

function Documents() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <div key={index} className="space-y-2">
              <Label htmlFor={doc.toLowerCase().replace(/\s+/g, "-")}>
                {doc}
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={doc.toLowerCase().replace(/\s+/g, "-")}
                  type="file"
                  className="w-full"
                />
                <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded">
                  <span className="text-gray-500 text-xs">PDF</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function BasicDetails() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" placeholder="Enter your designation" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zillaParishad">Zilla Parishad Name</Label>
            <Input id="zillaParishad" placeholder="Enter Zilla Parishad name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="panchayatSamiti">Panchayat Samiti Name</Label>
            <Input
              id="panchayatSamiti"
              placeholder="Enter Panchayat Samiti name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gramPanchayat">Gram Panchayat Name</Label>
            <Input id="gramPanchayat" placeholder="Enter Gram Panchayat name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              placeholder="Enter your mobile number"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Mobile Number</Label>
            <Input
              id="whatsappNumber"
              placeholder="Enter your WhatsApp number"
              type="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email ID</Label>
            <Input
              id="email"
              placeholder="Enter your email address"
              type="email"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileTabs() {
  return (
    <Tabs defaultValue="basic-details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="basic-details">
        <BasicDetails />
      </TabsContent>
      <TabsContent value="documents">
        <Documents />
      </TabsContent>
    </Tabs>
  );
}

function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <ProfileTabs />
    </div>
  );
}

export default WithLayout(Profile);
