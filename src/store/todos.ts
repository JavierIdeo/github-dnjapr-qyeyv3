import { defineStore, acceptHMRUpdate } from 'pinia';
import { Task } from './../models/task.models';
import { generateID, sleep } from './../utils';

interface TodoState {
  tasks: Task[];
  loading: boolean;
}

export const useTodoStore = defineStore({
  id: 'todo',
  state: (): TodoState => ({
    tasks: [],
    loading: false,
  }),
  persist: {
    paths: ['tasks'],
  },
  getters: {},
  actions: {
    async addTask(name: string): Promise<void> {
      this.loading = true;
      this.tasks.push({ name, done: false, id: generateID() });
      await sleep(1000);
      this.loading = false;
    },
    async deleteTask(id: string): Promise<void> {
      this.loading = true;
      this.tasks = this.tasks.filter((task) => task.id !== id);
      await sleep(1000);
      this.loading = false;
    },
    async updateTask(id: string): Promise<void> {
      this.loading = true;
      const task = this.tasks.find((task) => task.id === id);

      if (task) {
        task.done = !task.done;
      }

      await sleep(1000);
      this.loading = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodoStore, import.meta.hot));
}
