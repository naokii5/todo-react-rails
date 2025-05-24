import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

  if (isLoading) return <div>Loading...</div>
  if (!todos || todos.length === 0) return <div>No todos</div>

  return (
    <ul className="space-y-2">
      {todos.map(todo => (
        <li key={todo.id} className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleMutation.mutate({ id: todo.id, completed: !todo.completed })}
            className="mr-2"
          />
          <span className={todo.completed ? 'line-through text-gray-500' : ''}>
            {todo.title}
          </span>
          <button
            onClick={() => deleteMutation.mutate(todo.id)}
            className="ml-auto text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
