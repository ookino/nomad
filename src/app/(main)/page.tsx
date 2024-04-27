import { auth } from "@/lib/auth";
import Categories from "@/components/categories";

export default async function Home() {
  return (
    <div className="w-full flex-col gap-4">
      <Categories />
    </div>
  );
}
