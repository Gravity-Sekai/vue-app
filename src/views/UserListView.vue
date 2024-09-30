<template>
  <ContentBase>
    好友列表
  </ContentBase>
  <UserListBase />
  

</template>

<script>
import UserListBase from '../components/UserListBase';
import ContentBase from '../components/ContentBase';

export default {
  name: 'UserListView',
  components:{
    ContentBase,
    UserListBase,
  },

}
</script>

<style scoped>

</style>