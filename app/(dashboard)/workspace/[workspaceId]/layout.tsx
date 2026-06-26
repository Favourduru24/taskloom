// app/(dashboard)/workspace/[workspaceId]/layout.tsx

import WorkspaceSocketProvider from "@/components/shared/WorkspaceSocketProvider";


export default async function WorkspaceLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ workspaceId: string }>;
  }) {

    console.log("Workspace params:", await params);
    
    const { workspaceId } = await params;
  
    return (
      <WorkspaceSocketProvider workspaceId={workspaceId}>
        {children}
      </WorkspaceSocketProvider>
    );
  }