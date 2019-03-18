# The Number Game

The Goal is to implement a game with two independent units – the players – communicating with each other using an API.

# Description
When a player starts, it generates a random (whole) number between 100 and 1000 and sends it to the second player as an approach of starting the game. The receiving player can now always choose between adding one of {-1,0,1} to get to a number that is divisible by 3. The resulting whole number after the received number has been divided by 3 is then sent back to the original sender.
The same rules are applied until one player reaches the number 1 (after the division. 

### Docker
This project is very easy to install and deploy in a Docker container.
Open a terminal window in the player1 folder and run the following commands:

```sh
docker build -t player1 .
docker run -it -p 8080:80 --rm --name dockerize-player1 player1
```
Similarly, repeat the above step for the player2 folder and replace player1 with player2.

That's it! The two programs should be running on 
```sh
http://0.0.0.0:8080
http://0.0.0.0:8081
```

License
----

MIT
