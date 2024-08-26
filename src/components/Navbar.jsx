import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-background z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-background">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 justify-between items-center">
              <Link href={"/"} className="text-4xl font-bold text-blue-400">
               ShopperStop
              </Link>

              <Link href={'/sign-in'}>
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
