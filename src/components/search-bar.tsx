'use client';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearch } from '@/lib/use-search';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const { searchQuery, setSearchQuery, isSearching, handleSearch } = useSearch({
    onSearch,
  });

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search for a city..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-zinc-900 border-zinc-800 focus-visible:ring-zinc-700"
        disabled={isSearching}
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        className="border-zinc-800 hover:bg-zinc-800 bg-zinc-800 text-zinc-300 cursor-pointer"
        disabled={isSearching}
      >
        {isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
