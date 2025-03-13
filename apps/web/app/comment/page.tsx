import { FullDiscussCard } from "../../component/Discuss/FullDiscussCard";
import { useDiscussHook } from "../hooks/useDiscussHook";


export default function CommentPage() {

    const { loading, posts } = useDiscussHook();

    return (
        <div>
            {posts.map((comment) => (
                <div key={comment.id}>
                    <FullDiscussCard comment={ comment} />
                </div>
            ))}
            
        </div>
    )
}