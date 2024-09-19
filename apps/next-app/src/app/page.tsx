"use client";

import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";

interface Credentials {
  login: string;
  password: string;
  token: string;
}

export default function Page(): JSX.Element {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const { toast } = useToast();

  const getCredentials = async () => {
    try {
      const response = await fetch(`http://demo.wizzcad.com:8081/logins`);
      if (response.ok) {
        const data = await response.json();
        setCredentials(data);
      } else {
        toast({
          title: "Error",
          description: "Fetch data has failed",
        });
      }
    } catch (error) {
      console.error("Fetch data has failed:", error);
    }
  };

  const handleLogin = () => {
    console.log(login, password);
    console.log(credentials);
    const matchingCredential = credentials.find(
      (cred) => cred.login === login && cred.password === password
    );
    console.log(matchingCredential);
    if (matchingCredential) {
      localStorage.setItem("token", matchingCredential.token);
      router.push("/list");
      toast({
        title: "Success",
        description: "Connection successful",
      });
    } else {
      toast({
        title: "Error",
        description: "Login or password incorrect",
        variant: "destructive",
        className: "bg-red-500 text-white ",
      });
    }
  };

  useEffect(() => {
    getCredentials();
  }, []);

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
              value={login}
              onChange={(value) => setLogin(value)}
            />
            <TextInput
              placeholder="Password"
              isPassword
              value={password}
              onChange={(value) => setPassword(value)}
            />
            <Button
              onClick={handleLogin}
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
