import React from 'react';
import { Table } from '@consta/uikit/Table';
import { Badge } from '@consta/uikit/Badge';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { beginTask, finishTask, removeTask } from '../../store/features/tasks/tasksService';
import { Task, Priority, Status } from '../../store/features/tasks/types';

const priorityMap: Record<Priority, 'normal' | 'warning' | 'error'> = {
  low: 'normal',
  medium: 'warning',
  high: 'error',
};

const statusMap: Record<Status, 'system' | 'progress' | 'success'> = {
  pending: 'system',
  'in-progress': 'progress',
  completed: 'success',
};

export const TaskList: React.FC = () => {
  const tasks = useAppSelector(state => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const [activeTask, setActiveTask] = React.useState<string | null>(null);
  const [actualTime, setActualTime] = React.useState<string | null>(null);

  const handleTextFieldChange = (
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => (value: string | null, e: React.ChangeEvent) => {
    setter(value);
  };

  const handleStartTask = (taskId: string) => {
    dispatch(beginTask(taskId));
    setActiveTask(taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    if (actualTime && parseFloat(actualTime) > 0) {
      dispatch(finishTask(taskId, parseFloat(actualTime)));
      setActiveTask(null);
      setActualTime(null);
    }
  };

  const columns: Table.Column<Task>[] = [
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
      renderCell: (row) => (
        <Badge
          label={row.priority === 'low' ? 'Низкий' : row.priority === 'medium' ? 'Средний' : 'Высокий'}
          status={priorityMap[row.priority]}
          size="s"
        />
      ),
    },
    {
      title: 'Статус',
      accessor: 'status',
      width: 120,
      renderCell: (row) => (
        <Badge
          label={
            row.status === 'pending' 
              ? 'В ожидании' 
              : row.status === 'in-progress' 
                ? 'В работе' 
                : 'Завершена'
          }
          status={statusMap[row.status]}
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
      renderCell: (row) => row.actualTime || '-',
    },
    {
      title: 'Разница (ч)',
      width: 120,
      align: 'right',
      renderCell: (row) => {
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
  ];

  const actionColumn: Table.Column<Task> = {
    title: 'Действия',
    width: 200,
    renderCell: (row) => {
      if (row.status === 'completed') {
        return (
          <Button
            label="Удалить"
            view="ghost"
            size="xs"
            onClick={() => dispatch(removeTask(row.id))}
          />
        );
      }

      if (row.status === 'in-progress') {
        return (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <TextField
              type="number"
              placeholder="Факт. время (ч)"
              value={actualTime}
              onChange={handleTextFieldChange(setActualTime)}
              step="0.25"
              min="0.25"
              size="s"
              width="full"
            />
            <Button
              label="Завершить"
              size="xs"
              onClick={() => handleCompleteTask(row.id)}
              disabled={!actualTime || parseFloat(actualTime) <= 0}
            />
          </div>
        );
      }

      return (
        <Button
          label="Начать"
          size="xs"
          onClick={() => handleStartTask(row.id)}
        />
      );
    },
  };

  return (
    <Table
      columns={[...columns, actionColumn]}
      rows={tasks}
      verticalAlign="center"
      size="s"
      borderBetweenColumns
      borderBetweenRows
    />
  );
};