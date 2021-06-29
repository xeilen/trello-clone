<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="column.name"
        :columnIndex="columnIndex"
        :column="column"
      />
      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        >
      </div>
    </div>
    <div v-if="isTaskOpen" class="task-bg" @click.self="close">
      <router-view @test="close"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '../components/BoardColumn'
export default {
  components: { BoardColumn },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState({
      board: state => state.board
    }),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    createColumn () {
      this.$store.dispatch('addColumn', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    },
    close () {
      this.$router.push({ name: 'board' })
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
