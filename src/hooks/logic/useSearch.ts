import { useState } from "react";

export function useSearch<T>(
  data: T[] | undefined,
  key: keyof T,
  initialValue = ""
) {
  const [search, setSearch] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchData = data?.filter((item) =>
    String(item[key]).toLowerCase().includes(search.toLowerCase())
  );

  return { value: search, onChange: handleChange, searchData };
}
