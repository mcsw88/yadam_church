import type { Metadata, Viewport } from "next";
import "./../styles.css";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Grace Path Church",
  description: "예닮교회 웹사이트",
};

/* 없으면 iOS·Android가 레이아웃을 ~980px로 잡아 미디어쿼리·헤더가 “PC처럼” 보일 수 있음 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const deploySha = process.env.VERCEL_GIT_COMMIT_SHA ?? "";
  const deployUrl = process.env.VERCEL_URL ?? "";

  return (
    <html lang="ko" data-deploy-sha={deploySha || undefined} data-deploy-host={deployUrl || undefined}>
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
