import Categories from "@/components/categories";
import Navbar from "@/components/navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Navbar />

      <div className="pb-20 pt-28">{children}</div>
    </div>
  );
}
