
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThread } from "@/lib/actions/thread.action";
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
const result = await fetchThread(1 , 30);
const user = await currentUser();
  return (
    <>
<h1 className="head-text text-left">Home</h1>
<section className="mt-9 flex flex-col gap-10">
  {result.posts.length ===0 ?(
    <p className="no-result">No threads found</p>
  ):(
    <>
    {result.posts.map((post)=>(
      <ThreadCard key={post._id} id={post._id} currentUserId={user?.id ||""}
      parentId={post.parentId}
      content ={post.text}
      author={post.author}
      comunity={post.comunity}
      createdAt={post.createdAt}
      comments={post.comments}
      />
    ))}
    </>
  )}
</section>
</>  );
}
