"use client"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Normal Orders",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Customized Orders",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface ChartEntry {
  month: string;
  normalOrders: number;
  customizedOrders: number;
}

interface ChartProps {
  data: ChartEntry[];
}

const PieChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Comparison Chart</CardTitle>
        <CardDescription>
          Normal vs Customized Orders Over Last 6 Months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
           <Area
              dataKey="normalOrders"
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
           <Area
              dataKey="customizedOrders"
              type="natural"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-2))"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default PieChart
