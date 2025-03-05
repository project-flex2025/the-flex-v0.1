import { ReactNode } from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient"; // Client-side Bootstrap
import JQueryLoader from "./components/JQueryLoader"; // Client-side jQuery Loader
import ClientLayout from "./components/ClientLayout"; // NEW client component

interface RootLayoutProps {
  children: ReactNode;
}

const poppins = Poppins({
  subsets: ['latin'], // Use 'latin' or add more subsets if needed
  weight: ['400', '600', '700'], // Add the font weights you need
  display: 'swap',
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <BootstrapClient />
        <JQueryLoader />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
