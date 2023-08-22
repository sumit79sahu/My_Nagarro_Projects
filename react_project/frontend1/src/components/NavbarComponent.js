import { useState } from "react"
export default function NavbarComponent() {

    const [display, setDisplay] = useState("hidden")
    return (
        <>
            <nav className="bg-[#0B2040] px-10 pt-1 pb-2 md:px-20 flex justify-between items-center">
                {/* Heading and login_signUp links */}
                <div className={`flex flex-col md:flex-row md:gap-5 items-start md:items-end`}>
                    <div className="text-3xl font-semibold text-white">QuickMart</div>
                    <div>
                        <ul className={`${display} pb-1 md:flex md:gap-3 font-semibold`}>
                            <li className="text-gray-400 hover:text-white">Login</li>
                            <li className="text-gray-400 hover:text-white">SignUp</li>
                        </ul>
                    </div>
                </div>
                <div>

                    {
                        display === "hidden" ?
                            <button className="text-gray-400 hover:text-white text-3xl md:hidden" onClick={() => setDisplay("")}>&equiv;</button>
                            :
                            <button className="text-gray-400 hover:text-white text-xl md:hidden" onClick={() => setDisplay("hidden")}>&#10005;</button>
                    }


                </div>
            </nav>

        </>
    )
}


// #0B2040