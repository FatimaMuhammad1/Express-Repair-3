import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Wrench, User, Package, Calendar, Users, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";

interface SearchResult {
  id: string;
  type: "repair" | "customer" | "product" | "staff" | "booking";
  title: string;
  subtitle: string;
  url: string;
  icon: any;
}

interface GlobalSearchProps {
  token: string;
}

export function GlobalSearch({ token }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await fetch(buildUrl(`/search?q=${encodeURIComponent(searchQuery)}`), {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "repair":
        return Wrench;
      case "customer":
        return User;
      case "product":
        return Package;
      case "staff":
        return Users;
      case "booking":
        return Calendar;
      default:
        return Search;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case "repair":
        return "bg-violet-100 text-violet-700";
      case "customer":
        return "bg-blue-100 text-blue-700";
      case "product":
        return "bg-emerald-100 text-emerald-700";
      case "staff":
        return "bg-amber-100 text-amber-700";
      case "booking":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate({ to: result.url });
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="relative w-64 justify-start text-slate-500"
      >
        <Search className="mr-2 h-4 w-4" />
        Search...
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-60">
          <span>⌘</span>K
        </kbd>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl border border-[#1F2235] bg-transparent shadow-2xl"
            >
              <div className="flex items-center border-b border-[#1F2235] p-4">
                <Search className="mr-3 h-5 w-5 text-slate-400" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search repairs, customers, inventory, staff, bookings..."
                  className="flex-1 border-none bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="max-h-[500px] overflow-y-auto p-2">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-violet-600" />
                  </div>
                ) : query.length < 2 ? (
                  <div className="py-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">Type at least 2 characters to search</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                        Repairs
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                        Customers
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                        Inventory
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                        Staff
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-slate-100">
                        Bookings
                      </Badge>
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">No results found for "{query}"</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {results.map((result, idx) => {
                      const Icon = getResultIcon(result.type);
                      return (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleResultClick(result)}
                          className="flex w-full items-center gap-3 rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                        >
                          <div className={`rounded-full p-2 ${getResultColor(result.type)}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white">{result.title}</p>
                            <p className="text-sm text-slate-500 truncate">{result.subtitle}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400" />
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-[#1F2235] p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono">
                        <span>↑</span>
                      </kbd>
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono">
                        <span>↓</span>
                      </kbd>
                      <span>to navigate</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono">
                        <span>↵</span>
                      </kbd>
                      <span>to select</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 px-1.5 font-mono">
                        <span>esc</span>
                      </kbd>
                      <span>to close</span>
                    </span>
                  </div>
                  <span>{results.length} results</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
