import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";

const appName = import.meta.env.VITE_APP_NAME || "DSC Portal";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <HeroUIProvider>
                <Toaster position="bottom-right" />
                <App {...props} />
            </HeroUIProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
