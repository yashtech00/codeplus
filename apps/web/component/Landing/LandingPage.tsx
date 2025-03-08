import { BackgroundPaths } from "@/components/ui/background-paths";
import { AppBar } from "../AppBar/Appbar";


export default function LandingPage() {

    return (
        <div className="">
            <div className=" dark:bg-neutral-950 w-full absolute z-20">
                <AppBar />
            </div>
            <div className="">
                <BackgroundPaths title="Code Plus" />
            </div>
        </div>
    )
}