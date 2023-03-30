import {defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore',{
    state: () => ({
        // tasks:[
        //     {id:1, title:"Buy some cloths", isfav:false},
        //     {id:2, title:"Buy me a Tea", isfav:false},
        //     {id:3, title:"play games", isfav:true},
        // ],
        tasks:[],
        isLoading: false,
        name:'Neha'
    }),
    getters:{
        fav(){
            return this.tasks.filter(el=>el.isfav)
        },
        favCount(){
            return this.tasks.reduce((preValue,currentVal)=>{
                console.log(preValue,'values',currentVal);
                return currentVal.isfav ? preValue + 1 : preValue
            }, 0)
        },
        totalCount:(state)=>{
            return state.tasks.length 
        }
    },
    actions:{
        async getTasks(){
            this.isLoading = true
            const response = await fetch("http://localhost:3000/tasks")
            const data  = await response.json();
            this.tasks = data
            this.isLoading = false
        },
        async addTask(task){
            this.tasks.push(task)
            const res = await fetch("http://localhost:3000/tasks",{
                method:"POST",
                body:JSON.stringify(task),
                headers:{'Content-type':'application/json'}
            })
            if(res.error){
                console.log(res.err);
            }
        },
        async deleteTask(id){
            console.log('deleted id===>>', id);
            this.tasks = this.tasks.filter(el => {
                if(el.id != id){
                    return el.id !== id
                }
            })
            const res = await fetch("http://localhost:3000/tasks/"+ id, {
                method:"DELETE"
            })
            if(res.error){
                console.log(res.err);
            }
        },
        async FavToggle(id){
            console.log('Fav id===>>', id);
            const task = this.tasks.find(el => el.id === id)
            task.isfav = !task.isfav
            const res = await fetch("http://localhost:3000/tasks/"+id,{
                method:"PATCH",
                body:JSON.stringify({isfav:task.isfav}),
                headers:{'Content-type':'application/json'}
            })
            if(res.error){
                console.log(res.err);
            }
        }
    },
})