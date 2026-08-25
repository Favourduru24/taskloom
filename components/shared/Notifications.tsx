'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Bell } from 'lucide-react'
import {formatNotificationDate } from '@/lib/utils';
import Link from 'next/link';
import { EmptyOutline } from './NotFound';

interface Notification {
    id: string;
    title: string;
    body: string;
    createdAt: string;
    read?: boolean
  }
const Notifications = ({workspaceId, notifications, handleMarkAllAsRead}: {workspaceId: any, notifications: Notification[], handleMarkAllAsRead: () => Promise<void>}) => {

    const unreadCount = notifications.filter(
        notification => !notification.read
      ).length;
    
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
           
    <div className="relative cursor-pointer">
  {/* Ripple */}
  {unreadCount > 0 && (
    <span className="absolute inset-0 rounded-full border-2 border-[#7850CD] animate-ping opacity-30" />
  )}

  {/* Bell */}
  <div
    className={`relative h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 ${
      unreadCount > 0
        ? "border border-[#7850CD] bg-[#7850CD]/10 shadow-[0_0_15px_rgba(120,80,205,0.35)]"
        : "border bg-white"
    }`}
  >
    <Bell
      className={`size-5 ${
        unreadCount > 0 ? "text-[#7850CD]" : "text-muted-foreground"
      }`}
      
    />
  </div>

  {/* Badge */}
  {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#7850CD] text-white text-[10px] font-semibold flex items-center justify-center ring-2 ring-white">
      {unreadCount > 99 ? "99+" : unreadCount}
    </span>
  )}
</div>
</DropdownMenuTrigger>

                  <DropdownMenuContent className='mt-5 cursor-pointer border max-w-120 w-full mr-5 flex flex-col gap-3 py-4'>
                     <p className='text-2xl text-gray-800 font-semibold px-2'>Notifications</p>
                    {
                      notifications?.length ? notifications?.slice(0, 4)?.map((notification: Notification) => (
                        
                       <DropdownMenuItem key={notification.id} className='flex flex-col gap-2 cursor-pointer'>
                        <div className='flex items-start gap-4 px-1 py-1'>

                      <div className='w-11 h-11 bg-primary rounded-md flex items-center justify-center shrink-0'>
                        <Bell className="size-5 text-[#7850CD text-white"/>
                      </div>
                          
                          <div className='flex flex-col gap-1'>
                         <p className='leading-6 truncate text-black font-semibold text-sm'>{notification.body}</p>
                         <p className='leading-6 truncate text-muted-foreground max-w-xs'>{notification.title}</p>
                        </div> 
                           <p className='text-muted-foreground text-xs font-semiold sm:shrink-0'>{formatNotificationDate(notification.createdAt)}</p>
                          </div>
                     
                    </DropdownMenuItem>
                      )) : <EmptyOutline title="No Notifications" description="You're all caught up! Nothing needs your attention right now." className="w-full border-none"/>
                    }
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem className='group' asChild>
                      <Link href={`/workspace/${workspaceId}/notification`}>
                      <div className='text-white  bg-primary px-2 py-3 flex items-center justify-center gap-1 cursor-pointer w-full text-sm rounded-md group' onClick={() => handleMarkAllAsRead()}>
                         <p className='group-hover:text-white'>View All</p>
                      </div>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>

                </DropdownMenu>
  )
}

export default Notifications