import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";


export async function PublishPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handlePublish=async(e:React.FormEvent)=>{
        e.preventDefault();
        try {
            const res = await axios.post("/api/discuss", {
                title,
                description
            })
            console.log(res,"publish res");
        } catch (e) {
            console.error(e);

            
        }
    }

    return (
        <div>
            Publish Page
            <div>
                <form onSubmit={handlePublish}>
                    <div>
                        <Label>Title</Label>
                        <Input
                            placeholder="Enter the title"
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                        <Label>Description</Label>
                        <Input
                            placeholder="Enter the description"
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </div>
                </form>
                <div>
                    <Button>cancle</Button>
                    <Button>Posts</Button>
                </div>
            </div>
        </div>
    )
}