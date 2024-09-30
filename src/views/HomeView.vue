<template>
  <ContentBase>
    主页
  </ContentBase>
  <HomeBase />
</template>

<script>
import HomeBase from '../components/HomeBase';
import ContentBase from '../components/ContentBase';
export default {
  name: 'HomeView',
  components:{
    ContentBase,
    HomeBase
  }

}
</script>
