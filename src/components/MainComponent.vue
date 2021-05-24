<template>
  <div class="main-wrapper">
    <ModalWindow v-if="isModal"
                 @closeModal="isModal = false">
    </ModalWindow>
    <Button class="addPerson-btn"
            @click.prevent.native="isModal = true">
      Добавить
    </Button>
    <TableComponent></TableComponent>
  </div>
</template>

<script>
import ModalWindow from './ModalWindow'
import Button from './Button'
import TableComponent from './TableComponent'
export default {
  name: 'MainComponent',
  components: {
    ModalWindow,
    Button,
    TableComponent
  },
  data () {
    return {
      isModal: false
    }
  }
}
</script>

<style scoped>
.main-wrapper{
  width: 100%;
  margin: 50px auto;
}
.addPerson-btn{
  margin-left: auto;
  margin-bottom: 30px;
}

@media (max-width: 1200px) {
  .main-wrapper{
    margin: 20px auto;
  }
}
</style>
