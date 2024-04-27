import { auth } from "@/lib/auth";
import { FormInput } from "@/components/ui/custom-input";
import Categories from "@/components/categories";

export default async function Home() {
  const session = await auth();
  return (
    <div className="w-full flex-col gap-4">
      <Categories />

      {/* <div className=" pt-56">{JSON.stringify(session)}</div> */}
    </div>
  );
}
