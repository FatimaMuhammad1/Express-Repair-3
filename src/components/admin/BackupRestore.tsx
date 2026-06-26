import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";

export function BackupRestore() {
  const handleBackup = () => {
    // Export data as JSON
    const data = {
      repairs: JSON.parse(localStorage.getItem("repairs") || "[]"),
      inventory: JSON.parse(localStorage.getItem("inventory") || "[]"),
      staff: JSON.parse(localStorage.getItem("staff") || "[]"),
      settings: JSON.parse(localStorage.getItem("businessSettings") || "{}"),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success("Backup created successfully");
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.repairs) localStorage.setItem("repairs", JSON.stringify(data.repairs));
        if (data.inventory) localStorage.setItem("inventory", JSON.stringify(data.inventory));
        if (data.staff) localStorage.setItem("staff", JSON.stringify(data.staff));
        if (data.settings) localStorage.setItem("businessSettings", JSON.stringify(data.settings));
        
        toast.success("Data restored successfully");
        window.location.reload();
      } catch (error) {
        toast.error("Failed to restore data");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-4">
      <Button onClick={handleBackup} variant="outline" className="border-[#1F2235]">
        <Download className="mr-2 h-4 w-4" />
        Backup Data
      </Button>
      <div>
        <input
          type="file"
          accept=".json"
          onChange={handleRestore}
          className="hidden"
          id="restore-input"
        />
        <Button
          onClick={() => document.getElementById("restore-input")?.click()}
          variant="outline"
          className="border-[#1F2235]"
        >
          <Upload className="mr-2 h-4 w-4" />
          Restore Data
        </Button>
      </div>
    </div>
  );
}
