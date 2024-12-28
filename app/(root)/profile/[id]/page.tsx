import React from 'react'

import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
const page = async({params}:{params:{id:string}}) => {
    const user = await currentUser();
        if(!user) return null;
        const userInfo = await fetchUser(params.id);
        if(!userInfo?.onboarded) return redirect('/onboarding');
  return (
    <section>
        <ProfileHeader/>
    </section>
  )
}

export default page