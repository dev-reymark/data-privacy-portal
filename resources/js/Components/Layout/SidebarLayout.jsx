import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import Logout from "../Auth/Logout";
import ApplicationLogo from "../ApplicationLogo";
import NotificationDropdown from "../NotificationDropdown";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";

export default function SidebarLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url, props } = usePage();
    const notifications = props.notifications || [];
    const userRole = props.auth?.user?.userrole || "";

    const links = [
        { name: "Dashboard", href: "/dashboard", role: ["admin", "approver"] },
        {
            name: "Documents",
            role: ["admin"],
            children: [
                {
                    name: "All Documents",
                    href: "/documents",
                    role: ["admin", "approver", "uploader"],
                },
                {
                    name: "Approval Requests",
                    href: "/documents/pending",
                    role: ["admin", "approver"],
                },
            ],
        },
        {
            name: "My Account",
            href: "/account",
            role: ["admin", "approver", "uploader"],
        },
        {
            name: "Settings",
            role: ["admin"],
            children: [{ name: "All Users", href: "/users", role: ["admin"] }],
        },
    ];

    const isActive = (href) => url.startsWith(href);
    const [openDropdowns, setOpenDropdowns] = useState({});

    const toggleDropdown = (name) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

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
                    {links
                        .filter(
                            (link) => !link.role || link.role.includes(userRole)
                        )
                        .map((link) =>
                            link.children ? (
                                <div key={link.name}>
                                    <button
                                        onClick={() =>
                                            toggleDropdown(link.name)
                                        }
                                        className="w-full text-left p-2 rounded hover:bg-blue-100 flex justify-between items-center"
                                    >
                                        <span>{link.name}</span>
                                        <span>
                                            {openDropdowns[link.name] ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </span>
                                    </button>
                                    {openDropdowns[link.name] && (
                                        <div className="pl-4 mt-1">
                                            {link.children
                                                .filter(
                                                    (child) =>
                                                        !child.role ||
                                                        child.role.includes(
                                                            userRole
                                                        )
                                                )
                                                .map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className={`block p-2 rounded hover:bg-blue-100 ${
                                                            isActive(child.href)
                                                                ? "bg-blue-200 font-semibold"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setSidebarOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
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
                            )
                        )}

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
                            DSC Portal
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <NotificationDropdown notifications={notifications} />
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                />
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                            >
                                <DropdownItem
                                    key="profile"
                                    className="h-14 gap-2"
                                >
                                    <p className="font-semibold">
                                        Signed in as
                                    </p>
                                    <p className="font-semibold">
                                        {props.auth.user.email}
                                    </p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    My Account
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                {/* Content */}
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
