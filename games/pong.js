/**
 * @file
 * Pong!
 * 
 * @author edmund viagedor
 */

window.onload = function () {
    "use strict";

    const PADDLE_WIDTH = 10, PADDLE_HEIGHT = 65;
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let keysPressed = {}; // checks if a key is being held down or released; (https://stackoverflow.com/questions/1828613/check-if-a-key-is-down; answered by Robert)

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
     * Player1's Paddle
     */
    class Player1 extends Paddle {
        /**
         * @constructor
         * @param {int} x 
         * @param {int} y 
         * @param {int} width 
         * @param {int} height 
         * @param {int} y_velocity 
         */
        constructor(x, y, width, height, y_velocity) {
            super(x, y, width, height, y_velocity);
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
    }

    /**
     * Player2's Paddle
     */
    class Player2 extends Paddle {
        /**
         * @constructor
         * @param {int} x 
         * @param {int} y 
         * @param {int} width 
         * @param {int} height 
         * @param {int} y_velocity 
         */
        constructor(x, y, width, height, y_velocity) {
            super(x, y, width, height, y_velocity);
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
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.x_velocity = 0;
            this.y_velocity = 5;
        }

        /**
         * Draws the Puck on the canvas
         */
        render() {
            context.beginPath();
            context.arc(this.x, this.y, 5, 2 * Math.PI, false);
            context.fillStyle = "#ffffff";
            context.fill();
        }

        update() {
            
        }
    }

    let player1 = new Player1(15, 40, PADDLE_WIDTH, PADDLE_HEIGHT, 0);
    let player2 = new Player2((canvas.width - PADDLE_WIDTH) - 15, 200, PADDLE_WIDTH, PADDLE_HEIGHT, 10);
    let puck = new Puck(canvas.width / 2, canvas.height / 2);

    function update() {
        player1.update();
        player2.update();
    }

    function render() {
        player1.render();
        player2.render();
        puck.render();
    }

    /**
     * Performs a "game loop" with the constant calls from requestAnimationFrame
     */
    function show() {
        update();
        render();
        window.requestAnimationFrame(show);
    };

    window.requestAnimationFrame(show);

    // checks if a key is being held down or released
    // (https://stackoverflow.com/questions/1828613/check-if-a-key-is-down; answered by Robert)
    window.addEventListener("keydown", function (e) {
        keysPressed[e.keyCode] = true;
    }, false);

    window.addEventListener("keyup", function (e) {
        delete keysPressed[e.keyCode]; // remove the key from being a pressed key
    }, false);
}
