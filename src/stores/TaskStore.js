import {defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore',{
    state: () => ({
        tasks:[
            {id:1, title:"Buy some cloths", isfav:false},
            {id:2, title:"Buy me a Tea", isfav:false},
            {id:3, title:"play games", isfav:true},
        ],
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
        addTask(task){
            this.tasks.push(task)
        },
        deleteTask(id){
            console.log('deleted id===>>', id);
            this.tasks = this.tasks.filter(el => {
                if(el.id != id){

                    return el.id !== id
                }
            })
        },
        FavToggle(id){
            console.log('Fav id===>>', id);
            const task = this.tasks.find(el => el.id === id)
            task.isfav = !task.isfav
        }
    },
})