const timeElements = document.querySelectorAll('.action__time-meaning-number');
const totalDuration = 2  * 60 * 60 * 1000;
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds)
    };  
}
function pad(num) {
    return num < 10 ? '0' + num : num;
}
function updateTimer() {
    const start = Date.now();
    const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - start;
        const remaining = totalDuration - elapsed;
        
        if (remaining <= 0) {
            clearInterval(interval);
            timeElements[0].textContent = '00';
            timeElements[1].textContent = '00';
            timeElements[2].textContent = '00';
            return;
        }
        
        const { hours, minutes, seconds } = formatTime(remaining);
        
        timeElements[0].textContent = hours;
        timeElements[1].textContent = minutes;
        timeElements[2].textContent = seconds;
    }, 1000);
}
document.addEventListener('DOMContentLoaded', () => {
    updateTimer();
});





// Получаем начальное время из атрибута datetime
const initialTime = document.querySelector('time').getAttribute('datetime').split('T')[1];
const timeParts = initialTime.split(':').map(Number);
let hours = timeParts[0];
let minutes = timeParts[1];
let seconds = timeParts[2];

// Получаем элементы DOM
const hourSpan = document.querySelector('.hour');
const minuteSpan = document.querySelector('.minute');
const secondSpan = document.querySelector('.second');
const timeElement = document.querySelector('time');

// Функция для добавления ведущих нулей
function pad(num) {
    return String(num).padStart(2, '0');
}

// Рассчитываем конечное время
const endTime = new Date().getTime() + 
    (hours * 60 * 60 * 1000) + 
    (minutes * 60 * 1000) + 
    (seconds * 1000);

// Основной таймер
const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;

    if (distance < 0) {
        clearInterval(timer);
        hourSpan.textContent = '00';
        minuteSpan.textContent = '00';
        secondSpan.textContent = '00';
        timeElement.setAttribute('datetime', 'T00:00:00');
        return;
    }

    // Рассчитываем оставшиеся часы, минуты и секунды
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Форматируем и обновляем DOM
    hourSpan.textContent = pad(hours);
    minuteSpan.textContent = pad(minutes);
    secondSpan.textContent = pad(seconds);

    // Обновляем атрибут datetime
    timeElement.setAttribute('datetime', `T${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
}, 1000);
// Пишем слайдер для new stickers
