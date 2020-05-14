<template>
  <div class="hello">
<!--    <BtnGroup></BtnGroup>-->
    <a-row>
        <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 10, offset: 6 }">
            <BtnGroup :upList="upList" :downList="downList" @select="handleSelect">
            </BtnGroup>
        </a-col>
    </a-row>

    <a-row class="gap"></a-row>
    <a-row>
        <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 8, offset: 2 }">
            <Elevator :upWaitList="upList" :downWaitList="downList" :load="eleLoadList[0]" :capacity="eleCapacity"
                      :id=0 :reqList="eleReqList[0]" @changeFloor="updateEle" @changeState="updateState" :cancel="cancel"
                      :stop="handleStop" :ignore="ignoreList[0]" @changeDir="updateDir">
            </Elevator>
        </a-col>
        <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 8, offset: 2 }">
            <Elevator :upWaitList="upList" :downWaitList="downList" :load="eleLoadList[1]" :capacity="eleCapacity"
                      :id=1 :reqList="eleReqList[1]" @changeFloor="updateEle" @changeState="updateState" :cancel="cancel"
                      :stop="handleStop" :ignore="ignoreList[1]" @changeDir="updateDir">
            </Elevator>
        </a-col>
    </a-row>

    <a-row class="gap"></a-row>
    <a-row>
      <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 8, offset: 2 }">
          <Elevator :upWaitList="upList" :downWaitList="downList" :load="eleLoadList[2]" :capacity="eleCapacity"
                    :id=2 :reqList="eleReqList[2]" @changeFloor="updateEle" @changeState="updateState" :cancel="cancel"
                    :stop="handleStop" :ignore="ignoreList[2]" @changeDir="updateDir">
          </Elevator>
      </a-col>
      <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 8, offset: 2 }">
          <Elevator :upWaitList="upList" :downWaitList="downList" :load="eleLoadList[3]" :capacity="eleCapacity"
                    :id=3 :reqList="eleReqList[3]" @changeFloor="updateEle" @changeState="updateState" :cancel="cancel"
                    :stop="handleStop" :ignore="ignoreList[3]" @changeDir="updateDir">
          </Elevator>
      </a-col>
    </a-row>
    <a-row class="gap"></a-row>
    <a-row>
      <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 8, offset: 2 }">
          <Elevator :upWaitList="upList" :downWaitList="downList" :load="eleLoadList[4]" :capacity="eleCapacity"
                    :id=4 :reqList="eleReqList[4]" @changeFloor="updateEle" @changeState="updateState" :cancel="cancel"
                    :stop="handleStop" :ignore="ignoreList[4]" @changeDir="updateDir">
          </Elevator>
      </a-col>
    </a-row>

  </div>
</template>

