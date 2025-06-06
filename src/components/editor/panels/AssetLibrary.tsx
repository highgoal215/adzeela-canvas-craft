
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Upload } from 'lucide-react';

export const AssetLibrary = () => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Uploading image:', file);
    }
  };

  const assets = [
    { id: 1, name: 'Background 1', type: 'image', url: '/placeholder.svg' },
    { id: 2, name: 'Logo', type: 'image', url: '/placeholder.svg' },
    { id: 3, name: 'Product Photo', type: 'image', url: '/placeholder.svg' },
    { id: 4, name: 'Icon Set', type: 'svg', url: '/placeholder.svg' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-white mb-4">Assets</h3>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search assets..."
          className="pl-10 bg-slate-800 border-slate-600 text-white"
        />
      </div>

      {/* Upload Button */}
      <div className="mb-4">
        <label htmlFor="image-upload">
          <Button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white">
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-2 gap-2">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-slate-800 rounded border border-slate-700 group-hover:border-blue-500 transition-colors p-2">
              <img
                src={asset.url}
                alt={asset.name}
                className="w-full h-full object-cover rounded opacity-70 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1 truncate">{asset.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
