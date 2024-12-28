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
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { threadValidation} from '@/lib/validations/user';
import z from "zod"
import { Button } from '../ui/button';

import { Textarea } from '../ui/textarea';

import { connectToDB } from '@/lib/mongoose';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

import { createThread } from '@/lib/actions/thread.action';
interface Props{
    user:{
        id:string;
        username:string;
        name:string;
        bio:string;
        image:string;
    },
    btnTitle : string
}
const PostThread = ({userId} :{userId:string}) => {
      const pathname = usePathname();
      const router = useRouter();
     

        const form = useForm({
            resolver:zodResolver(threadValidation),
            defaultValues: {
     thread:'',
     accountId:userId ||" "
        },
        });
        const onSubmit = async(values : z.infer<typeof threadValidation>)=>{
            try {
                 await createThread({
                text:values.thread,
            author : userId,
            communityId  : null,
            path:pathname,
            })
            router.push("/")
            } catch (error : any) {
                throw new Error(`Error creating thread ${error.message}`)
            }
           
        }
  return (
    <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
          className="flex mt-10 flex-col justify-start gap-10">
             <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex flex-col w-full gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
             Content
              </FormLabel>
              <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1' >
                <Textarea rows={15} {...field}/>
              </FormControl>
            
             
            </FormItem>
          )}
        />
        <Button type='submit' className='bg-primary-500'>Post Thread</Button>
            </form>
            </Form>
  )
}

export default PostThread