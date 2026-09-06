import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {  CardContent } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Review } from "@/Types/review"

export const description = "A product rating chart"

const chartConfig = {
  count: {
    label: "Calificaciones",
  },
  "5-stars": {
    label: "5 Estrellas",
    color: "var(--chart-1)",
  },
  "4-stars": {
    label: "4 Estrellas",
    color: "var(--chart-2)",
  },
  "3-stars": {
    label: "3 Estrellas",
    color: "var(--chart-3)",
  },
  "2-stars": {
    label: "2 Estrellas",
    color: "var(--chart-4)",
  },
  "1-star": {
    label: "1 Estrella",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export function ProductRating({ reviews }: { reviews: Review[] }) {
  const chartData = [5, 4, 3, 2, 1].map((stars) => ({
    rating: stars.toString(),
    count: reviews.filter((review) => Math.round(review.rating) === stars).length,
    fill: `var(--color-${stars}-star${stars === 1 ? "" : "s"})`,
  }));

  return (
    <div className="h-full">
      <CardContent>
        <ChartContainer config={chartConfig} className="h-40 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="rating"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" layout="vertical" radius={3} barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  )
}
