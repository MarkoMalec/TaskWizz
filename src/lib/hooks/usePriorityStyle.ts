export const usePriorityStyle = (priority: string) => {
  const extra = "rounded-full inline-block w-3 h-3 mr-1 text-white";
  const priorityStyle =
    priority === "Normal"
      ? `bg-yellow-400 ${extra}`
      : priority === "High"
      ? `bg-red-600 ${extra}`
      : priority === "Low"
      ? `bg-green-600 ${extra}`
      : "";
  return { priorityStyle };
};
