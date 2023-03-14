<template>
  <ListItem ref="ListItem">
    <button class="btn btn-medium btn-multicolor invert font-24 flex__1" @click="$refs.ListItem.openEdit()">
      +
    </button>
  </ListItem>

  <p v-if="!list?.length" class="flex-h__center font-24 animete-danger m-v-24">List empty</p>
  <template v-else>
    <ListItem v-for="todo in list" :key="todo.id" :todo="todo">
      <template #date>
        {{ getDate(todo.date) }}
      </template>

      <template #checkbox>
        <div
          class="checkbox cursor-default"
          :class="{ completed: todo.completed }"
          :title="todo.completed ? 'Task completed' : 'Not done'"
        ></div>
      </template>

      {{ todo.text }}

      <template #button>
        <button
          class="btn btn-medium btn-danger invert"
          @click="removeTodo(todo.id)"
          title="Remove"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
            <path
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            />
          </svg>
        </button>
      </template>
    </ListItem>
  </template>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ListItem from './ToDo-List-Item.vue'

export default {
  components: {
    ListItem
  },

  props: {
    mark: {
      type: String,
      default: 'all'
    }
  },

  created() {
    this.setMark(this.mark)
  },

  computed: {
    ...mapGetters(['todos']),

    list() {
      return this.todos
    }
  },

  methods: {
    ...mapMutations(['setMark']),
    ...mapActions(['removeTodo', 'filterTodo']),

    getDate(date) {
      const formatDate = new Date(date)
      const localeDate = formatDate.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      const dateParts = localeDate.split('.')
      return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    }
  }
}
</script>
