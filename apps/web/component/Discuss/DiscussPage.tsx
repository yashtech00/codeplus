"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import { DiscussCard } from "./DiscussCard";
import Link from "next/link";

export interface PostProp{
    id: string;
    title: string;
    description: string;
    upVote: number;
    downVote: number;
    comment: string;
    createdAt: Date
}

export async function DiscussPage() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<PostProp[]>([]);

    async function fetch(e?: React.MouseEvent<HTMLButtonElement>) {
        if (e) e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.get(`/api/discuss`, {   
            })
            setPosts([...posts, ...res.data])
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(true);
        }
    }
    useEffect(() => {
        fetch();
    },[])



    return (
        <div>
            <div>
            <div>
                <h1>Discuss coding problems</h1>
            </div>
            <div>
               <Link href={"/publish"}> <Button>Add +</Button></Link>
            </div>
            </div>
            <div>
                {posts.map((discussPost) => (
                    <div key={discussPost.id}>
                    <DiscussCard posts = {discussPost}/>

                    </div>
                ))}
            </div>
        </div>
    )
}