import { useState, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFilter<T extends Record<string, any>>(initialFilter: {
  department: string[];
  type: string;
}) {
  const [filter, setFilter] = useState(initialFilter);

  const applyFilter = useCallback(
    (data: T[]) => {
      return data.filter((item) => {
        const typeFilterActive = filter.type !== "";
        const departmentFilterActive = filter.department.length > 0;

        const matchesType =
          !typeFilterActive ||
          item.employeeType.toLowerCase() === filter.type.toLowerCase();
        const matchesDepartment =
          !departmentFilterActive ||
          filter.department.includes(item.departmentName);

        return matchesType && matchesDepartment;
      });
    },
    [filter]
  );

  const clearFilter = useCallback(
    () => setFilter({ department: [], type: "" }),
    []
  );

  return { filter, setFilter, applyFilter, clearFilter };
}
