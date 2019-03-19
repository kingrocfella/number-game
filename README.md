# The Number Game

The Goal is to implement a game with two independent units – the players – communicating with each other using an API.

# Description
When a player starts, it generates a random (whole) number between 100 and 1000 and sends it to the second player as an approach of starting the game. The receiving player can now always choose between adding one of {-1,0,1} to get to a number that is divisible by 3. The resulting whole number after the received number has been divided by 3 is then sent back to the original sender.
The same rules are applied until one player reaches the number 1 (after the division. 

### NPM Install
This project is very easy to install and run.
Clone this repo and open a terminal window and run the following commands to set up the main player:

```sh
##To install all the project dependencies
npm install
##To start up the dev server and run the project
npm run dev
```
Similarly, repeat the above step to set up an opponent for the main player.

That's it! The two players should be running on:
```sh
http://localhost:8080/#/
http://localhost:8081/#/
```

License
----

MIT
