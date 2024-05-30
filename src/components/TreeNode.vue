<template>
  <li :style="{ '--bg-color': backgroundColor }">
    <div @click="toggle" class="node">
      <div class="titleBack">/</div>
      <span :class="{'arrow': true, 'arrow-down': isExpanded, 'arrow-right': !isExpanded}"></span>
      <span class="title">{{ node.title }}</span>
    </div>
    <ul v-if="isExpanded">
      <TreeNode v-for="child in children" :key="child.id" :node="child" :allNodes="allNodes" :level="level + 1" />
    </ul>
  </li>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  node: Object,
  allNodes: Array,
  level: {
    type: Number,
    default: 0
  }
});

const isExpanded = ref(false);
const children = ref([]);
const backgroundColor = computed(() => props.level % 2 === 0 ? '#ebebeb' : '#ffffff');

watch(() => props.node, () => {
  children.value = props.allNodes.filter(n => n.parent_id === props.node.id);
}, { immediate: true });

const toggle = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<style scoped>
.titleBack{
  position: absolute;
  background-color: var(--bg-color);
  width: 100%;
  height: 100%;
  color: var(--bg-color);
  z-index: 0;
  transform: translateX(-10px);
}
.title{
  margin-left: 5px;
  z-index: 1;
}
li {
  list-style: none;
}
ul{
  margin-left: 40px;
}
:root {
  --bg-color: #f9f9f9;
}

.node {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 15px;
  padding-left: 10px;

}

.arrow {
  margin-right: 5px;
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  transform: rotate(45deg);
  transition: transform 0.2s;
}

.arrow-down {
  transform: rotate(45deg);
}

.arrow-right {
  transform: rotate(-45deg);
}
</style>
