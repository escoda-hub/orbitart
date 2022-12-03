
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import CirclePattern from './components/CirclePattern.vue'
import {ref,reactive} from 'vue';
import VueSlider from 'vue-slider-component'

const state = reactive({
    height: window.innerHeight-100,//ディスプレイのサイズに動的に対応する
    width:  window.innerHeight-100,
});

const division =ref('1');
const delta_twist =ref('5');
const OuterCircle =ref((state.width-100)/2);
const InnerCircle =ref((state.width-600)/2);
const displayCircle =ref('true');
const lineWidth =ref('0.2');
const value =ref('1');
const data = reactive({ value: 0 })
</script>

<template>
<div id = "main">

  <div>
    <CirclePattern 
    v-bind:division="division" 
    v-bind:delta_twist="delta_twist"
    v-bind:OuterCircle="OuterCircle"
    v-bind:InnerCircle="InnerCircle"
    v-bind:displayCircle="displayCircle"
    v-bind:lineWidth="lineWidth"
    />
  </div>
  <div id = "controller">
    <h1>星織機</h1>
    <div>
      <label for="division">division[deg](少数点一桁) : </label>
      <input type="text" v-model="division" placeholder="60,120,360">
    </div>
    <div>
      <label for="delta_twist">delta_twist(0~360) : </label>
      <input type="text" v-model="delta_twist" placeholder="0~360">
    </div>
    <div>
      <label for="OuterCircle">OuterCircle : </label>
      <input type="text" v-model="OuterCircle" placeholder="60,120,360">
    </div>
    <div>
      <label for="InnerCircle">InnerCircle : </label>
      <input type="text" v-model="InnerCircle" placeholder="0~360">
    </div>
    <div>
      <label for="displayCircle">displayCircle</label>
      <input type="checkbox" v-model="displayCircle">
    </div>
    <div>
      <label for="lineWidth">lineWidth : </label>
      <input type="text" v-model="lineWidth" placeholder="">
    </div>
    <v-slider
    dense
    hint="Im a hint"
    max="-100"
    min="10"
    readonly
  ></v-slider>
  </div>

</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
