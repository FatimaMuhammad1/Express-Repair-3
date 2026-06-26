import { useState, useEffect } from "react";
import { Building2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buildUrl, getAuthHeaders, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  is_active: boolean;
}

interface BranchSelectorProps {
  onBranchChange?: (branchId: string) => void;
  token: string;
}

export function BranchSelector({ onBranchChange, token }: BranchSelectorProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranches();
    // Load saved branch preference
    const savedBranch = localStorage.getItem("selected_branch");
    if (savedBranch) {
      setSelectedBranch(savedBranch);
    }
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await fetch(buildUrl("/branches"), {
        headers: getAuthHeaders(token),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setBranches(data.branches || []);
      }
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBranchChange = (branchId: string) => {
    setSelectedBranch(branchId);
    localStorage.setItem("selected_branch", branchId);
    onBranchChange?.(branchId);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("branch-change", { detail: { branchId } }));
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Building2 className="h-4 w-4" />
        <span>Branch:</span>
      </div>
      <Select value={selectedBranch} onValueChange={handleBranchChange} disabled={loading}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All Branches" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Branches</SelectItem>
          {branches.map((branch) => (
            <SelectItem key={branch.id} value={branch.id}>
              <div className="flex items-center gap-2">
                <span>{branch.name}</span>
                {!branch.is_active && (
                  <span className="text-xs text-slate-400">(Inactive)</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// Hook to get current branch in components
export function useBranch() {
  const [branchId, setBranchId] = useState<string>("all");

  useEffect(() => {
    const savedBranch = localStorage.getItem("selected_branch");
    if (savedBranch) {
      setBranchId(savedBranch);
    }

    const handleBranchChange = (e: CustomEvent) => {
      setBranchId(e.detail.branchId);
    };

    window.addEventListener("branch-change", handleBranchChange as EventListener);
    return () => {
      window.removeEventListener("branch-change", handleBranchChange as EventListener);
    };
  }, []);

  return branchId;
}
