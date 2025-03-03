import { Button } from "@/components/ui/button";  
import {  
    Dialog,  
    DialogContent,  
    DialogDescription,  
    DialogHeader,  
    DialogTitle,  
} from "@/components/ui/dialog";  
import { Input } from "@/components/ui/input";  
import { Label } from "@/components/ui/label";  
import { signIn, useSession } from "next-auth/react";  
import { useId, useState, useEffect } from "react";  
import { Toaster, toast } from "sonner";  
import AdminPage from "./AdminPage";  


function AdminSigninPage() {  
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState("");  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState("");  
    const [isOpen, setIsOpen] = useState(false); // Control dialog visibility  
    const [showErrorImage, setShowErrorImage] = useState(false); // Track whether to show error image/message  
    const [adminError, setAdminError] = useState(""); // Error message for admin panel  

    const session = useSession();  

    // Automatically open the dialog if not authenticated  
    useEffect(() => {  
        if (!session.data) {  
            setIsOpen(true); // Open dialog automatically if not authenticated  
        }  
    }, [session.data]);  

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        setError(""); 
        console.log(email,password,"yashadmin");
        
        const res = await signIn("credentials", {  
            email,  
            password,  
            redirect: false,
            callbackUrl:"/admin"
        });  
        if (res?.error) {  
            setError(res.error);  
            setShowErrorImage(true); // Show error image on invalid credentials  
            toast.error("Invalid Credentials");  
        } else {  
            toast.success("Successfully Signed In");  
            setIsOpen(false); // Close dialog on successful sign in  
            setAdminError(""); // Reset any previous error  
        }    
    };  

    const handleClose = () => {  
        // Set an error to inform the user they must sign in before accessing the admin panel  
        if (!session.data) {  
            setAdminError("You must sign in to access the admin panel.");  
            setShowErrorImage(true); // Show error image/message  
        }  
        setIsOpen(false); // Close the dialog  
    };  

    const id = useId();  
    return (  
        <div>  
            <Dialog open={isOpen} onOpenChange={handleClose}>  
                {!session.data && (  
                    <DialogContent> 
                        <div className="flex flex-col items-center gap-2">  
                            <div  
                                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border cursor-pointer"  
                                aria-hidden="true"  
                                onClick={handleClose} // Handle click to close the dialog  
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
                                <DialogTitle className="sm:text-center">Sign in to Origin UI</DialogTitle>  
                                <DialogDescription className="sm:text-center">  
                                    We just need your credentials to get you started.  
                                </DialogDescription>  
                            </DialogHeader>  
                        </div>  

                        <form className="space-y-5" onSubmit={handleSubmit}>  
                            <div className="space-y-4">  
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
                            <Button type="submit" className="w-full" disabled={loading}>  
                                {loading ? "Signing In..." : "Sign In"}  
                            </Button>  
                        </form>  

                        {showErrorImage && (  
                            <div className="mt-4 text-red-600 flex flex-col items-center">  
                                <img src="/path/to/error-image.png" alt="Error" className="w-16 h-16" />  
                                <p className="text-center">Please sign in to access the admin panel.</p>  
                            </div>  
                        )}  
                    </DialogContent>  
                )}  
                <Toaster />  
            </Dialog>  

            {/* Conditionally render AdminPage only when authenticated */}  
            {session.data && <AdminPage />}  

            {/* Display admin error if exists */}  
            {adminError && (  
                <div className="mt-4 text-red-500">  
                    <p>{adminError}</p>  
                </div>  
            )}  
        </div>  
    );  
}  

export { AdminSigninPage };  