'use client';
// Нужен для хуков (useState, useRouter)

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import recipesData from '@/data/recipes.json';
import { Recipe } from '@/types/types';

const recipes = recipesData as Recipe[];

interface SearchContextType {
  query: string;
  filteredRecipes: Recipe[];
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQueryState] = useState('');
  const [previousPage, setPreviousPage] = useState('/');  // ← Храним страницу
  
  // Фильтруем рецепты по названию
  const filteredRecipes = query
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
      )
    : recipes;

    useEffect(() => {
    if (pathname !== '/search') {
      setPreviousPage(pathname);
    }
  }, [pathname]);

  // Обновляем запрос + переходим на /search если есть текст
  const setQuery = (query: string) => {
    setQueryState(query);
    if (query && pathname !== '/search') {
      router.push('/search');
    }
  };

  // Очистка + возврат назад
  const clearSearch = () => {
    setQueryState('');
    router.push(previousPage);
  };

  // Если строка пустая и мы на /search → идём назад
  useEffect(() => {
    if (!query && pathname === '/search') {
      router.back();
    }
  }, [query, pathname, router]);

  return (
    <SearchContext.Provider value={{ query, filteredRecipes, setQuery, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

// Хук для доступа к контексту
export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}