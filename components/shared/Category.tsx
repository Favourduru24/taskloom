'use client'
import { useState } from "react";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

interface taskStatusProps {
    id: number;
    status: string;
   }

const Category = () => {

    const router = useRouter()
    const [status, setStatus] = useState<string>('')

    const TaskStatus: taskStatusProps[] = [
        {
         id: 1,
         status: 'URGENT'
        },
        {
         id: 2,
         status: 'TODO'
        },
        {
         id: 3,
         status: 'INPROGRESS'
        },
        {
         id: 4,
         status: 'COMPLETED'
        },
        ]

    
        // const onSelectSubject = (status: string) => {
       
        //   }

        const handleCheck = (status: string) => {
              setStatus(status)

        //     let newUrl = ''
        //    if(status && status !== 'status') {
        //         newUrl = formUrlQuery({
        //           params: searchParams.toString(),
        //           key:'status',
        //           value: status
        //        })
        //    } else{
        //     newUrl = removeKeysFromQuery({
        //       params: searchParams.toString(),
        //       keysToRemove:['status'],
        //    })
        //    }
          
        //      router.push(newUrl, {scroll: false})
        }

  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-6"> {
        TaskStatus.map((task: taskStatusProps) => (
          <Card className="shadow-sm border ring-0 rounded-sm leading-none h-10 flex justify-center" key={task.id}>
           <div className="flex flex-row items-center justify-between px-2 ">
           <p className="text-sm leading-tight font-semibold text-black/60">{task.status}</p>
           <div className='bg-primary w-7 rounded-full flex items-center justify-center h-7 cursor-pointer'>
            <Checkbox className="rounded-full cursor-pointer" checked={task.status === status} onClick={() => handleCheck(task.status)}/>
        </div>
           </div>
       </Card>
        ))
       }</div>
  )
}

export default Category