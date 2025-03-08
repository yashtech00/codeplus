"use client"

import { useState } from "react";
// import { getProblems } from "../db/problem";

interface ProblemProp {
    id: string;
    title: string;
    hidden: boolean;
    description: string;
    difficulty: string;
}
interface FilterProps {
    problem: ProblemProp[]
}

export async function Filter({ problem }: FilterProps) {

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        
    }


    return (
        <div>
            <form onClick={handleSearch}>
                <input placeholder="Search " onChange={(e)=>(setSearch(e.target.value))}  />
                </form>
            <div>
                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" onClick={() => setIsOpen(true)} />
                </svg>
                </button>

                {/* <!-- Dropdown menu --> */}
                <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Easy</button>
                        </li>
                        <li>
                            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Medium</button>
                        </li>
                        <li>
                            <button className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hard</button>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    )
}