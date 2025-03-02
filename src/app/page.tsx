"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import  LandingPage  from "@/components/Landing/LandingPage";
import AuthScreen from "@/components/Auth/AuthScreen";
import { SignInFlow } from "@/lib/utils";


export default function Home({ searchParams }: { searchParams: { authType: SignInFlow }}) {
  const session = useSession();
          const router = useRouter();
          const formType = searchParams.authType;
      
          if (session.status === "authenticated") {
              return router.push("/dashboard")
          }
  return (
    <div>
      <LandingPage  />
      <AuthScreen authType={formType} />
    </div>
  );
}
