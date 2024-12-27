"use client";

import React, { useState, useEffect } from "react";
import { Input } from "~/components/ui/input";
import { useMutatingFetch } from "~/lib/hooks/useMutatingFetch";

interface SearchTasksProps {
  searchQuery: string;
}

const SearchTasks: React.FC<SearchTasksProps> = ({ searchQuery }) => {
  const { doFetch, isMutating } = useMutatingFetch();
  const [loadingState, setLoadingState] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    setLoadingState(true);
    const handler = setTimeout(() => {
      if (inputValue) {
        doFetch(`/api/tasks?searchInput=${encodeURIComponent(inputValue)}`, {
          method: "GET",
        }).then((data) => {
          setResults(data);
          setLoadingState(false);
        });
      } else {
        setResults([]);
        setLoadingState(false);
      }
    }, 500);

    // setLoadingState(false);
    console.log(loadingState, "after");
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const inputSearch = (searchInput: string) => {
    setInputValue(searchInput);
  };

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="rounded-md bg-black/70 pr-1">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const showResults = () => {
    if (inputValue !== "") {
      if (results.length > 0) {
        return (
          <div className="rounded-b-2xl bg-secondary p-2 shadow-md">
            <div className="space-y-2">
              {results.map((result, index) => (
                <a
                  href={`/admin/tasks/${result.id}`}
                  key={index}
                  className="block border-b p-1"
                >
                  <strong>{result.name}</strong> <br />
                  <small className="text-xs">Note:</small>
                  {result.TaskNote.length
                    ? result.TaskNote.filter((note: any) =>
                        note.content
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()),
                      ).map((note: any) => {
                        return (
                          <div key={note.id}>
                            {highlightText(
                              note.content.replace(/<[^>]*>/g, ""),
                              inputValue,
                            )}
                          </div>
                        );
                      })
                    : ""}
                </a>
              ))}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => inputSearch(e.target.value)}
        className="w-[500px]"
      />
      {isMutating && loadingState && (
        <div className="z-15 absolute left-[50%] top-5">Loading...</div>
      )}
      <div className="results absolute right-0 top-10 z-10 w-full">
        {showResults()}
      </div>
    </div>
  );
};

export default SearchTasks;
