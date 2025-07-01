import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const { flash } = usePage().props;
    const successMessage = flash?.success;
    const errorMessage = flash?.error;

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Login" />
            <div className="max-w-md mx-auto mt-20 p-6 border shadow">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                {successMessage && (
                    <div className="bg-green-100 border p-2 rounded text-green-800 mb-4">
                        {successMessage}
                    </div>
                )}

                {errorMessage && (
                    <div className="bg-red-100 border p-2 rounded text-red-800 mb-4">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            className="w-full border p-2"
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
                        <label>Password</label>
                        <input
                            type="password"
                            className="w-full border p-2"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <label htmlFor="remember" className="ml-2">
                            Remember Me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2"
                        disabled={processing}
                    >
                        Login
                    </button>
                </form>
            </div>
        </>
    );
}
