"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/ui/app-sidebar";
import LoginContext, { LoginUserContext } from "@/provider/LoginContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata is for SEO optimization - this is admin panel so not needed
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)  {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"
  const isForgotPasswordPage = pathname === "/forgot-password"
  const startPage = pathname === "/"
  const isVerifyPage = pathname === "/verify"
  const isChangePasswordPage = pathname === "/change-password"

return (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <LoginContext>
        <SidebarProvider>
          {!isLoginPage &&
              !isForgotPasswordPage &&
              !startPage &&
              !isVerifyPage &&
              !isChangePasswordPage && (
                  <>
                  <AppSidebar />
                  <SidebarTrigger />
                  </>
                  )}
        
          <Toaster position="top-center" />
            {children}
        </SidebarProvider>
      </LoginContext>
    </body>
  </html>
);
}
