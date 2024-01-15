"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import { Pencil2Icon } from "@radix-ui/react-icons";

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
          <Button>
            <Pencil2Icon className="mr-2 h-4 w-4" /> Editar
          </Button>
        </div>
      );
    },
  },
];
