 "use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAvatar } from "@/lib/utils"
import Image from "next/image"
import { Checkbox } from "../ui/checkbox"


export function DataTable() {

    const data = [
        {
            label: '',
            id: 1,

        },
        {
            label: 'Name',
            id: 7,

        },
        {
            label: 'Status',
            id: 3,

        },
        {
            label: 'Last Contact',
            id: 4,

        },
        {
            label: 'Next Follow-up',
            id: 5,

        },
        {
            label: 'Task',
            id: 6,

        }
    ]

  return (
    <section className="overflow-x-auto px-5 sm:px-8 2xl:px-0 max-w-8xl bg-primary/10 rounded-md">
        <table className="w-full border-collapse border-t p-1 ">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
                      <th className="min-w-[20px] py-3 text-left">
                        <Checkbox className="text-green-500"/>
                      </th>

            <th className="min-w-[200px] flex-1 py-2 pr-4 text-left">Username</th>
            <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">Name</th>
              <th className="min-w-[150px] py-3 text-left">Last Contacted</th>
              <th className="min-w-[100px] py-3 text-left">Next Follow-up</th>
              <th className="min-w-[100px] py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-2 text-center text-gray-500">
                  No  Users found.
                  <p className="font-medium text-red-400 text-sm">{'error'}</p>
                </td>
              </tr>
            ) : (
              <>
                {data &&
                  data.map((user) => (
                    <tr
                      key={user.id}
                      className=" border-b hover:text-white cursor-pointer hover:bg-primary-100"
                      style={{ boxSizing: 'border-box' }}>
                      <td className="min-w-[30px] py-2 text-sm font-semibold">
                        <Checkbox/>
                      </td>

                      <td className="min-w-[100px] flex-1 py-2 pr-4 flex items-center gap-1 text-sm font-semibold">
                        <Image
                                                                    src={'/images/user1.png'}
                                                                    width={32}
                                                                    height={32}
                                                                    alt={'profile'}
                                                                    className="object-center object-cover size-8 rounded-full" 
                                                                  />
                        {'Duru Pristine'}
                 
                      </td>
                      {/* <td className="min-w-[100px] py-2 text-sm font-semibold">Client</td> */}
                      <td className="min-w-[100px] py-2 text-sm font-semibold">Client</td>
                      <td className="min-w-[110px] py-2 truncate px-2 text-xs font-semibold">3rd Mar 2026</td>
                      <td className="min-w-[100px] py-2 truncate text-xs font-semibold">
                        {'14th Aug 2026'}
                      </td>
                      {/* <td className="min-w-[100px] py-2 font-semibold">1</td> */}

                      <td className={`min-w-[100px] py-2 text-right font-semibold text-sm font-semibold ${user.label === 'user' ? "text-pink-500"  : user.label === 'admin' ? 'text-purple-500' : "text-gray-500"}`}>
                        <p className={`${user.label === 'agent' ? "text-pink-500"  : user.label === 'user' ? 'text-gray-500' : "text-gray-500"}`}>Admin</p>
                      </td>                        
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
  )
}