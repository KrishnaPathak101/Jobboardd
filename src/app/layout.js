import localFont from "next/font/local";
import "./globals.css";
import Header from "./component/Header";
import Hero from "./component/Hero";
import { ClerkProvider } from "@clerk/nextjs";
import { StateProvider } from "./context/stateContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Job Board",
  description: "A job board app"
};

export default function RootLayout({ children }) {
  return (
    <StateProvider>
    <ClerkProvider>
      
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
    
    </ClerkProvider>
    </StateProvider>
  );
}
