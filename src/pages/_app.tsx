import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ClientProvider } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientProvider>
      <Component {...pageProps} />;
    </ClientProvider>
  );
}
