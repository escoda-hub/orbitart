
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import CirclePattern from './components/CirclePattern.vue'
import {ref,reactive} from 'vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

const circlepattern = ref(null)
const update = () => {
  circlepattern.value.draw();
}

const state = reactive({
    height: window.innerHeight-100,//ディスプレイのサイズに動的に対応する
    width:  window.innerHeight-100,
});

const division =ref(1);
const OuterCircle =ref((state.width-100)/2);
const InnerCircle =ref((state.width-600)/2);
const displayCircle =ref(false);
const lineWidth =ref(0.2);
const plotportion =ref(50);

</script>

<template>
<div id = "main">

  <div>
    <CirclePattern 
    ref="circlepattern"
    v-bind:division="division" 
    v-bind:OuterCircle="OuterCircle"
    v-bind:InnerCircle="InnerCircle"
    v-bind:displayCircle="displayCircle"
    v-bind:lineWidth="lineWidth"
    v-bind:plotportion="plotportion"
    />
  </div>
  <div id = "controller">
    <h1>星織機</h1>
    <h3>天体軌道を応用した幾何模様ジェネレータ</h3>
    <div>
      <label for="division">円周の分割角度 : </label>
      <!-- <input type="text" v-model.number="division" > -->
      <vue-slider @change="update" v-model="division" :min=0.1 :max=1 :interval=0.01></vue-slider>
    </div>
    <div>
      <label for="OuterCircle">OuterCircle : </label>
      <vue-slider @change="update" v-model="OuterCircle" :min=1 :max=(state.height/2) :interval=0.1></vue-slider>
    </div>
    <div>
      <label for="InnerCircle">InnerCircle : </label>
      <vue-slider @change="update" v-model="InnerCircle" :min=1 :max=(state.height/2) :interval=0.1></vue-slider>
    </div>
    <div>
      <label for="displayCircle">displayCircle</label>
      <input type="checkbox" @change="update" v-model="displayCircle">
    </div>
    <div>
      <label for="lineWidth">lineWidth : </label>
      <!-- <input type="text" v-model.number="lineWidth" placeholder=""> -->
      <vue-slider @change="update" v-model="lineWidth" :min=0.01 :max=1 :interval=0.01></vue-slider>
    </div>
    <div>
      <label for="lineWidth">内円と外円のプロット位置の比: </label>
      <vue-slider @change="update" v-model="plotportion" :min=1 :max=360 :interval=1></vue-slider>
    </div>
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
