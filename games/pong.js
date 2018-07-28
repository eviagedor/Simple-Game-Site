/**
 * @file
 * Pong!
 * 
 * @author edmund viagedor
 */

window.onload = function () {
    "use strict";

    const PADDLE_WIDTH = 10,
        PADDLE_HEIGHT = 65;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let keysPressed = {}; // checks if a key is being held down or released; 
    // (https://stackoverflow.com/questions/1828613/check-if-a-key-is-down; answered by Robert)

    /**
     * Paddle object
     */
    class Paddle {
        /**
         * @constructor
         * @param {int} x 
         * @param {int} y 
         * @param {int} width 
         * @param {int} height 
         * @param {int} y_velocity 
         */
        constructor(x, y, width, height, y_velocity) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.y_velocity = y_velocity;
        }

        /**
         * Draw the Paddle
         */
        render() {
            context.fillStyle = "#ffffff";
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        /**
         * Move the Paddle when its movement keys are pressed
         * @param {int} y 
         */
        move(y) {
            context.clearRect(this.x, this.y, this.width, this.height);
            this.y += y;
            this.y_velocity = y;

            if (this.y < 0) { // Paddle at the top of canvas?
                this.y = 0;
                this.y_velocity = 0;
            } else if (this.y > canvas.height - this.height) { // Paddle at the bottom of canvas?
                this.y = canvas.height - this.height;
                this.y_velocity = 0;
            }
        }
    }

    /**
     * Player1"s Paddle
     */
    class Player1 extends Paddle {
        /**
         * @constructor
         * @param {int} x 
         * @param {int} y 
         * @param {int} width 
         * @param {int} height 
         * @param {int} y_velocity 
         * @param {int} score
         */
        constructor(x, y, width, height, y_velocity) {
            super(x, y, width, height, y_velocity);
            this.score = 0;
        }

        /**
         * Draws the Paddle on the canvas
         */
        render() {
            super.render();
        }

        /**
         * Updates the y-coordinate of Player1
         */
        update() {
            for (let key in keysPressed) {
                let _key = Number(key); // convert the key to a number

                if (_key === 87) {
                    super.move(-5);
                } else if (_key === 83) {
                    super.move(5);
                }
            }
        }

        /**
         * Returns the current score
         */
        addScore() {
            return ++this.score;
        }
    }

    /**
     * Player2"s Paddle
     */
    class Player2 extends Paddle {
        /**
         * @constructor
         * @param {int} x 
         * @param {int} y 
         * @param {int} width 
         * @param {int} height 
         * @param {int} y_velocity 
         * @param {int} score
         */
        constructor(x, y, width, height, y_velocity) {
            super(x, y, width, height, y_velocity);
            this.score = 0;
        }

        /**
         * Draws the Paddle on the canvas
         */
        render() {
            super.render();
        }

        /**
         * Updates the y-coordinate of Player2
         */
        update() {
            for (let key in keysPressed) { // convert the key to a number
                let _key = Number(key);

                if (_key === 38) {
                    super.move(-5);
                } else if (_key === 40) {
                    super.move(5);
                }
            }
        }

        /**
         * Returns the current score
         */
        addScore() {
            return ++this.score;
        }
    }

    /**
     * Puck Object
     */
    class Puck {
        /**
         * @constructor
         * @param {int} x the x coordinate 
         * @param {int} y the y coordinate
         */
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.radius = 6;
            this.x_velocity = 3;
            this.y_velocity = 3;
        }

        /**
         * Draws the Puck on the canvas
         */
        render() {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
            context.fillStyle = "#ffffff";
            context.fill();
        }

        /**
         * Checks if the puck collides with any walls or paddles
         * @param {Paddle} p1 player 1
         * @param {Paddle} p2 player 2
         */
        update(p1, p2) {
            let p1score = document.getElementById("p1score");
            let p2score = document.getElementById("p2score");

            this.clearPuck();

            if (this.y < this.radius || this.y > canvas.height - this.radius) { // collide with top or bottom?
                this.y_velocity *= -1;
            }

            if (this.x < 0) { // scored on player1?
                this.clearPuck();
                this.resetPuck();
                p2score.innerHTML = p2.addScore();
            } else if (this.x > canvas.width) { // scored on player2?
                this.clearPuck();
                this.resetPuck();
                p1score.innerHTML = p1.addScore();
            }

            if (this.x < (p1.x + p1.width) && this.y < (p1.y + p1.height) &&
                p1.x < (this.x + this.radius) && p1.y < (this.y + this.radius)) { // collide with player 1 (left paddle)?
                this.x_velocity *= -1;
            }

            if (this.x < (p2.x + p2.width) && this.y < (p2.y + p2.height) &&
                p2.x < (this.x + this.radius) && p2.y < (this.y + this.radius)) { // collide with player 2 (right paddle)?
                this.x_velocity *= -1;
            }

            this.x += this.x_velocity;
            this.y += this.y_velocity;
        }

        /**
         * Clear the circle from canvas
         */
        clearPuck() {
            context.clearRect(0, 0, canvas.width, canvas.height); // clear the circle for redraw
        }

        /**
         * Reinitialize starting x & y of the Puck
         */
        resetPuck() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
        }
    }

    let player1 = new Player1(15, canvas.height / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 0);
    let player2 = new Player2((canvas.width - PADDLE_WIDTH) - 15, canvas.height / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 10);
    let puck = new Puck();

    window.requestAnimationFrame(show);

    // checks if a key is being held down or released
    // (https://stackoverflow.com/questions/1828613/check-if-a-key-is-down; answered by Robert)
    window.addEventListener("keydown", function (e) {
        keysPressed[e.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function (e) {
        delete keysPressed[e.keyCode]; // remove the key from being a pressed key
    }, false);

    /**
     * Performs a "game loop" with the constant calls from requestAnimationFrame
     */
    function show() {
        update();
        render();
        window.requestAnimationFrame(show);
    }

    /**
     * Updates the coordinates of each object on the canvas
     */
    function update() {
        player1.update();
        player2.update();
        puck.update(player1, player2);
    }

    /**
     * Draws each object on the canvas
     */
    function render() {
        player1.render();
        player2.render();
        puck.render();
    }
}