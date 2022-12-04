
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
const bgcolor = ref({r: 17, g: 17, b: 17, a: 1});
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
  <div id="spacer">
    <br>

  </div>

  <div id = "controller">
    <h1>nicolagraph</h1>
    <h4>天体軌道をモチーフにした幾何模様ジェネレータ</h4>

    <div id="paramsetting">
      <div>
        <label for="division">円周の分割角度[°]</label>
        <vue-slider @drag-end="update" @change="update" v-model="division" :min=0.1 :max=1 :interval=0.01 ></vue-slider>
      </div>
      <div>
        <label for="lineWidth">内円と外円のプロット位置の比</label>
        <vue-slider 
        @dragging="update" 
        @drag-end="update"

        v-model="plotportion" 
        :tooltip="'none'"
        :process-style="{ backgroundColor: 'orange' }"
        :min=1 
        :max=360 
        :interval=1>
        <template v-slot:dot="{ focus }">
          <div :class="['custom-dot', { focus }]"></div>
        </template>
      </vue-slider>
      </div>
      <div>
        <label for="OuterCircle">外円の直径[px]</label>
        <vue-slider @drag-end="update" @change="update" v-model="OuterCircle" :min=1 :max=(state.height/2) :interval=0.1></vue-slider>
      </div>
      <div>
        <label for="InnerCircle">内円の直径[px]</label>
        <vue-slider @drag-end="update" @change="update" v-model="InnerCircle" :min=1 :max=(state.height/2) :interval=0.1></vue-slider>
      </div>
      <div>
        <label for="lineWidth">線の太さ</label>
        <vue-slider @drag-end="update" @change="update" v-model="lineWidth" :min=0.01 :max=1 :interval=0.01></vue-slider>
      </div>
      <div>
        <label for="displayCircle">作図時の補助図形の表示</label>
        <input type="checkbox" @change="update" v-model="displayCircle">
      </div>
    </div>

    <br>
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
