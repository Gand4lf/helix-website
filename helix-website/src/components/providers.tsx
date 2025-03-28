"use client"

import { ThemeProvider } from "@/components/theme-provider"
import "@/aws-config"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/amplify-functions";
import api from "@/app/api";
import { FlowgladProvider } from '@flowglad/nextjs'
import { AuthUser } from "@aws-amplify/auth/cognito";

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const fetchData = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
                console.log(user);
                if (!user) {
                    router.push("/");
                    return;
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                router.push("/");
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }
        };

        fetchData();

        intervalId = setInterval(fetchData, 20000);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [router]);
    console.log("FlowGlad User:", !!user);
    return (
        <ThemeProvider>
            <FlowgladProvider loadBilling={!!user} requestConfig={{
                headers: {
                    'x-flowglad-customer-id': user?.userId || '',
                    'x-flowglad-customer-email': user?.signInDetails?.loginId || '',
                    'x-flowglad-customer-name': user?.signInDetails?.loginId || '',
                }
            }}>
                {children}
            </FlowgladProvider>
        </ThemeProvider>
    )
} 