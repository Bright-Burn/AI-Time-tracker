import React from 'react';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { useTaskForm } from '../../hooks/useTaskForm';

export const TaskForm: React.FC = () => {
  const {
    formData,
    priorityOptions,
    isFormValid,
    isSubmitting,
    handleInputChange,
    handleSubmit
  } = useTaskForm();

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Название задачи"
        value={formData.title}
        onChange={(value) => handleInputChange('title')(value)}
        required
        size="m"
      />
      
      <TextField
        label="Описание"
        value={formData.description}
        onChange={(value) => handleInputChange('description')(value)}
        type="textarea"
        rows={3}
        size="m"
      />
      
      <TextField
        label="Категория/Проект"
        value={formData.category}
        onChange={(value) => handleInputChange('category')(value)}
        size="m"
      />
      
      <Select
        label="Приоритет"
        items={priorityOptions}
        value={formData.priority}
        onChange={(value) => handleInputChange('priority')(value)}
        size="m"
        getItemLabel={(item) => item.label}
        getItemKey={(item) => item.id}
      />
      
      <TextField
        label="Оценка времени (часы)"
        type="number"
        min="0.25"
        step="0.25"
        value={formData.estimatedTime}
        onChange={(value) => handleInputChange('estimatedTime')(value)}
        required
        size="m"
      />
      
      <Button 
        label={isSubmitting ? "Создание..." : "Создать задачу"}
        type="submit" 
        size="m"
        disabled={!isFormValid || isSubmitting}
        loading={isSubmitting}
      />
    </form>
  );
};