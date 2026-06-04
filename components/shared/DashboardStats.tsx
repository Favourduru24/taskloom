import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { cn } from "@/lib/utils"

interface chartItemProps {
   statsLabel: string
   statsScore: number
   statsDescription: string
   statsIcon: any
   trendType: string
  }
const DashboardStats = ({statsLabel, statsDescription, statsScore, statsIcon, trendType}: chartItemProps) => {
    
  return (
    <Card className="shadow-sm border-none ring-0 ">
                    <CardHeader className="border-b border-gray-200">
                       <div className="flex items-center justify-between">
                        <div className="w-10 h-10 bg-gray-50 flex items-center justify-center rounded-sm">
                         {statsIcon}

                        </div>
                      <CardTitle className="text-[1rem] leading-tight font-medium">{statsLabel}</CardTitle>
                          <p className="text-[1.2rem] leading-tight font-medium">{statsScore}</p>
                       </div>
                      {/* <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-between w-full leading-none">
                    <div>
                    {trendType === 'up' ? (
                      <TrendingUp size={100} strokeWidth={1} className="text-primary"/>
                    ) : (
                      <TrendingDown size={100} strokeWidth={1} className="text-red-500" />
                    )}
                  </div>

                     <div>
                        <p className="text-[1rem] leading-7 font-semibold text-gray-500"><span className={cn(trendType === 'up' ? 'text-green-500' : 'text-red-500')}>{statsDescription}</span> More <br/> from last week</p>
                     </div>
                    </CardContent>
                     
                  </Card>
  )
}

export default DashboardStats