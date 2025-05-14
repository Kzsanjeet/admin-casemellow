
import Loader from '@/components/loading/loader'
import ResetPassword from '@/components/reset-password/ResetPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <ResetPassword/>
      </Suspense>
    </div>
  )
}

export default page
