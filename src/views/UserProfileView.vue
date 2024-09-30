<template>
  <ContentBase>
    用户动态
  </ContentBase>
  <UserProfileBase />
  

</template>

<script>
import ContentBase from '../components/ContentBase';
import UserProfileBase from '../components/UserProfileBase';
export default {
  name: 'UserProfileView',
  components:{
    ContentBase,
    UserProfileBase
  }

}
</script>