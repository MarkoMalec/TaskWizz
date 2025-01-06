"use client";

import { Task } from "@prisma/client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  Pie,
  PieChart,
} from "recharts";
import { useMemo } from "react";
import { format } from "date-fns";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const TaskCompletionChartConfig = {
  created: {
    label: "created",
    color: "#2563eb",
  },
  finished: {
    label: "finished",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function TaskCompletionChart({ tasks }: { tasks: Task[] }) {
  const chartData = useMemo(() => {
    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const month = format(new Date(task.dateCreated), "MMMM");
        if (!acc[month]) {
          acc[month] = [];
        }
        acc[month].push(task);
        return acc;
      },
      {} as Record<string, Task[]>,
    );

    return Object.entries(groupedTasks).map(([month, tasks]) => ({
      month,
      created: tasks.length,
      finished: tasks.filter((task) => task.status === "Finished").length,
    }));
  }, [tasks]);

  return (
    <ChartContainer
      config={TaskCompletionChartConfig}
      className="min-h-[300px] w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="created" fill="var(--color-created)" radius={4} />
        <Bar dataKey="finished" fill="var(--color-finished)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

const TaskStatusQuantityChartConfig = {
  total: {
    label: "Total",
    color: "#000000", // Add a default color for total
  },
  Pending: {
    label: "Pending",
    color: "#2563eb",
  },
  "In progress": {
    label: "In progress",
    color: "#60a5fa",
  },
  Finished: {
    label: "Finished",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

export function TaskStatusQuantityChart({ tasks }: { tasks: Task[] }) {
  const chartData = useMemo(() => {
    const groupedTasks = tasks.reduce(
      (acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = 0;
        }
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(groupedTasks).map(([status, count]) => ({
      status,
      count,
      fill: TaskStatusQuantityChartConfig[status as keyof typeof TaskStatusQuantityChartConfig].color,
    }));
  }, [tasks]);

  const totalTasks = tasks.length;

  return (
    <ChartContainer
      config={TaskStatusQuantityChartConfig}
      className="min-h-[300px] w-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={45}
          strokeWidth={1}
        >
          <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
