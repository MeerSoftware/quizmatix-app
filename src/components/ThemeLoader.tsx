'use client';

import { ThemeGet } from "@/helpers/Theme";
import { useEffect } from "react";

export default function ThemeLoader() {
    useEffect(() => {
        document.documentElement.dataset.theme = ThemeGet();
    }, []);

    return <></>;
}