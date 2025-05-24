import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Text, Button, Stack, Flex, Spinner } from '@chakra-ui/react'
import { fetchTodos, updateTodo, deleteTodo } from '../api'

export const TodoList: React.FC = () => {
  const queryClient = useQueryClient()
  const { data: todos, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos
  })

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, { completed }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] })
  })

  if (isLoading) return <Spinner />
  if (!todos || todos.length === 0) return <Text>No todos</Text>

  return (
    <Stack gap={2}>
      {todos.map(todo => (
        <Flex key={todo.id} align="center" p={2} borderWidth={1} borderRadius="md">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleMutation.mutate({ id: todo.id, completed: !todo.completed })}
            style={{ marginRight: '8px' }}
          />
          <Text
            flex={1}
            textDecoration={todo.completed ? 'line-through' : 'none'}
            color={todo.completed ? 'gray.500' : 'inherit'}
          >
            {todo.title}
          </Text>
          <Button
            size="sm"
            colorScheme="red"
            variant="ghost"
            onClick={() => deleteMutation.mutate(todo.id)}
          >
            Delete
          </Button>
        </Flex>
      ))}
    </Stack>
  )
}
