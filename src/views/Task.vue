<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow item-start justify-between px-4">
      <input
        type="text"
        :value="task.name"
        class="p-2 w-full mr-2 block text-xl font-bold"
        @change="updateTaskProperty($event, 'name')"
      >

      <textarea
        :value="task.description"
        class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
        @change="updateTaskProperty($event, 'description')"
        @keydown.enter="closeModal($event, 'description')"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      console.log(this.$route.params.id)
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.dispatch('updateTask', {
        task: this.task,
        value: e.target.value,
        key
      })
    },
    closeModal (e, key) {
      if (e.ctrlKey || e.onmousedown) {
        this.updateTaskProperty(e, key)
        this.$emit('test')
        // this.$router.push({ name: 'board' })
      }
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
