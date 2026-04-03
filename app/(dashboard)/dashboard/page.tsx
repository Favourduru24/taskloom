import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { Calendar, FilePlus, Layers, LucideIcon, Plus, Star, TrendingDown, TrendingUp } from "lucide-react"

const Home = () => {

   interface chartItemProps {
     id: number
    chartLabel: string
    chartScore: number
    chartDescription: string
    chartIcon: LucideIcon
    trendType: string
   }

   interface taskChartProps {
     id: number
     timeline: string
     isOn: boolean
   }
   
  const chartItems: chartItemProps[] = [
    {
      id: 1,
      chartLabel: "Task Completed",
      chartScore: 10,
      chartDescription: "10+",
      chartIcon: Star,
      trendType: 'up'
    },
    {
      id: 2,
      chartLabel: "New Task",
      chartScore: 10,
      chartDescription: "10+",
      chartIcon: FilePlus,
      trendType: 'down'
    },
    {
      id: 3,
      chartLabel: "Project Done",
      chartScore: 10,
      chartDescription: "08+",
      chartIcon: Layers,
      trendType: 'up'
    },
  ]

  const taskChartItem: taskChartProps[] = [
    {
      id: 1,
      timeline: 'Daily',
      isOn: true
    },
    {
      id: 2,
      timeline: 'Weekly',
      isOn: false
    },
    {
      id: 3,
      timeline: 'Monthly',
      isOn: false
    }
  ]

  return (
    <div className="w-full flex gap-4 h-full ">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-col gap-4">
           <div className="grid gap-x-8 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {
                chartItems.map((item: chartItemProps) => {
                  const Icons = item.chartIcon
                  
                  return (
                    <Card className="shadow-sm border-none ring-0" key={item.id}>
                    <CardHeader className="border-b border-gray-200">
                       <div className="flex items-center justify-between">
                        <Icons className="size-5 text-primary"/>
                      <CardTitle className="text-[0.9rem] leading-tight font-medium">{item.chartLabel}</CardTitle>
                          <p className="text-[0.9rem] leading-tight font-medium">{item.chartScore}</p>
                       </div>
                      {/* <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-between w-full h-ful leading-none">
                    <div>
                    {item.trendType === 'up' ? (
                      <TrendingUp size={100} strokeWidth={1} className="text-primary"/>
                    ) : (
                      <TrendingDown size={100} strokeWidth={1} className="text-red-500" />
                    )}
                  </div>

                     <div>
                        <p className="text-[1rem] leading-7 font-semibold text-gray-500"><span className={cn(item.trendType === 'up' ? 'text-green-500' : 'text-red-500')}>{item.chartDescription}</span> More <br/> from last week</p>
                     </div>
                    </CardContent>
                     
                  </Card>
                  )
                })
              }
              </div>

              <div className="bg-white-100 w-full h-64 rounded-lg">
                 <Card className="shadow-sm border-none ring-0 h-full">
                    <CardHeader className="border-b border-gray-200">
                       <div className="flex items-center justify-between">
                      <CardTitle className="text-[1rem] leading-tight font-medium">Task Done</CardTitle>
                          

                          <ul className="flex items-center gap-4">
                              {taskChartItem.map((task) => (
                                <li key={task.id} className={cn(task.isOn ? 'border-b-2 border-primary' : '', "text-[1rem] leading-tight font-semibold")}>
                                   {task.timeline}
                                </li>
                              ))}
                          </ul>
                       </div>
                      {/* <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-between w-full h-ful leading-none">
                    
                    </CardContent>
                     
                  </Card>
              </div>
       </div>

        <div className="w-72 h-full bg-white-100 flex flex-col px-2 py-4 gap-2">
              <div className="flex items-center justify-between">
                <p className="text-[1.2rem] leading-tight font-semibold">Today Schedule's</p>
                <Calendar className="size-5 text-gray-500" strokeWidth={1.5}/>
              </div>

              <div className="flex items-center justify-between text-blue-500">
                  <p className="text-sm leading-tight font-medium">10+ Member's active today</p>
                  <Button className="flex items-center text-blue-500" variant={'ghost'}>
                      <Plus/>
                      <p>Invite</p>
                  </Button>
              </div>
        </div>
    </div>
  )
}

export default Home
