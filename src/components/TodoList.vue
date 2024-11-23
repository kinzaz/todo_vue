<template>
  <div class="todo-list">
    <ul>
      <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id" @deleteTask="deleteTask" @updateCompleted="updateCompleted" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {Task} from '@/services/taskService';
import {defineProps} from 'vue';
import TodoItem from './TodoItem.vue';

const props = defineProps<{
  todos: Task[];
}>();

const emit = defineEmits();

const deleteTask = (id: number) => {
  emit('deleteTask', id);
};
const updateCompleted = (id: number, isCompleted: boolean) => {
  emit('updateCompleted', id, isCompleted); 
};
</script>

<style scoped>
.todo-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

ul {
  padding: 0;
}
</style>