import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <Link href="/employees" className='p-4 bg-primary hover:bg-primary/70 text-primary-foreground'>Employee Data Management</Link>
    </div>
  )
}

export default Home