<template>
<main>
  <!-- Header -->

  <header>
    <img src="./assets/logo.svg" alt="pinia_logo">
    <h1>{{ TaskStore.name }} </h1>
  </header>

  <!-- new task form -->
  <div class="new-task-form">
    <TaskForm/>
  </div>

  <!-- filter -->

  <nav class="filters">
    <button @click="filter = 'all'">All Task</button>
    <button @click="filter = 'fav'">Fav Task</button>
    <button @click="TaskStore.$reset">Reset State</button>
  </nav>

  <!-- loading -->
  <div class = "loading" v-if="isLoading">Loading data...</div>
  <!-- TaskList -->

  <div class="task-list" v-if="filter==='all'">
    <p>you have {{ totalCount }} total Tasks  </p>
    <div v-for="task in tasks" :key="task">
      <TaskDetailVue :task="task"/>
    </div>
  </div>

  <div class="task-list"  v-if="filter==='fav'">
    <p>you have {{ favCount }} favorite Tasks </p>
    <div v-for="task in fav" :key="task">
      <TaskDetailVue :task="task"/>
    </div>
  </div>
</main>
</template>

<script>
import { ref } from 'vue';
import TaskDetailVue from './components/TaskDetail.vue';
import TaskForm from './components/TaskForm.vue';
import { useTaskStore } from './stores/TaskStore';
import { storeToRefs } from 'pinia';
  export default {
    components:{TaskDetailVue,TaskForm},
    setup(){
      const TaskStore = useTaskStore()
      const { tasks, isLoading,fav,totalCount,favCount} = storeToRefs(TaskStore)

      // fetch task by calling action
      TaskStore.getTasks()

      const filter = ref('all')
      return {TaskStore , filter, tasks, isLoading, fav, totalCount, favCount}
    }
  }
</script>