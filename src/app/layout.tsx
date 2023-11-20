import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "react-hot-toast";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EdgeStoreProvider>
            <main className="container">{children}</main>
          </EdgeStoreProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
