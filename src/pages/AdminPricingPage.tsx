import React, { useState, useEffect } from 'react';
import { Edit2, Save } from 'lucide-react';
import AdminHeader from '../components/admin/AdminHeader';
import Button from '../components/ui/Button';
import { getPricing, updatePricing, PricingOption } from '../utils/dataService';

const AdminPricingPage: React.FC = () => {
  const [pricingOptions, setPricingOptions] = useState<PricingOption[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEdit, setCurrentEdit] = useState<Partial<PricingOption>>({});

  useEffect(() => {
    loadPricingOptions();
  }, []);

  const loadPricingOptions = () => {
    setIsLoading(true);
    const options = getPricing();
    setPricingOptions(options);
    setIsLoading(false);
  };

  const handleStartEdit = (option: PricingOption) => {
    setEditId(option.id);
    setCurrentEdit({ ...option });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setCurrentEdit({});
  };

  const handleChange = (field: keyof PricingOption, value: string | number | string[]) => {
    setCurrentEdit(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (id: string) => {
    if (!currentEdit.id) return;

    // Ensure we're not saving invalid data
    if (
      typeof currentEdit.name !== 'string' ||
      typeof currentEdit.description !== 'string' ||
      typeof currentEdit.pricePerNight !== 'number' ||
      !Array.isArray(currentEdit.features)
    ) {
      alert('Invalid data. Please check all fields.');
      return;
    }

    updatePricing(id, currentEdit as PricingOption);
    
    // Update the state
    setPricingOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === id 
          ? { ...option, ...currentEdit } as PricingOption
          : option
      )
    );
    
    setEditId(null);
    setCurrentEdit({});
  };

  const handleFeatureChange = (index: number, value: string) => {
    if (!currentEdit.features) return;
    
    const newFeatures = [...currentEdit.features];
    newFeatures[index] = value;
    
    setCurrentEdit(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleAddFeature = () => {
    if (!currentEdit.features) return;
    
    setCurrentEdit(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const handleRemoveFeature = (index: number) => {
    if (!currentEdit.features) return;
    
    const newFeatures = [...currentEdit.features];
    newFeatures.splice(index, 1);
    
    setCurrentEdit(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
        <AdminHeader />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-primary-900">
      <AdminHeader />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="pb-5 border-b border-gray-200 dark:border-primary-700 mb-6">
          <h1 className="text-2xl font-bold text-primary-500 dark:text-white">Manage Pricing</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {pricingOptions.map(option => (
            <div 
              key={option.id} 
              className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6"
            >
              {editId === option.id ? (
                // Edit Mode
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Option Name
                      </label>
                      <input
                        type="text"
                        value={currentEdit.name || ''}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Price Per Night ($)
                      </label>
                      <input
                        type="number"
                        value={currentEdit.pricePerNight || 0}
                        onChange={(e) => handleChange('pricePerNight', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={currentEdit.description || ''}
                      onChange={(e) => handleChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Features
                    </label>
                    {currentEdit.features?.map((feature, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-primary-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-primary-700 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="ml-2 p-2 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="mt-2 px-4 py-2 border border-gray-300 dark:border-primary-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary-700"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="ghost"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      icon={<Save size={16} />}
                      onClick={() => handleSave(option.id)}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-primary-500 dark:text-white">
                        {option.name}
                      </h3>
                      <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 mt-1">
                        ${option.pricePerNight}
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / night</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<Edit2 size={16} />}
                      onClick={() => handleStartEdit(option)}
                    >
                      Edit
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {option.description}
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features:
                    </h4>
                    <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                      {option.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPricingPage;