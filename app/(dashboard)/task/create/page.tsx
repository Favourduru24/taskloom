"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { myTeam, myTeamProps } from "@/constants"
import { getAvatar } from "@/lib/utils"
import { AlertTriangle, ArrowDown, Check, Edit, Trash2, UploadCloud, UserPlus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const CreateTask = () => {

  const [position, setPosition] = useState("bottom")

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col">
       <p className="text-2xl leading-tight font-bold">Task View</p>
          <div className="flex w-full h-full py-4 gap-10">

         <div className="max-w-md w-full h-full flex flex-col gap-4">

           <Card className="rounded-lg ring-0 border">
              <div className="flex items-center justify-between px-2">
                <p className="text-xl leading-tight font-semibold">Design System Creation</p>

                <Edit className="size-6 text-gray-500"/>
              </div>
           </Card>

           <Card className="rounded-lg ring-0 border">
              <div className="flex flex-col px-2">
                <p className="text-xl leading-tight font-semibold">Description</p>
                 <textarea className="shadow h-32 w-full mt-4 outline-none p-2 rounded-lg placeholder:leading-tight placeholder:text-gray-500 placeholder:text-[0.9rem]" placeholder="Describe your task here.">

                 </textarea>
              </div>
           </Card>

           
           <Card className="rounded-lg ring-0 border">
              <div className="flex flex-col px-2">
                <p className="text-xl leading-tight font-semibold">Attachment</p>
                 <div className="ring ring-secondary h-32 w-full mt-4 outline-none p-2 border rounded-lg flex flex-col items-center justify-center gap-2" >
                      <UploadCloud className="size-6 text-gray-500"/>
                      <p className="text-gray-500 text-center text-[1rem] leading-6">Drag and Drop files here or Upload <br/>
                       Maximum file must be 100mb
                      </p>
                 </div>
              </div>
           </Card>
           
           <Card className="rounded-lg ring-0 border">
              <div className="flex flex-col px-2 gap-2">
                <p className="text-xl leading-tight font-semibold">Collaborators</p>

                 <div className="flex items-center justify-between w-full"> 
                     <div className="flex items-center gap-2">
                    {myTeam.slice(0, 3).map((team: myTeamProps) => (
                       <div key={team.id} >
                      <div className="w-10 h-10 rounded-full shadow-sm "> 
                        <Image
                        src={getAvatar(null, team.email)}
                        width={42}
                        height={42}
                        alt={team.name}
                        className="object-cover rounded-full" 
                        />
                        </div>
                        </div>
                        ))}
                        </div>
                                
                        <div className="w-10 h-10 rounded-full  shadow-sm flex items-center justify-center bg-primary">
                     <UserPlus className="size-5 text-white-100 cursor-pointer z-20"/>
                     </div>
                  </div>
              </div>
           </Card>
        </div>  

         <div className="max-w-sm w-full h-full flex flex-col gap-4">
            
             <Card className="rounded-lg ring-0 border w-full">
              <div className="flex flex-col px-2 gap-2 cursor-pointer">
                <p className="text-xl leading-tight font-semibold">Status</p>
                 <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <div className="flex items-center justify-between">
                    <p className="text-[1rem] text-gray-500 leading-tight">Select Status</p>
                    <ArrowDown className="size-5 text-gray-500"/>
                   </div>
                   
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-5">
                  <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="top">To Do</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">Completed</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">In Progress</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
               </div>
              </Card>

             <Card className="rounded-lg ring-0 border">
              <div className="flex flex-col px-2 gap-2 cursor-pointer">
                <p className="text-xl leading-tight font-semibold">Status</p>
                 <div className="flex items-center justify-between">
                   <p className="text-[1rem] text-gray-500 leading-tight">In Progress</p>
                   <ArrowDown className="size-5 text-gray-500"/>
                 </div>
              </div>
           </Card>

             <Card className="rounded-lg ring-0 border">

               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                 <div className="flex flex-col px-2 gap-2 cursor-pointer">
                <p className="text-xl leading-tight font-semibold">Category</p>
                 <div className="flex items-center justify-between">
                   <p className="text-[1rem] text-gray-500 leading-tight">Select a Category</p>
                   <ArrowDown className="size-5 text-gray-500"/>
                 </div>
              </div>
                   
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-5">
                  <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="top">Development</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">Designs</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">Research</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              
           </Card>

             <Card className="rounded-lg ring-0 border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-col px-2 gap-2 cursor-pointer">
                <p className="text-xl leading-tight font-semibold">Priority</p>
                 <div className="flex items-center justify-between">
                   <p className="text-[1rem] text-gray-500 leading-tight">Select Priority</p>
                   <ArrowDown className="size-5 text-gray-500"/>
                 </div>
              </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-5">
                  <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="top">Urgent</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">Normal</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">Low</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
             
           </Card>

               <div className="w-full flex flex-col gap-4 mt-4">
           <Button className="w-full flex items-center h-12">
             <Check className="text-white-100 size-5"/>
            <p className="text-[1rem] leading-tight text-white-100">Mark as Done</p>  
           </Button>

           <Button className="w-full flex items-center h-12 bg-amber-500" variant={'default'}>
             <AlertTriangle className="text-white-100 size-5"/>
            <p className="text-[1rem] leading-tight text-white-100">Raise Ticket</p>  
           </Button>

           <Button className="w-full flex items-center h-12 ring-2 ring-red-500" variant={'ghost'}>
             <Trash2 className="text-destructive size-5"/>
            <p className="text-[1rem] leading-tight text-red-500">Delete Task</p>  
           </Button>
               </div>
        </div>  
          </div>
       </div>
    </div>
  )
}

export default CreateTask
