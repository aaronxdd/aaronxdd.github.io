import Link from "next/link";

import { Layout, Bio, SEO } from "@components/common";
import { getSortedPosts } from "@utils/posts";

export default function Home({ posts }) {
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

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
