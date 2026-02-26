import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", t_shirts: 222, pants: 150 },
  { date: "2024-04-02", t_shirts: 97, pants: 180 },
  { date: "2024-04-03", t_shirts: 167, pants: 120 },
  { date: "2024-04-04", t_shirts: 242, pants: 260 },
  { date: "2024-04-05", t_shirts: 373, pants: 290 },
  { date: "2024-04-06", t_shirts: 301, pants: 340 },
  { date: "2024-04-07", t_shirts: 245, pants: 180 },
  { date: "2024-04-08", t_shirts: 409, pants: 320 },
  { date: "2024-04-09", t_shirts: 59, pants: 110 },
  { date: "2024-04-10", t_shirts: 261, pants: 190 },
  { date: "2024-04-11", t_shirts: 327, pants: 350 },
  { date: "2024-04-12", t_shirts: 292, pants: 210 },
  { date: "2024-04-13", t_shirts: 342, pants: 380 },
  { date: "2024-04-14", t_shirts: 137, pants: 220 },
  { date: "2024-04-15", t_shirts: 120, pants: 170 },
  { date: "2024-04-16", t_shirts: 138, pants: 190 },
  { date: "2024-04-17", t_shirts: 446, pants: 360 },
  { date: "2024-04-18", t_shirts: 364, pants: 410 },
  { date: "2024-04-19", t_shirts: 243, pants: 180 },
  { date: "2024-04-20", t_shirts: 89, pants: 150 },
  { date: "2024-04-21", t_shirts: 137, pants: 200 },
  { date: "2024-04-22", t_shirts: 224, pants: 170 },
  { date: "2024-04-23", t_shirts: 138, pants: 230 },
  { date: "2024-04-24", t_shirts: 387, pants: 290 },
  { date: "2024-04-25", t_shirts: 215, pants: 250 },
  { date: "2024-04-26", t_shirts: 75, pants: 130 },
  { date: "2024-04-27", t_shirts: 383, pants: 420 },
  { date: "2024-04-28", t_shirts: 122, pants: 180 },
  { date: "2024-04-29", t_shirts: 315, pants: 240 },
  { date: "2024-04-30", t_shirts: 454, pants: 380 },
  { date: "2024-05-01", t_shirts: 165, pants: 220 },
  { date: "2024-05-02", t_shirts: 293, pants: 310 },
  { date: "2024-05-03", t_shirts: 247, pants: 190 },
  { date: "2024-05-04", t_shirts: 385, pants: 420 },
  { date: "2024-05-05", t_shirts: 481, pants: 390 },
  { date: "2024-05-06", t_shirts: 498, pants: 520 },
  { date: "2024-05-07", t_shirts: 388, pants: 300 },
  { date: "2024-05-08", t_shirts: 149, pants: 210 },
  { date: "2024-05-09", t_shirts: 227, pants: 180 },
  { date: "2024-05-10", t_shirts: 293, pants: 330 },
  { date: "2024-05-11", t_shirts: 335, pants: 270 },
  { date: "2024-05-12", t_shirts: 197, pants: 240 },
  { date: "2024-05-13", t_shirts: 197, pants: 160 },
  { date: "2024-05-14", t_shirts: 448, pants: 490 },
  { date: "2024-05-15", t_shirts: 473, pants: 380 },
  { date: "2024-05-16", t_shirts: 338, pants: 400 },
  { date: "2024-05-17", t_shirts: 499, pants: 420 },
  { date: "2024-05-18", t_shirts: 315, pants: 350 },
  { date: "2024-05-19", t_shirts: 235, pants: 180 },
  { date: "2024-05-20", t_shirts: 177, pants: 230 },
  { date: "2024-05-21", t_shirts: 82, pants: 140 },
  { date: "2024-05-22", t_shirts: 81, pants: 120 },
  { date: "2024-05-23", t_shirts: 252, pants: 290 },
  { date: "2024-05-24", t_shirts: 294, pants: 220 },
  { date: "2024-05-25", t_shirts: 201, pants: 250 },
  { date: "2024-05-26", t_shirts: 213, pants: 170 },
  { date: "2024-05-27", t_shirts: 420, pants: 460 },
  { date: "2024-05-28", t_shirts: 233, pants: 190 },
  { date: "2024-05-29", t_shirts: 78, pants: 130 },
  { date: "2024-05-30", t_shirts: 340, pants: 280 },
  { date: "2024-05-31", t_shirts: 178, pants: 230 },
  { date: "2024-06-01", t_shirts: 178, pants: 200 },
  { date: "2024-06-02", t_shirts: 470, pants: 410 },
  { date: "2024-06-03", t_shirts: 103, pants: 160 },
  { date: "2024-06-04", t_shirts: 439, pants: 380 },
  { date: "2024-06-05", t_shirts: 88, pants: 140 },
  { date: "2024-06-06", t_shirts: 294, pants: 250 },
  { date: "2024-06-07", t_shirts: 323, pants: 370 },
  { date: "2024-06-08", t_shirts: 385, pants: 320 },
  { date: "2024-06-09", t_shirts: 438, pants: 480 },
  { date: "2024-06-10", t_shirts: 155, pants: 200 },
  { date: "2024-06-11", t_shirts: 92, pants: 150 },
  { date: "2024-06-12", t_shirts: 492, pants: 420 },
  { date: "2024-06-13", t_shirts: 81, pants: 130 },
  { date: "2024-06-14", t_shirts: 426, pants: 380 },
  { date: "2024-06-15", t_shirts: 307, pants: 350 },
  { date: "2024-06-16", t_shirts: 371, pants: 310 },
  { date: "2024-06-17", t_shirts: 475, pants: 520 },
  { date: "2024-06-18", t_shirts: 107, pants: 170 },
  { date: "2024-06-19", t_shirts: 341, pants: 290 },
  { date: "2024-06-20", t_shirts: 408, pants: 450 },
  { date: "2024-06-21", t_shirts: 169, pants: 210 },
  { date: "2024-06-22", t_shirts: 317, pants: 270 },
  { date: "2024-06-23", t_shirts: 480, pants: 530 },
  { date: "2024-06-24", t_shirts: 132, pants: 180 },
  { date: "2024-06-25", t_shirts: 141, pants: 190 },
  { date: "2024-06-26", t_shirts: 434, pants: 380 },
  { date: "2024-06-27", t_shirts: 448, pants: 490 },
  { date: "2024-06-28", t_shirts: 149, pants: 200 },
  { date: "2024-06-29", t_shirts: 103, pants: 160 },
  { date: "2024-06-30", t_shirts: 446, pants: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  t_shirts: {
    label: "T-shirts",
    color: "var(--chart-1)",
  },
  pants: {
    label: "Pants",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillt_shirts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-t_shirts)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-t_shirts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillpants" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-pants)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-pants)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="t_shirts"
              type="natural"
              fill="url(#fillpants)"
              stroke="var(--color-pants)"
              stackId="a"
            />
            <Area
              dataKey="pants"
              type="natural"
              fill="url(#fillt_shirts)"
              stroke="var(--color-t_shirts)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
