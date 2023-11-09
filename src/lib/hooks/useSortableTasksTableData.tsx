// When calling this hook, second parameter is applyInitialSort which is default as false, but if put to true, it will require a third parameter a
// string so that it knows which field should it initially sort by

import { useMemo, useState } from "react";

type Priority = string | "High" | "Normal" | "Low" | null;
type PriorityKey = Exclude<Priority, null>;

// Replace this with your actual task type
type Task = {
  id: string;
  name: string | null;
  priority: Priority;
  deadline: Date | null | undefined; // or Date, depending on your data
  [key: string]: any; // This allows for other dynamic properties
};

const useSortableTasksTableData = <T extends Task>(
  items: T[],
  applyInitialSort: boolean = false,
  initialSortField: keyof T | undefined = "id",
  initialSortDirection: "asc" | "desc" = "asc",
) => {
  const [sortField, setSortField] = useState<keyof T>(
    applyInitialSort ? initialSortField : "",
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSortDirection,
  );

  const getPriorityWeight = (priority: Priority) => {
    const priorityWeights: Record<PriorityKey, number> = {
      High: 3,
      Normal: 2,
      Low: 1,
    };

    if (priority === null) {
      return 0;
    }

    return priorityWeights[priority as PriorityKey] || 0;
  };

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];

    if (sortField !== "") {
      sortableItems.sort((a, b) => {
        let compareValue: number = 0;

        if (sortField === "deadline") {
          compareValue =
            new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
        } else if (sortField === "priority") {
          compareValue =
            getPriorityWeight(a[sortField]) - getPriorityWeight(b[sortField]);
        } else if (typeof a[sortField] === "string") {
          compareValue = a[sortField].localeCompare(b[sortField]);
        } else {
          compareValue = a[sortField] - b[sortField];
        }

        return sortDirection === "asc" ? compareValue : -compareValue;
      });
    }

    return sortableItems;
  }, [items, sortField, sortDirection]);

  const requestSort = (field: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortField === field && sortDirection === "asc") {
      direction = "desc";
    }
    setSortField(field);
    setSortDirection(direction);
  };

  return { items: sortedItems, requestSort, sortField, sortDirection };
};

export default useSortableTasksTableData;
