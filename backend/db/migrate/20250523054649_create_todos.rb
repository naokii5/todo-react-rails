class CreateTodos < ActiveRecord::Migration[8.0]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.text :detail
      t.boolean :completed, null: false, default: false

      t.timestamps
    end
  end
end
