export const usePriorityStyle = (priority: string) => {
  const extra = "rounded px-2 py-1 text-white"
  const priorityStyle =
    priority === "Normal"
      ? `bg-orange-600 ${extra}`
      : priority === "High"
      ? `bg-red-600 ${extra}`
      : priority === "Low"
      ? `bg-green-600 ${extra}`
      : "";
  return { priorityStyle };
};
