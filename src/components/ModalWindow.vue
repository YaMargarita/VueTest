<template>
  <div class="modalWindow">
    <div class="modalWindow-content">
      <div class="content-header">
        <div class="content-title">Добавление пользователя</div>
        <button class="header-btn"
                @click="$emit('closeModal')">
          <i class="fas fa-times close-icon"></i>
        </button>
      </div>
      <form class="content-form">
        <div class="form-item">
          <label for="name" class="label-item">Имя</label>
          <input type="text"
                 id="name"
                 class="input-item"
                 v-model="name"
                 autocomplete="off">
        </div>
        <div class="form-item">
          <label for="phone" class="label-item">Телефон</label>
          <input type="text"
                 id="phone"
                 class="input-item"
                 v-model="phone"
                 autocomplete="off">
        </div>
        <div class="form-item">
          <label for="boss" class="label-item">Начальник</label>
          <select id="boss"
                  v-model="select"
                  class="input-item"
                  :key="options.length"
                  :disabled="!options.length">
            <option v-for="item in options"
                    :key="item.id"
                    :value="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <Button @click.prevent.native="savePerson"
                class="save-btn"
                :class="{disabled: isDisabled}"
                :disabled="isDisabled">
          Сохранить
        </Button>
      </form>
    </div>
  </div>
</template>

<script>
import Button from './Button'
export default {
  name: 'ModalWindow',
  components: {
    Button
  },
  data () {
    return {
      name: null,
      phone: null,
      select: null,
      options: []
    }
  },
  computed: {
    isDisabled () {
      return !(this.name && this.phone)
    }
  },
  methods: {
    async savePerson () {
      const person = {
        name: this.name,
        phone: this.phone,
        select: this.select,
        id: new Date().valueOf()
      }
      await this.$store.dispatch('createPerson', person)
      this.options = await this.$store.dispatch('getAllBoss')
      this.name = this.phone = this.select = null
    }
  },
  async mounted () {
    this.options = await this.$store.dispatch('getAllBoss')
  }
}
</script>

<style scoped>
.modalWindow{
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.6);
}
.modalWindow-content{
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}
.content-header{
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-btn{
  border: none;
  background-color: inherit;
}
.close-icon{
  padding: 5px;
  cursor: pointer;
}
.form-item{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.label-item{
  font-size: 18px;
}
.input-item{
  padding: 5px;
  width: 300px;
  font-family: inherit;
  font-size: 16px;
}
.save-btn{
  margin-top: 50px;
}
.disabled{
  background-color: #b2b9e9;
  cursor: auto;
}
.disabled:hover{
  background-color: #b2b9e9;
}

@media (max-width: 1160px){
  .modalWindow-content{
    width: 60%;
  }
}
@media (max-width: 770px){
  .modalWindow-content{
    width: 90%;
    padding: 10px;
  }
}
@media (max-width: 520px){
  .content-header{
    margin-bottom: 15px;
    font-size: 14px;
  }
  .form-item{
    margin-bottom: 10px;
  }
  .label-item{
    font-size: 14px;
  }
  .input-item{
    padding: 5px;
    width: 150px;
  }
}

</style>
