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

              {/* <div className="flex flex-1"> */}
              <div>
                <ShowComponent>
                  <Sidebar />
                </ShowComponent>

                {/* <main className="flex-1 p-4 overflow-y-auto ml-5"> */}
                <main>
                  {children}
                </main>
              </div>

              <Chatbot />
              <Footer />
            </LogginProvider>
          </ProvidersAuth>
        </Providers>
      </body>
    </html>
  );
}
