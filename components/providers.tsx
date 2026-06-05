"use client";

import { PartyProvider } from "@/lib/party-context";
import { AudioProvider } from "@/lib/audio-context";
import { SoundFx } from "./sound-fx";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PartyProvider>
      <AudioProvider>
        <SoundFx />
        {children}
      </AudioProvider>
    </PartyProvider>
  );
}
