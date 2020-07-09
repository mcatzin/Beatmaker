class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".pad");
        this.playbtn = document.querySelector('.play');
        this.currentKick = "./allSounds/kick-classic.wav";
        this.currentSnare = "./allSounds/snare-acoustic01.wav";
        this.currentHihat = "./allSounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.selects = document.querySelectorAll('select');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
    }
    activePad() {
        this.classList.toggle("active");
    }
    repeat() {
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;

            if (bar.classList.contains("active")) {
                if (bar.classList.contains("kick-pad")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains("snare-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains("hihat-pad")) {
                    this.snareAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        })
        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;
        if (this.isPlaying) {
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updateBtn() {
        if (!this.isPlaying) {
            this.playbtn.innerText = "Stop";
            this.playbtn.classList.add("active");
        } else {
            this.playbtn.innerText = "Play";
            this.playbtn.classList.remove("active");
        }
    }

    chnageSound(e) {
        const SelectName = e.target.name;
        const selectValue = e.target.value;
        switch (SelectName) {
            case "kick-select":
                this.kickAudio.src = selectValue;
                break;
            case "snare-select":
                this.snareAudio.src = selectValue;
                break;
            case "hihat-select":
                this.hihatAudio.src = selectValue;
                break;
        }
    }
}

const drumkit = new DrumKit();

drumkit.pads.forEach(pad => {
    pad.addEventListener("click", drumkit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    })
})
drumkit.playbtn.addEventListener("click", () => {
    drumkit.updateBtn();
    drumkit.start();
})

drumkit.selects.forEach(select => {
    select.addEventListener("change", function (e) {
        drumkit.chnageSound(e);
    })
})