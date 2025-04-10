'use client';

import type React from 'react';

import { useState } from 'react';

interface UseSearchProps {
  onSearch: (query: string) => Promise<void>;
}

export function useSearch({ onSearch }: UseSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      await onSearch(searchQuery);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    isSearching,
    handleSearch,
  };
}
