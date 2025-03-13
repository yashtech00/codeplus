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
import { signIn, useSession } from "next-auth/react";
import { useId, useState } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";

function SignupPage() {
    // ✅ Always define hooks at the top, before any conditionals
    const id = useId();
    const session = useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (session.status === "loading") {
        return null; // ✅ Fix hydration mismatch by preventing unstable rendering
    }

    const SigninProvider = (provider: "github" | "credentials") => {
        try {
            if (provider === "credentials") {
                signIn(provider, {
                    email,
                    password,
                    redirect: false,
                    callbackUrl: "/problems",
                }).then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        toast.error("Invalid Credentials");
                    } else {
                        toast.success("Successfully Signed Up");
                    }
                    setLoading(false);
                });
            } else if (provider === "github") {
                signIn(provider, {
                    redirect: false,
                    callbackUrl: "/problems",
                }).then((res) => {
                    if (res?.error) {
                        setError(res.error);
                        toast.error("Invalid Github");
                    } else {
                        toast.success("Successfully Signed Up");
                    }
                    setLoading(false);
                });
            }
        } catch (e) {
            console.log(e);
            setError("Internal server error");
            setLoading(true);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        SigninProvider("credentials");
    };

    const handleGithub = () => {
        setError("");
        SigninProvider("github");
        setLoading(true);
    };

    return (
        <Dialog>
    <DialogTrigger asChild>
        {session?.data?.user ? null : <button>Sign up</button>}
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle className="sm:text-center">Sign up CodePlus</DialogTitle>
            <DialogDescription className="sm:text-center">
                We just need a few details to get you started.
            </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor={`${id}-name`}>Full name</Label>
                    <Input
                        id={`${id}-name`}
                        placeholder="Matt Welsh"
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor={`${id}-email`}>Email</Label>
                    <Input
                        id={`${id}-email`}
                        placeholder="hi@yourcompany.com"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
            <Button type="submit" className="w-full">
                Sign up
            </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            <span className="text-xs text-muted-foreground">Or</span>
        </div>

        <Button variant="outline" onClick={handleGithub}>
            Continue with Github
        </Button>

        <p className="text-center text-xs text-muted-foreground">
            By signing up you agree to our{" "}
            <a className="underline hover:no-underline" href="#">
                Terms
            </a>.
        </p>
    </DialogContent>
    <Toaster />
</Dialog>

    );
}

export { SignupPage };
