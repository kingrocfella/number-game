<template>
  <div>
    <headerbar/>
    <div class="container playgame">
      <div class="row mainheader" style="background-color: #50aadd;">
        <div class="col-sm-4"></div>
        <div class="col-sm-4 text-center" style="padding: 10px; ">
          <h4>Goodluck!
            <br>
            <span class="display-4 welcome" style="font-size: 15px;">May the Force be with you!</span>
          </h4>
        </div>
      </div>
      <br>
      <div class="row" v-if="!wonGame && !lostGame">
        <div class="col-sm-5 text-center" @click="sendData('-1')" style="cursor: pointer;">
          <span class="dot float-right">-1</span>
        </div>
        <div class="col-sm-2 text-center" @click="sendData('0')" style="cursor: pointer;">
          <span class="dot">0</span>
        </div>
        <div class="col-sm-2 text-center" @click="sendData('1')" style="cursor: pointer;">
          <span class="dot">1</span>
        </div>
      </div>
      <br>
      <br>
      <div
        class="row"
        v-for="item in playerDetails"
        :key="item['.key']"
        style="margin-bottom: 15px;"
      >
        <div class="col-sm-3 text-center">
          <strong class="user">{{item['name']}}</strong>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <p v-if="item['exp']" style="font-size: 16px;">{{item['exp']}}</p>
                <strong>{{item['number']}}</strong>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <!-- win Modal -->
      <div
        class="modal fade"
        id="winModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="winModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="winModalLabel" style="color: #15a300;">
                <strong>Congratulations!</strong>
              </h5>
            </div>
            <div class="modal-body text-center">
              <img
                src="../assets/trophy.png"
                class="img-fluid"
                alt
                border="0"
                width="100"
                height="100"
                style="display:block; border:none; outline:none; text-decoration:none;"
              >
              <br>
              <br>
              <h3>You Won!</h3>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-success"
                data-dismiss="modal"
                @click="newGame()"
              >Go Again?</button>
              <button type="button" class="btn btn-danger" @click="Quit()">Quit</button>
            </div>
          </div>
        </div>
      </div>
      <!-- lose modal -->
      <div
        class="modal fade"
        id="loseModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="loseModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="loseModalLabel" style="color: #e00000;">
                <strong>Oops!</strong>
              </h5>
            </div>
            <div class="modal-body text-center">
              <img
                src="../assets/lose.png"
                class="img-fluid"
                alt
                border="0"
                width="100"
                height="100"
                style="display:block; border:none; outline:none; text-decoration:none;"
              >
              <br>
              <br>
              <h3>You lost!</h3>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-success"
                data-dismiss="modal"
                @click="newGame()"
              >Try Again?</button>
              <button type="button" class="btn btn-danger">Quit</button>
            </div>
          </div>
        </div>
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
      number: "",
      lastDetails: "",
      wonGame: "",
      lostGame: "",
      playerDetails: []
    };
  },
  components: {
    headerbar: headerbar
  },
  created() {
    //retrieve player name from vuex store on page load
    this.name = this.$store.state.playerName;
    //If user name does not exist, redirect user to register page
    if (!this.name) {
      this.$router.push("/");
    }
  },
  firebase: {
    playerDetails: playerRef
  },
  mounted() {
    document.body.style.backgroundColor = "#fcfcfc";
  },
  watch: {
    playerDetails: function(value) {
      let len = value.length;
      if (len > 0) {
        if (value[len - 1]["number"] == 1) {
          if (value[len - 1]["name"] === this.name) {
            this.wonGame = true;
            this.displayModal("win");
          } else {
            this.lostGame = true;
            this.displayModal("lose");
          }
        }
      }
    }
  },
  methods: {
    Quit() {
      //reload page to reset everything
      location.reload(true);
    },
    displayModal(index) {
      if (index === "win") {
        $("#winModal").modal({
          backdrop: "static",
          keyboard: false
        });
      } else {
        $("#loseModal").modal({
          backdrop: "static",
          keyboard: false
        });
      }
    },
    newGame() {
      if (this.playerDetails.length === 1) {
        this.wonGame = false;
        this.lostGame = false;
        let len = this.playerDetails.length;
        let newNumber = Math.floor(
          (Number(this.playerDetails[len - 1]["number"]) +
            Number(this.number)) /
            3
        );
        let divisor =
          Number(this.playerDetails[len - 1]["number"]) + Number(this.number);

        playerRef.push({
          name: this.name,
          number: newNumber,
          exp: "[" + String(divisor) + "/" + 3 + "] = " + newNumber
        });
      } else if (this.playerDetails.length > 1) {
        //remove previous data from the database if there are
        axios({
          method: "delete",
          url: databaseDel
        }).then(response => {
          //generate a random number between 100 and 1000
          let number = Math.floor(Math.random() * 900) + 100;
          playerRef.push({
            name: this.name,
            number: number,
            exp: null
          });
          this.wonGame = false;
          this.lostGame = false;
        });
      }
    },
    sendData(number) {
      this.number = number;
      if (this.number) {
        let len = this.playerDetails.length;
        if (len > 0) {
          if (this.playerDetails[len - 1]["name"] !== this.name) {
            let newNumber = Math.floor(
              (Number(this.playerDetails[len - 1]["number"]) +
                Number(this.number)) /
                3
            );
            let divisor =
              Number(this.playerDetails[len - 1]["number"]) +
              Number(this.number);

            //if number is less than one, make the player a winner
            if (newNumber < 1) {
              newNumber = 1;
            }
            playerRef.push({
              name: this.name,
              number: newNumber,
              exp: "[" + String(divisor) + "/" + 3 + "] = " + newNumber
            });
          } else {
            alert("Please wait for your opponent to respond!");
          }
        } 
      } else {
        alert("Please choose an option from the dropdown!");
      }
    }
  }
};
</script>

<style>
.playgame {
  max-width: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 3%;
  padding-bottom: 10px;
  margin-bottom: 1.5%;
}
.mainheader {
  /* max-height: 10px; */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.dot {
  height: 70px;
  width: 70px;
  line-height: 70px;
  background-color: #50aadd;
  border-radius: 50%;
  display: inline-block;
}
.dot:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.user {
  height: 60px;
  width: 60px;
  line-height: 60px;
  background-color: #50aadd;
  border-radius: 50%;
  display: inline-block;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
