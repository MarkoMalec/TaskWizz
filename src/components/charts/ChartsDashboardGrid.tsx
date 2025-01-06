import { Card, CardContent, CardTitle } from "../ui/card";
import { TaskCompletionChart, TaskStatusQuantityChart } from "./charts";
import { Task } from "@prisma/client";

const ChartsDashboardGrid = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      <h2 className="mb-2 text-2xl font-semibold">Charts</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TaskStatusQuantityChart tasks={tasks} />
        <TaskCompletionChart tasks={tasks} />
      </div>
    </>
  );
};

export default ChartsDashboardGrid;
