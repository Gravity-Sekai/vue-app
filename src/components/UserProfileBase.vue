<template>
   <div class="container">
   <div class="card base">
    <div class="row">
        <div class="col-3">
            <div class="card-body">
                <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user"/>
            </div>
            <div class="card-body">
                <UserProfileEdit v-if="is_me" @post_a_post="post_a_post"/>
            </div>
        </div>
        <div class="col-9">
            <div class="card-body">
                <UserProfilePosts :user="user" :posts="posts"  @delete_a_post="delete_a_post"/>
            </div>
        </div>
    </div>
    </div>
    </div>
</template>

<script>
import UserProfileInfo from './UserProfileInfo';
import UserProfileEdit from './UserProfileEdit';
import UserProfilePosts from './UserProfilePosts';
import {reactive} from 'vue';
import {useStore} from 'vuex';
import {useRoute} from 'vue-router';
import {computed} from 'vue';
import $ from 'jquery';

export default {
    name:'UserProfileBase',
    components:{
        UserProfileInfo,
        UserProfileEdit,
        UserProfilePosts
    },

    setup(){
        const store = useStore();
        const route = useRoute();
        const userId = parseInt(route.params.userId);
        const user = reactive({});
        const posts = reactive({});

        $.ajax({
            url:'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
            type:'GET',
            data:{
                user_id:userId,
            },
            headers:{
                'Authorization': 'Bearer '+store.state.user.access,
            },
            success(resp){
                user.id=resp.id;
                user.username=resp.username;
                user.photo=resp.photo;
                user.followerCount=resp.followerCount;
                user.is_followed=resp.is_followed;
            }
        });

        $.ajax({
            url:'https://app165.acapp.acwing.com.cn/myspace/post/',
            type:'GET',
            data:{
                user_id:userId,
            },
            headers:{
                'Authorization': 'Bearer '+store.state.user.access,
            },
            success(resp){
                posts.count=resp.length;
                posts.posts=resp;
            }
        })

        const follow = () => {
            if(user.is_followed) return;
            user.is_followed = true;
            user.followerCount++;
        };

        const unfollow = () => {
            if(!user.is_followed) return;
            user.is_followed = false;
            user.followerCount--;
        };

        const post_a_post = (content) => {
            posts.count++;
            posts.posts.unshift({
                id:posts.count,
                userId:1,
                content:content,
            })
        };

        const delete_a_post = post_id => {
            console.log(post_id);
            console.log(posts);
            posts.posts = posts.posts.filter(post => post.id !== post_id);
            posts.count = posts.posts.length;
            console.log(posts);
        };

        const is_me = computed(()=>userId === parseInt(store.state.user.id));

        return{
            user,
            follow,
            unfollow,
            posts,
            post_a_post,
            is_me,
            delete_a_post
        }
    }
}
</script>

<style scoped>
.base{
    margin-top: 20px;
}
</style>