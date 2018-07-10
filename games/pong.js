window.onload = function () {

    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 65;

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";

    class Paddle {
        constructor(x, y, width, height, y_velocity) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.y_velocity = y_velocity;
        }

        move(y) {
            context.clearRect(this.x, this.y, this.width, this.height);

            this.y += y;
            this.y_velocity = y;

            if(this.y > canvas.height) {
                this.y = canvas.height - this.height;
            }
        }

        render() {
            context.beginPath();
            context.fillRect(this.x, this.y, this.width, this.height);
            context.stroke();
        }

        get y() {
            return this._y;
        }

        get y_velocity() {
            return this._y_velocity;
        }

        set y(y) {
            this._y = y;
        }

        set y_velocity(y_velocity) {
            this._y_velocity = y_velocity;
        }
    }

    class puck {
        constructor(x, y, x_velocity, y_velocity) {
            this.x = x;
            this.y = y;
            this.x_velocity = x_velocity;
            this.y_velocity = y_velocity;
        }
    }

    var paddle1 = new Paddle(5, 40, PADDLE_WIDTH, PADDLE_HEIGHT, 0);
    var paddle2 = new Paddle((canvas.width - PADDLE_WIDTH) - 5, 200, PADDLE_WIDTH, PADDLE_HEIGHT, 0);
    //var puck = new puck()

    paddle1.render();
    paddle2.render();

    document.addEventListener('keydown', movePlayer);

    function movePlayer(e) {
        if (e.keyCode === 87) {
            paddle1.move(-10);
            paddle1.render();
            console.log("MOVE PADDLE UP");
        } else if (e.keyCode === 83) {
            paddle1.move(10);
            paddle1.render();
            console.log("MOVE PADDLE DOWN");
        }
    }
}