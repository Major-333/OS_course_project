<template>
    <div class="elevator">
        <div :class="{map1:direction===0&&doorState===0, map2:!(direction===0&&doorState===0)}">
            <div class="BtnGroup" >
                <a-button :class="{aButton:!isSelect[index],selectBtn:isSelect[index]}"
                          shape="circle" ghost=true v-for="(item,index) in btnList" :key="index" @click="handleClick(item-1)">
                    {{ item }}
                </a-button>
            </div>
            <div class="success-box">
                <div :class="{face:content.isStop, face2:!content.isStop}">
                    <div class="eye"></div>
                    <div class="eye right"></div>
                    <div class="mouth happy"></div>
                </div>
                <div class="shadow scale"></div>
                <div class="message">
                    <h1 class="alert">{{ content.stateStr }}</h1><p>{{ content.poster }}</p>
                    <h1 class="alert">载重：{{ load }}</h1>
                </div>
                <div><h1 class="alert-top">{{ ctFloor+1 }}F</h1></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Elevator",
        data(){
            return {
                btnList:[...Array(20)].map((i,j)=>j+1),     // 内部按钮显示的数字
                doorState: 0,                               // 电梯门状态，1代表开门
                ctFloor: 0,                                 // 当前楼层
                destination: 0,                             // 最远端
                isSelect: [...Array(20)].map(()=>false),    // 内部请求队列
                upList: [...Array(20)].map(()=>false),      // 外部向上请求队列
                downList: [...Array(20)].map(()=>false),    // 外部向下请求队列
                oldDir: 0,                                  // 上一次的方向
                waitToRun:false,                            // 关门后是否启动run(补丁关门时启动run问题)
            }
        },
        props:{
            id: Number,                                     // 电梯id编号
            upWaitList:[],                                  // 外部向上请求队列
            downWaitList:[],                                // 外部向下请求队列
            load: Number,                                   // 电梯当前载重
            capacity: Number,                               // 电梯最大容积
            cancel:Number,
            ignore:Boolean,
        },
        computed:{
            direction:function(){                           // 根据ctFloor和destination计算dir 0可能是Free也可能是Stop
                if(this.ctFloor===this.destination){
                    return 0;
                }else if(this.ctFloor>this.destination){
                    return -1;
                }else{
                    console.log("已经改变dir为1了");
                    return 1;
                }
            },
            content:function () {
                if(this.doorState===1){
                    return {
                        poster: "oh baby just wait a minute.",
                        stateStr: "Open the Door",
                        isStop: true,
                        isBusy: true,
                    }
                }
                else{
                    if(this.direction===0){
                        return {
                            poster: "yay, everything is ready.",
                            stateStr: "Free",
                            isStop: true,
                            isBusy: false,
                        }
                    }
                    else{
                        return {
                            poster: "oh baby just wait a minute.",
                            stateStr: "Busy",
                            isStop: false,
                            isBusy: true,
                        }
                    }
                }
            },
        },
        methods: {
            handleClick(index){                             // 内部按钮点击处理
                this.$set(this.isSelect,index,true);
                if(this.direction===0){                     // 启动
                    console.log(index);
                    if(index===this.ctFloor){
                        if(this.doorState===0){
                            this.openDoor(false);
                        }
                    }else{
                        console.log("改变dst了");
                        this.destination=index;
                    }
                }
            },
            run(){                                          // 运行逻辑
                if(this.direction!==0){                     // 如果在运行中
                    console.log("run");
                    if(this.direction===1){                 // 移动位置
                        this.ctFloor++;
                        if(this.upList[this.ctFloor]||this.isSelect[this.ctFloor]){
                            this.$emit("changeFloor",this.ctFloor,this.id);
                            this.openDoor(true);
                        }
                        else{
                            setTimeout(this.run,1000);
                        }
                    }
                    else if(this.direction===-1){
                        this.ctFloor--;
                        if(this.downList[this.ctFloor]||this.isSelect[this.ctFloor]){
                            this.$emit("changeFloor",this.ctFloor,this.id);
                            this.openDoor(true);
                        }
                        else{
                            setTimeout(this.run,1000);
                        }
                    }
                }
                else{
                    //重新确定dst
                    let dst;
                    if(this.oldDir===1){
                        dst=this.checkFromTop();
                        if(dst===-1){
                            dst=this.checkFromBottom();
                        }
                        if(dst===-1){
                            this.destination=this.ctFloor;
                            this.$emit("changeState",0,this.id);
                        }else{
                            this.destination=dst;
                        }
                    }
                    else if(this.oldDir===-1){
                        dst=this.checkFromBottom();
                        if(dst===-1){
                            dst=this.checkFromTop();
                        }
                        if(dst===-1){
                            this.destination=this.ctFloor;
                            this.$emit("changeState",0,this.id);
                        }else{
                            this.destination=dst;
                        }
                    }
                }
            },
            checkFromBottom(){
                for(let i=0;i<=this.ctFloor;++i){
                    if(this.isSelect[i]||this.upList[i]||this.downList[i]){
                        return i;
                    }
                }
                return -1;
            },
            checkFromTop(){
                for(let i=this.isSelect.length-1;i>=this.ctFloor;--i){
                    if(this.isSelect[i]||this.upList[i]||this.downList[i]){
                        return i;
                    }
                }
                return -1;
            },
            openDoor(isContinue){
                this.$emit("stop",this.ctFloor,this.id);
                this.doorState=1;
                this.isSelect[this.ctFloor]=false;
                setTimeout(this.closeDoor,2500,isContinue);
            },
            closeDoor(isContinue){
                console.log("关门");
                this.doorState=0;
                if(isContinue||this.waitToRun){
                    this.waitToRun=false;
                    setTimeout(this.run,1000);
                }
            }
        },
        watch:{
            direction(newValue,oldValue){
                this.oldDir=oldValue;
                if(newValue !== 0){
                    this.$emit("changeState",1,this.id);
                    if(this.doorState===0){
                        this.run();
                    }else{
                        this.waitToRun=true;
                    }

                }
            },
            upWaitList(newValue){
                // alert(this.id.toString()+this.ignore);
                for(let i=0;i<newValue.length;++i){
                    this.upList[i]=this.upWaitList[i]
                }
                if(!this.isSelect[this.destination]&&!this.downList[this.destination]&&!this.upList[this.destination]){
                    this.destination=this.ctFloor
                }
                //是否需要强制启动
                if(this.doorState===0&&this.direction===0){
                    for(let i=0;i<newValue.length;++i){
                        if(newValue[i]){
                            this.destination=i;
                            break;
                        }
                    }
                }
            },
            downWaitList(newValue){
                for(let i=0;i<newValue.length;++i){
                    this.downList[i]=this.downWaitList[i]
                }
                if(!this.isSelect[this.destination]&&!this.downList[this.destination]&&!this.upList[this.destination]){
                    this.destination=this.ctFloor
                }
                //是否需要强制启动
                if(this.doorState===0&&this.direction===0){
                    for(let i=0;i<newValue.length;++i){
                        if(newValue[i]){
                            this.destination=i;
                            break;
                        }
                    }
                }

            },
            cancel(newValue){
                if(newValue>=0&&newValue<20){
                    this.$set(this.upList,this.cancel,false);
                    this.$set(this.downList,this.cancel,false);
                }
            }
        },
    }
</script>

<style scoped>
    .BtnGroup{
        position: absolute;
        left: 3%;
        top:  3%;
        width: 180px;
    }
    .aButton{
        margin: 3px;
    }
    .selectBtn{
        margin: 3px;
        border-color: deepskyblue;
    }
    /* */
    #components-layout-demo-fixed .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px 24px 16px 0;
        float: left;
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
    .map1{
        /*background: cornsilk;*/
        background: linear-gradient(to bottom right, #b0db7d 40%, #b0db7d 100%);
        border-radius: 20px;
        height: 360px;
        perspective: 40px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .map2{
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

</style>
