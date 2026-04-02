import React from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
        <body>
          <main>
             {children}
          </main>
        </body>
  )
}

export default AuthLayout
