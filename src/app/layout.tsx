import "~/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "~/components/elements/Header/Header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "react-hot-toast";
import React from "react";
// import { Session } from "~/lib/session";
import SessionProvider from "~/lib/session";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen font-sans ${inter.variable}`}>
        <SessionProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header session={session} />
            <main className="container">
              {React.cloneElement(children as React.ReactElement, { session })}
            </main>
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
