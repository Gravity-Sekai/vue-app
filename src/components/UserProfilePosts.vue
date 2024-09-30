<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">帖子</h5>
            <div v-for="post in posts.posts" :key = "post.id">
                <div class="card single-post">
                    <div class="card-body">
                        {{post.content}}
                        <button @click="delete_a_post(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm">删除</button>
                    </div>   
                </div>
            </div>
        </div>
    </div>
 </template>
 
 <script>
 import $ from 'jquery';
 import {computed} from 'vue';
 import {useStore} from 'vuex';

 export default {
     name:'UserProfilePosts',
     props: {
        posts:{
            type: Object,
            required: true,
        },
        user:{
            type: Object,
            required: true,
        },
     },
     

     setup(props,context){
        const store = useStore();
        let is_me = computed(()=>store.state.user.id === props.user.id);
        const delete_a_post = post_id => {
            $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/post/",
                type: "DELETE",
                data: {
                    post_id,
                },
                headers: {
                    'Authorization': "Bearer " + store.state.user.access,
                },
                success(resp) {
                    if (resp.result === "success") {
                        context.emit('delete_a_post', post_id);
                    }
                }
            })
        }

        return{
            delete_a_post,
            is_me
        }

     }
 }
 </script>
 
 <style scoped>
.single-post {
    margin-bottom: 10px;
}
.card-title{
    margin-bottom: 20px;
}
button {
    float: right;
}

 </style>