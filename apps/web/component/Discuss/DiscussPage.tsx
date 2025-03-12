"use client"  

import { Button } from "@/components/ui/button";  
import axios from "axios";  
import { useEffect, useState } from "react";  
import { DiscussCard } from "./DiscussCard";  
import Link from "next/link";  

export interface PostProp {  
    id: string;  
    title: string;  
    description: string;  
    upVote: number;  
    downVote: number | null; // Updated to accept null for downVote  
    comment: string;  
    createdAt: Date;  
}  

export function DiscussPage() {  
    const [loading, setLoading] = useState(false);  
    const [posts, setPosts] = useState<PostProp[]>([]);  

    async function fetchPosts(e?: React.MouseEvent<HTMLButtonElement>) {  
        if (e) e.preventDefault();  
        setLoading(true);  
        try {  
            const res = await axios.get<{   
                message: string;   
                discuss: PostProp[]; // Expect the response to be this type  
            }>('/api/discuss');  
            
            // Ensure that "discuss" is an array  
            if (Array.isArray(res.data.discuss)) {  
                setPosts(res.data.discuss);   
            } else {  
                console.error("Expected an array in 'discuss' but got:", res.data.discuss);  
                setPosts([]); // Reset to an empty array if not an array  
            }  
        } catch (error) {  
            console.error("Error fetching posts:", error);  
            setPosts([]); // Reset or handle the error state here  
        } finally {  
            setLoading(false);  
        }  
    }  

    useEffect(() => {  
        fetchPosts();  
    }, []);  

    return (  
        <div className=" flex justify-center ">  
            <div className="">  
                {loading ? (   
                    <p>Loading...</p>   
                ) : (  
                    Array.isArray(posts) ? (  
                        posts.map((discussPost) => (  
                            <div key={discussPost.id}>  
                                <DiscussCard posts={discussPost} />  
                            </div>  
                        ))  
                    ) : (  
                        <p>No posts available.</p>  
                    )  
                )}  
            </div>  
        </div>  
    );  
}  