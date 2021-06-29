<template>
  <div
    class="task"
    :draggable="true"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex )"
    @dragstart="pickupTask($event, taskIndex, columnIndex, task.checked)"
    @click="goToTask(task)"
  >
    <span
      class="w-full font-bold"
    >
      {{ task.name }}
      <input
        type="checkbox"
        :checked="task.checked"
        @click.stop="updateCheckedStatus($event, 'checked', task.id)"
      >
    </span>
    <p
      v-if="task.description"
      class="w-full flex-no-shrink mt-1 text-sm"
    >
      {{ task.description }}
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moveTaskOrColumnMixin from '../mixins/moveTaskOrColumnMixin'

export default {
  name: 'TaskInColumn',
  mixins: [moveTaskOrColumnMixin],
  computed: {
    ...mapState(['board'])
  },
  props: {
    taskIndex: {
      type: Number
    },
    columnIndex: {
      type: Number
    },
    task: {
      type: Object
    },
    column: {
      type: Object
    }
  },
  methods: {
    pickupTask (e, taskIndex, fromColumnIndex, isChecked) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
      e.dataTransfer.setData('is-checked', isChecked)
    },
    updateCheckedStatus (e, key, taskId) {
      this.$store.dispatch('updateTask', {
        task: this.$store.getters.getTask(taskId),
        value: e.target.checked,
        key
      })
    },
    goToTask (task) {
      this.$router.push({
        name: 'task', params: { id: task.id }
      })
    }
  }
}
</script>

<style scoped>
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
