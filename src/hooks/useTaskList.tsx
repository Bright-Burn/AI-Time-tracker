// src/hooks/useTaskList.ts
import { useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { useTaskActions } from './useTaskActions';
import type { Task, Priority, Status } from '../store/features/tasks/types';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';

const PRIORITY_MAP: Record<Priority, 'normal' | 'warning' | 'error'> = {
  low: 'normal',
  medium: 'warning',
  high: 'error',
};

const STATUS_MAP: Record<Status, 'system' | 'normal' | 'success'> = {
  pending: 'system',
  'in-progress': 'normal',
  completed: 'success',
};
const TABLE_COLUMNS = [
  {
    title: 'Название',
    accessor: 'title',
    width: 200,
    sortable: true,
  },
  {
    title: 'Категория',
    accessor: 'category',
    width: 150,
  },
  {
    title: 'Приоритет',
    accessor: 'priority',
    width: 120,
    renderCell: (row: Task) => (
      <Badge
        label={row.priority === 'low' ? 'Низкий' : row.priority === 'medium' ? 'Средний' : 'Высокий'}
        status={PRIORITY_MAP[row.priority]}
        size="s"
      />
    ),
  },
  {
    title: 'Статус',
    accessor: 'status',
    width: 120,
    renderCell: (row: Task) => (
      <Badge
        label={
          row.status === 'pending' 
            ? 'В ожидании' 
            : row.status === 'in-progress' 
              ? 'В работе' 
              : 'Завершена'
        }
        status={STATUS_MAP[row.status]}
        size="s"
      />
    ),
  },
  {
    title: 'Оценка времени (ч)',
    accessor: 'estimatedTime',
    width: 120,
    align: 'right',
  },
  {
    title: 'Факт. время (ч)',
    accessor: 'actualTime',
    width: 120,
    align: 'right',
    renderCell: (row: Task) => row.actualTime || '-',
  },
  {
    title: 'Разница (ч)',
    width: 120,
    align: 'right',
    renderCell: (row: Task) => {
      if (!row.actualTime) return '-';
      const diff = row.actualTime - row.estimatedTime;
      return (
        <Text 
          view={diff > 0 ? 'alert' : diff < 0 ? 'success' : 'primary'}
          size="s"
        >
          {diff > 0 ? '+' : ''}{diff.toFixed(2)}
        </Text>
      );
    },
  },
] as const;

export const useTaskList = () => {
  const { tasks, loading, error } = useAppSelector(state => state.tasks);
  const { beginTask, finishTask, removeTask, cancelTask } = useTaskActions(); // Добавляем cancelTask из useTaskActions
  const [actualTimeInput, setActualTimeInput] = useState<string>('');

  const handleStartTask = (taskId: string) => {
    beginTask(taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    const actualTime = parseFloat(actualTimeInput);
    if (!isNaN(actualTime) && actualTime > 0) {
      finishTask(taskId, actualTime);
      setActualTimeInput('');
    }
  };

  const handleCancelTask = (taskId: string) => {
    cancelTask(taskId); // Добавляем обработчик отмены задачи
  };

  const handleActualTimeChange = (value :string | null ) => {
    setActualTimeInput(value || '');
  };

  const getActionColumn = () => ({
    title: 'Действия',
    width: 200,
    renderCell: (row: Task) => {
      switch (row.status) {
        case 'completed':
          return (
            <Button
              label="Удалить"
              view="ghost"
              size="xs"
              onClick={() => removeTask(row.id)}
            />
          );
        
        case 'in-progress':
          return (
            <div className="task-actions-container" style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
              <TextField
                type="number"
                placeholder="Факт. время (ч)"
                value={actualTimeInput}
                onChange={handleActualTimeChange}
                step="0.25"
                min="0.25"
                size="s"
                width="full"
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button
                  label="Завершить"
                  size="xs"
                  onClick={() => handleCompleteTask(row.id)}
                  disabled={!actualTimeInput || parseFloat(actualTimeInput) <= 0}
                />
                <Button
                  label="Отмена"
                  view="ghost"
                  size="xs"
                  onClick={() => handleCancelTask(row.id)}
                />
              </div>
            </div>
          );
        
        default:
          return (
            <Button
              label="Начать"
              size="xs"
              onClick={() => handleStartTask(row.id)}
            />
          );
      }
    },
  });

  return {
    columns: TABLE_COLUMNS,
    actionColumn: getActionColumn(),
    tasks,
    loading,
    error,
    handleActualTimeChange,
  };
};