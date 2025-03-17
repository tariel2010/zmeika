const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake = [{x: 200, y: 200}];
let food = {x: 100, y: 100};
let dx = 0;
let dy = 0;
let score = 0;

function draw() {
    // Очистка холста
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем еду
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
    
    // Рисуем змею
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
    
    // Движение
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    
    // Проверка на столкновение с едой
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 39) * 10,
            y: Math.floor(Math.random() * 39) * 10
        };
        score++;
    } else {
        snake.pop();
    }
    
    // Столкновение со стенами или самой собой
    if (head.x < 0 || head.x > canvas.width - 10 ||
        head.y < 0 || head.y > canvas.height - 10) {
        alert('Игра окончена! Ваш счёт: ' + score);
        document.location.reload();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('Игра окончена! Ваш счёт: ' + score);
            document.location.reload();
        }
    }
}

// Управление
document.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowUp':
            dx = 0; dy = -10;
            break;
        case 'ArrowDown':
            dx = 0; dy = 10;
            break;
        case 'ArrowLeft':
            dx = -10; dy = 0;
            break;
        case 'ArrowRight':
            dx = 10; dy = 0;
            break;
    }
});

// Запуск игры
setInterval(draw, 100);
