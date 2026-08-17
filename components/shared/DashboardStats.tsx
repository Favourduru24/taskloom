import { ArrowDown, ArrowUp, LucideIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"

interface chartItemProps {
   statsLabel: string
   statsScore: number
   statsDescription: string
   statsIcon: any
   trendType: string
  }
const DashboardStats = ({statsLabel, statsDescription, statsScore, trendType}: chartItemProps) => {
    
  return (
    <Card className="shadow border ring-0 ">
                    <CardHeader>
                       <div className="flex items-center justify-cente">
                        
                      <CardTitle className="text-[1rem] leading-tight font-semibold text-gray-700 text-center">{statsLabel}</CardTitle>
                       </div>
                      
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-center w-full leading-none ">
                     <p className="text-4xl font-semibold">{statsScore}</p>
                    </CardContent>
                     <CardFooter className="flex items-center gap-2 bg-white  border-0">
                      <ArrowUp className="size-6 text-green-500" strokeWidth={1}/>
                      <p className="font-medium text-gray-500 text-sm">{statsDescription}</p>
                     </CardFooter>
                  </Card>
  )
}

export default DashboardStats