<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
    <a class="navbar-brand headercomponent" href="#">N.G.</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <strong>
        <h6 class="display-4 welcome" v-if="$route.path != '/'">Welcome {{name}} !</h6>
      </strong>
    </div>
  </nav>
</template>

<script>
export default {
  created() {
    //retrieve player name from vuex store on page load
    this.name = this.$store.state.playerName;
  },
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style>
.welcome {
  font-size: 25px;
}
.headercomponent {
  z-index: 13;
  line-height: 60px;
  font-size: 18px;
  font-weight: bold;
  background: #50aadd;
  width: 150px;
  text-align: center;
  margin-left: -1.5%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
