import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

export default function AddUserModal({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        userrole: "uploader", // default role
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/users", {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Add User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border px-2 py-1"
                        />
                        {errors.name && (
                            <p className="text-red-600 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border px-2 py-1"
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full border px-2 py-1"
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Role</label>
                        <select
                            value={data.userrole}
                            onChange={(e) =>
                                setData("userrole", e.target.value)
                            }
                            className="w-full border px-2 py-1"
                        >
                            <option value="admin">Admin</option>
                            <option value="approver">Approver</option>
                            <option value="uploader">Uploader</option>
                        </select>
                        {errors.userrole && (
                            <p className="text-red-600 text-sm">
                                {errors.userrole}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
