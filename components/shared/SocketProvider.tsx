'use client';

import { useSocket } from '@/hooks/use-socket';
import { useEffect } from 'react';

export default function SocketProvider({
  token,
  children,
}: {
  token?: string;
  children: React.ReactNode;
}) {
  const connectSocket =
    useSocket((state) => state.connectSocket);

  useEffect(() => {
    if (!token) return;

    connectSocket(token);
  }, [token, connectSocket]);

  return <>{children}</>;
}