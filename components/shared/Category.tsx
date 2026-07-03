'use client'
import { useState } from "react";
// import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {useRouter, useSearchParams} from 'next/navigation'
import { formUrlQuery, getAvatar, removeKeysFromQuery } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";


interface taskPriorityProps {
    id: number;
    priority: string;
   }

const Category = () => {

    const [priority, setPriority] = useState('')
    const searchParams = useSearchParams()
    const router = useRouter()

    const TaskPriority: taskPriorityProps[] = [
      {
        id: 1,
        priority: 'All'
       },
        {
         id: 2,
         priority: 'URGENT'
        },
        {
         id: 3,
         priority: 'TODO'
        },
        {
         id: 4,
         priority: 'INPROGRESS'
        },
        {
         id: 5,
         priority: 'COMPLETED'
        },
        ]
        
        const onSelectPriority = (priority: string) => {
            setPriority(priority)

          let newUrl = ''
         if(priority && priority !== 'All') {
              newUrl = formUrlQuery({
                params: searchParams.toString(),
                key:'priority',
                value: priority
             })
         } else{
          newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove:['priority'],
         })
         }
        
           router.push(newUrl, {scroll: false})
        }
         

  return (
    <div className='flex  gap-2 w-full md:max-w-72 ring-2 ring-gray-50 p-1 rounded-md shaddow-sm'>
    <DropdownMenu>
    <DropdownMenuTrigger asChild>

    <div className='flex items-start gap-x-3 justify-between cursor-pointer w-full '>
     
      <p className="text-muted-foreground text-lg font-semibold">{priority ? priority : 'Priority'}</p>

    <svg
    className={`w-5 h-5 transition-transform duration-200 mt-1`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    >
    <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1}
    d="M19 9l-7 7-7-7"
    />
    </svg>
    </div>

    </DropdownMenuTrigger>
    <DropdownMenuContent className='mt-1 cursor-pointer'>
    {
    TaskPriority.map((priority: taskPriorityProps) => (
    <DropdownMenuItem key={priority.id} onClick={() => onSelectPriority(priority.priority)} className='cursor-pointer text-muted-foreground'>
    {priority.priority}
    </DropdownMenuItem>
    ))
    }

    </DropdownMenuContent>
    </DropdownMenu>
</div>
  )
}

export default Category