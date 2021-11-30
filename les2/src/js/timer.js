import { Howl } from "howler";

export class Timer {
    constructor(id) {
        this.form = document.getElementById(id);
        this.buttons = this.form.getElementsByTagName('button');
        this.timeinterval = 0;
        this.endtime = 0;
        this.start = 0;
        this.sound = new Howl(
            { src: ['./sounds/Usb-connection-sound-effect.mp3'] }
        );
    }

    getTimeRemaining() {
        let t = Date.parse(this.endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);

        return {
            total: t,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    initializeClock(id, endtime) {
        this.start = 1;
        let clock = document.getElementById(id);
        let hoursSpan = clock.querySelector(".hours");
        let minutesSpan = clock.querySelector(".minutes");
        let secondsSpan = clock.querySelector(".seconds");

        document.getElementById("deadline-message").className = "deadline-message";
        this.endtime = endtime;

        const updateClock = () => {
            let t = this.getTimeRemaining(this.endtime);

            if (t.total < 0) {
                document.getElementById("deadline-message").className = "visible";
                this.sound.play();
                clearInterval(this.timeinterval);

                this.start = 0;

                return true;
            }

            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
        }

        updateClock();

        this.timeinterval = setInterval(updateClock, 1000);

    }

    stopClock() {
        clearInterval(this.timeinterval);
        this.start = 0;
    }

    doTimerAction = id => {
        switch (parseInt(id)) {
            case 1:
                if (this.start === 0) {
                    let seconds = this.form.getElementsByClassName('seconds')[0].value;
                    let deadline = new Date(Date.parse(new Date()) + seconds * 1000);
                    this.initializeClock('countdown', deadline);
                    document.getElementById('countdown').style.display = 'block';
                }

                break
            case 2:
                this.stopClock();

                break;
        }
    }
}








