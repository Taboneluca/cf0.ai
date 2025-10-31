"use client";

import { AtSignIcon, ChevronLeftIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FloatingPaths } from "./floating-paths";
import { TypingAnimation } from "@/components/ui/typing-animation";

export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signIn } = useAuth();

  return (
    <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative hidden h-full flex-col border-r bg-secondary p-10 lg:flex dark:bg-secondary/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <Image
          src="/cf0_text_logo.svg"
          alt="cf0 logo"
          width={120}
          height={56}
          className="mr-auto rounded-md"
        />

        <div className="z-10 mt-auto">
          <TypingAnimation
            as="p"
            words={[
              "Transforms filings, data, and notes into a single research view.",
              "Tracks provenance so you can trust every fact.",
              "Generates the next view you need based on your thesis.",
              "Monitors in real time and alerts with context that matters.",
              "Built for investors who want less noise and faster conviction.",
            ]}
            typeSpeed={50}
            deleteSpeed={35}
            pauseDelay={1400}
            loop
            className="text-lg max-w-[16rem] text-foreground/90"
          />
        </div>
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
      </div>
      <div className="relative flex min-h-screen flex-col justify-center p-4">
        <div
          aria-hidden
          className="-z-10 absolute inset-0 isolate opacity-60 contain-strict"
        >
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
          <div className="absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="-translate-y-87.5 absolute top-0 right-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)]" />
        </div>
        <Button asChild className="absolute top-7 left-5" variant="ghost">
          <a href="/">
            <ChevronLeftIcon />
            Home
          </a>
        </Button>
        <div className="mx-auto space-y-1 sm:w-sm">
          <Image
            src="/cf0_text_logo.svg"
            alt="cf0 logo"
            width={120}
            height={56}
            className="lg:hidden rounded-md"
          />
          <div className="flex flex-col space-y-0">
            <h1 className="font-mono text-3xl md:text-4xl tracking-wide">
              Sign in to cf0
            </h1>
            <p className="text-base text-muted-foreground">
              Enter your credentials to continue.
            </p>
          </div>
          <form className="space-y-1">
            <InputGroup>
              <InputGroupInput
                placeholder="your.email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <InputGroupAddon>
                <AtSignIcon />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </InputGroup>

            <Button
              className="w-full"
              type="button"
              disabled={!email || !password}
              onClick={async () => {
                await signIn(email, password);
                router.push("/");
              }}
            >
              Sign in
            </Button>
          </form>
          {/* Optional links can be added here if needed */}
        </div>
      </div>
    </main>
  );
}
// removed social auth icons per requirements
