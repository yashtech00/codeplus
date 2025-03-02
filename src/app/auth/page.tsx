// "use client"

// import AuthScreen from "@/components/Auth/AuthScreen";
// import { SignInFlow } from "@/lib/utils";
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation";


// export default function AuthType  ({ searchParams }: { searchParams: { authType: SignInFlow }}){
//     const session = useSession();
//     const router = useRouter();
//     const formType = searchParams.authType;

//     if (session.status === "authenticated") {
//         return router.push("/dashboard")
//     }


//     return <AuthScreen authType={formType} />;
// }