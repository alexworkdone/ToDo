<template>
  <g-tabs>
    <template v-slot:All>
      <list />
    </template>
    <template v-slot:Deadline>
      <list mark="deadline" />
    </template>
    <template v-slot:Completed>
      <list mark="completed" />
    </template>
  </g-tabs>
</template>

<script>
import { mapActions } from 'vuex'
import GTabs from './components/GTabs.vue'
import List from './components/ToDo-List.vue'
// import ListItem from './components/ToDo-List-Item.vue'

export default {
  name: 'App',

  components: {
    GTabs,
    List,
    // ListItem
  },

  created() {
    this.getLocalstorage()
  },

  methods: {
    ...mapActions(['getLocalstorage'])
  }
}
</script>
