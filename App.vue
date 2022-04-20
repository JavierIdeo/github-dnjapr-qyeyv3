<template>
  <Layout>
    <form class="form-task" v-on:submit.prevent="createTask">
      <input
        type="text"
        class="form-task__input"
        placeholder="Add new task"
        v-model="taskName"
      />
      <button class="form-task__button">Create task</button>
    </form>

    <div class="no-result" v-if="!todoStore.tasks.length && !todoStore.loading">
      <span>😧</span>
      <br />
      <strong>No items yet...</strong>
    </div>

    <template v-else-if="todoStore.tasks.length && !todoStore.loading">
      <div class="task-container">
        <div
          class="card-task"
          v-for="task in todoStore.tasks"
          v-bind:class="{ done: task.done }"
        >
          <input
            type="checkbox"
            class="card-task__checkbox"
            :checked="task.done"
            v-on:click.prevent="updateTask(task.id)"
          />

          <strong class="card-task__name">{{ task.name }}</strong>

          <button
            type="button"
            class="card-task__button"
            v-on:click.prevent="deleteTask(task.id)"
          >
            ❌
          </button>
        </div>
      </div>
    </template>

    <div class="loading-container" v-if="todoStore.loading">
      <strong>Loading...</strong>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from './layouts/default.vue';
import { defineComponent, ref } from 'vue';
import { useTodoStore } from './store/todo';

export default defineComponent({
  components: { Layout },

  setup() {
    const taskName = ref();
    const todoStore = useTodoStore();

    function createTask(): void {
      todoStore.addTask(taskName.value);
      taskName.value = '';
    }

    function deleteTask(id: string): void {
      todoStore.deleteTask(id);
    }

    function updateTask(id: string): void {
      todoStore.updateTask(id);
    }

    return {
      taskName,
      createTask,
      deleteTask,
      updateTask,

      todoStore,
    };
  },
});
</script>

<style lang="scss">
$primary-color: #3498db;
$white-color: #ffffff;
$gray-color: #f1f1f1;
$border: 10px;
$padding: 10px;

.form-task {
  width: 100%;
  display: flex;

  &__input {
    all: initial;
    width: calc(65% - 1rem);
    background-color: $gray-color;
    padding: $padding;
    border-radius: $border;
  }

  &__button {
    all: initial;
    width: 35%;
    background-color: $primary-color;
    border-radius: $border;
    padding: $padding;
    color: $white-color;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    margin-left: 1rem;
  }
}

.no-result,
.loading-container {
  text-align: center;

  span {
    font-size: xx-large;
  }
}

.task-container {
  width: 100%;

  .card-task {
    background: $gray-color;
    border-radius: $border;
    padding: $padding;
    margin-bottom: 1rem;

    &__checkbox {
      transition: all 0.4 ease;
    }

    &__name {
      text-transform: uppercase;
      margin-left: 1rem;
    }

    &.done {
      .card-task__name {
        text-decoration: line-through;
        opacity: 0.7;
      }
    }

    &__button {
      all: initial;
      float: right;
      cursor: pointer;
    }
  }
}
</style>
