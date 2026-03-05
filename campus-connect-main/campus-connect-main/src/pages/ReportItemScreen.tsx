import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { toast } from "sonner";

const categories = ["Electronics", "Books", "IDs", "Accessories", "Clothing", "Other"];

const ReportItemScreen = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<"lost" | "found">("lost");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Item reported successfully!");
    navigate("/home");
  };

  const inputClass = "w-full bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/50 transition-colors";

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-semibold text-foreground">Report Item</h2>
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
        {/* Type toggle */}
        <div className="flex bg-secondary rounded-xl p-1">
          {(["lost", "found"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-colors ${
                type === t
                  ? t === "lost"
                    ? "bg-lost/20 text-lost"
                    : "bg-found/20 text-found"
                  : "text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Image upload placeholder */}
        <div className="border-2 border-dashed border-border rounded-2xl h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Tap to add photo</p>
        </div>

        <input placeholder="Item title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required>
          <option value="" disabled>Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input placeholder="Brand (optional)" value={brand} onChange={(e) => setBrand(e.target.value)} className={inputClass} />
        <input placeholder="Building" value={building} onChange={(e) => setBuilding(e.target.value)} className={inputClass} required />
        <input placeholder="Floor / Room" value={floor} onChange={(e) => setFloor(e.target.value)} className={inputClass} />

        <textarea
          placeholder="Describe the item and where you last saw it..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity"
        >
          <Upload className="w-4 h-4" />
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportItemScreen;
