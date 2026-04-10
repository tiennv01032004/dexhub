import { Metadata } from "next";

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "So sánh Pokemon",
  description:
    "Công cụ so sánh chỉ số giữa các Pokemon. Ai mạnh hơn? Ai nhanh hơn? Hãy cùng phân tích tại đây.",
  keywords: ["So sánh Pokemon", "Pokemon Stats Compare", "Kèo đấu Pokemon"],
};
