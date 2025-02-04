import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import WithLayout from "@/components/layout/WithLayout";

function BlockAdminModal({ isOpen, onClose, onSubmit, initialData }) {
  const [admin, setAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
    districtBlock: "",
  });

  useEffect(() => {
    if (initialData) {
      setAdmin(initialData);
    } else {
      setAdmin({
        name: "",
        lastName: "",
        email: "",
        districtBlock: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(admin);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Add"} Block Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={admin.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={admin.lastName}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={admin.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="districtBlock" className="text-right">
                District Block
              </Label>
              <Input
                id="districtBlock"
                name="districtBlock"
                value={admin.districtBlock}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {initialData ? "Update" : "Add"} Block Admin
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function BlockAdminManagement() {
  const [blockAdmins, setBlockAdmins] = useState([
    {
      id: 1,
      name: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      districtBlock: "Block A",
    },
    {
      id: 2,
      name: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      districtBlock: "Block B",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const addBlockAdmin = (admin) => {
    const newAdmin = { ...admin, id: Date.now().toString() };
    setBlockAdmins([...blockAdmins, newAdmin]);
  };

  const updateBlockAdmin = (updatedAdmi) => {
    setBlockAdmins(
      blockAdmins.map((admin) =>
        admin.id === updatedAdmin.id ? updatedAdmin : admin
      )
    );
  };

  const deleteBlockAdmin = (id) => {
    setBlockAdmins(blockAdmins.filter((admin) => admin.id !== id));
  };

  const openModal = (admin) => {
    setEditingAdmin(admin || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingAdmin(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (admin) => {
    if (editingAdmin) {
      updateBlockAdmin({ ...admin, id: editingAdmin.id });
    } else {
      addBlockAdmin(admin);
    }
    closeModal();
  };

  return (
    <div className=" ">
      <h1 className="text-2xl font-bold mb-5">Block Admin Management</h1>
      <Button onClick={() => openModal()} className="mb-5">
        Create Block Admin
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>District Block</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blockAdmins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.lastName}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.districtBlock}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openModal(admin)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteBlockAdmin(admin.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <BlockAdminModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingAdmin}
      />
    </div>
  );
}

function BlockAdmins() {
  return (
    <div>
      <BlockAdminManagement />
    </div>
  );
}

export default WithLayout(BlockAdmins);
