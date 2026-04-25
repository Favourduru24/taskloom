import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
          <main className="w-full h-fit flex m-auto m-w-7xl">
             {children}
          </main>
  )
}

export default AuthLayout
