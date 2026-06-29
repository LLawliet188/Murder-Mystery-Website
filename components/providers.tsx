"use client";

import { LanguageProvider } from "@/lib/i18n/lang";
import { PartyProvider } from "@/lib/party-context";
import { AudioProvider } from "@/lib/audio-context";
import { SoundFx } from "./sound-fx";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PartyProvider>
        <AudioProvider>
          <SoundFx />
          {children}
        </AudioProvider>
      </PartyProvider>
    </LanguageProvider>
  );
}
