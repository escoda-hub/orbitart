
<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import CirclePattern from './components/CirclePattern.vue'
import {ref,reactive} from 'vue';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

const circlepattern = ref(null)
const update = () => {
    circlepattern.value.draw();
}

const changebgColor = (color) => {
    bgcolor.value = color.rgba;
}

const changelineColor = (color) => {
    linecolor.value = color.rgba;
}

const openSucker = (isOpen) => {
  if (isOpen) {
  } else {
    this.suckerCanvas && this.suckerCanvas.remove
  }
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
const bgcolor = ref({r: 0, g: 0, b: 0, a: 0});
const linecolor = ref({r: 211, g: 211, b: 211, a: 1});

</script>

<template>
<div id="main">

  <div id="circlepattern">
    <CirclePattern 
    ref="circlepattern"
    v-bind:division="division" 
    v-bind:OuterCircle="OuterCircle"
    v-bind:InnerCircle="InnerCircle"
    v-bind:displayCircle="displayCircle"
    v-bind:lineWidth="lineWidth"
    v-bind:plotportion="plotportion"
    v-bind:bgcolor="bgcolor"
    v-bind:linecolor="linecolor"
    />
  </div>
  <div id = "controller">
    <div id="header">
      <div id="title">
          <h1>nicolagraph</h1>
          
      </div>
      <h4>天体軌道をモチーフにした幾何模様ジェネレータ</h4>
      <!-- <div id="helpbtn">
        <button  onclick="location.href=window.open('https://note.com/')">?</button>
      </div> -->

    </div>

    <div id="paramsetting">
      <div class="slider">
        <label for="division">円周の分割角度[°]</label>
        <vue-slider
        @dragging="update" 
        @drag-end="update"
        v-model="division" 
        :process-style="{ backgroundColor: 'rgb(21,94,107)' }"
        :min=0.1 
        :max=1 
        :interval=0.01 >
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
        </vue-slider>
      </div>
      <div class="slider">
        <label for="lineWidth">内円と外円の公転周期の比</label>
        <vue-slider 
        @dragging="update" 
        @drag-end="update"
        v-model="plotportion" 
        :process-style="{ backgroundColor: 'rgb(21,94,107)' }"
        :min=1 
        :max=360 
        :interval=1>
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
      </div>
      <div class="slider">
        <label for="OuterCircle">外円の直径[px]</label>
        <vue-slider 
        @dragging="update" 
        @drag-end="update"
        v-model="OuterCircle" 
        :process-style="{ backgroundColor: 'rgb(21,94,107)' }"
        :min=1 
        :max=(state.height/2) 
        :interval=0.1>
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
      </div>
      <div class="slider">
        <label for="InnerCircle">内円の直径[px]</label>
        <vue-slider 
        @dragging="update" 
        @drag-end="update"
        v-model="InnerCircle" 
        :process-style="{ backgroundColor: 'rgb(21,94,107)' }"
        :min=1 
        :max=(state.height/2) 
        :interval=0.1>
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
      </div>
      <div class="slider">
        <label for="lineWidth">線の太さ</label>
        <vue-slider 
        @dragging="update" 
        @drag-end="update"
        v-model="lineWidth" 
        :process-style="{ backgroundColor: 'rgb(21,94,107)' }"
        :min=0.01 
        :max=1 
        :interval=0.01>
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
      </div>
      <div>
        <input type="checkbox" @change="update" v-model="displayCircle">
        <label for="displayCircle">作図時の補助図形の表示</label>
      </div>
    </div>

    <div id="colorPalet">
      <div :style="{background: color}">
        <label for="ColorPicker">背景色</label>
        <ColorPicker
          theme="dark"
          :color="color"
          :sucker-hide="true"
          :sucker-canvas="suckerCanvas"
          :sucker-area="suckerArea"
          @changeColor="changebgColor"
          @openSucker="openSucker"
          @click="update"
          @change="update"
        />
      <!--  changeColor:色の変更をbgcolorに反映
            click:クリックで色が変更されたときに、canvas更新
            change:値入力から色が変更されたときに、canvas更新
      -->
      </div>
      <div :style="{background: color}">
        <label for="ColorPicker">線の色</label>
        <ColorPicker
          theme="dark"
          :color="color"
          :sucker-hide="true"
          :sucker-canvas="suckerCanvas"
          :sucker-area="suckerArea"
          @changeColor="changelineColor"
          @openSucker="openSucker"
          @click="update"
          @change="update"
        />
      <!--  changeColor:色の変更をbgcolorに反映
            click:クリックで色が変更されたときに、canvas更新
            change:値入力から色が変更されたときに、canvas更新
      -->
      </div>
    </div>
    <footer>
      <div>
          <p class="copyright">&copy; 2022 nicolagraph</p>
      </div>
      <div>
          <a href="https://twitter.com/rey88020766">contanct</a>
      </div>
    </footer>

  </div>
</div>

</template>

<style scoped>

</style>
