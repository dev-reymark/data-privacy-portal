import React from "react";

export default function ApplicationLogo({ className = "h-8 w-auto" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                className="h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h18M3 12h18M3 17h18"
                />
            </svg>
            <span className="font-bold text-lg text-gray-800">
                DSC Portal
            </span>
        </div>
    );
}
