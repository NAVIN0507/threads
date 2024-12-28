"use client"
import React from 'react'
import {
  Form,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
  FormLabel,
 
} from "@/components/ui/form"
import z from "zod"
import { Button } from '../ui/button';

import { Textarea } from '../ui/textarea';
import { useForm } from 'react-hook-form';
import { commentValidation } from '@/lib/validations/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
interface Props{
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.action';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Comment = ({threadId , currentUserImg , currentUserId}:Props) => {
    const pathname = usePathname();
    const router = useRouter();
            const form = useForm({
                resolver:zodResolver(commentValidation),
                defaultValues: {
         thread:'',
       
            },
            });
            const onSubmit = async(values : z.infer<typeof commentValidation>)=>{
                await addCommentToThread(threadId , values.thread , JSON.parse(currentUserId) , pathname);
                form.reset();
            }
  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
         className='comment-form'>
             <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel >
            <Image src={currentUserImg} alt='Profile Image' width={48} height={48} className='rounded-full object-cover'/>
              </FormLabel>
              <FormControl className='border-none bg-transparent' >
                <Input type='text' placeholder='Comment...'  className='no-focus text-light-1 outline-none'{...field}/>
              </FormControl>
            
             
            </FormItem>
          )}
        />
        <Button type='submit' className='comment-form_btn mt-2'>Reply</Button>
            </form>
            </Form>
  )
}

export default Comment