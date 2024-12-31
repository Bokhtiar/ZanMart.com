"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/helpers";

export default function isAuth(Component) {
    return function IsAuth(props) {
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const auth = getToken(); // Retrieve the authentication token

            if (!auth) {
                router.replace("/auth/log-in"); // Client-side redirect
            } else {
                setIsLoading(false); // Allow rendering the protected component
            }
        }, [router]);

        if (isLoading) {
            return <div>Loading...</div>; // Optional: Add a loading spinner or fallback UI
        }

        return <Component {...props} />;
    };
}
