/* =========================================================
   ASTEROIDE.DESTROYER
   VIDEO PLAYER
   ========================================================= */

class VideoPlayer {

    constructor(videoElement, options = {}) {

        if (!videoElement) {
            throw new Error(
                "VideoPlayer : élément vidéo introuvable."
            );
        }

        if (videoElement.tagName !== "VIDEO") {
            throw new Error(
                "VideoPlayer : l'élément doit être une balise <video>."
            );
        }

        this.video = videoElement;

        this.options = {
            autoplay: false,
            muted: false,
            loop: false,
            ...options
        };

        this.isDraggingProgress = false;

        this.init();
    }


    /* =====================================================
       INITIALISATION
       ===================================================== */

    init() {

        this.video.controls = false;

        this.video.autoplay =
            this.options.autoplay;

        this.video.muted =
            this.options.muted;

        this.video.loop =
            this.options.loop;

        this.createPlayer();

        this.cacheElements();

        this.bindEvents();

        this.updatePlayButton();

        this.updateVolume();

        this.updateProgress();

    }


    /* =====================================================
       CRÉATION DU LECTEUR
       ===================================================== */

    createPlayer() {

        this.container =
            document.createElement("div");

        this.container.className =
            "video-player";


        this.video.parentNode.insertBefore(
            this.container,
            this.video
        );


        this.container.appendChild(
            this.video
        );


        this.container.insertAdjacentHTML(
            "beforeend",
            `

            <div class="video-player-controls">

                <button
                    class="video-player-button video-player-play"
                    type="button"
                    aria-label="Lire la vidéo"
                >
                    ▶
                </button>


                <span class="video-player-time video-player-current">
                    00:00
                </span>


                <input
                    class="video-player-progress"
                    type="range"
                    min="0"
                    max="100"
                    value="0"
                    step="0.1"
                    aria-label="Progression de la vidéo"
                >


                <span class="video-player-time video-player-duration">
                    00:00
                </span>


                <button
                    class="video-player-button video-player-mute"
                    type="button"
                    aria-label="Activer le son"
                >
                    🔊
                </button>


                <input
                    class="video-player-volume"
                    type="range"
                    min="0"
                    max="1"
                    value="1"
                    step="0.01"
                    aria-label="Volume"
                >


                <button
                    class="video-player-button video-player-pip"
                    type="button"
                    aria-label="Picture in Picture"
                >
                    PiP
                </button>


                <button
                    class="video-player-button video-player-fullscreen"
                    type="button"
                    aria-label="Plein écran"
                >
                    ⛶
                </button>

            </div>

            `
        );

    }


    /* =====================================================
       RÉCUPÉRATION DES ÉLÉMENTS
       ===================================================== */

    cacheElements() {

        this.playButton =
            this.container.querySelector(
                ".video-player-play"
            );

        this.currentTime =
            this.container.querySelector(
                ".video-player-current"
            );

        this.duration =
            this.container.querySelector(
                ".video-player-duration"
            );

        this.progress =
            this.container.querySelector(
                ".video-player-progress"
            );

        this.muteButton =
            this.container.querySelector(
                ".video-player-mute"
            );

        this.volume =
            this.container.querySelector(
                ".video-player-volume"
            );

        this.pipButton =
            this.container.querySelector(
                ".video-player-pip"
            );

        this.fullscreenButton =
            this.container.querySelector(
                ".video-player-fullscreen"
            );

    }


    /* =====================================================
       ÉVÉNEMENTS
       ===================================================== */

    bindEvents() {

        /* PLAY / PAUSE */

        this.playButton.addEventListener(
            "click",
            () => this.toggle()
        );


        this.video.addEventListener(
            "click",
            () => this.toggle()
        );


        /* LECTURE */

        this.video.addEventListener(
            "play",
            () => {

                this.updatePlayButton();

            }
        );


        /* PAUSE */

        this.video.addEventListener(
            "pause",
            () => {

                this.updatePlayButton();

            }
        );


        /* FIN */

        this.video.addEventListener(
            "ended",
            () => {

                this.updatePlayButton();

            }
        );


        /* PROGRESSION */

        this.video.addEventListener(
            "timeupdate",
            () => {

                if (!this.isDraggingProgress) {

                    this.updateProgress();

                }

            }
        );


        /* MÉTADONNÉES */

        this.video.addEventListener(
            "loadedmetadata",
            () => {

                this.updateDuration();

                this.updateProgress();

            }
        );


        /* BARRE DE PROGRESSION */

        this.progress.addEventListener(
            "input",
            () => {

                this.isDraggingProgress = true;

                if (!this.video.duration) {
                    return;
                }

                const time =
                    (
                        this.progress.value / 100
                    ) *
                    this.video.duration;

                this.video.currentTime = time;

                this.currentTime.textContent =
                    this.formatTime(time);

            }
        );


        this.progress.addEventListener(
            "change",
            () => {

                this.isDraggingProgress = false;

            }
        );


        /* VOLUME */

        this.volume.addEventListener(
            "input",
            () => {

                this.video.volume =
                    Number(this.volume.value);

                this.video.muted = false;

                this.updateVolume();

            }
        );


        /* MUTE */

        this.muteButton.addEventListener(
            "click",
            () => {

                this.video.muted =
                    !this.video.muted;

                this.updateVolume();

            }
        );


        /* PICTURE IN PICTURE */

        this.pipButton.addEventListener(
            "click",
            () => this.togglePictureInPicture()
        );


        /* PLEIN ÉCRAN */

        this.fullscreenButton.addEventListener(
            "click",
            () => this.toggleFullscreen()
        );


        /* CLAVIER */

        this.container.addEventListener(
            "keydown",
            (event) => this.handleKeyboard(event)
        );


        this.container.setAttribute(
            "tabindex",
            "0"
        );

    }


