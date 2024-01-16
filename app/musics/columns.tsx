"use client";

import { EditUser } from "@/components/Modal/EditUser";
import { ColumnDef } from "@tanstack/react-table";

export type Musics = {
  id: string;
  name: string;
  key: string;
};

export const columns: ColumnDef<Musics>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "key",
    header: "Tom",
  },
  {
    id: "actions",
    header: "Ação",
    minSize: 50,
    cell: ({ row }) => {
      return (
        <div className="w-px">
          <EditUser data={row.original} />
        </div>
      );
    },
  },
];
