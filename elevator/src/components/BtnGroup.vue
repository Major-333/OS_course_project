<template>
    <div class="map2">
        <div class="BtnGroup">
            <div v-for="(item,index) in DataList" :key="index" class="ctn">
                <h1 class="alert">{{ item }}</h1>
                <a-button class="a-button" shape="circle" ghost = "true" icon ="arrow-up"></a-button>
                <a-button class="a-button" shape="circle" ghost = "true" icon ="arrow-down"></a-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BtnGroup",
        data(){
            return{
                DataList:["01","02","03","04","05","06","07","08","10","11","12","14","14","15","16","17","18","19","20"],
            }
        }
    }
</script>

<style scoped>
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
        /*width: 180px;*/
        /*height: 100px;*/
    }
    .a-button{
        margin: 3px;
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
