import Link from "next/link";

import { Layout } from "@components/common";
import { getSortedPosts } from "@utils/posts";

export default function others({ posts }) {
  return (
    <Layout>
      <ul>
        {posts.map(({ frontmatter: { title }, slug }) => (
          <li key={slug} className="mt-3">
            <Link href={"/post/[slug]"} as={`/post/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
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
