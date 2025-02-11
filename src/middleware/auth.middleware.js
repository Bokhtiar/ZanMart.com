"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/utils/helpers";

export default function isAuth(Component) {
  return function ProtectedPage(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.replace(`/auth/log-in?redirect=${router.asPath}`);
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    }, [router]);

    if (loading) return <div>Loading...</div>;
    return authenticated ? <Component {...props} /> : null;
  };
}
