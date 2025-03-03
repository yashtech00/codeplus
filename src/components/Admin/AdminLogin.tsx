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
import { signIn } from "next-auth/react";
import { ReactEventHandler, useId, useState } from "react";
import { Toaster, toast } from "sonner";



function AdminSigninPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const SigninProvider = (provider: "credentials") => {
        try {
            if (provider === "credentials") {
                const res = signIn(provider, {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: "/home",
                })
                res.then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        toast.error("Invalid Credentials")
                    } else {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        SigninProvider("credentials")

    }

    const id = useId();
    return (
        <Dialog>
            <DialogTrigger >
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
                                <Input id={`${id}-email`} placeholder="hi@yourcompany.com" type="email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-password`}>Password</Label>
                                <Input
                                    id={`${id}-password`}
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Button type="button" className="w-full">
                            Sign In
                        </Button>
                    </form>
                </DialogContent>
                <Toaster />
            </DialogTrigger>
        </Dialog>
    );
}

export { AdminSigninPage };
