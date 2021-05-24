<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: 'Button'
}
</script>

<style scoped>
.btn{
  display: block;
  border: none;
  width: 170px;
  padding: 10px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #7D82A8;
  transition: 0.3s;
  color: #fff;
}
.btn:hover{
  background-color: #676b8a;
}
</style>
