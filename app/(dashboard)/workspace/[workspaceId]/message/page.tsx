
// const Message = () => {
//   return (
//     <div className="text-purple-500 w-full flex justify-center h-full">
//        <div className="w-full px-2 max-w-6xl">
//         Message
//        </div>
//     </div>
//   )
// }

// export default Message


import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get('accessToken')?.value

  return <div>{accessToken} Helo</div>
}