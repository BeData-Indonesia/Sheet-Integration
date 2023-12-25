import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="text-[#62b196] relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="text-sm font-medium"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ml-4 text-sm font-medium"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="   items-center justify-center flex w-full h-screen">
                    <div className=" text-[#62b196] font-bold text-4xl  text-center">
                        <span className=" text-[#1d6758]">Be</span>Data{" "}
                        <span className="">Sheet Integration</span>
                    </div>
                </div>
            </div>
        </>
    );
}
