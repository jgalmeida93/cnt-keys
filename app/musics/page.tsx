import { DataTable } from "@/components/ui/data-table";
import { Musics, columns } from "./columns";
import axios from "axios";

async function getAllMusics() {
  try {
    const response = await axios.get("/api/musics");
    const musics = response.data.musics;
    return musics;
  } catch (error) {
    console.error(error);
  }
}

export default async function Musics() {
  const musics = await getAllMusics();
  console.log(musics);
  return (
    <section className="py-24">
      <div className="container">
        {/* <DataTable columns={columns} data={musics} /> */}
        teste
      </div>
    </section>
  );
}
