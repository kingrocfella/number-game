<template>
  <div>
    <headerbar/>
    <div class="container">
      <div class="row" style="margin-top: 5%;">
        <div class="col-sm-3"></div>
        <div class="col-sm-6 text-center">
          <strong><h3 class="display-4 homewelcome">Welcome to the Number Game!</h3></strong>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="alert alert-info load" role="alert" v-if="loader">Please wait!</div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="jumbotron text-center col-sm-6" id="mainblock">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Please enter your name/alias (max 5 characters) to proceed!"
              v-model="name"
              maxlength="5"
            >
            <small class="form-text text-muted">Your opponent would be able to see your name.</small>
          </div>
          <button type="button" class="btn btn-outline-success" @click="playGame()">Play Game!</button>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { playerRef, databaseDel } from "../firebase/firebase.js";
import axios from "axios";
import headerbar from "./header";
export default {
  data() {
    return {
      name: "",
      loader: false
    };
  },
  components: {
    headerbar: headerbar
  },
  created() {
    //if playername still exists, redirect back to the play page
    if (this.$store.state.playerName) {
      this.$router.push("/play");
    }
  },
  mounted() {
    document.body.style.backgroundColor = "#fcfcfc";
  },
  firebase: {
    playerDetails: playerRef
  },
  methods: {
    playGame() {
      if (this.name) {
        this.loader = true;
        //store player name in vuex store
        this.$store.dispatch("setPlayerName", this.name);
        //if the message  length is 1, it means that player 2 has already started the game
        if (this.playerDetails.length === 1) {
          this.$router.push("/play");
        }
        //push a random integer to the opponent to kickstart the game if player 2 hasn't already done that
        else {
          //remove previous data from the database if there are
          axios({
            method: "delete",
            url: databaseDel
          }).then(response => {
            //generate a random number between 100 and 1000
            let number = Math.floor(Math.random() * 900) + 100;
            playerRef
              .push({
                name: this.name,
                number: number,
                exp: null
              })
              .then(response => {
                this.$router.push("/play");
              });
          });
        }
      } else {
        alert("Please enter your name/alias to proceed!");
      }
    }
  }
};
</script>

<style>
#mainblock {
  margin-top: 5%;
}
.load {
  margin-bottom: -2%;
}
.homewelcome{
  font-size: 30px;
  font-weight: 250;
}
</style>
