import DashbaordSideBar from '@/components/DashbaordSideBar'
import TopViewedPost from '@/components/TopViewedPost'
import { prisma } from '@/lib/db/prisma'
import React from 'react'

const Dashboard = async() => {
  const userCount= await prisma.user.count()
  const posts=await prisma.post.findMany({
    orderBy:{views:"desc"},
    include:{author:true}
  })

  const totalPostsCount= posts.length
  const totalViews= posts.reduce((acc , post)=> acc + post.views , 0)
  return (
    <>

    <main>
      <div className='dashbord-info flex items-center flex-col lg:flex-row gap-3 justify-center my-5 text-white text-xl'>

        <div className='h-[200px] w-[200px] rounded-full flex items-center justify-center bg-purple-400'>
          <p>{userCount} Users</p>
        </div>
        <div className='h-[200px] w-[200px] rounded-full flex items-center justify-center bg-blue-950'>
          <p>{totalPostsCount} Posts</p>
        </div>
        <div className='h-[200px] w-[200px] rounded-full flex items-center justify-center bg-gray-800 shadow'>
          <p>{totalViews} Views</p>
        </div>

      </div>
      <div className='topViewedPosts'>
        <h3 className='text-center text-2xl p-3 bg-primary text-white'> Top Viewed Posts</h3>
        <TopViewedPost posts={posts}/>
      </div>

    </main>
       

    </>
  )
}

export default Dashboard