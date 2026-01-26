import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "@/app/globals.css";
import "@/app/laptopResponsive.css";
import "@/app/responsive.css";

import ClientWrapper from "./ClientWrapper";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata = {
  title: "Home — LWK Agency | Creative Digital Solutions",
  description: "LWK + PARTNERS is a leading architecture and design practice rooted in Hong Kong"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ClientWrapper>{children}</ClientWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
