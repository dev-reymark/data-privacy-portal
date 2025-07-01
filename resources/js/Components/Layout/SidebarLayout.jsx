import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import Logout from "../Auth/Logout";
import ApplicationLogo from "../ApplicationLogo";
import NotificationDropdown from "../NotificationDropdown";

export default function SidebarLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url, props } = usePage();
    const notifications = props.notifications || [];
    console.log("Notifications:", notifications);

    const links = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Documents", href: "/documents" },
        { name: "Approval Requests", href: "/documents/pending" },
        { name: "Settings", href: "/settings" },
        { name: "My Account", href: "/account" },
        { name: "All Users", href: "/users" },
    ];

    const isActive = (href) => url.startsWith(href);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed z-40 md:static md:flex flex-col w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="flex items-center justify-between md:justify-center px-4 py-4 border-b">
                    <ApplicationLogo />
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex flex-col gap-1 p-4">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`p-2 rounded hover:bg-blue-100 ${
                                isActive(link.href)
                                    ? "bg-blue-200 font-semibold"
                                    : ""
                            }`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="mt-4 border-t pt-4">
                        <Logout />
                    </div>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <div className="flex items-center gap-4 md:hidden">
                        <button onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-lg font-semibold">
                            Data Privacy Portal
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <NotificationDropdown notifications={notifications} />
                    </div>
                </div>

                {/* Content */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
