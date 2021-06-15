import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: '',
        checked: false
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      // console.log(task, 'task in store')
      if (task) {
        task[key] = value
      }
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex, isChecked }) {
      console.log(fromTasks)
      if (isChecked) {
        const tasksToMove = fromTasks.filter(task => task.checked)
        fromTasks = fromTasks.filter(task => !task.checked)
        console.log(fromTasks)
        console.log(...tasksToMove)
        toTasks.splice(toTaskIndex, 0, ...tasksToMove)
      } else {
        const taskToMove = fromTasks.splice(fromTaskIndex, 1)
        console.log(...taskToMove)
        toTasks.splice(toTaskIndex, 0, ...taskToMove)
      }
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
      console.log(columnList)
    }
  },
  actions: {
    addTask ({ commit }, { tasks, name }) {
      commit('CREATE_TASK', { tasks, name })
    },
    updateTask ({ commit }, { task, value, key }) {
      console.log('up')
      commit('UPDATE_TASK', { task, value, key })
    },
    moveTask ({ commit }, { fromTasks, toTasks, fromTaskIndex, toTaskIndex, isChecked }) {
      commit('MOVE_TASK', { fromTasks, toTasks, fromTaskIndex, toTaskIndex, isChecked })
    },
    moveColumn ({ commit }, { fromColumnIndex, toColumnIndex }) {
      commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
    }
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  }
})
