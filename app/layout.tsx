import type { Metadata } from "next";
import "./../styles.css";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Grace Path Church",
  description: "예닮교회 웹사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <footer className="ref-footer">
          <div className="ref-container">
            <h2 className="ref-footer-title">예담교회</h2>
            <p>주소: 안양시 동안구 관양동 관악대로 335</p>
            <p>전화: 031-425-9211</p>
            <p>예배시간: 주일 오전 11:00</p>
            <p className="ref-footer-copy">Copyright © Yedam Church. All Rights Reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
