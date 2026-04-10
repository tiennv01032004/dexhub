import { Metadata } from "next";

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}

export const metadata: Metadata = {
  title: "Pokemon Yêu Thích",
  description:
    "Danh sách những Pokemon bạn đã yêu thích và thu phục. Xây dựng đội hình mạnh nhất của riêng bạn!",
};
