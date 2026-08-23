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
import { Bell, CheckSquare } from "lucide-react"
import Link from "next/link"

export function EmptyOutline({title, description, buttonText, className, navigateLink}: {title: string, description?: string, buttonText?: string, className?: string, navigateLink?: string}) {

  return (
    <Empty className={cn("border-2 border-dashed", `${className}`)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {buttonText ? <CheckSquare /> : <Bell/>}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription className="max-w-xs break-all">
         {description}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {
          buttonText && <Button variant="outline" size="sm">
          <Link href={navigateLink ?? ''}>
          
          {buttonText}
          </Link>
        </Button>
        }
       
      </EmptyContent>
    </Empty>
  )
}
