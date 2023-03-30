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
  </nav>

  <!-- TaskList -->

  <div class="task-list" v-if="filter==='all'">
    <p>you have {{ TaskStore.totalCount }} total Tasks  </p>
    <div v-for="task in TaskStore.tasks" :key="task">
      <TaskDetailVue :task="task"/>
    </div>
  </div>

  <div class="task-list"  v-if="filter==='fav'">
    <p>you have {{ TaskStore.favCount }} favorite Tasks </p>
    <div v-for="task in TaskStore.fav" :key="task">
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
  export default {
    components:{TaskDetailVue,TaskForm},
    setup(){
      const TaskStore = useTaskStore()
      const filter = ref('all')
      return {TaskStore , filter}
    }
  }
</script>