import $ from 'jquery';
import { jwtDecode } from 'jwt-decode';
const ModuleUser = {
    state: {
        id:'',
        username:'',
        photo:'',
        followerCount:'',
        access:'',
        refresh:'',
        is_login:false,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user){
            state.id=user.id;
            state.username=user.username;
            state.photo=user.photo;
            state.followerCount=user.followerCount;
            state.access=user.access;
            state.refresh=user.refresh;
            state.is_login=user.is_login;
        },
        updateAccess(state, access){
            state.access=access;
        },
        logout(state){
            state.id='';
            state.username='';
            state.photo='';
            state.followerCount=0;
            state.access='';
            state.refresh='';
            state.is_login=false;
        }
    },
    actions: {
        login(context, data){
            $.ajax({
                url:'https://app165.acapp.acwing.com.cn/api/token/',
                type:'POST',
                data:{
                    username:data.username,
                    password:data.password,
                    jsonp: "callback", 
                    jsonpCallback: "f",
                },
                success(resp) {
                    const {access,refresh} = resp;
                    const access_obj = jwtDecode(access);

                    console.log('123');

                    setInterval(()=>{
                        $.ajax({
                            url:'https://app165.acapp.acwing.com.cn/api/token/refresh/',
                            type:'POST',
                            data:{
                                refresh:refresh,
                            },
                            success(resp){
                                context.commit('updateAccess', resp.access);
                            }
                        })

                    }, 4.5*60*1000);

                    $.ajax({
                        url:'https://app165.acapp.acwing.com.cn/myspace/getinfo/',
                        type:'GET',
                        data:{
                            user_id:access_obj.user_id,
                        },
                        headers:{
                            "Authorization": "Bearer "+access,
                        },
                        success(resp){
                            context.commit("updateUser", {
                                ...resp,
                                access:access,
                                refresh:refresh,
                                is_login:true,
                            });
                            data.success();//用于返回用户成功登陆后的api
                        },
                    })
                },
                error(){
                    data.error();//用于返回登陆失败的api，作用到Login界面就是显示error_message
                }

            })
        },
    },
    modules: {
    }
  }

  export default  ModuleUser;
