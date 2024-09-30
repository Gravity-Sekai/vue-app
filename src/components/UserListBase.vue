<template>
    <div class="container">
        <div class="card" v-for="user in users" :key="user.id" @click="open_user_profile(user.id)">
            <div class="card-body">
                <div class="row">
                    <div class="col-1 img-fluid">
                        <img class="img-fluid" :src="user.photo" alt="">
                    </div>
                    <div class="col-11">
                        <div class="username">用户名：{{user.username}}</div>
                        <div class="follower-count">粉丝数：{{user.followerCount}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router/index';
import { useStore } from 'vuex';

export default {
    name: 'UserListBase',
    components:{
    },

    setup(){
        const store = useStore();
        let users = ref([]);

        $.ajax({
            url:'https://app165.acapp.acwing.com.cn/myspace/userlist/',
            type:'GET',
            success(resp){
                users.value=resp;
            }
        });

        const open_user_profile = userId => {
            if(store.state.user.is_login) {
                router.push({
                    name:'UserProfile',
                    params: {
                        userId
                    }
                })
            }
            else{
                router.push({
                    name:'Login'
                })
            }
        }

        return{
            users,
            open_user_profile
        }
    }

}
</script>

<style scoped>
img{
    border-radius: 50%;
}
.follower-count{
    font-size:12px;
    color:grey;
    height:50%;
}
.card{
    margin-top:20px;
    cursor:pointer;
}
</style>