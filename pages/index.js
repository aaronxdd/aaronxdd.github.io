import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";

export default function Home() {
  return (
    <Layout>
      <SEO title="All posts" />
      <Bio className="my-14" />
      <ul>
        <li key={"web3"} className="mt-3">
          <Link href={"/web3"}>
            <a>web3初探</a>
          </Link>
        </li>
        <li key={"others"} className="mt-3">
          <Link href={"/others"}>
            <a>杂</a>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
