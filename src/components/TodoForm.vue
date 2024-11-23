<template>
  <div>
    <fieldset>
      <legend>Создание</legend>
      <form @submit.prevent>
        <label>
          <span>Название задачи:</span>
          <input v-model="task.title" type="text" />
        </label>
        <label>
          <span>Описание задачи:</span>
          <textarea v-model="task.description" type="text"></textarea>
        </label>
        <div class='actions'>
          <button @click="submitTask">Создать</button>
          <button @click="resetFields">Очистить</button>
        </div>
      </form>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
const emit = defineEmits(['addTask']);


const task = reactive({
  title: '',
  description: '',
});

const submitTask = () => {
  emit('addTask', { ...task });
  task.title = '';
  task.description = '';
}

const resetFields = (event: Event) => {
  event.preventDefault();
  task.title = "";
  task.description = "";
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
input, textarea {
  display: block;
  width: 80%;
}
.actions {
  display: flex;
  gap: 10px;
}
</style>