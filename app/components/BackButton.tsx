"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if(window.history.length > 1) router.back()
            else router.push("/")
      }}
      className="
    absolute top-3 left-2 z-9999
    w-11 h-11 flex items-center justify-center
    rounded-full
    bg-white/10 backdrop-blur-md
    border border-white/20
    text-white
    shadow-lg
    transition hover:scale-110 hover:bg-white/20
  "
    >
      ←
    </button>
  );
}
