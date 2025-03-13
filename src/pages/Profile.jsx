import WithLayout from "@/components/layout/WithLayout";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RSelect from "@/components/ui/RSelect";
import { getGramSevakById } from "@/services/gramsevak";
import {
  getBlocksByDistrictId,
  getDesignations,
  getDistricts,
  getPanchayatByBlockId,
} from "@/services/preset";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Documents({ data }) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.documents.map((doc, index) => (
            <div key={index} className="space-y-2">
              <Label>{doc?.documentName}</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={doc?.documentName.toLowerCase().replace(/\s+/g, "-")}
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

function BasicDetails({ data, designations, districts, blocks, panchayats }) {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={data?.firstName}
              // onChange={handleChange("firstName")}
              required
              lang="mr"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={data?.lastName}
              // onChange={handleChange("lastName")}
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
              value={data?.designation}
              // onChange={handleChange("designation")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentZillaParishad">Current Zilla Parishad</Label>
            <RSelect
              id="ditrictName"
              options={districts}
              nameProperty="districtName"
              valueProperty="districtId"
              value={data?.district}
              // onChange={handleChange("currentZillaParishad")}
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
              value={data?.block}
              // onChange={handleChange("currentPanchayatSamiti")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentGramPanchayatName">
              Current Gram Panchayat Name
            </Label>
            <RSelect
              id="panchayat"
              options={panchayats}
              nameProperty="gramPanchayatName"
              valueProperty="gramPanchayatId"
              value={data?.gramPanchayat}
              // onChange={handleChange("currentGramPanchayatName")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              value={data?.mobileNumber}
              // onChange={handleChange("mobileNumber")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappMobileNumber">WhatsApp Mobile Number</Label>
            <Input
              id="whatsappMobileNumber"
              name="whatsappMobileNumber"
              type="tel"
              value={data?.whatsappNumber}
              // onChange={handleChange("whatsappMobileNumber")}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailId">Email ID</Label>
            <Input
              id="emailId"
              name="emailId"
              type="email"
              value={data?.email}
              // onChange={handleChange("emailId")}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Profile() {
  const [gramSevak, setGramSevak] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [panchayats, setPanchayats] = useState([]);
  useEffect(() => {
    (async () => {
      let res1 = await getDesignations();
      let res2 = await getDistricts();

      setDesignations(res1?.data);
      setDistricts(res2?.data);
      let response = await getGramSevakById(1);
      if (response.status === "success") {
        //get blocks
        let blockResponse = await getBlocksByDistrictId(
          response?.data?.district?.districtId
        );

        setBlocks(blockResponse?.data);

        let panchayatResponse = await getPanchayatByBlockId(
          response?.data?.gramPanchayat?.gramPanchayatId
        );

        setPanchayats(panchayatResponse?.data);
        //get getpanchayats
        setGramSevak(response.data);
      } else {
        toast.error("Unable to get gramsevak details");
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <Tabs defaultValue="basic-details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-details">
          <BasicDetails
            data={gramSevak}
            designations={designations}
            districts={districts}
            blocks={blocks}
            panchayats={panchayats}
          />
        </TabsContent>
        <TabsContent value="documents">
          <Documents data={gramSevak} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default WithAuthentication(
  WithPermission("profile")(WithLayout(Profile))
);
