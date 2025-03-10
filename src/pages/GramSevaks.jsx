import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import WithLayout from "@/components/layout/WithLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import RSelect from "@/components/ui/RSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  changeStatus,
  getGramSevakById,
  getgramsevakList,
} from "@/services/gramsevak";
import { CheckIcon, CrossIcon, EyeIcon, Search } from "lucide-react";
import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";

function GramSevakTable({ data, onEdit, onApprove }) {
  const [editingGramSevak, setEditingGramSevak] = useState(null);
  const [currentGramSevak, setCurrentGramSevak] = useState(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingGramSevak) {
      onEdit(editingGramSevak.id, editingGramSevak);
      setEditingGramSevak(null);
    }
  };

  const handleApprove = (index, status) => async (e) => {
    let gramSevak = data[index];
    let payload = {
      gramSevakId: gramSevak.id,
      status: status,
    };

    onApprove(payload);
  };

  const handleViewGramsevak = (index) => async (e) => {
    let gramsevakId = data[index]?.id;

    let response = await getGramSevakById(gramsevakId);
    if (response?.status === "success") {
      setCurrentGramSevak(response?.data);
    } else {
      toast.error("unable to get gramsevak details");
    }
  };

  return (
    <div className="border rounded-lg shadow-lg border-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Block</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Service ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((gramSevak, index) => (
            <TableRow key={gramSevak.id}>
              <TableCell>{gramSevak.firstName}</TableCell>
              <TableCell>{gramSevak.lastName}</TableCell>
              <TableCell>{gramSevak.email}</TableCell>
              <TableCell>{gramSevak.block}</TableCell>
              <TableCell>{gramSevak.district}</TableCell>
              <TableCell>{gramSevak.serviceId}</TableCell>
              <TableCell>
                {gramSevak.isApproved ? "Approved" : "Pending"}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={handleApprove(index, "Approved")}
                >
                  <CheckIcon />
                </Button>

                <Button
                  variant="outline"
                  onClick={handleApprove(index, "Rejected")}
                >
                  <CrossIcon />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mx-5"
                      onClick={handleViewGramsevak(index)}
                    >
                      <EyeIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Card>
                      <CardHeader>
                        <CardTitle>User Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold">Personal Details</h3>
                          <p>
                            Name: {currentGramSevak?.firstName}{" "}
                            {currentGramSevak?.lastName}
                          </p>
                          <p>
                            Designation:{" "}
                            {currentGramSevak?.designation.designationName}
                          </p>
                          <p>Mobile: {currentGramSevak?.mobileNumber}</p>
                          <p>WhatsApp: {currentGramSevak?.whatsappNumber}</p>
                          <p>Email: {currentGramSevak?.email}</p>
                        </div>

                        <div>
                          <h3 className="font-semibold">Location</h3>
                          <p>
                            District: {currentGramSevak?.district.districtName}
                          </p>
                          <p>Block: {currentGramSevak?.block.blockName}</p>
                          <p>
                            Gram Panchayat:{" "}
                            {currentGramSevak?.gramPanchayat.gramPanchayatName}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold">Documents</h3>
                          <ul className="list-disc pl-5">
                            {currentGramSevak?.documents.map((doc, index) => (
                              <li key={index}>
                                {doc.documentType}: {doc.documentName} (
                                {doc.document})
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function GramSevaks() {
  const [gramSevaks, setGramSevaks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOptions, setStatusOptions] = useState([
    { id: 1, name: "All" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Pending Approval" },
    { id: 4, name: "Rejected" },
  ]);
  const [statusValue, setStatusValue] = useState({ id: 1, name: "All" });

  useEffect(() => {
    (async () => {
      let response = await getgramsevakList(
        searchTerm,
        statusValue?.name || ""
      );
      setGramSevaks(response?.data);
    })();
  }, [statusValue, searchTerm]);

  const handleApprove = async (payload) => {
    let response = await changeStatus(payload);
    if (response.status === "success") {
      setStatusValue({ id: 1, name: "All" });
    } else {
      //toast
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Gram Sevak Management</h1>
      <div className="flex justify-between items-center mb-5">
        <div className="relative flex-1 mr-10">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <RSelect
          options={statusOptions}
          valueProperty="id"
          nameProperty="name"
          value={statusValue}
          onChange={(e) => setStatusValue(e)}
        />
      </div>
      <GramSevakTable
        data={gramSevaks}
        onEdit={() => {}}
        onApprove={handleApprove}
      />
    </div>
  );
}

export default WithAuthentication(
  WithPermission("gramSevaks")(WithLayout(GramSevaks))
);
