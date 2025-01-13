import {
  TaskCompletionChart,
  TaskStatusQuantityChart,
  OverdueTasksChart,
} from "./charts";
import { ChartColumnIncreasing } from "lucide-react";
import { fetchTasks } from "~/lib/fetchTasks";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const ChartsDashboardGrid = async () => {
  const tasks = await fetchTasks();

  return (
    <>
      <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold">
        <ChartColumnIncreasing />
        Charts
      </h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskStatusQuantityChart tasks={tasks} />
        <Card className="col-span-1">
          <CardContent>
            <CardHeader>
              <CardTitle>Completion ratio</CardTitle>
            </CardHeader>
            <TaskCompletionChart tasks={tasks} />
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardContent>
            <CardHeader>
              <CardTitle>Overdue tasks per month</CardTitle>
            </CardHeader>
            <OverdueTasksChart tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ChartsDashboardGrid;
