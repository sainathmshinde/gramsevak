"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import WithLayout from "@/components/layout/WithLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function GramSevakTable({ data, onEdit, onDelete }) {
  const [editingGramSevak, setEditingGramSevak] = useState(null);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingGramSevak) {
      onEdit(editingGramSevak.id, editingGramSevak);
      setEditingGramSevak(null);
    }
  };

  return (
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
        {data.map((gramSevak) => (
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => setEditingGramSevak(gramSevak)}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Gram Sevak</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={editingGramSevak?.firstName || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, firstName: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={editingGramSevak?.lastName || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, lastName: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={editingGramSevak?.email || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, email: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="block">Block</Label>
                      <Input
                        id="block"
                        value={editingGramSevak?.block || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, block: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={editingGramSevak?.district || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, district: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceId">Service ID</Label>
                      <Input
                        id="serviceId"
                        value={editingGramSevak?.serviceId || ""}
                        onChange={(e) =>
                          setEditingGramSevak((prev) =>
                            prev ? { ...prev, serviceId: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <Button type="submit">Save Changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => onDelete(gramSevak.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const mockData = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    block: "Block A",
    district: "District 1",
    serviceId: "GS001",
    isApproved: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    block: "Block B",
    district: "District 2",
    serviceId: "GS002",
    isApproved: false,
  },
  {
    id: "3",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    block: "Block C",
    district: "District 1",
    serviceId: "GS003",
    isApproved: true,
  },
  {
    id: "4",
    firstName: "Bob",
    lastName: "Brown",
    email: "bob@example.com",
    block: "Block A",
    district: "District 3",
    serviceId: "GS004",
    isApproved: false,
  },
];

function GramSevaks() {
  const [gramSevaks, setGramSevaks] = useState(mockData);
  const [filter, setFilter] = useState();

  const filteredGramSevaks = gramSevaks.filter((gs) => {
    if (filter === "approved") return gs.isApproved;
    if (filter === "pending") return !gs.isApproved;
    return true;
  });

  const handleEdit = (id, updatedData) => {
    setGramSevaks((prevGramSevaks) =>
      prevGramSevaks.map((gs) =>
        gs.id === id ? { ...gs, ...updatedData } : gs
      )
    );
  };

  const handleDelete = (id) => {
    setGramSevaks((prevGramSevaks) =>
      prevGramSevaks.filter((gs) => gs.id !== id)
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Gram Sevak Management</h1>
      <div className="flex justify-between items-center mb-5">
        <Select value={filter} onValueChange={() => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Gram Sevaks</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending Approval</SelectItem>
          </SelectContent>
        </Select>
        {/* <Button>Add New Gram Sevak</Button> */}
      </div>
      <GramSevakTable
        data={filteredGramSevaks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default WithLayout(GramSevaks);
