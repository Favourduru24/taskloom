import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
        <body>
          <main className="w-full h-screen flex m-auto m-w-7xl">
             {children}
          </main>
        </body>
  )
}

export default AuthLayout
