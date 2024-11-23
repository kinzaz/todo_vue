<template>
  <div id="app">
    <h1>Todo App</h1>
    <div class="container">
      <TodoForm @addTask="addTask" />
      <TodoList :todos="todos" @deleteTask="deleteTask" @updateCompleted="updateCompleted" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted,ref} from 'vue';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';
import taskService,{type Task} from './services/taskService';

const todos = ref<Task[]>([]);

const loadTodos = async () => {
  todos.value = await taskService.getAllTasks();
};
const addTask = async (task: Omit<Task, 'id' | 'completed'>) => {
  const newTask = await taskService.addTask(task)
  todos.value.push(newTask);
}

const deleteTask = async (idDeleted: number) => {
  try {
   const {id} = await taskService.deleteTask(idDeleted); 
   if (id) {
     todos.value = todos.value.filter(task => task.id !== idDeleted); 
    }
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
  }
};

const updateCompleted = async (id: number, isCompleted: boolean) => {
  try {
    const task = await taskService.updateCompletedTask(id, isCompleted)
    if (task) {
      todos.value = todos.value.map(todo=> todo.id === task.id ? {...todo, completed: task.completed} : todo)
    }
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
  }
}

onMounted(() => {
  loadTodos();
});
</script>

<style scoped>
#app {
  padding: 2rem;
}
.container {
  display: grid;
  grid-template-columns: 20vw 40vw;
  column-gap: 2rem;
  
}
</style>