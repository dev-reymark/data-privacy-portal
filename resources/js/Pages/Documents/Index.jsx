import React, { useState } from "react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";
import { Head, Link, router } from "@inertiajs/react";
import { formatFileSize } from "../../Helper/formatFileSize";

export default function Index({ documents }) {
    const [selectedDoc, setSelectedDoc] = useState(null);

    return (
        <SidebarLayout>
            <Head title="Documents" />
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto p-6 gap-6">
                {/* Left: Document List */}
                <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Documents</h1>
                        <Link
                            href={route("documents.create")}
                            className="text-blue-600 hover:underline"
                        >
                            + Upload
                        </Link>
                    </div>

                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => setSelectedDoc(doc)}
                            className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:bg-blue-50 ${
                                selectedDoc?.id === doc.id
                                    ? "border-blue-500 bg-blue-100"
                                    : "bg-white"
                            }`}
                        >
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {doc.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {doc.status}
                                </p>
                            </div>
                            <p className="text-sm text-gray-500">
                                Category: {doc.category || "None"} | Tags:{" "}
                                {doc.tags || "N/A"} | Uploader: {doc.user?.name}{" "}
                                | Expires: {doc.expires_at ?? "N/A"} | Size:{" "}
                                {formatFileSize(doc.file_size)} | Type:{" "}
                                {doc.file_type}
                            </p>
                            <div className="flex justify-end mt-2 gap-2 text-sm">
                                <a
                                    href={`/documents/${doc.id}`}
                                    target="_blank"
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="text-blue-600 hover:underline"
                                >
                                    Download
                                </a>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm("Delete this document?")) {
                                            router.delete(
                                                route(
                                                    "documents.destroy",
                                                    doc.id
                                                )
                                            );
                                        }
                                    }}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: PDF Preview */}
                <div className="w-full md:w-1/2 border rounded shadow p-4 bg-white h-[700px] overflow-hidden">
                    {selectedDoc ? (
                        <>
                            <h2 className="text-lg font-bold mb-2">
                                {selectedDoc.title}
                            </h2>
                            <iframe
                                src={`/documents/${selectedDoc.id}`}
                                title={`Preview ${selectedDoc.title}`}
                                className="w-full h-[600px] border"
                            />
                        </>
                    ) : (
                        <p className="text-gray-500">
                            Click a document on the left to preview
                        </p>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
