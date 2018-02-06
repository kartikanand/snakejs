class Game {
    constructor (domRoot) {
        this.ctx = domRoot.getContext("2d");
        this.score = 0;
        this.gameOver = false;

        this.board = new Board(300, 300);        
        this.snake = new Snake(7);

        this.speed = 1;

        this.diffX = 0;
        this.diffY = 0;

        this.registerEvents();
    }

    registerEvents () {
        document.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case "ArrowDown":
                    this.diffX = 0;
                    this.diffY = this.speed;
                    break;
                case "ArrowUp":
                    this.diffX = 0;
                    this.diffY = -this.speed;
                    break;
                case "ArrowLeft":
                    this.diffX = -this.speed;
                    this.diffY = 0;
                    break;
                case "ArrowRight":
                    this.diffX = this.speed;
                    this.diffY = 0;
                    break;
                default:
                    return;
            }
        });
    }

    loop () {
        this.snake.move(this.diffX, this.diffY);
        this.draw();
    }
 
    draw () {
        const ctx = this.ctx;

        this.board.draw(ctx);
        this.snake.draw(ctx);
    }

    start () {
        setInterval(() => {
            this.loop();
        }, 1000/10);
    }
}


class Board {
    constructor (height, width) {
        this.height = height;
        this.width = width;
    }

    draw (ctx) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
    }
}


class Snake {
    constructor (len) {
        this.size = 10;  // 5px
        this.len = len;
        this.body = new Array(this.len);

        for (let i=0; i<this.len; i++) {
            const x = this.len - i - 1;
            this.body[i] = {
                x: x,
                y:0
            };
        }
     }

    move (diffX, diffY) {
        if (diffX == 0 && diffY == 0)   return;

        for (let i=this.body.length-1; i>0; i--) {
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }

        this.body[0].x += diffX;
        this.body[0].y += diffY;
    }

    draw (ctx) {
        for (let i=0; i<this.body.length; i++) {
            const x = this.body[i].x;
            const y = this.body[i].y;

            ctx.fillStyle = 'red';

            const Xoffset = x * (this.size); 
            const Yoffset = y * (this.size); 

            ctx.fillRect(Xoffset, Yoffset, this.size, this.size);
        }
    }
}
