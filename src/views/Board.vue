<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <div
        class="column"
        v-for="(column, columnIndex) in board.columns"
        :key="column.name"
        draggable
        @dragstart.self="pickupColumn($event, columnIndex)"
        @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <div
            class="task"
            v-for="(task, taskIndex) in column.tasks"
            :key="task.id"
            @click="goToTask(task)"
            draggable
            @dragover.prevent
            @dragenter.prevent
            @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex )"
            @dragstart="pickupTask($event, taskIndex, columnIndex)"
          >
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">{{ task.description }}</p>
          </div>
          <input
            type="text"
            placeholder="+ type task"
            class="block p-2 w-full bg-transparent"
            @keyup.enter="createTask($event, column.tasks)"
          >
        </div>
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-bg" @click.self="close">
      <router-view @test="close"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      board: state => state.board
    }),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    goToTask (task) {
      this.$router.push({
        name: 'task', params: { id: task.id }
      })
    },
    close () {
      this.$router.push({ name: 'board' })
    },
    createTask (e, tasks) {
      this.$store.dispatch('addTask', { tasks, name: e.target.value })
      e.target.value = ''
    },
    pickupTask (e, taskIndex, fromColumnIndex) {
      // console.log(taskIndex)
      // console.log(fromColumnIndex)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },
    moveTask (e, toTasks, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.dispatch('moveTask', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex
      })
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.dispatch('moveColumn', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      }
      if (type === 'column') {
        this.moveColumn(e, toColumnIndex)
      }
    }
  }
}
</script>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}

.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
