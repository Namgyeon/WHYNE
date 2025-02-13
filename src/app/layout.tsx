import localFont from "next/font/local";
import "@/styles/globals.css";
import { OAuthAppProvider } from "@/context/OAuthAppProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { metadata } from "@/app/metadata";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
      <body>
        <OAuthAppProvider>
          <AuthProvider>{children}</AuthProvider>
        </OAuthAppProvider>
      </body>
    </html>
  );
}
