
import { Problems } from "../../component/Problems";

export default function problemList({ searchParams }: { searchParams: { q?: string } }) {
    return (
        <div className="relative">    
            <Problems searchParams={searchParams} />
        </div>
    )

}