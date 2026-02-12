import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const junicode = localFont({
  src: "../../public/fonts/junicode-regular.otf",
  variable: "--font-junicode",
});


export const metadata: Metadata = {
  title: "newtonma.dev",
  description: "newton's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${junicode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}