import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutatingFetch } from "./useMutatingFetch";
import { set } from "date-fns";

// Helper function to manage recently viewed tasks
export const useRecentlyViewedTasks = (maxItems = 5) => {
  const [recentTasks, setRecentTasks] = useState<{ title: string; url: string; id: string }[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const { doFetch } = useMutatingFetch();

  useEffect(() => {
    // Load initial tasks from localStorage
    const storedTasks = localStorage.getItem('recentlyViewedTasks');
    if (storedTasks) {
      setRecentTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    // Check if current path is a task page
    const taskMatch = pathname.match(/\/admin\/tasks\/([a-z0-9]+)/);

    
    if (taskMatch) {
      const taskId = taskMatch[1];
      
      doFetch(`/api/tasks/${taskId}`, {
        method: "GET",
      }, (task) => {
        console.log(task, "the task");

        setRecentTasks((prevTasks) => {
          // Remove if already exists and add to front
          const newTasks = [task, ...prevTasks.filter(t => t.id !== task.id)];
          
          
          // Keep only maxItems
          const updatedTasks = newTasks.slice(0, maxItems).map(task => {
            return { title: task.name, url: task.url, id: task.id };
          });

          console.log(updatedTasks, "the updated tasks");
          
          // Save to localStorage
          localStorage.setItem('recentlyViewedTasks', JSON.stringify(updatedTasks));
          
          return updatedTasks;
        });
      });

    }
  }, [pathname, maxItems]);

  return recentTasks;
};