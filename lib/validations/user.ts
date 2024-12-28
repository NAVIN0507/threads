import * as z from "zod";
export const userValidation = z.object({
    profile_photo:z.string().url().nonempty(),
    name:z.string().min(3).max(30),
    username:z.string().min(3).max(30),
    bio:z.string().min(3).max(1000),
})
export const threadValidation =  z.object({
    thread:z.string().min(3 , {
        message:"Thread must be at least 3 characters"
    }).max(2000),
    accountId:z.string()

})
export const commentValidation =  z.object({
    thread:z.string().min(3 , {
        message:"Comment must be at least 3 characters"
    }).max(200),
   
})