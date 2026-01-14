import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Net Worth",
  description: "Track your financial health",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/*header*/}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/* footer */}
          <footer className="bg-white py-12 ">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p className="text-sm mb-2">
                Made by {""}
                <a href="https://yourwebsite.com" className=" hover:text-[#CBA135] transition-colors duration-300">SanjaySriJr⚡</a>
              </p>
              <p>All rights reserved © {new Date().getFullYear()}</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
