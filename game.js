const GRID_SIZE = 20; //! độ rộng mỗi ô vuông
const WITDH = 600;
const HEIGHT = 600;
let SNAKE_SPEED = 8;

//! class chứa code để điều khiển rắn
class Snake {
    constructor() {
        this.vel = createVector(0, 0); //! tạo một vector toạ độ của x,y, Vel dùng để xác định phương hướng đang đi của phần đầu rắn
        this.head = createVector(0, 0);//! toạ độ của đầu
        this.length = 0; //! mặc định bằng 0
        this.body = []; //! là một mảng rỗng
        this.isDead = false; //! điều kiện chết
    }
    //! hàm cập nhật vị trí rắn
    update() {
        this.body.push(createVector(this.head.x, this.head.y)); //! add to the end of Array

        this.head.x += this.vel.x * GRID_SIZE; //! x ngang y dọc
        this.head.y += this.vel.y * GRID_SIZE;

        this.head.x = (this.head.x + WITDH) % WITDH;
        this.head.y = (this.head.y + HEIGHT) % HEIGHT;

        if (this.length < this.body.length) {
            this.body.shift(); //! remove the first element from the array và trả về phần tử ấy => clear body
        }
        //! kiểm tra xem rắn có cắn vào thân không
        for (let vector of this.body) {
            if (vector.x == this.head.x && vector.y == this.head.y) {
                this.isDead = true;
            }
        }

    }
    //! class show hiển thị con rắn lên màn hình
    show() {
        // noStroke(); //! vo hieu hoa duong vien 
        // Draw snake head
        fill(255); // làm đầy màu trong một khối, tô màu
        rect(this.head.x, this.head.y, GRID_SIZE, GRID_SIZE, 10); // vẽ một hình chữ nhật location (x,y) và w h (GridSize, GridSize)
                                                                // bo các góc bán kính là 10
        // Draw snake body
        fill(155);
        for (let vector of this.body) {
            rect(vector.x, vector.y, GRID_SIZE, GRID_SIZE, 70);
        }
    }
} 

//! class thức ăn 
class Food {
    constructor() {
        this.newFood();
    }
    newFood() {
        this.x = Math.floor(random(width)); //! toạ độ ngẫu nhiên của food
        this.y = Math.floor(random(height));

        this.x = Math.floor(this.x / GRID_SIZE) * GRID_SIZE;
        this.y = Math.floor(this.y / GRID_SIZE) * GRID_SIZE;
    }
    show() {
        fill(255, 40, 0);
        rect(this.x, this.y, GRID_SIZE, GRID_SIZE);
    }
}
 let snake, food;
//! function của thư viện
function setup() { //! setup function gọi một lần duy nhất khi chương trình bắt đầu để khai báo môi trường khởi tạo
    createCanvas(WITDH, HEIGHT);
    newGame();
}

function draw() { //! được gọi thẳng sau hàm setup, tự động chạy đến khi chương trình dừng
    background('black'); //! màu background
    if (!snake.isDead) {
        drawSnake();
    } else {
        newGame()
    }
}

function drawSnake() {
    // update every SNAKE_SPEED frame
    if (frameCount % SNAKE_SPEED == 0) { //! property frameCount chứa số frame được hiển thị từ khi chương trình bắt đầu
        snake.update(); //! sau 8 frame mới update 1 lần
    }
    //
    // textSize(15);
    // text("Score: " + snake.length, 0, 15);
    food.show();
    snake.show();

    //! Handle when snake eat food, đầu rắn trùng toạ độ với food
    if (snake.head.x == food.x && snake.head.y == food.y) {
        eatFood();
    }
}

function newGame() {
    snake = new Snake();
    food = new Food();
}

function eatFood() {
    snake.length++;
    // SNAKE_SPEED = SNAKE_SPEED - 1;
    food.newFood();
}
//! hàm tạo chuyển động cho rắn
function keyPressed() { //! được gọi một lần mỗi khi mà 1 key được ấn, keycode được ấn được lưu trong keyCode variable
    if (keyCode == UP_ARROW && snake.vel.y != 1) {
        snake.vel.y = -1;
        snake.vel.x = 0;
    } else if (keyCode == DOWN_ARROW && snake.vel.y != -1) {
        snake.vel.y = 1;
        snake.vel.x = 0;
    } else if (keyCode == LEFT_ARROW && snake.vel.x != 1) {
        snake.vel.y = 0;
        snake.vel.x = -1;
    } else if (keyCode == RIGHT_ARROW && snake.vel.x != -1) {
        snake.vel.y = 0;
        snake.vel.x = 1;
    }
}

