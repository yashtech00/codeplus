"use client"
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";
import { useId, useState } from "react";
import { Toaster,toast } from "sonner";


function SigninPage() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const session = useSession();

    const SigninProvider = (provider: "github"|"credentials") => {
        try {
            if (provider === "credentials") {
                const res = signIn(provider, {
                    email,
                    password,
                    redirect: false,
                    callbackUrl:"/Home",
                })
                res.then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        toast.error("Invalid Credentials")
                    }else {
                        toast.success("Successfully Signed Up")
                    }
                    setLoading(false);
                })
            }else if (provider === "github") {
                const res = signIn(provider, {
                    redirect: false,
                    callbackUrl:"/Home"
                })
                res.then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        toast.error("Invalid Github")
                    }else {
                        toast.success("Successfully Signed Up")
                    }
                    setLoading(false);
                })
            }
        } catch (e) {
            console.log(e);
            setError("Internal server error");
            setLoading(true);
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        SigninProvider("credentials")
        
    }
    const handleGithub = (provider:"github") => {
        setError("");
        SigninProvider(provider);
        setLoading(true);

    }
    const id = useId();
    return (
        <Dialog>
            <DialogTrigger asChild>
                {session?.user ? (
                     <button onClick={() => signOut({ callbackUrl: "/" })} >
                     Logout
                 </button>
                ) : (
                    <button >
                    Sign In
                </button>
                )}
               
            </DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
                        aria-hidden="true"
                    >
                        <svg
                            className="stroke-zinc-800 dark:stroke-zinc-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                        >
                            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">Sign up Origin UI</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            We just need a few details to get you started.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor={`${id}-email`}>Email</Label>
                            <Input id={`${id}-email`} placeholder="hi@yourcompany.com" type="email" required onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`${id}-password`}>Password</Label>
                            <Input
                                id={`${id}-password`}
                                placeholder="Enter your password"
                                type="password"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                </div>

                <Button variant="outline" onClick={()=>handleGithub("github")}>Continue with Github</Button>

                <p className="text-center text-xs text-muted-foreground">
                    By signing up you agree to our{" "}
                    <a className="underline hover:no-underline" href="#">
                        Terms
                    </a>
                    .
                </p>
            </DialogContent>
            <Toaster/>
        </Dialog>
    );
}

export { SigninPage };
