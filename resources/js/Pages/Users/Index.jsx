import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";

export default function Index({ users }) {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <SidebarLayout>
            <Head title="Users" />

            <button
                onClick={() => setAddModalOpen(true)}
                className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Add User
            </button>

            <h1 className="text-2xl font-bold mb-4">User List</h1>

            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">{user.id}</td>
                            <td className="border p-2">{user.name}</td>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.userrole}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => openEditModal(user)}
                                    disabled={user.id === auth.user.id}
                                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Edit
                                </button>
                                <form
                                    method="POST"
                                    action={`/users/${user.id}`}
                                    className="inline ml-2"
                                >
                                    <input
                                        type="hidden"
                                        name="_method"
                                        value="DELETE"
                                    />
                                    <button
                                        type="submit"
                                        disabled={user.id === auth.user.id}
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="6" className="border p-2 text-center">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            <EditUserModal
                isOpen={isModalOpen}
                onClose={closeEditModal}
                user={selectedUser}
            />

            <AddUserModal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
            />
        </SidebarLayout>
    );
}
