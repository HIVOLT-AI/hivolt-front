import "@/app/styles/globals.css";
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import Web3Provider from "@/app/providers/Web3Provider";
import QueryProvider from "@/app/providers/QueryProvider";

export const metadata = {
  title: "HOMO MEMETUS",
  description: "HOMO MEMETUS Application",
  icons: {
    icon: "/fav_icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-black">
      <body className="bg-black text-white">
        <QueryProvider>
          <Web3Provider>
            <div className="fixed inset-0 min-h-screen overflow-hidden bg-black">
              <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/background.mp4" type="video/mp4" />
              </video>
              <div className="relative z-10 flex h-screen">
                <div className="bg-black/20 backdrop-blur-[2px]">
                  <Sidebar />
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="bg-black/30 backdrop-blur-sm">
                    <Header />
                  </div>
                  <main className="flex-1 overflow-auto bg-transparent p-4">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </Web3Provider>
        </QueryProvider>
      </body>
    </html>
  );
}
