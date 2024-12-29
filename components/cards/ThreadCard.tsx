import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
interface Props{
    id:string;
currentUserId:string;
parentId:string | null;
content:string;
author:{
    name:string;
    image:string;
    id:string;
}
comunity:{
    id:string;
    name:string;
    image:string;
} | null;
createdAt:string ;
comments:{
    author:{
        image:string;
    }
}[]
iscomment?:boolean
}
const ThreadCard = ({
    id,
currentUserId,
parentId,
content,
author,
comunity,
createdAt,
comments,
iscomment
}:Props) => {
   
  return (
    <article className={`flex w-full flex-col rounded-xl  ${iscomment ? 'px-0 xs:px-7 mt-5':'bg-dark-2 p-7'}`}>
        <div className='flex items-start justify-between'>
            <div className='flex w-full flex-1 flex-row gap-4'>
                <div className='flex flex-col items-center'>
                    <Link href={`/profile/${author.id}`} className='relative h-11 w-ll'>
                    <Image src={author.image} alt='profile image' width={54} height={54} className='cursor-pointer rounded-full'/>
                    </Link>
                    <div className='thread-card_bar'/>
                </div>
                <div className='flex w-full flex-col'>
                    <Link href={`/profile/${author.id}`} className='w-fit'>
                    <h4 className='cursor-pointer text-base-semibold text-light-1'> {author.name}</h4></Link>
                    <p className='mt-2 text-small-regular text-light-2'>
                        {content}
                    </p>
                    <div className={`${iscomment && 'mb-10'} mt-5 flex flex-col gap-3`}>
                        <div className='flex gap-3.5'>
                            <Image src="/assets/heart-gray.svg" alt='heart' width={24} height={24} className='cursor-pointer object-contain'/>
                            <Link href={`/thread/${id}`}>
                             <Image src="/assets/reply.svg" alt='reply' width={24} height={24} className='cursor-pointer object-contain'/>
                             </Link>
                              <Image src="/assets/repost.svg" alt='repost' width={24} height={24} className='cursor-pointer object-contain'/>
                               <Image src="/assets/share.svg" alt='share' width={24} height={24} className='cursor-pointer object-contain'/>
                        </div>
                        {/* {iscomment && comments.length >0 &&(
                            <Link href={``}>
                                <p className='mt-1 text-subtle-medium text-gray-1'>{comments.length} replies</p>
                            </Link>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
      
    </article>
  )
}

export default ThreadCard