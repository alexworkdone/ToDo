<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button v-for="(tab, index) in tabs" :key="index" class="btn btn-big btn-multicolor invert" :class="{ active: currentTab === index }" @click="currentTab = index">{{ tab }}</button>
    </div>
    <div class="tab-content">
      <slot :name="tabs[currentTab]"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data:() => ({
      currentTab: 0,
      tabs: ["All", "Deadline", "Completed"]
  }),
};
</script>
