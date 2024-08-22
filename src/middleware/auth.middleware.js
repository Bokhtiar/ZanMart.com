"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/utils/helper";


export default function isAuth(Component) {
   
    return function IsAuth(props) {


        const auth = getToken()

        // useLayoutEffect this hook roading then component pass
        useLayoutEffect(() => {
            if (!auth) {
                return redirect("/auth/login");
            }
        }, [auth]);


        if (!auth) {
            return null;
        }

        return <Component {...props} />;
    };
}