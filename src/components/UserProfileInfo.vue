<template>
    <div class="card">
         <div class="card-body">
            <div class="row">
                <div class="col-3">
                    <img  class="img-fluid" :src="user.photo"  alt="">
                </div>
                <div class="col-9">
                    <div class="username">昵称: {{user.username}}</div>
                    <div class="fans">粉丝数: {{user.followerCount}}</div>
                    <button @click="follow" v-if="!user.is_followed" type="button" class="btn btn-primary btn-sm">关注</button>
                    <button @click="unfollow" v-if="user.is_followed" type="button" class="btn btn-secondary btn-sm">取消关注</button>
                </div>
            </div>
        </div>
     </div>

 </template>
 
 <script>
 import { useStore } from 'vuex';
 import $ from 'jquery'
 export default {
     name:'UserProfileInfo',
     props: {
        user: {
            type: Object,
            required: true,
        },
     },

     setup(props, context) {
        const store = useStore();
        const follow = () =>{
            $.ajax({
                url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type:'POST',
                data:{
                    target_id: props.user.id,

                },
                headers:{
                    'Authorization':'Bearer ' + store.state.user.access,
                },
                success(resp){
                    if(resp.result === 'success'){
                        context.emit('follow');
                    }
                }
            })
            
        }
        const unfollow = () => {
            $.ajax({
                url:'https://app165.acapp.acwing.com.cn/myspace/follow/',
                type:'POST',
                data:{
                    target_id: props.user.id,

                },
                headers:{
                    'Authorization':'Bearer '+store.state.user.access,
                },
                success(resp){
                    if(resp.result === 'success'){
                        context.emit('unfollow');
                    }
                }
            })
        }
        return {
            follow,
            unfollow,
        }
     }
 }
 </script>
 
 <style scoped>

 img{
    border-radius: 50%;
 }

 .username{
    font-weight: bold;
 }

 .fans{
    font-size:12px;
    color:grey;
 }

 button{
    padding:2px 4px;
    font-size:12px;
 }
 </style>