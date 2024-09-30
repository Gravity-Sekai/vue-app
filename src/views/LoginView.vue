<template>
  <ContentBase>
    登录
  </ContentBase>
  <LoginBase />

</template>

<script>
import ContentBase from '../components/ContentBase';
import LoginBase from '@/components/LoginBase.vue';
export default {
  name: 'LoginView',
  components:{
    ContentBase,
    LoginBase
  }

}
</script>