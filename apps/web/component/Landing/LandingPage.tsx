import { Code2, Github, Cpu } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AvatarCircles } from "@/components/ui/avatar-circles"

const avatarUrls = [
    "https://avatars.githubusercontent.com/u/16860528",
    "https://avatars.githubusercontent.com/u/20110627",
    "https://avatars.githubusercontent.com/u/106103625",
    "https://avatars.githubusercontent.com/u/59228569",
]



export default function LandingPage() {
    return (
        <div className="bg-neutral-950">

            <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:40px_40px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    )}
                />
                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

                <div className='text-center'>
                    <div className="flex justify-center">
                        <p className='inline-block'>
                            <AvatarCircles className='w-30' numPeople={99} avatarUrls={avatarUrls} />
                        </p>
                    </div>

                    <p className='relative z-20 sm:text-sm text-neutral-400 text-center'>
                        {"{Trusted by 5M+ developers}"}
                    </p>

                    <p className="relative z-20 bg-gradient-to-b from-neutral-100 to-neutral-200 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-5xl">
                        Master Programming with CodePlus
                    </p>

                    <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-300 bg-clip-text text-4xl font-bold sm:text-7xl text-blue-500">
                        Tired of reading? Let’s start coding.
                    </p>

                    <p className="relative z-20 pt-8 pb-4 text-4xl text-neutral-400 sm:text-lg">
                        Join 5M+ students building projects, cracking contests, and landing internships.
                    </p>

                    <p className="relative z-20 text-4xl text-neutral-400 sm:text-lg">
                        Kickstart Your Coding Journey – No Boring Lectures, Just Real Practice!
                    </p>
                </div>

            </div>


            {/* Features Section */}
            <section className="py-12 bg-neutral-950">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white">Our Features</h2>
                    <p className="mt-2 text-gray-400">Explore the benefits of using Code Plus</p>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
                            <Code2 className="h-12 w-12 mx-auto text-blue-500" />
                            <h3 className="mt-4 text-lg font-semibold text-white">500+ Challenges</h3>
                            <p className="mt-2 text-gray-400">
                                From beginner to advanced, practice with our curated collection of coding challenges.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
                            <Cpu className="h-12 w-12 mx-auto text-blue-500" />
                            <h3 className="mt-4 text-lg font-semibold text-white">Multiple Languages</h3>
                            <p className="mt-2 text-gray-400">
                                Code in Python, JavaScript, Java, and many more popular programming languages.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
                            <a href="https://github.com/yashtech00" target="_blank" rel="noopener noreferrer" title="Visit our GitHub page">
                                <Github className="h-12 w-12 mx-auto text-blue-500" />
                            </a>
                            <h3 className="mt-4 text-lg font-semibold text-white">Active Community</h3>
                            <p className="mt-2 text-gray-400">
                                Learn from peers, share solutions, and grow together with our community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-950 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Code2 className="h-6 w-6 text-blue-500" />
                            <span className="text-xl font-bold text-white">CodePlus</span>
                        </div>
                        <div className="flex space-x-6">
                            <a href="https://github.com/yashtech00" target="_blank" rel="noopener noreferrer" title="Visit our GitHub page">
                                <Github className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" /></a>
                            <Cpu className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        <p>&copy; 2025 CodePlus. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}  
