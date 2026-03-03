'use client';
import React, { ChangeEvent } from "react";
import { useSearch } from "@/contexts/SearchContext";
import styles from "./SearchBar.module.css";

export const SearchBar: React.FC = () => {
  const { query, setQuery } = useSearch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(e.target.value)
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Найти рецепт..."
        value={query}
        onChange={handleChange}
        aria-label="Поиск рецептов"
      />
      {query && (
        <button 
          type="button"
          className={styles.clearBtn} 
          onClick={handleClear}
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      )}
    </div>
  );
};