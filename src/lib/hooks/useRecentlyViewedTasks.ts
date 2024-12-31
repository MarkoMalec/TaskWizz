import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMutatingFetch } from "./useMutatingFetch";

// Helper function to manage recently viewed tasks
export const useRecentlyViewedTasks = (maxItems = 5) => {
  const [recentTasks, setRecentTasks] = useState<
    { title: string; url: string; name: string }[]
  >([]);
  const pathname = usePathname();

  const { doFetch } = useMutatingFetch();

  useEffect(() => {
    // Load initial tasks from localStorage
    const storedTasks = localStorage.getItem("recentlyViewedTasks");
    if (storedTasks) {
      setRecentTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Check if current path is a task page
    const taskMatch = pathname.match(/\/admin\/tasks\/([^\/]+)/);

    if (taskMatch) {
      const taskName = taskMatch[1];


      doFetch(
        `/api/tasks/${decodeURIComponent(taskName)}`,
        {
          method: "GET",
        },
        (task) => {
          setRecentTasks((prevTasks) => {
            // Remove if already exists and add to front
            const newTasks = [
              task,
              ...prevTasks.filter((t) => t.name !== task.name),
            ];

            // Keep only maxItems
            const updatedTasks = newTasks.slice(0, maxItems).map((task) => {
              return { title: task.name, url: task.url, name: task.name };
            });

            // Save to localStorage
            localStorage.setItem(
              "recentlyViewedTasks",
              JSON.stringify(updatedTasks),
            );

            return updatedTasks;
          });
        },
      );
    }
  }, [pathname, maxItems]);

  return recentTasks;
};
