<template>
  <div
    class="column"
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
      <TaskInColumn
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
        :task="task"
        :column="column"
      />
      <input
        type="text"
        placeholder="+ type task"
        class="block p-2 w-full bg-transparent"
        @keyup.enter="createTask($event, column.tasks)"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskInColumn from './TaskInColumn'

export default {
  name: 'BoardColumn',
  components: { TaskInColumn },
  props: {
    column: {
      type: Object
    },
    columnIndex: {
      type: Number
    }
  },
  computed: {
    ...mapState(['board'])
  },
  methods: {
    createTask (e, tasks) {
      if (e.target.value.length) {
        this.$store.dispatch('addTask', { tasks, name: e.target.value })
        e.target.value = ''
      }
    },
    moveTask (e, toTasks, toTaskIndex) {
      const isChecked = JSON.parse(e.dataTransfer.getData('is-checked'))
      console.log(isChecked)
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')

      this.$store.dispatch('moveTask', {
        fromTasks,
        toTasks,
        fromTaskIndex,
        toTaskIndex,
        isChecked: isChecked
      })
    },
    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.dispatch('moveColumn', {
        fromColumnIndex,
        toColumnIndex
      })
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
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

<style scoped>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
