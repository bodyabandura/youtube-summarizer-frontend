import Footer from "../components/Footer";
import "./globals.css";
import Navbar from "../components/Navbar";
import { GoogleTagManager } from "@next/third-parties/google";
// import { Html, Head, Main, NextScript } from "next/document";
export const metadata = {
  title: "youtube video summarizer",
  description: "best online youtube video summarizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <GoogleTagManager gtmId="GTM-PW5F742Z"></GoogleTagManager>
      <body className="dark:bg-zinc-950 dark:text-white">
        <div
          id="light-mode-bg"
          className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
        </div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
