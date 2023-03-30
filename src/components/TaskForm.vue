<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" placeholder="add some task from here......." v-model="newTask">
        <button>Add</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
    export default {
        setup(){
            const TaskStore = useTaskStore()

            const newTask = ref('')

            const handleSubmit = () => {
                if(newTask.value.length > 0){
                    TaskStore.addTask({
                        title:newTask.value,
                        isfav:false,
                        id:Math.floor(Math.random()*10000)
                    })
                    newTask.value = ''
                }
            }
            return {handleSubmit, newTask}
        }
    }
</script>