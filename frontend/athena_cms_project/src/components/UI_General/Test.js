import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";





export default function Test() {

    const location = useLocation();
    const [navType, setNavType] = useState("unknown");

    useEffect(() => {
        let type = "react_navigation"; // Default to React navigation

        // Detect Full Page Reload
        const entries = performance.getEntriesByType("navigation");
        if (entries.length > 0) {
            if (entries[0].type === "reload") {
                type = "reload";
            } else if (entries[0].type === "navigate") {
                type = "browser_navigation"; // This detects navigation when not in SPA mode
            }
        }

        // Fallback for older browsers
        if (performance.navigation?.type === 1) {
            type = "reload";
        }

        // Store the navigation type
        sessionStorage.setItem("lastNavType", type);
        setNavType(type);
    }, []);

    useEffect(() => {
        // If the sessionStorage doesn't indicate a reload, treat it as React Navigation
        if (sessionStorage.getItem("lastNavType") !== "reload") {
            setNavType("react_navigation");
            sessionStorage.setItem("lastNavType", "react_navigation");
        }
    }, [location]);

    return navType;
};






   