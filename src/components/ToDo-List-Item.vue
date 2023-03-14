<template>
  <div class="list-item" :class="{ edit: isEdit }">
    <div class="list-item-info">
      <div v-if="this.$slots.date" class="date">
        <slot name="date"></slot>
      </div>

      <slot name="checkbox"></slot>

      <div class="details">
        <slot></slot>
      </div>

      <div v-if="this.$slots.button" class="btns">
        <button v-if="showEditBtn" class="btn btn-medium btn-multicolor invert" @click="openEdit" title="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
            />
          </svg>
        </button>
        <slot name="button"></slot>
      </div>
    </div>

    <div class="list-item-form">
      <input type="date" v-model="getDate" placeholder="Add date deadline here..." />

      <g-checkbox :checked="editToDo?.completed" @save-checked="editToDo.completed = $event" />

      <div class="details">
        <textarea v-model="editToDo.text" placeholder="Write the task here..."></textarea>
      </div>

      <div class="btns">
        <button class="btn btn-medium btn-white invert" @click="cancel">Cancel</button>
        <button class="btn btn-medium btn-success invert" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GCheckbox from './GCheckbox.vue'

export default {
  components: {
    GCheckbox
  },

  props: {
    todo: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    isEdit: false,
    tempToDo: null,
    newToDo: {
      text: '',
      date: new Date().getTime(),
      completed: false
    }
  }),

  computed: {
    ...mapState(['mark']),

    getDate: {
      get() {
        return this.formatDate(this.editToDo?.date)
      },
      set(date) {
        this.editToDo.date = new Date(date).getTime()
      }
    },

    editToDo() {
      return !this.todo.id ? this.newToDo : this.todo
    },

    showEditBtn() {
      return this.editToDo.id && this.mark === 'all'
    }
  },

  methods: {
    ...mapActions(['addTodo']),

    formatDate(date) {
      const tempDate = new Date(date)
      const inputDate = tempDate.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
      const dateParts = inputDate.split('.')
      return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    },

    show() {
      this.isEdit = true
    },

    hide() {
      this.isEdit = false
    },

    clearEditToDo() {
      this.editToDo.text = ''
      this.editToDo.completed = false
      this.editToDo.date = new Date().getTime()
    },

    openEdit() {
      if (!this.editToDo.id) {
        this.clearEditToDo()
      }
      this.tempToDo = JSON.stringify(this.editToDo)
      this.show()
    },

    cancel() {
      if (this.editToDo?.id) {
        this.addTodo(JSON.parse(this.tempToDo))
      } else {
        this.clearEditToDo()
      }
      this.hide()
    },

    save() {
      if (!this.editToDo.text) return
      this.addTodo(this.editToDo)
      this.hide()
    }
  }
}
</script>

<style>
.list-item {
  margin-bottom: 16px;
  position: relative;
  background-color: var(--color-background-mute);
  border-radius: var(--border-radius);
  border: 1px solid var(--multicolor);
}

.list-item-info,
.list-item-form {
  padding: 1rem;
  min-height: 70px;
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent);
}

.list-item-info {
  position: relative;
  opacity: 1;
  visibility: visible;
}

.list-item-form {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

.list-item.edit .list-item-info {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

.list-item.edit .list-item-form {
  position: relative;
  opacity: 1;
  visibility: visible;
}

.list-item .date {
  flex-shrink: 0;
  width: 100px;
}

.details {
  flex: 1;
  display: flex;
  color: var(--vt-c-white);
}

@media (max-width: 620px) {
  .list-item-form,
  .list-item-info {
    flex-direction: column;
  }

  .list-item-info > * + *,
  .list-item-form > * + * {
    margin: 16px 0 0;
  }

  .list-item-info .date {
    margin-right: auto;
  }

  .list-item-form input[type='date'] {
    width: 100%;
    margin: 0;
  }

  .list-item-form .checkbox {
    margin-right: 0;
  }

  .list-item-info .details,
  .list-item-form .details {
    width: 100%;
  }

  .list-item-info .details {
    font-size: 20px;
  }

  .list-item-info .btns,
  .list-item-form .btns {
    margin-top: 16px;
    width: calc(100% + 16px);
  }

  .list-item-info .btn,
  .list-item-form .btn {
    flex: 1;
  }

  .list-item-form textarea {
    margin: 0;
    min-height: 72px;
  }
}
</style>
