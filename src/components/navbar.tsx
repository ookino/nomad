"use client";

import Container from "./container";
import Logo from "./logo";
import Search from "./search";
import UserMenu from "./user-menu";

const Navbar: React.FC = () => {
  return (
    <div className=" fixed z-50 w-full">
      <div className="border-b py-4">
        <Container>
          <div className="flex flex-row items-center  gap-4 md:gap-0 ">
            <div className="flex flex-1 justify-start">
              <Logo />
            </div>

            <div className="flex w-full flex-1 justify-center">
              <Search />
            </div>

            <div className="flex w-full flex-1 justify-end">
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
