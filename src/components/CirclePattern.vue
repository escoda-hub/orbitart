<script setup>
import {Line} from "./Line.js";
import { ref, reactive,onMounted, onUnmounted ,onErrorCaptured } from 'vue';

    const state = reactive({
        height: window.innerHeight-100,//ディスプレイのサイズに動的に対応する
        width:  window.innerHeight-100,
    });

    //コンポーネントへの引数
    const props = defineProps({
      division: Number,
      OuterCircle: Number,
      InnerCircle: Number,
      displayCircle: Boolean,
      lineWidth: Number,
      plotportion: Number,
      bgcolor:Object,
      linecolor:Object,
    });

    //canvasに図形を描画する
    const draw = () => {
        removeClassElement();
        const s = function (p5) {
        var radius_out;//外円の半径
        var radius_in;//内円の半径
        var angle;
        var division = 0.1;//回転する速さ
        var twist;
        var lineWidth;
        var plotportion;
        var LineLists = [];

        // 四捨五入
        function roundDecimal(value, n) {
          return Math.round(value * Math.pow(10, n) ) / Math.pow(10, n);
        }

        // 最初に一回実行される
        p5.setup = _ => {
          var canvas = p5.createCanvas(state.width, state.height)
          canvas.parent("p5Canvas");// キャンバスを作成
          p5.noStroke();// 図形の線無し
          p5.background(props.bgcolor.r,props.bgcolor.g,props.bgcolor.b,(props.bgcolor.a)*255)
          radius_out = Number(props.OuterCircle);
          radius_in = Number(props.InnerCircle);
          twist = 0;
          lineWidth = parseFloat(props.lineWidth);
          angle = -90;
          p5.noLoop();
        }

        // 1フレーム（1/60秒）ごとに実行される
        p5.draw = _ => {
          p5.drawOneRound();
        }

        p5.drawOneRound = () =>{
          plotportion = props.plotportion;//0~360
          division = props.division;

          //描画線の生成
          while (roundDecimal(angle,3) < 270.0){
            var lineInstance = new Line();
            lineInstance.setP1x = radius_out*p5.cos(p5.radians(angle)) + state.width/2; 
            lineInstance.setP1y = radius_out*p5.sin(p5.radians(angle)) + state.height/2; 
            lineInstance.setP2x = radius_in*p5.cos(p5.radians(angle+twist*division))+state.width/2; 
            lineInstance.setP2y = radius_in*p5.sin(p5.radians(angle+twist*division))+state.height/2; 
            LineLists.push(lineInstance);
            angle += division;
            twist += plotportion;
          }

          //描画処理
          p5.background(props.bgcolor.r,props.bgcolor.g,props.bgcolor.b,(props.bgcolor.a)*255)
          
          if(props.displayCircle){
            p5.noFill();
            p5.stroke(80);//円周の色
            p5.strokeWeight(6);
            p5.ellipse(state.width/2, state.height/2, radius_out*2, radius_out*2);//外円
            p5.ellipse(state.width/2, state.height/2, radius_in*2, radius_in*2);//内円
          }

          p5.strokeWeight(lineWidth);
          p5.stroke(props.linecolor.r,props.linecolor.g,props.linecolor.b,(props.linecolor.a)*255);//line color
          LineLists.forEach((value, index, array) => {
            value.draw(p5);
          });
        }
      }
      var myp5 = new p5(s);// インスタンスモードとしてp5クラスを実行
    };

    defineExpose({
      draw
    })

    //canvasを初期化する。
    const initialize = ()=>{
      removeClassElement();
      const s = function (p5) {
          p5.setup = _ => {
            var canvas = p5.createCanvas(state.width, state.height)
            canvas.parent("p5Canvas");// キャンバスを作成
            p5.background(props.bgcolor.r,props.bgcolor.g,props.bgcolor.b,(props.bgcolor.a)*255)
          }
      }
      var myp5 = new p5(s);// インスタンスモードとしてp5クラスを実行
    };

      //canvasを保存する。
    const save = ()=>{
      // var canvas = document.getElementById(canvas_id);
      var canvas = document.getElementsByClassName("p5Canvas");
      //アンカータグを作成
      var a = document.createElement('a');
      //canvasをJPEG変換し、そのBase64文字列をhrefへセット
      // a.href = canvas[0].toDataURL('image/jpeg', 0.85);
      a.href = canvas[0].toDataURL('image/png');
      //ダウンロード時のファイル名を指定
      a.download = 'download.png';
      //クリックイベントを発生させる
      a.click();
    };

    //既存のcanvasを削除する
    const removeClassElement = ()=>{
        //表示されているcanvasを全て削除
        var elements = document.getElementsByClassName("p5Canvas");
        if(elements.length>0){
          for (var i = 0; i < elements.length; i++) {
            var e = elements[i];
            if (e) {
              e.parentNode.removeChild(e);
            }
          }
        }else{
        }
    };

    //コンポーネントのライフサイクルフック
    onMounted(() => {
      draw();
    });

    //コンポーネントのライフサイクルフック
    onUnmounted(() => {
    });

    //コンポーネントのライフサイクルフック
    onErrorCaptured(() => {
    });
</script>

<template>
  <div class="container border">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
  </div>
  <div>
    <!-- <button @click="draw()">描画</button> -->
    <button @click="initialize()">クリア</button>
    <button @click="save()">保存</button>
  </div>
</template>