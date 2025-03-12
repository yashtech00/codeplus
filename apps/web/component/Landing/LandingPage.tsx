import { BackgroundPaths } from "@/components/ui/background-paths";  
import { Code2, Github, Cpu } from 'lucide-react';  

export default function LandingPage() {  
    return (  
        <div className="bg-neutral-950">  
            <BackgroundPaths title="Code Plus" />  

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
                            <Github className="h-12 w-12 mx-auto text-blue-500" />  
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
                            <span className="text-xl font-bold text-white">CodeMaster</span>  
                        </div>  
                        <div className="flex space-x-6">  
                            <Github className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />  
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