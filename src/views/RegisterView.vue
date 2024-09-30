<template>
  <ContentBase>
    注册
  </ContentBase>
  <RegisterBase />

</template>

<script>
import ContentBase from '../components/ContentBase';
import RegisterBase from '@/components/RegisterBase.vue';
export default {
  name: 'RegisterView',
  components:{
    ContentBase,
    RegisterBase
  }

}
</script>