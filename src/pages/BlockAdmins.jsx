import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import WithLayout from "@/components/layout/WithLayout";
import { Combobox } from "@/components/ui/comboBox";
import RButton from "@/components/ui/rButton";
import { toast } from "@/components/ui/use-toast";

import { getBlockAdmins, getUsers, updateBlockAdmin } from "@/services/block";
import { produce } from "immer";
import { FilePenIcon } from "lucide-react";
import WithAuthentication from "@/components/hoc/withAuthentication";
import WithPermission from "@/components/hoc/withPermissions";

function BlockAdmins() {
  const [blocks, setBlocks] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await getBlockAdmins();
      setBlocks(response?.data);

      let adminResponse = await getUsers();
      setAdmins(adminResponse.data);
    })();
  }, []);

  const handleEditBlockAdmin = (blockIndex) => (e) => {
    let nextState = produce(blocks, (draft) => {
      if (draft[blockIndex].hasOwnProperty("isEditMode")) {
        draft[blockIndex]["isEditMode"] = !draft[blockIndex]["isEditMode"];
      } else {
        draft[blockIndex]["isEditMode"] = true;
      }
    });

    setBlocks(nextState);
  };

  const handleSetBlockAdmin = (index) => async (e) => {
    let response = await updateBlockAdmin(e);

    if (response.status === "success") {
      let nextState = produce(blocks, (draft) => {
        draft[index]["admin"] = e;
        draft[index]["isEditMode"] = false;
      });

      setBlocks(nextState);
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Unable to save product.",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mb-5">Block Management</h1>
      </div>

      <div className="border rounded-lg shadow-lg border-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">Block Name</TableHead>
              <TableHead className="p-2">Block Admin</TableHead>
              <TableHead className="w-[150px] p-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks?.length ? (
              blocks?.map((block, index) => (
                <TableRow key={block?.blockId}>
                  <TableCell className="p-2">{block.blockName}</TableCell>
                  <TableCell className="p-2">
                    {block?.isEditMode ? (
                      <Combobox
                        options={admins}
                        labelProperty="userName"
                        valueProperty="userId"
                        value={block?.admin ?? null}
                        onChange={handleSetBlockAdmin(index)}
                      />
                    ) : (
                      <div>{block?.admin?.userName ?? ""}</div>
                    )}
                  </TableCell>
                  <TableCell className="p-2">
                    <div className="flex">
                      <RButton
                        variant="ghost"
                        className="flex items-center gap-2 "
                        onClick={handleEditBlockAdmin(index)}
                      >
                        <FilePenIcon className="h-4 w-4" />
                      </RButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default WithAuthentication(
  WithPermission("blockAdmins")(WithLayout(BlockAdmins))
);
