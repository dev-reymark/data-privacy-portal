import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

export default function EditUserModal({ isOpen, onClose, user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        userrole: user?.userrole || "",
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name,
                email: user.email,
                password: "",
                userrole: user.userrole,
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/users/${user.id}`, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
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
                            className="w-full border px-2 py-1"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-600 text-sm">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">
                            Password (optional)
                        </label>
                        <input
                            type="password"
                            className="w-full border px-2 py-1"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-red-600 text-sm">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium">Role</label>
                        <input
                            type="text"
                            className="w-full border px-2 py-1"
                            value={data.userrole}
                            onChange={(e) =>
                                setData("userrole", e.target.value)
                            }
                        />
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
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
