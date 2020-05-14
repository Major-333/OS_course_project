<template>
    <div class="map2">
        <div class="BtnGroup">
            <div v-for="(item,index) in labelList" :key="index" class="ctn">
                <h1 class="alert">{{ item }}</h1>
                <a-button :class="{aBtn:!upList[index],aBtn2:upList[index]}" icon="arrow-up"
                          @click="handleClick(1,index)" shape="circle" ghost="true">
                </a-button>
                <a-button :class="{aBtn:!downList[index],aBtn2:downList[index]}" icon="arrow-down"
                          @click="handleClick(-1,index)" shape="circle" ghost="true">
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BtnGroup",
        data(){
            return{
                labelList:[...Array(20)].map((i,j)=>j+1<10?"0"+(1+j).toString():(1+j).toString()),
            }
        },
        props:{
            upList:[],
            downList:[],
        },
        methods:{
            handleClick(dir,index){
                this.$emit("select",dir,index);
            }
        },
    }
</script>

<style scoped>
    .aBtn{
        margin: 3px;
    }
    .aBtn2{
        margin: 3px;
        border-color: deepskyblue;
    }
    .map2{
        background: linear-gradient(to bottom left, #EF8D9C 40%, #FFC39E 100%);
        border-radius: 20px;
        height: 200px;
        perspective: 40px;
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
    .BtnGroup{
        position: absolute;
        left: 3%;
        top:  3%;
        float: left;
    }


    .alert {
        font-weight: 700;
        letter-spacing: 5px;
    }
    .ctn{
        margin: 3px;
        float: left;
    }
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
        float: left;
    }
</style>
