<template>
  <div class="checkbox-container" :title="isChecked ? 'Task completed' : 'Not done'">
    <input :id="getId" type="checkbox" v-model="isChecked" />
    <label :for="getId" class="checkbox"></label>
  </div>
</template>

<script>
export default {
  name: 'GCheckbox',

  props: {
    checked: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isChecked: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit('save-checked', val);
      }
    },

    getId() {
      return Math.random();
    },
  },
};
</script>

<style>
.checkbox-container {
  position: relative;
  flex-shrink: 0;
}

.checkbox {
  margin-right: 16px;
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border: 2px solid var(--multicolor);
  border-radius: 4px;
  font-size: 0;
  cursor: pointer;
}

input[type='checkbox'] {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

.checkbox.completed::before,
input[type='checkbox']:checked + .checkbox::before {
  display: block;
}

.checkbox::before {
  display: none;
  content: '';
  position: absolute;
  top: 5px;
  left: 3px;
  width: 14px;
  height: 7px;
  border-width: 0 0 2px 2px;
  border-style: solid;
  border-color: var(--multicolor);
  transform: rotate(-45deg);
}
</style>
