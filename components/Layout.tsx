import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 shadow">
        <Link href="/" passHref>
          <a href="#">
            <img
              className="w-24"
              src="https://media.dayoftheshirt.com/images/shirts/Mi3Hu/neatoshop_skull-nerd_1510229580.large.png"
              alt="cadaver exquisito"
            ></img>
          </a>
        </Link>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="p-4 bg-gray-400 text-center">
        <span>Made with love by </span>
        <Link href="http://twitter.com/jessyhalife" passHref>
          <a className="text-blue-500 hover:text-blue-800" href="#!">
            @jessyhalife
          </a>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