    /* =====================================================
       PLAY / PAUSE
       ===================================================== */

    play() {

        return this.video.play();

    }


    pause() {

        this.video.pause();

    }


    toggle() {

        if (this.video.paused) {

            this.play();

        } else {

            this.pause();

        }

    }


    /* =====================================================
       BOUTON PLAY
       ===================================================== */

    updatePlayButton() {

        if (this.video.paused) {

            this.playButton.textContent = "▶";

            this.playButton.setAttribute(
                "aria-label",
                "Lire la vidéo"
            );

        } else {

            this.playButton.textContent = "❚❚";

            this.playButton.setAttribute(
                "aria-label",
                "Mettre en pause"
            );

        }

    }


    /* =====================================================
       PROGRESSION
       ===================================================== */

    updateProgress() {

        const current =
            this.video.currentTime || 0;

        const total =
            this.video.duration || 0;


        this.currentTime.textContent =
            this.formatTime(current);


        if (total > 0) {

            this.progress.value =
                (current / total) * 100;

        } else {

            this.progress.value = 0;

        }

    }


    /* =====================================================
       DURÉE
       ===================================================== */

    updateDuration() {

        this.duration.textContent =
            this.formatTime(
                this.video.duration
            );

    }


    /* =====================================================
       VOLUME
       ===================================================== */

    updateVolume() {

        if (
            this.video.muted ||
            this.video.volume === 0
        ) {

            this.muteButton.textContent =
                "🔇";

        } else if (
            this.video.volume < 0.5
        ) {

            this.muteButton.textContent =
                "🔉";

        } else {

            this.muteButton.textContent =
                "🔊";

        }


        this.volume.value =
            this.video.volume;

    }


    /* =====================================================
       PICTURE IN PICTURE
       ===================================================== */

    async togglePictureInPicture() {

        if (
            !document.pictureInPictureEnabled
        ) {

            return;

        }


        try {

            if (
                document.pictureInPictureElement
            ) {

                await document.exitPictureInPicture();

            } else {

                await this.video.requestPictureInPicture();

            }

        } catch (error) {

            console.error(
                "Picture in Picture impossible :",
                error
            );

        }

    }


    /* =====================================================
       PLEIN ÉCRAN
       ===================================================== */

    async toggleFullscreen() {

        try {

            if (!document.fullscreenElement) {

                await this.container.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.error(
                "Plein écran impossible :",
                error
            );

        }

    }


    /* =====================================================
       RACCOURCIS CLAVIER
       ===================================================== */

    handleKeyboard(event) {

        switch (event.key) {

            case " ":
            case "k":

                event.preventDefault();

                this.toggle();

                break;


            case "ArrowRight":

                event.preventDefault();

                this.video.currentTime =
                    Math.min(
                        this.video.duration || 0,
                        this.video.currentTime + 5
                    );

                break;


            case "ArrowLeft":

                event.preventDefault();

                this.video.currentTime =
                    Math.max(
                        0,
                        this.video.currentTime - 5
                    );

                break;


            case "ArrowUp":

                event.preventDefault();

                this.video.volume =
                    Math.min(
                        1,
                        this.video.volume + 0.1
                    );

                this.video.muted = false;

                this.updateVolume();

                break;


            case "ArrowDown":

                event.preventDefault();

                this.video.volume =
                    Math.max(
                        0,
                        this.video.volume - 0.1
                    );

                this.updateVolume();

                break;


            case "m":

                event.preventDefault();

                this.video.muted =
                    !this.video.muted;

                this.updateVolume();

                break;


            case "f":

                event.preventDefault();

                this.toggleFullscreen();

                break;

        }

    }


    /* =====================================================
       FORMATAGE DU TEMPS
       ===================================================== */

    formatTime(seconds) {

        if (
            !Number.isFinite(seconds)
        ) {

            return "00:00";

        }


        seconds =
            Math.floor(seconds);


        const minutes =
            Math.floor(
                seconds / 60
            );


        const remainingSeconds =
            seconds % 60;


        return (
            String(minutes).padStart(2, "0") +
            ":" +
            String(remainingSeconds).padStart(2, "0")
        );

    }


    /* =====================================================
       DESTRUCTION
       ===================================================== */

    destroy() {

        this.container.replaceWith(
            this.video
        );

        this.video.controls = true;

    }

}


/* =========================================================
   EXPORT
   ========================================================= */

export default VideoPlayer;

