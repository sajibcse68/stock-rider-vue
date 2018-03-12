<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">StockRider</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">

          <router-link tag="li" to="/portfolio" class="nav-item" activeClass="active"><a class="nav-link">Portfolio</a></router-link>

          <router-link tag="li" to="/stocks" class="nav-item" activeClass="active"><a class="nav-link">Stocks</a></router-link>

          <li class="nav-item" @click.prevent="endDay"><a class="nav-link" href="#">End Day</a></li>

          <li class="nav-item dropdown" :class="{show: isDropdownOpen}" @click="isDisDropdownOpen = !isDropdownOpen">
            <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Save & Load
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#" @click="saveData">Save Data</a>
              <a class="dropdown-item" href="#" @click="loadData">Load Data</a>
            </div>
          </li>

          <li id="funds" class="nav-item" style="color: green">Funds: {{ funds | currency }}</li>

        </ul>
      </div>
    </nav>

    <div class="row">
      <div class="col-md-2">

      </div>

      <router-view></router-view>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      isDropdownOpen: false,
      TESTING: this.$route.query.TESTING || false
    };
  },
  computed: {
    funds () {
      return this.$store.getters.funds;
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      fetchData: 'loadData'
    }),
    endDay () {
      this.randomizeStocks();
    },
    saveData () {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      };
      /*
      if (this.TESTING) {
        return data;
      }
      */
      this.$http.put('tradeRider.json', data);
    },
    loadData () {
      this.fetchData();
    }
  },
  created () {
    console.log('>>>>>>>>>>TESTING: ', this.TESTING);
    this.fetchData(this.TESTING);
  }
};
</script>

<style lang="sass">
@import '../node_modules/bulma/bulma.sass'
@import 'mq'

.nav
  background-color: #383838
  a:hover
    color: gray

.nav-left a
  color: #fff
  font-weight: bold

a.r-item
  color:#C1C1C1
  padding: 0.5rem 1.75rem
  +mobile
    color: gray
    &:hover
      background-color: #F1F1F1

.nav-toggle span
  background-color: #C1C1C1

footer
  background-color: $primary !important
  color: #fff

  .icon
    color: #fff
    margin-left: 20px

</style>
