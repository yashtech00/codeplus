"use client"
import Link from "next/link";
import { DiscussPage } from "./DiscussPage";
import { Button } from "@/components/ui/button";

export async function DiscussHome() {
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
            <DiscussPage />
        </div>
    )
}