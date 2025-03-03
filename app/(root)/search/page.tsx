import React from 'react'
import Image from 'next/image';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import { profileTabs } from '@/constants';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';
const page = async() => {
    const user = await currentUser();
        if(!user) return null;
        const userInfo = await fetchUser(user.id);
        if(!userInfo?.onboarded){
             redirect('/onboarding');
        }
        const result = await fetchUsers({
        userId:user.id,
        searchString:"",
        pagenumber:1,
        pagesize:25
        
        })
  return (
    <section>
        <h1 className='head-text'>Search Your Connections : This is Jira Test Mode 2</h1>
        {/* Search Bar */}
        <div className='mt-14 flex flex-col gap-9'>
            {result.users.length ===0 ?(<p className='no-result'>No Users</p>):(

                <>
                {result.users.map((person)=>(
                    <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl = {person.image}
                    personType = 'User'
                    />
                ))}
                </>
            )}
              </div>
    </section>
  )
}

export default page