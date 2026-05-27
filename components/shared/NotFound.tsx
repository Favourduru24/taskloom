'use client'
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CheckSquare } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export function EmptyOutline({title, description, buttonText}: {title: string, description?: string, buttonText: string}) {

    const params = useParams()
    
      const {workspaceId} = params
    
       const createTaskLink = `/workspace/${workspaceId}/task/create`
  return (
    <Empty className="border-2 border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CheckSquare />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
         {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Link href={createTaskLink}>
          
          {buttonText}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
