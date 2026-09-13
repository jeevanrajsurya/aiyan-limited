import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../../api/upload';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api$/, '');

export default function ImageUploader({ value, onChange, label = 'Upload Image' }) {
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    try {
      setUploading(true);
      const res = await uploadImage(file);
      onChange(res.url);
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {value ? (
        <div className="relative inline-block border border-slate-200 rounded-lg overflow-hidden group">
          <img
            src={value.startsWith('http') ? value : `${API_ORIGIN}${value}`}
            alt="Uploaded preview"
            className="w-40 h-28 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-[#016839] hover:bg-[#e8f7ee]/30 transition-colors">
          <div className="flex flex-col items-center justify-center pt-2 pb-2">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-[#016839] animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <p className="text-xs text-slate-600 font-medium">Click to upload media</p>
                <p className="text-[10px] text-slate-400">PNG, JPG, WebP up to 5MB</p>
              </>
            )}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
