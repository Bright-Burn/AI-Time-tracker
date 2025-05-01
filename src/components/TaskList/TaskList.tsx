// src/components/TaskList/TaskList.tsx
import React from 'react';
import { Table } from '@consta/uikit/Table';
import { Text } from '@consta/uikit/Text';
import { useTaskList } from '../../hooks//useTaskList';

export const TaskList: React.FC = () => {
  const {
    columns,
    actionColumn,
    tasks,
    loading,
    error
  } = useTaskList();

  if (loading) return <Text>Загрузка...</Text>;
  if (error) return <Text view="alert">{error}</Text>;

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