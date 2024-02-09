import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { Layout } from '../components';
import { StateContext } from '../context/StateContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Kart",
  description: "Your Favorite E-Com Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <Layout>
            <Toaster />
            {children}
          </Layout>
        </StateContext>
      </body>
    </html>
  );
}
