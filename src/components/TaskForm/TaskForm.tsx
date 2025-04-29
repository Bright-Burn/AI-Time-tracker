import React, { useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { Text } from '@consta/uikit/Text';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createTask } from '../../store/features/tasks/tasksService';
import { Priority } from '../../store/features/tasks/types';

interface ISelectItem {
  label: string;
  value: Priority;
  id: string;
  disabled?: boolean;
}

const priorityOptions: ISelectItem[] = [
  { label: 'Низкий', value: 'low', id: 'low' },
  { label: 'Средний', value: 'medium', id: 'medium' },
  { label: 'Высокий', value: 'high', id: 'high' },
];

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState<string | null>('');
  const [description, setDescription] = useState<string | null>('');
  const [category, setCategory] = useState<string | null>('');
  const [priority, setPriority] = useState<ISelectItem | null>(priorityOptions[1]);
  const [estimatedTime, setEstimatedTime] = useState<string | null>('1');

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.tasks);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && estimatedTime && priority) {
      try {
        await dispatch(
          createTask(
            title,
            parseFloat(estimatedTime),
            description || undefined,
            category || undefined,
            priority.value
          )
        );
        resetForm();
      } catch (error) {
        console.error('Ошибка при создании задачи:', error);
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('');
    setPriority(priorityOptions[1]);
    setEstimatedTime('1');
  };

  const handleTextFieldChange = (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => (value: string | null, e: React.ChangeEvent) => {
    setter(value);
  };

  const handleSelectChange = (value: ISelectItem | null) => {
    setPriority(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Text view="alert">{error}</Text>}

      <TextField
        label="Название задачи"
        value={title}
        onChange={handleTextFieldChange(setTitle)}
        required
        size="m"
        disabled={loading}
      />

      <TextField
        label="Описание"
        value={description}
        onChange={handleTextFieldChange(setDescription)}
        type="textarea"
        rows={3}
        size="m"
        disabled={loading}
      />

      <TextField
        label="Категория/Проект"
        value={category}
        onChange={handleTextFieldChange(setCategory)}
        size="m"
        disabled={loading}
      />

      <Select
        label="Приоритет"
        items={priorityOptions}
        value={priority}
        onChange={handleSelectChange}
        size="m"
        getItemLabel={(item) => item.label}
        getItemKey={(item) => item.id}
      />

      <TextField
        label="Оценка времени (часы)"
        type="number"
        min="0.25"
        step="0.25"
        value={estimatedTime}
        onChange={handleTextFieldChange(setEstimatedTime)}
        required
        size="m"
        disabled={loading}
      />

      <Button 
        label={loading ? "Создание..." : "Создать задачу"}
        type="submit"
        size="m"
        loading={loading}
        disabled={loading || !title || !estimatedTime}
      />
    </form>
  );
};