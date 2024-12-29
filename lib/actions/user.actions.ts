"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
interface  Params{
    userId: string;
    username: string;
    name: string;
    image:string;
    bio: string;
    path:string
}
export async function updateUser({userId , username , name , image , bio , path}:Params): Promise<void>{
    connectToDB();
   try {
     await User.findOneAndUpdate(
        {id:userId},
        {
            username:username.toLowerCase(),
            name, 
            bio, 
            image , 
            onboarded:true
        },
        {upsert:true}
    );
    if(path === "/profile/edit"){
        revalidatePath(path);
    }
   } catch (error : any) {
    throw new Error(`Failed to connect / update user :${error.message}`)
   }
    
}
export async function fetchUser(userId : string){
    try {
        connectToDB(); 
        return await User.findOne({id:userId})
        // .populate({
        //     path:'communities',
        //     model: Community
        // })
    } catch (error : any) {
        throw new Error(`Failed to fetch user :${error.message}`)
    }
}
export async function fetchUserPosts(userId : string){
    try {
        connectToDB();
        //Todo popua== community
        const threads = await User.findOne({id:userId})
        .populate({
            path:'threads',
            model:Thread,
            populate:{
                path:'children',
                model:Thread,
                populate:{
                    path:'author',
                    model:User,
                    select:"name image id"
                }
            }
        })
        return threads

    } catch (error : any) {
        throw new Error(`Error while fetching posts : ${error.message}`)
    }
}
export async function fetchUsers({
    userId , 
    searchString = "" ,
     pagenumber = 1 ,
      pagesize = 20 
      , sortBy ="desc"
} :{
    userId : string;
    searchString : string;
    pagenumber : number;
    pagesize : number;
    sortBy?: SortOrder

}){
    try {
        connectToDB();
        const skipAmount = (pagenumber -1) * pagesize 
        const regex = new RegExp(searchString , "i");
        const query : FilterQuery<typeof User> = {
            id:{$ne: userId}
        }
        if(searchString.trim() !==''){
            query.$or =[
                {username:{$regex:regex}},
                {name:{$regex:regex}}
            ]
        }
        const sortOptions = {createdAt : sortBy};
        const userQuery = User.find(query)
        .sort(sortOptions)
        .skip(skipAmount)
        .limit(pagesize)
        const totalUserCount = await User.countDocuments(query);
        const users = await userQuery.exec();
        const isNext = totalUserCount > skipAmount + users.length;
        return {users, isNext};
    } catch (error : any) {
          throw new Error(`Error while fetching users: ${error.message}`)
    }
}
export async function getActivity(userId : string){
    try {
        connectToDB();
        //find all thread
        const userThreads =  await Thread.find({author : userId});
        const childThreads = userThreads.reduce((acc , userThread)=>{
            return acc.concat(userThread.children)
        } , [])
        const replies  =  await Thread.find({
            _id:{$in: childThreads},
            author:{$ne:userId}
        }).populate({
            path:'author',
            model:User,
            select:"name image _id"
        })
        return replies
    } catch (error:any) 
    {
    throw new Error(`Error fetching activity: ${error.message}`)    
    }
}