// resources/js/Components/NotificationDropdown.jsx
import React from "react";
import { router } from "@inertiajs/react";

export default function NotificationDropdown({ notifications = [] }) {
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
        <div className="relative group">
            <button className="relative">
                🔔
                {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {notifications.length}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 hidden group-hover:block">
                <div className="p-2 font-semibold border-b">Notifications</div>
                <ul className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                        <li className="p-2 text-sm text-gray-500">
                            No new notifications
                        </li>
                    ) : (
                        notifications.map((n) => (
                            <li
                                key={n.id}
                                className="flex justify-between items-start p-2 hover:bg-gray-100 text-sm"
                            >
                                <div>
                                    📢 {n.data?.message}
                                    <div className="text-xs text-gray-500">
                                        {new Date(
                                            n.created_at
                                        ).toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => markAsRead(n.id)}
                                    className="ml-2 text-blue-600 text-xs hover:underline"
                                >
                                    Mark
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
