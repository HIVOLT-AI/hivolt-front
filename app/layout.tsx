import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Web3Provider from "@/providers/Web3Provider";

export const metadata = {
  title: "HOMO MEMETUS",
  description: "HOMO MEMETUS Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-black">
      <body className="bg-black text-white">
        <Web3Provider>
          <div className="relative flex h-screen overflow-hidden bg-black">
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/background.mp4" type="video/mp4" />
            </video>
            <div className="relative z-10">
              <Sidebar />
            </div>
            <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto bg-transparent p-4">
                {children}
              </main>
            </div>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
