<template>
    <div class="container">
        <div class="card base">
            <div class="card-body">
                <h5 class="card-title"><slot></slot></h5>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name:'ContentBase'
}
</script>

<style scoped>
  .base{
    margin-top: 20px;
  }
</style>