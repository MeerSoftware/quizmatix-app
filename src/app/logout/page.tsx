'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const { push } = useRouter();

    useEffect(() => {
        ['token', 'id'].forEach((k: string) => {
            localStorage.removeItem(k);
        })
        push('/');
    }, []);

    return (
        <span>Logging out...</span>
    );
}