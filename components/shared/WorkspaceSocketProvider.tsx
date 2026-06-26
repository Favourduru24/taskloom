'use client';

import { useSocket } from "@/hooks/use-socket";
import { useEffect } from "react";

type Props = {
  workspaceId: string;
  children: React.ReactNode;
};

export default function WorkspaceSocketProvider({
  workspaceId,
  children,
}: Props) {
  const socket = useSocket(state => state.socket);

  useEffect(() => {
    if (!socket) return;

    const joinWorkspace = () => {
      console.log("Joining workspace:", workspaceId);

      socket.emit("workspace:join", {
        workspaceId,
      });
    };

    if (socket.connected) {
      joinWorkspace();
    }

    socket.on("connect", joinWorkspace);

    return () => {
      socket.emit("workspace:leave", {
        workspaceId,
      });

      socket.off("connect", joinWorkspace);
    };
  }, [socket, workspaceId]);

  return <>{children}</>;
}