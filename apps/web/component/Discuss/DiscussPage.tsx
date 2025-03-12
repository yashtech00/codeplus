"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"

interface PostProp{
    title: string;
    description: string;
    upVote: number;
    downVote: number;
    comment:string
}

export async function DiscussPage() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<>([]);

    async function fetch(e) {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.get(`/api/discuss`, {   
            })
            setPosts([...posts, ...res.data])
        } catch (e) {
            
        }
    }



    return (
        <div>
            <div>
            <div>
                <h1>Discuss coding problems</h1>
            </div>
            <div>
                <Button>Add +</Button>
            </div>
            </div>
            <div>
                {}
            </div>
        </div>
    )
}