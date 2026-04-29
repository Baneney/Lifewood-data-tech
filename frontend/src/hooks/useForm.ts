 import { useState } from 'react';

// This hook can handle any shape of data you give it
export function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState);

  const handleInputChange = (field: keyof T, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => setFormData(initialState);

  return {
    formData,
    handleInputChange,
    setFormData,
    resetForm
  };
}