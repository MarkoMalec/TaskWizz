export const useTaskStatusStyle = (status: string | null) => {
  const extra =
    "rounded-full p-1 px-3 text-[13px] font-light cursor-default hover:opacity-80";

  const taskStatusStyle =
    status === "Pending"
      ? `bg-[#A52A2A]/40 text-white dark:text-red-500 ${extra}`
      : status === "In progress"
      ? `bg-[#FFAA33]/30 dark:text-[#F28C28] ${extra}`
      : status === "Finished"
      ? `bg-green-500/30 dark:text-green-400 ${extra}`
      : "";
  return { taskStatusStyle };
};
