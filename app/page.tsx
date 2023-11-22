"use client";

import { doc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

type MusicProps = {
  id: string;
  name: string;
  key: string;
};

export default function Home() {
  const [musics, setMusics] = useState<MusicProps[]>();

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
    return (
      <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {name}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {key}
        </p>
      </div>
    );
  };

  useEffect(() => {
    querySnapshot();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Céu na terra</h1>

        <div>
          {musics?.map((music) => (
            <div className="flex" key={music.id}>
              {renderCard(music.name, music.key)}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
