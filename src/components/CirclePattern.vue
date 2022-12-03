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
      delta_twist: Number,
      OuterCircle: Number,
      InnerCircle: Number,
      displayCircle: Boolean,
      lineWidth: Number,
    });

    //canvasに図形を描画する
    const draw = () => {
        removeClassElement();
        const s = function (p5) {
        var radius_out;//外円の半径
        var radius_in;//内円の半径
        // var division;//円の分割数
        var angle;
        var division = 0.1;//回転する速さ
        var twist;
        var delta_twist;
        var lineWidth;
        var LineLists = [];

        // 四捨五入
        function roundDecimal(value, n) {
          return Math.round(value * Math.pow(10, n) ) / Math.pow(10, n);
        }

        // 最初に一回実行される
        p5.setup = _ => {
          var canvas = p5.createCanvas(state.width, state.height)
          canvas.parent("p5Canvas");// キャンバスを作成
          p5.noStroke();             // 図形の線無し
          p5.background(50);
          radius_out = Number(props.OuterCircle);
          radius_in = Number(props.InnerCircle);
          division = Number(props.division);//60,120,360
          twist = 1;
          delta_twist = Number(props.delta_twist);//0~360
          lineWidth = parseFloat(props.lineWidth);
          angle = -90;
        }

        p5.drawOneRound = _ =>{
          //描画線の生成
          while (roundDecimal(angle,3) < 270.0){
            var lineInstance = new Line();
            twist += delta_twist;
            lineInstance.setP1x = radius_out*p5.cos(p5.radians(angle)) + state.width/2; 
            lineInstance.setP1y = radius_out*p5.sin(p5.radians(angle)) + state.height/2; 
            lineInstance.setP2x = radius_in*p5.cos(p5.radians(angle+twist*division))+state.width/2; 
            lineInstance.setP2y = radius_in*p5.sin(p5.radians(angle+twist*division))+state.height/2; 
            LineLists.push(lineInstance);
            angle += division;
          }

          //描画処理
          p5.background(50);
          if(props.displayCircle){
          p5.noFill();
          p5.stroke(80);//線の色
          p5.strokeWeight(6);
          p5.ellipse(state.width/2, state.height/2, radius_out*2, radius_out*2);//外円
          p5.ellipse(state.width/2, state.height/2, radius_in*2, radius_in*2);//内円
          }
          p5.fill(200);
          p5.stroke( 0, 0, 0 );
          p5.strokeWeight(lineWidth);
          p5.stroke(255);//line color
          LineLists.forEach((value, index, array) => {
            value.draw(p5);
          });
        }

        // 1フレーム（1/60秒）ごとに実行される
        p5.draw = _ => {
          console.log("start");
          p5.drawOneRound();
          console.log("drawend");
          p5.noLoop();
          console.log("afternoloop");
        }
      }
      var myp5 = new p5(s);// インスタンスモードとしてp5クラスを実行
    };

    //canvasを初期化する。
    const clear = ()=>{
      removeClassElement();
      const s = function (p5) {
          p5.setup = _ => {
            var canvas = p5.createCanvas(state.width, state.height)
            canvas.parent("p5Canvas");// キャンバスを作成
            p5.background(50);
          }
      }
      var myp5 = new p5(s);// インスタンスモードとしてp5クラスを実行
    };

      //canvasを保存する。
      const save = ()=>{
        //TODO 保存処理
        const a = document.createElement("p5Canvas"); // a要素の作成
        a.href = canvas.toDataURL("image/jpeg", 0.75); // PNGなら"image/png"
        a.download = "image.jpg";  // ファイル名のセット
        a.click();   // 疑似的にクリック
    };
    
    //canvasを保存する。
    const share = ()=>{
        //TODO share処理

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
        }
    };

    //コンポーネントのライフサイクルフック
    onMounted(() => {
      const s = function (p5) {
          p5.setup = _ => {
            var canvas = p5.createCanvas(state.width, state.height)
            canvas.parent("p5Canvas");// キャンバスを作成
            p5.background(50);
          }
      }
      var myp5 = new p5(s); // インスタンスモードとしてp5クラスを実行
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
    <button @click="draw()">描画</button>
    <button @click="clear()">クリア</button>
    <button @click="save()">保存</button>
    <button @click="share()">シェア</button>
  </div>
</template>