"use client";

import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";
import Link from "next/link";
import { useState } from "react";

export default function Page(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main>
      <div className="flex items-center justify-center ">
        <div className="flex items-center justify-center w-1/2 h-screen bg-[#4CABF21A]" />
        <div className="flex items-center justify-center w-1/2 h-screen flex-col gap-24">
          <div className=" flex h-20 w-96 items-center justify-center flex-col gap-3">
            <h1 className="text-3xl font-medium">Welcome to Finalcad</h1>
            <p className="text-lg font-normal text-center text-[#848F9D]">
              Sign up or Sign in to start collaborating with your team
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <TextInput
              placeholder="name@company-name.com"
              value={email}
              onChange={(value) => setEmail(value)}
            />
            <TextInput
              placeholder="Password"
              isPassword
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <Button
              onClick={() => {}}
              className="w-20 h-11 rounded-3xl bg-[#FF8029] hover:bg-[#FF8029] text-white"
              ariaLabel="Log in"
            >
              Log in
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-[#848F9D]">
              Looking For Finalcad Classic or Finalcad Live access?
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-[#4CABF2]"
            >
              Click here
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
