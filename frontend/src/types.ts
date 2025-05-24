export interface Todo {
  id: number
  title: string
  detail: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface CreateTodoRequest {
  title: string
  detail: string
  completed: boolean
}
