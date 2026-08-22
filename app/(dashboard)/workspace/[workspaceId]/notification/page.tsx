import NotificationsPage from '@/components/shared/NotificationPage'
import { getWorkspaceNotificationApi } from '@/utility/api/notification'
import React from 'react'

const Notification = async () => {

    const notification = await getWorkspaceNotificationApi()

      const {data} =  notification || {}

  return (
    <NotificationsPage data={data}/>
  )
}

export default Notification