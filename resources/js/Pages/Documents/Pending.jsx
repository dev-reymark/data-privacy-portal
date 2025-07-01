import React, { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";

export default function Pending({ documents }) {
    const { data, setData, post, processing, reset } = useForm({
        rejection_reason: "",
    });

    const [selectedDoc, setSelectedDoc] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleApprove = (id) => {
        router.post(route("documents.approve", id));
    };

    const handleDeny = (id) => {
        router.post(route("documents.deny", id), {
            data: { rejection_reason: data.rejection_reason },
            onSuccess: () => reset("rejection_reason"),
        });
    };

    const openModal = (doc) => {
        setSelectedDoc(doc);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDoc(null);
        reset("rejection_reason");
    };

    return (
        <SidebarLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Pending Documents
                </h1>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="p-2">Title</th>
                            <th className="p-2">Uploader</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Uploaded</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-center">
                                    No pending documents.
                                </td>
                            </tr>
                        )}
                        {documents.map((doc) => (
                            <tr key={doc.id} className="border-t">
                                <td className="p-2">{doc.title}</td>
                                <td className="p-2">{doc.user?.name}</td>
                                <td className="p-2">{doc.category ?? "—"}</td>
                                <td className="p-2">
                                    {new Date(doc.created_at).toLocaleString()}
                                </td>
                                <td className="p-2 flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => openModal(doc)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-4 relative">
                        <h2 className="text-xl font-semibold mb-2">
                            {selectedDoc.title}
                        </h2>
                        <iframe
                            src={route("documents.show", selectedDoc.id)}
                            className="w-full h-[500px] border rounded"
                        />
                        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                            <input
                                type="text"
                                placeholder="Rejection reason"
                                value={data.rejection_reason}
                                onChange={(e) =>
                                    setData("rejection_reason", e.target.value)
                                }
                                className="border rounded px-2 py-1 w-full sm:w-auto"
                            />
                            <button
                                onClick={() => handleApprove(selectedDoc.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleDeny(selectedDoc.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                disabled={processing}
                            >
                                Deny
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </SidebarLayout>
    );
}
