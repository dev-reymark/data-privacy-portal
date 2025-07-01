import React from "react";
import { router, Link } from "@inertiajs/react";
import SidebarLayout from "../Components/Layout/SidebarLayout";

export default function Dashboard({
    auth,
    notifications = [],
    documents = [],
    approvedDocument = 0,
}) {
    const markAsRead = (id) => {
        router.post(
            `/notifications/${id}/mark-as-read`,
            {},
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <SidebarLayout>
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Welcome */}
                <div className="text-2xl font-bold">
                    Welcome back, {auth.user.name}!
                </div>

                <p>{approvedDocument}</p>

                {/* Notifications */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        Unread Notifications
                    </h2>
                    {notifications.length === 0 ? (
                        <p className="text-gray-500">You're all caught up 🎉</p>
                    ) : (
                        <ul className="bg-white border rounded shadow p-4 space-y-2">
                            {notifications.map((n) => (
                                <li
                                    key={n.id}
                                    className="flex justify-between items-center text-sm bg-yellow-50 p-2 rounded"
                                >
                                    <div>
                                        📢 {n.data.message}
                                        <div className="text-xs text-gray-500">
                                            {new Date(
                                                n.created_at
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => markAsRead(n.id)}
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        Mark as Read
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Recent Documents */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">
                        Recent Documents
                    </h2>
                    {documents.length === 0 ? (
                        <p className="text-gray-500">
                            No documents uploaded yet.
                        </p>
                    ) : (
                        <ul className="bg-white border rounded shadow divide-y">
                            {documents.slice(0, 5).map((doc) => (
                                <li key={doc.id} className="p-4 text-sm">
                                    <div className="font-semibold">
                                        {doc.title}
                                    </div>
                                    <div className="text-gray-500">
                                        Uploaded by:{" "}
                                        {doc.user?.name ?? "Unknown"} |
                                        Category: {doc.category ?? "N/A"} |
                                        Expires: {doc.expires_at ?? "N/A"}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-2">
                        <Link
                            href={route("documents.index")}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            View all documents →
                        </Link>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
