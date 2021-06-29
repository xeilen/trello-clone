export default {
  methods: {
    moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
      }
      if (type === 'column') {
        this.moveColumn(e, toColumnIndex)
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
    }
  }
}
