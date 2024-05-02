"use client";

import Categories from "./categories";
import Container from "./container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

const Navbar: React.FC = () => {
  return (
    <div className=" fixed z-50 w-full bg-background">
      <div className="space-y-4 border-b py-4 md:space-y-8">
        <Container>
          <div className="hidden w-full flex-row items-center justify-between md:flex md:gap-0  ">
            <div className="flex flex-1  justify-start">
              <Logo />
            </div>

            <div className="flex w-full flex-1 justify-center">
              <Search />
            </div>

            <div className="flex w-full  flex-1 justify-end">
              <UserMenu />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4 md:hidden">
            <div></div>
            <div className="flex w-full justify-between">
              <Logo />
              <UserMenu />
            </div>
            <div className="flex w-full items-center justify-center">
              <Search />
            </div>
          </div>
        </Container>
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
