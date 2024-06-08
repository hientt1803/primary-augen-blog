import { PageBreadcrumb } from "@/components/breadcrumb";
import { IPosts } from "@/types";
import { LeftSide } from "./_components/comments/left-side";
import { ListComment } from "./_components/comments/list-comment";
import { ShowDetailPostContent } from "./_components/detail/detail-post-content";
import { ListRelativePost } from "./_components/relative-posts/list-relative-post";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthDisplay } from "./_components/auth-display";

const fetchPosts = async (slug: string) => {
  const posts = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await posts.json();
  return data;
};

export const DetailPostPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post: IPosts = await fetchPosts(params.slug);

  return (
    <div className="mt-[50px]">
      {!post ? (
        <>
          <div className="flex flex-col gap-5 max-w-[45rem] mx-auto px-auto">
            <h2 className="scroll-m-20 text-3xl font-mono text-center font-semibold mt-16">
              This article not found! Please report this article or choose
              another post. Thanks you ❤️❤️❤️ !!!
            </h2>
            <div className="flex justify-center items-center gap-3">
              <Button variant={"default"}>Report this article</Button>
              <Button variant={"outline"} asChild>
                <Link href={"/posts"}>Comback</Link>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-8">
            <PageBreadcrumb segment="posts" page={`${post.slug}`} />
          </div>
          <h1 className="scroll-m-20 text-4xl font-mono text-start tracking-tight my-16">
            {post.title}
          </h1>

          {/* Author display */}
          <div className="d-flex justify-start gap-3 mb-10">
            <AuthDisplay />
          </div>

          {/* Detail content */}
          <div className="text-start">
            <ShowDetailPostContent markdown={post.desc} />
          </div>
          <hr />

          {/* Comment section */}
          <h2 className="scroll-m-20 text-3xl font-mono font-semibold text-start mt-16">
            Leave a comment if you like this article!
          </h2>
          <div className="comments mt-8 grid grid-flow-col-1 md:grid-cols-12 justify-center lg:justify-start gap-5 relative">
            <div className="col-span-1 md:col-span-6 lg:col-span-4">
              <LeftSide />
            </div>
            <div className="col-span-1 md:col-span-6 lg:col-span-8">
              <ListComment />
            </div>
          </div>
        </>
      )}

      {/* Related article */}
      <div className="relative-posts mt-28">
        <h2 className="scroll-m-20 text-3xl font-mono font-semibold text-start mt-16">
          Related articles you should check out!
        </h2>
        <ListRelativePost />
      </div>
    </div>
  );
};
