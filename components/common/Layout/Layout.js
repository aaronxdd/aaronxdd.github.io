import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Switch from "../Switch";

const siteTitle = "Xu dongdong's blog";
export function Layout({ children }) {
  return (
    <div className="w-full min-h-screen dark:bg-gray-700 dark:text-white flex">
      <div className="max-w-screen-md px-4 py-12 mx-auto antialiased font-body flex flex-col flex-grow">
        <Header />
        <main className="flex-grow">{children}</main>
        <footer className="text-lg font-light mt-3">
          © {new Date().getFullYear()}{" "}
          <a href="https://github.com/aaronxdd">Dongdong Xu</a>, Built with{" "}
          <a href="https://nextjs.org/">Next.js</a>
          &#128293;, Deployed on{" "}
          <a href="https://pages.github.com/">GitHub Pages</a>
        </footer>
      </div>
    </div>
  );
}

const Header = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { pathname } = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const isRoot = pathname === "/";
  const isDarkMode = resolvedTheme === "dark";

  return (
    <header
      className={clsx("flex items-center justify-between ", {
        "mb-8": isRoot,
        "mb-2": !isRoot,
      })}
    >
      <div className={"max-w-lg"}>
        {isRoot ? <LargeTitle /> : <SmallTitle />}
      </div>
      {mounted && <Switch checked={isDarkMode} onChange={toggleDarkMode} />}
    </header>
  );
};

const LargeTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-3xl font-black leading-none text-black no-underline font-display hvr-grow-rotate",
          "sm:text-5xl",
          "dark:text-white"
        )}
      >
        {siteTitle}
      </a>
    </Link>
  </h1>
);

const SmallTitle = () => (
  <h1>
    <Link href="/">
      <a
        className={clsx(
          "text-2xl font-black text-black no-underline font-display",
          "dark:text-white"
        )}
      >
        {siteTitle}
      </a>
    </Link>
  </h1>
);
