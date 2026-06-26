'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Clock, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import { formatDate, getAvatar } from '@/lib/utils';
import { EmptyOutline } from './NotFound';
import { useSocket } from '@/hooks/use-socket';


type User = {
    id: string;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    password: string;
    createdAt: string;
    updatedAt: string;
  };

type Collaborator = {
    taskId: string;
    userId: string;
    user: User;
  };

interface TaskProps {
    id: string;
    title: string;
    description: string;
    priority: string;
    imageUrl?: string;
    category: string;
    endDate: string;
    updatedAt: string;
    timeline: number;
    collaborators: Collaborator[]
   }
     
const TaskList = ({initialTasks, workspaceId, error, }: {initialTasks: TaskProps[], workspaceId: string, error: any}) => {

    const [tasks, setTasks] = useState(initialTasks);

    const socket = useSocket(state => state.socket);

    useEffect(() => {
        if (!socket) return;
      
        const handleNewTask = (task: TaskProps) => {
          setTasks(prev => [task, ...prev]);
        };
      

          const handleUpdatedTask = (task: TaskProps) => {
            setTasks(prev => {
              // Update the task data in place
              const updatedList = prev.map(t => (t.id === task.id ? task : t));
              
              // Instantly sort by updatedAt descending so it matches your backend
              return updatedList.sort((a, b) => 
                new Date(b?.updatedAt).getTime() - new Date(a?.updatedAt).getTime() 
              );
            });
        };

        const handleDeleteTask = ({ taskId }: { taskId: string }) => {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
          );
        }
      
        socket.on("task:new", handleNewTask);
        socket.on("task:updated", handleUpdatedTask);
        socket.on("task:deleted", handleDeleteTask);
        
        return () => {
          socket.off("task:new", handleNewTask);
          socket.off("task:updated", handleUpdatedTask);
          socket.off("task:deleted", handleDeleteTask);
        };
      }, [socket]);

    function getPriorityColor(priority: string) {
        switch (priority) {
          case "URGENT":
            return {
              bg: "bg-red-100",
              text: "text-red-600",
            };
      
          case "INPROGRESS":
            return {
              bg: "bg-orange-100",
              text: "text-orange-600",
            };
      
          case "LOW":
            return {
              bg: "bg-yellow-100",
              text: "text-yellow-600",
            };
      
          case "TODO":
            return {
              bg: "bg-gray-100",
              text: "text-gray-600",
            };
      
          case "NORMAL":
            return {
              bg: "bg-blue-100",
              text: "text-blue-600",
            };
      
          case "COMPLETED":
            return {
              bg: "bg-green-100",
              text: "text-green-600",
            };
      
          default:
            return {
              bg: "bg-gray-100",
              text: "text-gray-600",
            };
        }
      }

  return (
    <>{tasks?.length > 0 ? tasks.map((task: TaskProps) => {
        const color = getPriorityColor(task.priority);

          return (
          <Link href={`/workspace/${workspaceId}/task/${task.id}`} key={task.id}>              
          <Card className="shadow-sm border ring-0 rounded-xl leading-none h-fit flex flex-col" >
              <div className="flex flex-row items-center justify-between px-2">
                 <Button className='bg-primary w-fit p-2 rounded-sm flex items-center justify-center h-8 cursor-pointer '>
                <p className='text-white-100 leading-tight text-[0.7rem]'>{task.category}</p>
               </Button>
               <EllipsisVertical className="size-5"/>
              </div>

             {task.imageUrl ?  <div className="w-full h-24 px-2">
            <div className="relative w-full h-full overflow-hidden rounded-t-md">
              <Image
                src={task.imageUrl}
                alt="task-img"
                fill
                className="object-cover"
              />
            </div>
          </div> : <div className="w-full h-24 overflow-hidden ring-2 ring-white shadow-sm px-2 rounded-md"> 
                    <Image
                     src={getAvatar(null, task.title)}
                     width={500}
                     height={500}
                     alt='task-img'
                     className="object-cover rounded-t-md" 
                      />
                  </div> }

              <div className="px-3 flex flex-col gap-1">
                <p className="text-lg leading-8 font-semibold capitalize">{task.title.slice(0, 20)}</p>
                <p className="text-[0.8rem] leading-6 break-all font-medium text-muted-foreground"> {task.description.slice(0, 30)}...</p>
                   <div className="flex items-center justify-between w-full">
                <Button className='w-24 p-2 rounded-sm flex items-center justify-center h-8 cursor-pointer border border-gray-200 mt-1' variant={'ghost'}>
                <p className='text-muted-foreground leading-tight font-medium text-[0.65rem]'>{formatDate(task.endDate)
                }</p>
               </Button>

                <Button className={`${color.bg} ${color.text} w-24 p-2 rounded-sm flex items-center justify-center h-8 cursor-pointer border border-gray-200 mt-1`} variant={'ghost'}>
                <p className=' leading-tight font-medium text-[0.7rem]'>{task.priority
                }</p>
               </Button>
                </div>
               <div className="flex justify-between items-center mt-2">
                 <div className="flex items-center -space-x-2"> 
                            {task.collaborators?.slice(0, 3).map((collab: Collaborator, index) => (
                              <div key={index} className="relative">
                                <div className="w-6 h-6 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                                  <Image
                                    src={getAvatar(collab.user?.avatarUrl, collab.user?.fullName)}
                                    width={32}
                                    height={32}
                                    alt='avatar'
                                    className="object-cover" 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                   <div className="flex items-center gap-x-2">
                      <Clock className="size-5 text-gray-500"/>
                      <p className="leading-6 break-all font-medium text-muted-foreground text-base">{Math.floor(Math.random() * 5)}/5</p>
                   </div>
                    </div>
                    </div>
              </Card>
            </Link>
             )
            }
              ) : <div className="col-span-full flex justify-center w-full">
                 <EmptyOutline
                  title="No tasks found"
                  description={error ? error : "You don’t have any tasks yet. Create your first task to get started."}
                  buttonText="Create Task"
                />
                </div>}</>
  )
}

export default TaskList