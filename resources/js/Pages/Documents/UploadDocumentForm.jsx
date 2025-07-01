import React from "react";
import { useForm } from "@inertiajs/react";
import SidebarLayout from "../../Components/Layout/SidebarLayout";

export default function UploadDocumentForm() {
    const { data, setData, post, reset, processing, errors } = useForm({
        title: "",
        file: null,
        category: "",
        tags: "",
        expires_at: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/documents", {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <SidebarLayout>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    type="text"
                    placeholder="Title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    className="border p-2"
                />
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setData("file", e.target.files[0])}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={data.category}
                    onChange={(e) => setData("category", e.target.value)}
                    className="border p-2"
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={data.tags}
                    onChange={(e) => setData("tags", e.target.value)}
                    className="border p-2"
                />
                <input
                    type="date"
                    value={data.expires_at}
                    onChange={(e) => setData("expires_at", e.target.value)}
                    className="border p-2"
                />
                <button
                    type="submit"
                    className="col-span-full bg-blue-600 text-white p-2"
                    disabled={processing}
                >
                    Upload
                </button>
            </form>
        </SidebarLayout>
    );
}
