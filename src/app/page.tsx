"use client";
export const fetchCache = "force-no-store";

import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [count, setCount] = useState<string | null>(null);

  async function onClick() {
    console.log("click");
    const response = await fetch("/api/count", { method: "POST" }).then((res) =>
      res.text()
    );
    if (response) setCount(response);
  }

  async function onClick2() {
    const response = await fetch("/api/hello").then((res) => res.text());
    console.log({ response });
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center ">
        {count && <p>You clicked me {count} times.</p>}
        <button
          className="bg-white cursor-pointer p-8"
          onClick={onClick}
          style={inter.style}
        >
          Click Me!
        </button>

        <button
          className="bg-emerald-600 cursor-pointer p-8"
          onClick={onClick2}
          style={inter.style}
        >
          Hello there
        </button>
      </div>
    </main>
  );
}
