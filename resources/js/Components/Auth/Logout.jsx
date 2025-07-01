import React from "react";
import { router } from "@inertiajs/react";

export default function Logout() {
    const handleLogout = (e) => {
        e.preventDefault();
        router.post("/logout");
    };

    return (
        <form onSubmit={handleLogout}>
            <button
                type="submit"
                className="w-full text-left p-2 rounded hover:bg-red-100 text-red-600"
            >
                Logout
            </button>
        </form>
    );
}
