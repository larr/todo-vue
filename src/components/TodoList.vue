<template>
  <div>
        <div class="name-container">
            Welcome, {{ name }}
        </div>
        <input 
        type="text" 
        class="todo-input" 
        placeholder="What needs to be done" 
        v-model="newTodo"
        @keyup.enter="addTodo">

        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">

        <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id" :todo="todo" :index="index" :checkAll="!anyRemaining"/>

        </transition-group>

        <div class="extra-container">
            <todo-check-all></todo-check-all>
            <todo-items-remaining></todo-items-remaining>
        </div>

        <div class="extra-container">
            <todo-filtered />

            <div>
                <transition name="fade">
                    <todo-clear-completed></todo-clear-completed>
                </transition>
            </div>
        </div>

  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
    name: 'todo-list',
    components: {
        TodoItem,
        TodoItemsRemaining,
        TodoCheckAll,
        TodoFiltered,
        TodoClearCompleted
    },
    data() {
      return {
            newTodo: '',
            idForTodo: 3,
            name: '',
            
      }
    },
    created() {
        // eventBus.$on('removedTodo', (index) => this.removeTodo(index))
        // eventBus.$on('finishedEdit', (data) => this.finishedEdit(data))
        // eventBus.$on('checkAllChanged', (checked) => this.checkAllTodos(checked))
        // eventBus.$on('filterChanged', (filter) => this.$store.state.filter = filter)
        // eventBus.$on('clearCompletedTodos', () => this.clearCompleted())
        this.$store.dispatch('retrieveTodos')
        this.$store.dispatch('retrieveName')
            .then(response => {
                this.name = response.data.name
            })

    },
    beforeDestroy() {
        // eventBus.$off('removedTodo', (index) => this.removeTodo(index))
        // eventBus.$off('finishedEdit', (data) => this.finishedEdit(data))
        // eventBus.$off('checkAllChanged', (checked) => this.checkAllTodos(checked))
        // eventBus.$off('filterChanged', (filter) => this.$store.state.filter = filter)
        // eventBus.$off('clearCompletedTodos', () => this.clearCompleted())
    },
    computed: {
        anyRemaining() {
            return this.$store.getters.anyRemaining
        },
        todosFiltered() {
            return this.$store.getters.todosFiltered
        }
    },
    methods: {

        addTodo() {
            if(this.newTodo.trim().length == 0) {
                return
            }

            this.$store.dispatch('addTodo', {
                id: this.idForTodo,
                title: this.newTodo,
                completed: false,
            })

            this.newTodo = ''
            this.idForTodo++
        },

        // removeTodo(id) {
        //     const index = this.$store.state.todos.findIndex(item => item.id == id);
        //     this.$store.state.todos.splice(index, 1);
        // },

        checkAllTodos() {
            this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked);
        },

        clearCompleted() {
            this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed);
        },

        finishedEdit(data) {
            const index = this.$store.state.todos.findIndex(item => item.id == data.id)
            this.$store.state.todos.splice(data.index, 1, data.todo)
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .todo-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 0;
        }
    }

    .todo-item {
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        animation-duration: 0.3s
    }

    .remove-item {
        cursor: pointer;
        margin-left: 14px;
        &:hover {
            color: black;
        }
    }

    .todo-item-left {
        display: flex;
        align-items: center;
    }

    .todo-item-label {
        padding: 10px;
        border: 1px solid white;
        margin-left: 12px;
    }

    .todo-item-edit {
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;

        &:focus {
            outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: grey;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    .name-container {
        margin-bottom: 16px;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        padding: 4px;

        &:hover {
            background: lightgreen;
        }

        &:focus {
            outline: none;
        }
    }

    .active {
        background: lightgreen;
    }

    .fade-enter-active, fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }


</style>
