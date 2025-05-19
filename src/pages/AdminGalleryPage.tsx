import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Star, X } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import Button from '../components/ui/Button';
import { getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage, GalleryImage } from '../utils/dataService';

const AdminGalleryPage: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    featured: false
  });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    setIsLoading(true);
    const galleryImages = getGalleryImages();
    setImages(galleryImages);
    setIsLoading(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      url: '',
      title: '',
      description: '',
      featured: false
    });
    setEditingImage(null);
    setShowAddForm(false);
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url || !formData.title) {
      alert('Image URL and title are required');
      return;
    }
    
    const newImage = addGalleryImage({
      url: formData.url,
      title: formData.title,
      description: formData.description,
      featured: formData.featured
    });
    
    setImages(prev => [...prev, newImage]);
    resetForm();
  };

  const handleUpdateImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingImage || !formData.url || !formData.title) {
      alert('Image URL and title are required');
      return;
    }
    
    const updatedImage = updateGalleryImage(editingImage.id, {
      url: formData.url,
      title: formData.title,
      description: formData.description,
      featured: formData.featured
    });
    
    if (updatedImage) {
      setImages(prev => prev.map(img => img.id === editingImage.id ? updatedImage : img));
    }
    
    resetForm();
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      title: image.title,
      description: image.description,
      featured: image.featured
    });
    setShowAddForm(true);
  };

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      const success = deleteGalleryImage(id);
      if (success) {
        setImages(prev => prev.filter(img => img.id !== id));
      }
    }
  };

  const handleToggleFeatured = (id: string, currentStatus: boolean) => {
    const updatedImage = updateGalleryImage(id, { featured: !currentStatus });
    if (updatedImage) {
      setImages(prev => prev.map(img => img.id === id ? updatedImage : img));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-primary-700 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-500 dark:text-white">Manage Gallery</h1>
          <Button
            variant="accent"
            size="sm"
            icon={showAddForm ? <X size={16} /> : <PlusCircle size={16} />}
            onClick={() => {
              if (showAddForm && editingImage) {
                resetForm();
              } else {
                setShowAddForm(!showAddForm);
              }
            }}
          >
            {showAddForm ? (editingImage ? 'Cancel Edit' : 'Cancel') : 'Add New Image'}
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-primary-500 dark:text-white mb-4">
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
            <form onSubmit={editingImage ? handleUpdateImage : handleAddImage}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL*
                  </label>
                  <input
                    type="url"
                    name="url"
                    value={formData.url}
                    onChange={handleFormChange}
                    required
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Use publicly accessible image URLs
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    placeholder="Image title"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Brief description of the image"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Featured image (highlighted in gallery)
                  </span>
                </label>
              </div>
              
              {formData.url && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-primary-700 rounded-md overflow-hidden h-40">
                    <img 
                      src={formData.url} 
                      alt="Preview"
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Invalid+Image+URL';
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="ghost"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                >
                  {editingImage ? 'Update Image' : 'Add Image'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {images.length === 0 ? (
              <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No images found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Add your first image to the gallery.
                </p>
                <Button
                  variant="accent"
                  size="md"
                  icon={<PlusCircle size={16} />}
                  onClick={() => setShowAddForm(true)}
                >
                  Add New Image
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div 
                    key={image.id} 
                    className="bg-white dark:bg-primary-800 rounded-lg shadow-md overflow-hidden flex flex-col"
                  >
                    <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-primary-700 relative h-48">
                      <img 
                        src={image.url} 
                        alt={image.title} 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/640x360?text=Image+Not+Found';
                        }}
                      />
                      {image.featured && (
                        <div className="absolute top-2 left-2 bg-accent-400 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                          <Star size={12} className="mr-1" /> Featured
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="text-lg font-semibold text-primary-500 dark:text-white mb-1">
                        {image.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {image.description || 'No description provided'}
                      </p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant={image.featured ? 'ghost' : 'outline'}
                          size="sm"
                          icon={<Star size={16} />}
                          onClick={() => handleToggleFeatured(image.id, image.featured)}
                          className={image.featured ? 'text-accent-400' : ''}
                        >
                          {image.featured ? 'Featured' : 'Make Featured'}
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Edit2 size={16} />}
                            onClick={() => handleEditImage(image)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={<Trash2 size={16} />}
                            className="text-red-500 dark:text-red-400 border-red-500 dark:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminGalleryPage;