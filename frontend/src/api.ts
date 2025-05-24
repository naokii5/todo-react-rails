import axios from 'axios'
import type { Todo, CreateTodoRequest } from './types'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get('/todos')
  return data
}

export const createTodo = async (todo: CreateTodoRequest): Promise<Todo> => {
  const { data } = await api.post('/todos', { todo })
  return data
}

export const updateTodo = async (id: number, fields: Partial<Todo>): Promise<Todo> => {
  const { data } = await api.patch(`/todos/${id}`, { todo: fields })
  return data
}

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`)
}
