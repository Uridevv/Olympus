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
import { getAllPurchases } from "@/api/purchases"
import { Purchase } from "@/types/purchaseType"

export const description = "An interactive area chart"

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

const sanitizeKey = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_")

// The backend populates productBought.category as { name, ... } on this
// endpoint even though Product types it as a plain string elsewhere.
const getCategoryName = (category: unknown): string | null => {
  if (!category) return null
  if (typeof category === "string") return category
  if (typeof category === "object" && "name" in category) {
    const name = (category as { name?: unknown }).name
    return typeof name === "string" ? name : null
  }
  return null
}

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [purchases, setPurchases] = React.useState<Purchase[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getAllPurchases()
      .then((res) => setPurchases(res.data))
      .catch(() => setPurchases([]))
      .finally(() => setLoading(false))
  }, [])

  const categories = React.useMemo(() => {
    const names = new Set<string>()
    purchases.forEach((purchase) => {
      const category = getCategoryName(purchase.productBought?.category)
      if (category) names.add(category)
    })
    return Array.from(names)
  }, [purchases])

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {}
    categories.forEach((category, i) => {
      config[sanitizeKey(category)] = {
        label: category,
        color: CHART_COLORS[i % CHART_COLORS.length],
      }
    })
    return config
  }, [categories]) satisfies ChartConfig

  const chartData = React.useMemo(() => {
    const byDate = new Map<string, Record<string, number>>()
    purchases.forEach((purchase) => {
      const category = getCategoryName(purchase.productBought?.category)
      if (!category || !purchase.createdAt) return
      const date = new Date(purchase.createdAt).toISOString().slice(0, 10)
      const key = sanitizeKey(category)
      const entry = byDate.get(date) ?? {}
      entry[key] = (entry[key] ?? 0) + 1
      byDate.set(date, entry)
    })
    return Array.from(byDate.entries())
      .map(([date, counts]) => ({ date, ...counts }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [purchases])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date()
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
          <CardTitle>Ventas por Categoría</CardTitle>
          <CardDescription>
            Mostrando el total de ventas registradas en la base de datos
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
        {loading ? (
          <p className="text-center text-sm text-muted-foreground">
            Cargando ventas...
          </p>
        ) : categories.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No se encontraron ventas registradas.
          </p>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={filteredData}>
              <defs>
                {categories.map((category) => {
                  const key = sanitizeKey(category)
                  return (
                    <linearGradient
                      key={key}
                      id={`fill${key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={`var(--color-${key})`}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  )
                })}
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
                  return date.toLocaleDateString("es-ES", {
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
                      return new Date(value).toLocaleDateString("es-ES", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                    indicator="dot"
                  />
                }
              />
              {categories.map((category) => {
                const key = sanitizeKey(category)
                return (
                  <Area
                    key={key}
                    dataKey={key}
                    type="natural"
                    fill={`url(#fill${key})`}
                    stroke={`var(--color-${key})`}
                    stackId="a"
                  />
                )
              })}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
