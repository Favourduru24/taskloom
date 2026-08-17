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
import { cn } from "@/lib/utils"
import { CheckSquare } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export function EmptyOutline({title, description, buttonText, className}: {title: string, description?: string, buttonText: string, className?: string}) {

    const params = useParams()
    
      const {workspaceId} = params
    
       const createTaskLink = `/workspace/${workspaceId}/task/create`
  return (
    <Empty className={cn("border-2 border-dashed", `${className}`)}>
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
