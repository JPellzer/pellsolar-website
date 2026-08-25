import { useState, useRef } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Sun, Upload, Trash2, ImageIcon, Plus, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type Category = "solar" | "battery" | "ev-charging" | "roofing" | "other";

const CATEGORY_LABELS: Record<Category, string> = {
  solar: "Solar Panels",
  battery: "Battery + Solar",
  "ev-charging": "EV Charging",
  roofing: "Roofing",
  other: "Other",
};

export default function AdminPhotos() {
  const { user, loading: authLoading } = useAuth();
  const utils = trpc.useUtils();

  // Upload form state
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("solar");
  const [location, setLocation] = useState("");
  const [featured, setFeatured] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState("image/jpeg");
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: photos = [], isLoading } = trpc.photos.list.useQuery({});

  const uploadMutation = trpc.photos.upload.useMutation({
    onSuccess: () => {
      utils.photos.list.invalidate();
      toast.success("Photo uploaded successfully!");
      resetForm();
    },
    onError: (e) => toast.error("Upload failed: " + e.message),
  });

  const deleteMutation = trpc.photos.delete.useMutation({
    onSuccess: () => {
      utils.photos.list.invalidate();
      toast.success("Photo deleted.");
    },
    onError: (e) => toast.error("Delete failed: " + e.message),
  });

  function resetForm() {
    setTitle(""); setDescription(""); setCategory("solar");
    setLocation(""); setFeatured(false); setPreview(null);
    setImageData(null); setShowUpload(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setMimeType(file.type || "image/jpeg");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreview(result);
      // Strip the data URL prefix to get raw base64
      setImageData(result.split(",")[1]);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageData) { toast.error("Please select an image."); return; }
    if (!title.trim()) { toast.error("Please add a title."); return; }
    uploadMutation.mutate({ title, description, imageData, mimeType, category, location, featured });
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(15,31,61,0.08)" }}>
            <Sun className="w-8 h-8" style={{ color: "var(--navy)" }} />
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--navy)" }}>Admin Login Required</h2>
          <a href={getLoginUrl()}>
            <button className="btn-navy px-8 py-3 rounded-xl w-full">Sign In</button>
          </a>
        </div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Admin access required.</p>
          <Link href="/"><button className="btn-navy mt-2 px-6 py-2.5 rounded-xl text-sm">Back to Home</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0f1f3d 0%, #1a3260 100%)" }}>
                  <Sun className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="font-bold text-base" style={{ color: "var(--navy)", fontFamily: "'Playfair Display', serif" }}>
                  PELL <span style={{ color: "var(--gold)" }}>SOLAR</span>
                </span>
              </div>
            </Link>
            <span className="text-gray-300 text-lg">/</span>
            <Link href="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-800">CRM</Link>
            <span className="text-gray-300 text-lg">/</span>
            <span className="text-sm font-semibold text-gray-600">Photo Gallery</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ background: "var(--navy)" }}
            >
              <Plus className="w-4 h-4" />
              Add Photo
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold" style={{ color: "var(--navy)" }}>
                {user?.name?.[0] ?? "A"}
              </div>
              <span className="hidden sm:inline">{user?.name ?? "Admin"}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "var(--navy)" }}>Our Work Gallery</h1>
            <p className="text-gray-500 mt-1">{photos.length} photos — shown live on the <Link href="/our-work" className="underline">Our Work</Link> page.</p>
          </div>
          <button
            onClick={() => setShowUpload(true)}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ background: "var(--navy)" }}
          >
            <Upload className="w-4 h-4" />
            Upload New Photo
          </button>
        </div>

        {/* Upload modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>Upload Job Photo</h2>
                <button onClick={resetForm} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Image picker */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition-colors"
                >
                  {preview ? (
                    <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImageIcon className="w-10 h-10" />
                      <p className="text-sm font-medium">Click to select a photo</p>
                      <p className="text-xs">JPG, PNG, HEIC up to 10MB</p>
                    </div>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. 32-Panel System — Chino Hills"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                {/* Category + Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as Category)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g. Chino Hills, CA"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Description (optional)</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Brief description of the install..."
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  />
                </div>

                {/* Featured toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setFeatured(!featured)}
                    className={`w-10 h-6 rounded-full transition-colors ${featured ? "bg-blue-500" : "bg-gray-200"} relative`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${featured ? "translate-x-5" : "translate-x-1"}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Featured photo (shown prominently)</span>
                </label>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={resetForm} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploadMutation.isPending || !imageData}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors disabled:opacity-50"
                    style={{ background: "var(--navy)" }}
                  >
                    {uploadMutation.isPending ? "Uploading..." : "Upload Photo"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold">No photos yet</p>
            <p className="text-sm mt-2">Click "Add Photo" to upload your first job photo.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100">
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${photo.title}"?`)) deleteMutation.mutate({ id: photo.id });
                      }}
                      className="p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">{photo.title}</p>
                    {photo.location && <p className="text-white/60 text-xs mt-0.5">📍 {photo.location}</p>}
                  </div>
                </div>
                {/* Featured badge */}
                {photo.featured === 1 && (
                  <div className="absolute top-2 left-2">
                    <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "#FED44D", color: "#0B1D51" }}>
                      <CheckCircle className="w-2.5 h-2.5" /> FEATURED
                    </span>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white">
                    {CATEGORY_LABELS[photo.category as Category] ?? photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
