import React from "react";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col  items-center pt-6 sm:pt-0 px-4 bg-gray-100 justify-center ">
            <div className=" text-[#62b196] font-bold text-4xl font text-center ">
                <span className=" text-[#1d6758]">Be</span>Data{" "}
                <span className="">Sheet Integration</span>
            </div>

            <div className=" w-full max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ">
                {children}
            </div>
        </div>
    );
}
