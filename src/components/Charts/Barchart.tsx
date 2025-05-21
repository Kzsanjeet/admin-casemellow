"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ChartEntry {
  month: string;
  normalOrders: number;
  customizedOrders: number;
}

interface ChartProps {
  data: ChartEntry[];
}

const AreaChartComponent: React.FC<ChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Comparison Chart</CardTitle>
        <CardDescription>
          Normal vs Customized Orders Over Last 6 Months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="normalOrders"
                name="Normal Orders"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="customizedOrders"
                name="Customized Orders"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AreaChartComponent
