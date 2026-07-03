import WorkspaceSocketProvider from "@/components/shared/WorkspaceSocketProvider";


export default async function WorkspaceLayout({
    children,
    params,
  }: {
    children: React.ReactNode;
    params: Promise<{ workspaceId: string }>;
  }) {
    
    const { workspaceId } = await params;
  
    return (
      <WorkspaceSocketProvider workspaceId={workspaceId}>
        {children}
      </WorkspaceSocketProvider>
    );
  }