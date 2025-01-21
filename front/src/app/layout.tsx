"use client";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/chatbot/chatbot";
import { LogginProvider } from "@/context/logginContext";
import Providers from "./providers";
import Sidebar from "@/components/SideBar";
import ShowComponent from "@/components/ShowComponent/ShowComponent";
import ProvidersAuth from "@/context/providersAuth";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Providers>
          <ProvidersAuth>
            <LogginProvider>
              <Header />

              <main>{children}</main>

              <Chatbot />
              <Footer />
            </LogginProvider>
          </ProvidersAuth>
        </Providers>
      </body>
    </html>
  );
}
