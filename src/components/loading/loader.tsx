import React from 'react'

const Loader = () => {
  return (
    <div className="flex w-full items-center justify-center min-h-screen">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div> */}
        <div className="h-12 w-12 rounded-full border-4 border-[hsla(180,2%,78%,0)] border-t-[#ff3c3c] animate-spin"></div>

    </div>
  )
}

export default Loader