"use client"  

import { Button } from "@/components/ui/button";  
import axios from "axios";  
import { useEffect, useState } from "react";  
import { DiscussCard } from "./DiscussCard";  
import Link from "next/link";  
import { useDiscussHook } from "../../app/hooks/useDiscussHook";

  

export function DiscussPage() {  
    const { loading, posts } = useDiscussHook();

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