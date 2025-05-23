module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: %i[show update destroy]

      # GET /todos
      def index
        @todos = Todo.order(created_at: :desc)
        render json: @todos
      end

      # GET /todos/:id
      def show
        render json: @todo
      end

      # POST /todos
      def create
        @todo = Todo.new(todo_params)
        if @todo.save
          render json: @todo, status: :created
        else
          render json: { errors: @todo.errors }, status: :unprocessable_entity
        end
      end

      #UPDATE /todos/:id
      def update
        if @todo.update(todo_params)
          render json: @todo
        else
          render json: { errors: @todo.errors }, status: :unprocessable_entity
        end
      end

      # DELETE /todos/:id
      def destroy
        @todo.destroy
        head :no_content
      end

      private
      def set_todo
        @todo = Todo.find(params[:id])
      end

      def todo_params
        params.require(:todo).permit(:title, :detail, :completed)
      end
    end
