"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Icons } from "@/components/ui/icons";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./musics/columns";
import Header from "@/components/Header";

type MusicProps = {
  id: string;
  name: string;
  key: string;
};

export default function Home() {
  const [musics, setMusics] = useState<MusicProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllMusics = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/musics");
      const musics = response.data.musics;
      setMusics(musics);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllMusics();
  }, []);

  return (
    <main className="container mx-auto">
      <Navbar />

      <Header />

      <DataTable columns={columns} data={musics} />
    </main>
  );
}
