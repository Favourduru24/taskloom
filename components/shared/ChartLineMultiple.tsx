"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

export const description = "A multiple line chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--secondary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export const ChartLineMultiple = () =>  {

  interface taskChartProps {
     id: number
     timeline: string
     isOn: boolean
   }

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
     <Card className="shadow-sm border-none ring-0 max-h-72 ">
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
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className=" w-full h-48">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false}  className="first:fill-primary last:fill-primary" xlinkType="circle"/>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--secondary"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
