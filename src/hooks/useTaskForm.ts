import { useState } from 'react';
import { useTaskActions } from './useTaskActions';

interface ISelectItem {
  label: string;
  value: string;
  id: string;
}

const PRIORITY_OPTIONS: ISelectItem[] = [
  { label: 'Низкий', value: 'low', id: 'low' },
  { label: 'Средний', value: 'medium', id: 'medium' },
  { label: 'Высокий', value: 'high', id: 'high' },
];

export const useTaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: PRIORITY_OPTIONS[1],
    estimatedTime: '1'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTask } = useTaskActions();

  const isFormValid = Boolean(
    formData.title && 
    formData.estimatedTime && 
    parseFloat(formData.estimatedTime) > 0
  );

  const handleInputChange = (field: keyof typeof formData) => 
    (value: string | null | ISelectItem | undefined) => {
      setFormData(prev => ({
        ...prev,
        [field]: value ?? ''
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    try {
      await createTask(
        formData.title,
        parseFloat(formData.estimatedTime),
        formData.description || undefined,
        formData.category || undefined,
        formData.priority.value
      );

      setFormData({
        title: '',
        description: '',
        category: '',
        priority: PRIORITY_OPTIONS[1],
        estimatedTime: '1'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    priorityOptions: PRIORITY_OPTIONS,
    isFormValid,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};