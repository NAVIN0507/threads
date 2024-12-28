import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchThreadbuId } from '@/lib/actions/thread.action';
import Comment from '@/components/forms/Comment';

const page = async({params} :{params:{id:string}}) => {
    if(!params.id) return null;
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) redirect("/onboarding ");
    const thread = await fetchThreadbuId(params.id);
  return (
   <section className='relative '>

    <div>
<ThreadCard key={thread._id} 
id={thread._id} 
currentUserId={user?.id ||""}
      parentId={thread.parentId}
      content ={thread.text}
      author={thread.author}
      comunity={thread.comunity}
      createdAt={thread.createdAt}
      comments={thread.comments}
      />
    </div>
    <div className='mt-7'>
      <Comment 
      threadId = {thread.id}
      currentUserImg ={user.imageUrl}
      currentUserId = {JSON.stringify(userInfo._id)}
      />
    </div>
    <div className='mt-10'>
      {thread.children.map((childItem : any)=>(
        <ThreadCard key={childItem._id} 
id={childItem._id} 
currentUserId={childItem._id ||""}
      parentId={childItem.parentId}
      content ={childItem.text}
      author={childItem.author}
      comunity={childItem.comunity}
      createdAt={childItem.createdAt}
      comments={childItem.comments}
      iscomment
      />
      ))}
    </div>
   </section>
  )
}

export default page