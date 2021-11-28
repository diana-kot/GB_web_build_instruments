export function initTimer(timer) {
    for (let i = 0, len = timer.buttons.length; i < len; i++) {
        timer.buttons[i].addEventListener('click', function (e) {
            e.preventDefault();
            timer.doTimerAction(e.target.value);
        })
    }
}