<script>
    import Elevator from "./Elevator"
    import BtnGroup from "./BtnGroup"
    export default {
        name: 'HelloWorld',
        props: {
            msg: String,
            stateList:[]
        },
        components:{
            Elevator,
            BtnGroup,
        },
        data(){
            return {
                upList:[...new Array(20)].map(()=>false),       // 减1
                downList:[...new Array(20)].map(()=>false),     // 减1
                eleStateList:[...new Array(5)].map(()=>0),      // 0表示空闲
                eleDirList:[...new Array(5)].map(()=>0),        // 电梯方向
                eleOldDirList:[...new Array(5)].map(()=>0),     // 电梯上次方向
                elePosList:[...new Array(5)].map(()=>0),
                cancel:-1,
                ignoreList:[false,true,true,true,true],

                eleLoadList:[...new Array(5)].map(()=>0),
                eleReqList:[...new Array(5)].map(()=>[...new Array(20)].map(()=>0)),
                eleCapacity:10,
            }
        },
        methods:{
            handleSelect(dir,index){
                console.log("当前电梯方向数组："+this.eleDirList);
                this.checkPassing(dir,index);
                if(dir===1){
                    this.$set(this.upList,index,true);
                }
                else if(dir===-1){
                    this.$set(this.downList,index,true);
                }
            },
            handleStop(floor,id){
                console.log(id);
                this.cancel=floor;
            },
            updateDir(dir, id){
                this.$set(this.eleOldDirList, id, this.eleDirList[id]);
                this.$set(this.eleDirList, id, dir);
            },
            updateEle(floor,id){
                this.$set(this.elePosList,id,floor);
                if(this.upList[floor]){
                    this.$set(this.upList,floor,false);
                }
                if(this.downList[floor]){
                    this.$set(this.downList,floor,false);
                }
            },
            updateState(state,id){
                this.$set(this.eleStateList,id,state);
            },
            checkPassing(dir,floor){
                for(let i=0;i<this.elePosList.length;++i){
                    if(this.eleDirList[i]===0&&this.eleStateList[i]===0){
                        this.ignoreList[i]=true;
                    }
                }
                let found = -1;
                console.log(this.eleDirList+" * "+this.eleOldDirList+" XXX "+this.eleStateList);
                for(let i =0;i<this.eleDirList.length;++i){
                    if((this.eleDirList[i]===dir)||(this.eleOldDirList[i]===dir&&this.eleStateList[i]===1)){
                        if(dir===1&&this.elePosList[i]<floor){
                            found=i;
                        }
                        else if(dir===-1&&this.elePosList[i]>floor){
                            found=i;
                        }
                    }
                }
                if(found===-1){                             //如果没有顺路的电梯
                    for(let i=0;i<this.elePosList.length;++i){
                        if(this.eleDirList[i]===0&&this.eleStateList[i]===0){
                            this.ignoreList[i]=false;
                            break;
                        }
                    }
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #components-layout-demo-fixed .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
  }

  /**/
  .gap{
    height: 60px;
  }
  .submitBtn{
    outline: none;
    height: 40px;
    text-align: center;
    width: 130px;
    border-radius: 40px;
    background: #fff;
    border: 2px solid #1ECD97;
    color: #1ECD97;
    letter-spacing: 1px;
    text-shadow: 0;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
  }

  .submitBtn:hover {
    color: white;
    background: #1ECD97;
  }
  .submitBtn:active {
    letter-spacing: 2px;
  }

  .success-box {
    position: absolute;
    width: 245px;
    height: 250px;
    right: 5%;
  }

  .error-box {
    position: absolute;
    width: 245px;
    height: 250px;
    right: 5%;
  }
  .map-1{
    /*background: cornsilk;*/
    background: linear-gradient(to bottom right, #b0db7d 40%, #b0db7d 100%);
    border-radius: 20px;
    height: 360px;
    perspective: 40px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .map-2{
    background: linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);
    border-radius: 20px;
    height: 360px;
    perspective: 40px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }

  @import url("https://fonts.googleapis.com/css?family=Lato:400,700");
  html {
    display: grid;
    min-height: 100%;
  }

  body {
    display: grid;
    overflow: hidden;
    font-family: "Lato", sans-serif;
    text-transform: uppercase;
    text-align: center;
  }

  #container {
    position: relative;
    margin: auto;
    overflow: hidden;
    width: 700px;
    height: 250px;
  }

  h1 {
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 3px;
    padding-top: 5px;
    color: #FCFCFC;
    padding-bottom: 5px;
    text-transform: uppercase;
  }

  .green {
    color: #4ec07d;
  }

  .red {
    color: #e96075;
  }

  .alert {
    font-weight: 700;
    letter-spacing: 5px;
  }
  .alert-top {
    font-weight: 700;
    letter-spacing: 5px;
    font-size: xx-large;
  }

  p {
    margin-top: -5px;
    font-size: 0.5em;
    font-weight: 100;
    color: #5e5e5e;
    letter-spacing: 1px;
  }

  button, .dot {
    cursor: pointer;
  }


  .two {
    right: 12%;
    opacity: .5;
  }

  .face {
    position: absolute;
    width: 22%;
    height: 22%;
    background: #FCFCFC;
    border-radius: 50%;
    border: 1px solid #777777;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: bounce 1s ease-in infinite;
  }

  .face2 {
    position: absolute;
    width: 22%;
    height: 22%;
    background: #FCFCFC;
    border-radius: 50%;
    border: 1px solid #777777;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: roll 3s ease-in-out infinite;
  }

  .eye {
    position: absolute;
    width: 5px;
    height: 5px;
    background: #777777;
    border-radius: 50%;
    top: 40%;
    left: 20%;
  }

  .right {
    left: 68%;
  }

  .mouth {
    position: absolute;
    top: 43%;
    left: 41%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }

  .happy {
    border: 2px solid;
    border-color: transparent #777777 #777777 transparent;
    transform: rotate(45deg);
  }

  .sad {
    top: 49%;
    border: 2px solid;
    border-color: #777777 transparent transparent #777777;
    transform: rotate(45deg);
  }

  .shadow {
    position: absolute;
    width: 21%;
    height: 3%;
    opacity: .5;
    background: #777777;
    left: 40%;
    top: 43%;
    border-radius: 50%;
    z-index: 1;
  }

  .scale {
    animation: scale 1s ease-in infinite;
  }

  .move {
    animation: move 3s ease-in-out infinite;
  }

  .message {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 40%;
    top: 47%;
  }

  @keyframes bounce {
    50% {
      transform: translateY(-10px);
    }
  }
  @keyframes scale {
    50% {
      transform: scale(0.9);
    }
  }
  @keyframes roll {
    0% {
      transform: rotate(0deg);
      left: 25%;
    }
    50% {
      left: 60%;
      transform: rotate(168deg);
    }
    100% {
      transform: rotate(0deg);
      left: 25%;
    }
  }
  @keyframes move {
    0% {
      left: 25%;
    }
    50% {
      left: 60%;
    }
    100% {
      left: 25%;
    }
  }
/* input  */

  .swing {
    display: inline-block;
    width: 215px;
    padding: 10px 0 10px 15px;
    font-family: "Open Sans", sans;
    font-weight: 400;
    color: #377D6A;
    background: #efefef;
    border: 0;
    border-radius: 3px;
    outline: 0;
    text-indent: 60px;
    transition: all .3s ease-in-out;
  }
  .swing::-webkit-input-placeholder {
    color: #efefef;
    text-indent: 0;
    font-weight: 300;
  }
  .swing + label {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    text-shadow: 0 1px 0 rgba(19, 74, 70, 0.4);
    background: #7AB893;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    transform-origin: 2px 2px;
    transform: rotate(0);
    animation: swing-back .4s 1 ease-in-out;
  }

  @keyframes swing {
    0% {
      transform: rotate(0);
    }
    20% {
      transform: rotate(116deg);
    }
    40% {
      transform: rotate(60deg);
    }
    60% {
      transform: rotate(98deg);
    }
    80% {
      transform: rotate(76deg);
    }
    100% {
      transform: rotate(82deg);
    }
  }
  @keyframes swing-back {
    0% {
      transform: rotate(82deg);
    }
    100% {
      transform: rotate(0);
    }
  }
  .swing:focus,
  .swing:active {
    color: #377D6A;
    text-indent: 0;
    background: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .swing:focus::-webkit-input-placeholder,
  .swing:active::-webkit-input-placeholder {
    color: #aaa;
  }
  .swing:focus + label,
  .swing:active + label {
    animation: swing 1.4s 1 ease-in-out;
    transform: rotate(82deg);
  }

  .row {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 30px;
    /*background: #032429;*/
    position: relative;
    z-index: 1;
    text-align: center;
  }
  .row:before {
    position: absolute;
    content: "";
    display: block;
    top: 0;
    left: -5000px;
    height: 100%;
    width: 15000px;
    z-index: -1;
    background: inherit;
  }
  .row:first-child {
    padding: 40px 30px;
  }
  .row:nth-child(2), .row:nth-child(8), .row:nth-child(10) {
    /*background: #134A46;*/
  }
  .row span {
    position: relative;
    display: inline-block;
    margin: 30px 10px;
  }


</style>
