'use client'

import { formatDate } from "@/lib/utils";
import { deleteWorkspaceNotificationApi, getWorkspaceNotificationApi, markAllNotificationsAsReadApi } from "@/utility/api/notification";
import {
  Bell,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  CalendarDays,
  CheckSquare,
  MessageCircle,
  UserRound,
  Loader2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyOutline } from "./NotFound";

const notifications = [
  {
    id: 1,
    type: "reminder",
    title: "DAILY follow-up reminder",
    description:
      "It's been a while since your last conversation. Reach out to keep things moving.",
    date: "22 Aug, 10:37 AM",
    unread: true,
  },
  {
    id: 2,
    type: "reminder",
    title: "DAILY follow-up reminder",
    description:
      "It's been a while since your last conversation. Reach out to keep things moving.",
    date: "22 Aug, 09:36 AM",
    unread: true,
  },
  {
    id: 3,
    type: "reminder",
    title: "DAILY follow-up reminder",
    description:
      "It's been a while since your last conversation. Reach out to keep things moving.",
    date: "22 Aug, 08:35 AM",
    unread: true,
  },
  {
    id: 4,
    type: "reminder",
    title: "Thomas explicitly requested to be contacted in 3 days.",
    description:
      "It's been a while since your last conversation. Reach out to keep things moving.",
    date: "11 Aug, 03:20 AM",
    unread: true,
  },
  {
    id: 5,
    type: "task",
    title: "Task updated",
    description:
      '“Follow up with Sarah Johnson” was marked as completed.',
    date: "10 Aug, 11:15 AM",
    unread: false,
  },
  {
    id: 6,
    type: "calendar",
    title: "Task reminder",
    description:
      "You have 2 tasks due today. Don't forget to check them out.",
    date: "10 Aug, 09:00 AM",
    unread: false,
  },
  {
    id: 7,
    type: "task",
    title: "Task created",
    description:
      'New task “Send proposal to Babat Lambo” has been created.',
    date: "09 Aug, 04:45 PM",
    unread: false,
  },
];

function NotificationIcon({ type }: {type: string}) {
  const iconProps = {
    size: 20,
    strokeWidth: 2,
  };

  if (type === "task") {
    return <CheckSquare {...iconProps} />;
  }

  if (type === "calendar") {
    return <CalendarDays {...iconProps} />;
  }

  if (type === "message") {
    return <MessageCircle {...iconProps} />;
  }

  if (type === "contact") {
    return <UserRound {...iconProps} />;
  }

  return <Bell {...iconProps} />;
}

function NotificationItem({ notification, handleDeleteNotification, deletingId}: {notification: any, handleDeleteNotification:(notificationId: string) => Promise<void>, deletingId: string | null}) {
    
  return (
    <div
      className={`
        group relative flex items-center gap-4 rounded-xl border
        px-4 py-4 transition-all duration-200
        ${
          !notification.read
            ? "border-[#7C4DFF]/15 bg-[#7C4DFF]/2.5"
            : "border-zinc-200 bg-white"
        }
        hover:border-[#7C4DFF]/30 hover:shadow-sm
      `}
    >
      {/* Icon */}
      <div
        className="
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-xl bg-[#7C4DFF] text-white
        "
      >
        <NotificationIcon type={''} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!notification.read && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#7C4DFF]" />
          )}

          <h3
            className={`
              truncate text-[15px]
              ${
                !notification?.read
                  ? "font-semibold text-zinc-900"
                  : "font-medium text-zinc-800"
              }
            `}
          >
            {notification?.body}
          </h3>
        </div>

        <p className="mt-1 truncate text-sm text-zinc-500">
          {notification.title}
        </p>
      </div>

      {/* Date */}
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-xs font-medium text-zinc-400">
          {formatDate(notification.createdAt)}
        </span>

        {!notification.read && (
          <span className="h-2 w-2 rounded-full bg-[#7C4DFF]" />
        )}

        <button
         disabled={deletingId === notification.id}
          className="
            hidden rounded-lg p-1.5 text-zinc-400
            transition-colors
            hover:bg-zinc-100 hover:text-zinc-700
            group-hover:block
            cursor-pointer
          "
          onClick={() => handleDeleteNotification(notification.id)}
        >
          {deletingId === notification.id ? <Loader2 size={18} className="animate-spin"/> : <Trash2 size={18} className="text-destructive"/>}
        </button>
      </div>
    </div>
  );
}

const NotificationsPage = ({data}: {data: any}) =>  {

  const [deletingId, setDeletingId] = useState<string | null>(null)
    const [notifications, setNotifications] = useState<any[]>(data)

     const handleMarkAllAsRead = async () => {
        const { error } = await markAllNotificationsAsReadApi();

        if (error) {
          toast.error(error);
          return;
        }
      
         data.map((notification: any) => ({
            ...notification,
            read: true,
         }))
      };

      const handleDeleteNotification = async (notificationId: string) => {
        setDeletingId(notificationId)
      
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== notificationId)
        )
      
        try {
          await deleteWorkspaceNotificationApi(notificationId)
        } catch (error: any) {
          toast.error(error?.message || "Failed to delete notification")
      
          const refreshed = await getWorkspaceNotificationApi()
      
          if (refreshed?.data) {
            setNotifications(refreshed.data)
          }
        } finally {
          setDeletingId(null)
        }
      }

  return (
    <main className="min-h-screen bg-white px-6 py-10 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Notifications
              </h1>

              <span
                className="
                  rounded-full bg-[#7C4DFF]/10 px-2.5 py-1
                  text-xs font-semibold text-[#7C4DFF]
                "
              >
                {notifications?.length || 0} 
              </span>
            </div>

            <p className="mt-1.5 text-sm text-zinc-500">
              Stay updated with your latest activity and reminders.
            </p>
          </div>

          <button
           onClick={() => handleMarkAllAsRead()}
            className="
              inline-flex w-fit items-center gap-2 rounded-lg
              px-3 py-2 text-sm font-medium text-[#7C4DFF]
              transition-colors hover:bg-[#7C4DFF]/5 cursor-pointer
            "
          >
            <CheckCheck size={17} />
            Mark all as read
          </button>
        </div>

        {/* Notification list */}
        <section className="mt-8">
          {/* Today */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-sm font-semibold text-zinc-800">
                Today
              </h2>

              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <div className="space-y-2.5">
              {notifications?.length ? notifications.map((notification: any) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    handleDeleteNotification={handleDeleteNotification}
                    deletingId={deletingId}
                  />
                )) : <EmptyOutline title="No Notifications" description="You're all caught up! Nothing needs your attention right now." className="w-full"/>}
            </div>
          </div>

          {/* Earlier */}
          {/* <div className="mt-9">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="text-sm font-semibold text-zinc-800">
                Earlier
              </h2>

              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            <div className="space-y-2.5">
              {notifications
                .filter((notification) => notification.id > 4)
                .map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))}
            </div>
          </div> */}
        </section>

        {/* Pagination */}
        {notifications?.length && <div className="mt-8 flex items-center justify-center gap-2">
          <button
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-zinc-400 transition-colors
              hover:bg-zinc-100 hover:text-zinc-700
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              bg-[#7C4DFF] text-sm font-semibold text-white
              shadow-sm
            "
          >
            1
          </button>

          <button
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-sm font-medium text-zinc-600
              transition-colors hover:bg-zinc-100
            "
          >
            2
          </button>

          <button
            className="
              flex h-9 w-9 items-center justify-center rounded-lg
              text-zinc-400 transition-colors
              hover:bg-zinc-100 hover:text-zinc-700
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>}
      </div>
    </main>
  );
}

export default NotificationsPage;