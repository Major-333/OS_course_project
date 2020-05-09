<template>
    <div class="elevator">
        <div :class="{map1:!content.isBusy, map2:content.isBusy}">
            <div class="BtnGroup" >
                <a-button :class="{aButton:!isSelect[index],selectBtn:isSelect[index]}" shape="circle" ghost=true v-for="(item,index) in btnList" :key="index" @click="handleClick(item-1)">
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
                    <h1 class="alert">{{ content.state }}</h1><p>{{ content.poster }}</p>
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
                btnList:[...Array(20)].map((i,j)=>j+1), // i
                ctFloor: 0,
                destination: 0,
                isSelect: [...Array(20)].map(()=>false),
                tmp: -1,
                content: {
                    poster: "yay, everything is ready.",
                    state: "Free",
                    isBusy: false,
                    isStop: true,
                },
                reqFloor:[...Array(20)].map(()=>0),
            }
        },
        props:{
            id: Number,
            waitList:[],
            load: Number,
            capacity: Number,
            reqList:[],
        },
        computed:{
            direction:function(){
                if(this.ctFloor===this.destination){
                    return 0;
                }else if(this.ctFloor>this.destination){
                    return -1;
                }else{
                    return 1;
                }
            }
        },
        methods: {
            handleClick(index){
                this.$set(this.isSelect,index,true);
                this.tmp=index;
            },
            run(){
                if(this.direction!==0){
                    this.content.state="Busy";
                    this.content.isStop=false;
                    if(this.direction===1){
                        this.ctFloor++;
                    }else{
                        this.ctFloor--;
                    }
                    if(this.waitList[this.ctFloor]){
                        this.$emit("finishReq",this.ctFloor,this.id);
                        this.stop();
                    }
                    else if(this.isSelect[this.ctFloor]){
                        this.stop();
                    }else{
                        setTimeout(this.run,1000);
                    }
                }else{
                    //重新确定dst
                    let dst=this.ctFloor;
                    let found=false;
                    for(let i=0;i<this.ctFloor;++i){
                        if(this.isSelect[i]){
                            dst=i;
                            found=true;
                            break;
                        }
                    }
                    if(!found){
                        for(let i=this.isSelect.length-1;i>this.ctFloor;i--){
                            if(this.isSelect[i]){
                                dst=i;
                                found=true;
                                break;
                            }
                        }
                    }
                    this.destination=dst;
                    if(this.direction===0){
                        this.content.poster="yay, everything is ready.";
                        this.content.state="Free";
                        this.content.isStop=true;
                        this.content.isBusy=false;
                    }
                }
            },
            stop(){
                this.content.state="Open the Door!";
                this.content.isStop=true;
                this.isSelect[this.ctFloor]=false;
                setTimeout(this.run,2000);
            },
        },
        watch:{
            direction(newValue){
                if(newValue !== 0){
                    this.content.poster="oh baby just wait a minute.";
                    this.content.state="Busy";
                    this.content.isStop=false;
                    this.content.isBusy=true;
                    this.run();
                }
            },
            tmp(newValue){
                // 确定dst
                if(newValue===this.ctFloor&&this.direction===0){
                    return;
                }
                this.isSelect[newValue]=true;
                if((this.direction===1&&newValue>this.destination)||(this.direction===-1&&newValue<this.destination)){
                    this.destination=newValue;
                }else if(this.direction===0){
                    this.destination=newValue;
                }
            },
            waitList(newValue){
                if(this.direction===0){
                    for (let i=0;i<newValue.length;++i){
                        if(newValue[i]!==0){
                            this.destination=i;
                        }
                    }
                }
            },
            reqList(newValue){
                for(let i=0;i<newValue.length;++i){
                    this.reqFloor[i]+=newValue[i];
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
