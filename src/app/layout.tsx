/* eslint-disable react-refresh/only-export-components */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next React",
  description: "building react with next",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
