<template>
    <div class="card">
        <div class="card-body">
            <label for="exampleFormControlTextarea1" class="form-label">编辑帖子</label>
            <textarea v-model="content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button @click="post_a_post" type="button" class="btn btn-primary btn-sm">提交</button>
        </div>
    </div>
 </template>
 
 <script>
import { ref } from 'vue';
import $ from 'jquery';
import { useStore } from 'vuex';

 export default {
     name:'UserProfileEdit',
     setup(props, context){
        let content = ref('');
        const store = useStore();
        const post_a_post=()=>{
            $.ajax({
              url: "https://app165.acapp.acwing.com.cn/myspace/post/",
              type: "POST",
              data: {
                content: content.value,
              },
              headers: {
                'Authorization': "Bearer " + store.state.user.access,
              },
              success(resp) {
                if (resp.result === "success") {
                  context.emit('post_a_post', content.value);
                  content.value = "";
                }
              }
            });
        }
        return{
            content,
            post_a_post,
        }
     }
 }
 </script>
 
 <style scoped>
 .edit-field {
    margin-top: 20px;
}

 .btn{
    padding:2px 4px;
    font-size:12px;
    margin-top: 10px;
    float:right ;
 }
 </style>