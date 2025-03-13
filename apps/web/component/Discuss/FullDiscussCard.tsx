import axios from "axios";
import { useEffect, useState } from "react";
import { useDiscussHook } from "../../app/hooks/useDiscussHook";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";

interface CommentProp{
    id:string,
    comment: string,
    createdAt : Date 
}
export interface PostProp {  
    id: string;  
    title: string;  
    description: string;  
    upVote: number;  
    downVote: number | null; // Updated to accept null for downVote  
    commentCount: number;  
    createdAt: Date;  
}

export function FullDiscussCard({comment}:{comment:PostProp}) {
    const [commentText, setCommentText] = useState("");  
    const [allComment,setAllComment] = useState<CommentProp[]>([])
    const session = useSession();
    const { loading, posts } = useDiscussHook();
    async function fetchComments() {
        try {
            const res = await axios.get(`/api/discuss/comment?id=${comment.id}`,
                {
                    data:
                    {
                        id: comment.id
                    }
                })
            setAllComment(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchComments()
    },[])
    const handleCommentSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        try {  
            await axios.post('api/discuss/comment', { discussId: comment.id, comment: commentText });  
            
            setCommentText(""); // Clear the input field after submission  
        } catch (error) {  
            console.error("Error submitting comment:", error);  
        }  
    };  

    return (
        <div>
            {/* full discuss card */}

           <div className="flex items-center gap-3 mb-4">  
                           <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">  
                               {session.data?.user.image ? (  
                                   <img  
                                       src={session.data.user.image || "/placeholder.svg"}  
                                       alt={session.data?.user.name || "User"}  
                                       className="h-full w-full object-cover"  
                                   />  
                               ) : (  
                                   <User className="h-6 w-6 text-neutral-400" />  
                               )}  
                           </div>  
                           <div className="text-neutral-200 font-medium">  
                               {session.data?.user ? session.data.user.name : "Anonymous"}  
                               <p className="text-sm text-neutral-400">Posted on {new Date(comment.createdAt).toLocaleDateString()}</p>  
                           </div>  
                       </div>  
           
                       {/* Discussion Title and Description */}  
                       <div className="mb-6">  
                           <h2 className="text-xl font-bold text-white mb-2">{comment.title}</h2>  
                           <p className="text-neutral-300 leading-relaxed">{comment.description}</p>  
                       </div>  
            
            {/* Comment Submission Form */}  
            <form onSubmit={handleCommentSubmit} className="flex mb-4">  
                <input  
                    type="text"  
                    value={commentText}  
                    onChange={(e) => setCommentText(e.target.value)}  
                    placeholder="Add a comment..."  
                    className="flex-1 p-2 rounded border border-neutral-                    700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"  
                    required  
                />  
                <button  
                    type="submit"  
                    className="ml-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"  
                >  
                    Submit  
                </button>  
            </form>  

            {/* Display Comments */}  
            <div className="comments-section">
              
                {Array.isArray(allComment) && allComment.map((comment, index) => (  
                    <div key={comment.id} className="bg-neutral-700 p-2 rounded mb-1">  
                        <p className="text-sm">{comment.comment}</p>  
                        <p className="text-xs text-neutral-400">Posted by {session?.data?.user.name} on {new Date(comment.createdAt).toLocaleDateString()}</p>  
                    </div>  
                ))}  
            </div>
        </div>
    )
}