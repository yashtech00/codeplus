
import { AppBar } from "../../component/AppBar/Appbar";
import { Problems } from "../../component/Problems";

export default function problemList({ searchParams }: { searchParams: { q?: string } }) {
    return (
        <div className=" ">
             
            <main className="">
                
            <Problems searchParams={searchParams} />
                </main>
        </div>
    )

}