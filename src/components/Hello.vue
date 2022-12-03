<script setup>
import {ref,reactive} from 'vue';

const count = ref(5);
const state = reactive({
  count:1,
});

const addRefCount = () => {
  count.value++;
};

const addReactiveCount = () => {
  state.count++;
  console.log("hi");
};

//コンポーネントへの引数
const props = defineProps({
  message: String,
  name: String,
  price: Number,
  isAdmin:Boolean,
});

const hiha = reactive({
  flag:true,
});


</script>

<template>
  <h2>パラメータ</h2>
  <p>Ref Count:{{ count }}</p>
  <p>Reactive Count:{{ state.count }}</p>
  <p>{{message}} {{name}} {{price + 100}}</p>
  <p v-if="props.isAdmin">管理者です。</p>
  <p v-else>管理者ではありません。</p>
  <p v-if="hiha.flag">hiha</p>
  <div>
    <button @click="addRefCount">Ref Count+</button>
    <button @click="addReactiveCount">Reactive Count+</button>
  </div>
</template>