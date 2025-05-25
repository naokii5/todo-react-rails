class MakeUserIdNotNullOnTodos < ActiveRecord::Migration[8.0]
  def change
    change_column_null :todos, :user_id, false
  end
end
