<template>
  <div class="table-wrapper"
       v-if="persons.length"
       :key="renderKey">
    <tree-table
      @click.native="checkSort($event)"
      class="table"
      :columns="headerRow"
      :table-data="persons" />
  </div>
  <p v-else class="table-empty test">Пользователи еще не добавлены</p>
</template>

<script>
import TreeTable from 'vue-tree-table-component'
export default {
  name: 'TableComponent',
  components: {
    TreeTable
  },
  data () {
    return {
      nameSort: false,
      phoneSort: false,
      renderKey: 0,
      isIncrease: false,
      sortTag: '',
      headerRow: [
        {
          label: 'Имя',
          id: 'name'
        },
        {
          label: 'Телефон',
          id: 'phone'
        }
      ]
    }
  },
  computed: {
    persons () {
      return this.$store.getters.getPersons
    }
  },
  watch: {
    persons () {
      this.renderKey++
    }
  },
  methods: {
    checkSort (event) {
      if (event.target.attributes['data-v-e09df11e']) {
        if (event.target.textContent.includes('Имя')) {
          this.nameSort = !this.nameSort
          this.isIncrease = this.nameSort
          this.sortTag = 'name'
        }
        if (event.target.textContent.includes('Телефон')) {
          this.phoneSort = !this.phoneSort
          this.isIncrease = this.phoneSort
          this.sortTag = 'phone'
        }
        this.sortFunc(this.persons)
      }
    },
    sortFunc (arr) {
      arr.sort((a, b) => {
        let item1 = a[this.sortTag].toLowerCase()
        let item2 = b[this.sortTag].toLowerCase()
        if (this.isIncrease) {
          if (item1 < item2) return -1
          if (item1 > item2) return 1
        } else {
          if (item1 > item2) return -1
          if (item1 < item2) return 1
        }
        return 0
      })
      for (let item of arr) {
        if (item.children) {
          this.sortFunc(item.children)
        }
      }
    }
  }
}
</script>

<style>
.row{
  padding-left: 0 !important;
}
.closed::before{
  content: "\002B" !important;
}
.open::before{
  content: "\002D" !important;
}
.cell{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<style scoped>
.table-wrapper{
  border: 3px solid #7D82A8;
}
.table-empty{
  text-align: center;
  font-size: 20px;
}
@media (max-width: 550px) {
  *{
    font-size: 14px;
  }
}
</style>
