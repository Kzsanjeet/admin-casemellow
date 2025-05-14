
import Loader from '@/components/loading/loader'
import ForgotPassword from '@/components/reset-password/ForgotPassword'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
        <Suspense fallback={<Loader/>}
      >
        <ForgotPassword/>
      </Suspense>
    </div>
  )
}

export default page
