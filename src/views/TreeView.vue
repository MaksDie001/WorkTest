<template>
  <div>
    <ul>
      <TreeNode v-for="node in rootNodes" :key="node.id" :node="node" :allNodes="allNodes" />
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TreeNode from '../components/TreeNode.vue';
import listServices from "@/services/listServices.js";
const rootNodes = ref([]);
const allNodes = ref([]);
const expandedNodes = ref(new Set());
const fetchData = async () => {
  try {
    allNodes.value = await listServices.fetchAll();
    rootNodes.value = allNodes.value.filter(node => node.parent_id === null);
  } catch (error) {
    console.error('Error fetching data', error);
  }
};


onMounted(fetchData);
</script>
<style scoped>
ul{
  margin: 25px 0;
  padding: 0;
}
</style>