import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "@/app/globals.css";
import "@/app/laptopResponsive.css";
import "@/app/responsive.css";
import ClientWrapper from "./ClientWrapper";
import ReduxProvider from "@/store/ReduxProvider";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/lib/ScrollToTop";
import { cookies } from "next/headers";

export const metadata = {
  title: "LWK + PARTNERS",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("site_lang")?.value || "en";
  const isChinese = lang === "ch";

  return (
    <html
      lang={isChinese ? "zh-Hans" : "en"}
      className={isChinese ? "chinese-site" : "english-site"}
      suppressHydrationWarning
    >
      <body>
        <ScrollToTop />

        <NextTopLoader color="#929292" height={6} showSpinner={false} speed={200} />

        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
