// Стартуємо

// 1. Вставляємо функцію зміни кольорів (з ТЗ)


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }


// 2. Шукаємо наші елементи взаємодії
const refs = {
    body: document.querySelector(`body`),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}
let timerId = null;

// 3. Вішаємо слухача на стартБТН
refs.btnStart.addEventListener(`click`, event => {
    // 4. На таймер вішаємо інтервал і функцію зміну кольору
    timerId = setInterval(() => {let color = getRandomHexColor();  
    // 5. Присваюємо новий колір нашому Бади щосекунди  
    refs.body.style.backgroundColor = color;}, 1000);
    // 6. Нашому стартБаттону присваюємо атрибут "неактивності" доки працює функція
    refs.btnStart.setAttribute('disabled', true);
});

// 7. Вішаємо слухача на стопБТН

refs.btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    refs.btnStart.removeAttribute('disabled', true);
  });
