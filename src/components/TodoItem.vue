<template>
  <li class="todo-item">
    <input v-model="todo.completed" type="checkbox" @change="updateCompleted(todo.id, todo.completed)" />
    <div class="todo-content">
      <h3>{{ todo.title }}</h3>
      <h5>{{ todo.description }}</h5>
    </div>
    <button class="delete-btn" @click="deleteTodo(todo.id)">
      <span class="delete-icon">&times;</span>
    </button>
  </li>
</template>

<script setup lang="ts">
import type {Task} from '@/services/taskService';

const props = defineProps<{ todo: Task }>()
const emit = defineEmits();

const deleteTodo = (id: number) => {
  emit('deleteTask', id);
};

const updateCompleted = (id: number, isCompleted: boolean) => {
  emit('updateCompleted', id, isCompleted); 
};

</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-content {
  flex-grow: 1;
  margin-left: 1rem;
}

.delete-btn {
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-icon {
  font-size: 24px;
  color: #ff4d4d;
  font-weight: bold;
}

input[type="checkbox"] {
  transform: scale(1.2);
  cursor: pointer;
}
</style>