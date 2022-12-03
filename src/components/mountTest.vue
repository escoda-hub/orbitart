<template>
  <div id="app">
    <!-- <button v-on:click="buttonClicked">クリック</button> -->
</div>
</template>

<script>


let app = new Vue({
        el: '#app',
        data(){
            return {
            }
        },
        methods: {
            buttonClicked(){
                window.alert('クリックしましたね')
            }
        }
    })



</script>