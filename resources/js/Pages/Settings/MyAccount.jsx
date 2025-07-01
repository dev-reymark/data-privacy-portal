import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import SidebarLayout from "@/Components/Layout/SidebarLayout";
import { Alert } from "@heroui/react";

export default function MyAccount() {
    const { auth } = usePage().props;
    const user = auth.user;

    const { data, setData, patch, processing, errors, reset } = useForm({
        name: user.name || "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("account.update"), {
            onSuccess: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <SidebarLayout>
            <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
                <div className="flex items-center justify-center w-full">
                    <Alert
                        color="success"
                        title={`Hello, ${user.name}`}
                        description={`You are logged in as ${user.userrole}`}
                    />
                </div>

                <h1 className="text-2xl font-bold mb-4">My Account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.name && (
                            <div className="text-red-600 text-sm">
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Role
                        </label>
                        <input
                            type="text"
                            value={user.userrole}
                            disabled
                            className="w-full border p-2 rounded bg-gray-100 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                        {errors.password && (
                            <div className="text-red-600 text-sm">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? "Saving..." : "Update Account"}
                    </button>
                </form>
            </div>
        </SidebarLayout>
    );
}
