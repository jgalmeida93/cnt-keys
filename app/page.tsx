"use client";

import {
  collection,
  getDocs,
  query,
  orderBy,
  startAt,
  where,
  queryEqual,
} from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { Card } from "./components/Card";

const musicRef = collection(db, "musics");
const q = query(musicRef, orderBy("name"), startAt("nome"));

type MusicProps = {
  id: string;
  name: string;
  key: string;
};

export default function Home() {
  const [musics, setMusics] = useState<MusicProps[]>();
  const [search, setSearch] = useState("");

  const querySnapshot = async () => {
    await getDocs(collection(db, "musics")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMusics(newData);
    });
  };

  const renderCard = (name: string, key: string) => {
    return <Card name={name} tom={key} />;
  };

  const handleSearch = async () => {
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData);
    });
  };

  const handleFilter = async (searchParam) => {
    const q = query(
      collection(db, "musics"),
      where("name", ">=", searchParam),
      where("name", "<=", searchParam + "~")
    );

    const querySnapshotTest = await getDocs(q);

    querySnapshotTest.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    return querySnapshotTest;
  };

  useEffect(() => {
    querySnapshot();
    handleSearch();
    handleFilter("Nome");
  }, []);

  return (
    <main className="flex w-full flex-col">
      <div className="flex w-full">
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Buscar música"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[80%] m-auto my-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="flex p-10 flex-wrap justify-between mx-auto">
        {musics?.map((music) => (
          <div className="flex m-2" key={music.id}>
            {renderCard(music.name, music.key)}
          </div>
        ))}
      </div>
    </main>
  );
}
