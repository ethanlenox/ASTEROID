/* =========================================================
   ASTEROIDE.DESTROYER
   VIDEO PLAYER
   ========================================================= */

class VideoPlayer {

    constructor(video) {

        if (!video || video.tagName !== "VIDEO") {
            return;
        }

        this.video = video;

        this.container = null;

        this.controls = null;

        this.hideControlsTimeout = null;

        this.isPointerOver = false;

        this.isDragging = false;

        this.init();

    }


    /* =====================================================
       INITIALISATION
       ===================================================== */

    init() {

        this.createPlayer();

        this.cacheElements();

        this.bindEvents();

        this.updatePlayButton();

        this.updateVolume();

        this.updateProgress();

        this.updateDuration();

        this.updatePipButton();

    }


    /* =====================================================
       CRÉATION DU LECTEUR
       ===================================================== */

    createPlayer() {

        this.container =
            document.createElement("div");

        this.container.className =
            "video-player";


        this.video.controls = false;

        this.video.classList.add(
            "video-player-media"
        );


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

            <div
                class="video-player-overlay"
                aria-hidden="true"
            ></div>


            <div
                class="video-player-controls"
            >

                <button
                    class="video-player-button video-player-play"
                    type="button"
                    aria-label="Lire la vidéo"
                >
                    <span aria-hidden="true">▶</span>
                </button>


                <span
                    class="video-player-time video-player-current"
                >
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


                <span
                    class="video-player-time video-player-duration"
                >
                    00:00
                </span>


                <button
                    class="video-player-button video-player-mute"
                    type="button"
                    aria-label="Couper le son"
                >
                    <span aria-hidden="true">🔊</span>
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
                    aria-label="Picture-in-Picture"
                >
                    <span aria-hidden="true">PiP</span>
                </button>


                <button
                    class="video-player-button video-player-fullscreen"
                    type="button"
                    aria-label="Plein écran"
                >
                    <span aria-hidden="true">⛶</span>
                </button>

            </div>

            `
        );

    }


    /* =====================================================
       RÉCUPÉRATION DES ÉLÉMENTS
       ===================================================== */

    cacheElements() {

        this.controls =
            this.container.querySelector(
                ".video-player-controls"
            );


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

        /* -----------------------------------------------
           PLAY / PAUSE
           ----------------------------------------------- */

        this.playButton.addEventListener(
            "click",
            () => this.toggle()
        );


        this.video.addEventListener(
            "click",
            () => this.toggle()
        );


        /* -----------------------------------------------
           LECTURE
           ----------------------------------------------- */

        this.video.addEventListener(
            "play",
            () => {

                this.updatePlayButton();

                this.showControls();

            }
        );


        /* -----------------------------------------------
           PAUSE
           ----------------------------------------------- */

        this.video.addEventListener(
            "pause",
            () => {

                this.updatePlayButton();

                this.showControls();

            }
        );


    /* -----------------------------------------------
       FIN DE VIDÉO
       ----------------------------------------------- */

        this.video.addEventListener(
        "ended",
        () => {

        this.updatePlayButton();

        this.showControls();

        /* Conserve la dernière image de la vidéo */
        if (
            this.video.duration &&
            Number.isFinite(this.video.duration)
        ) {

            this.video.currentTime =
                this.video.duration;

        }

    }
);


        /* -----------------------------------------------
           PROGRESSION
           ----------------------------------------------- */

        this.video.addEventListener(
            "timeupdate",
            () => {

                if (!this.isDragging) {

                    this.updateProgress();

                }

            }
        );


        /* -----------------------------------------------
           MÉTADONNÉES
           ----------------------------------------------- */

        this.video.addEventListener(
            "loadedmetadata",
            () => {

                this.updateDuration();

                this.updateProgress();

            }
        );


        /* -----------------------------------------------
           BARRE DE PROGRESSION
           ----------------------------------------------- */

        this.progress.addEventListener(
            "input",
            () => {

                this.isDragging = true;

                if (!this.video.duration) {
                    return;
                }


                const time =
                    (
                        Number(
                            this.progress.value
                        ) / 100
                    ) *
                    this.video.duration;


                this.video.currentTime =
                    time;


                this.currentTime.textContent =
                    this.formatTime(time);

            }
        );


        this.progress.addEventListener(
            "change",
            () => {

                this.isDragging = false;

            }
        );


        /* -----------------------------------------------
           VOLUME
           ----------------------------------------------- */

        this.volume.addEventListener(
            "input",
            () => {

                const value =
                    Number(
                        this.volume.value
                    );


                this.video.volume =
                    value;


                if (value > 0) {

                    this.video.muted =
                        false;

                }


                this.updateVolume();

            }
        );


        /* -----------------------------------------------
           MUTE
           ----------------------------------------------- */

        this.muteButton.addEventListener(
            "click",
            () => {

                this.video.muted =
                    !this.video.muted;


                this.updateVolume();

            }
        );


        /* -----------------------------------------------
           PICTURE IN PICTURE
           ----------------------------------------------- */

        this.pipButton.addEventListener(
            "click",
            () => {

                this.togglePictureInPicture();

            }
        );


        /* -----------------------------------------------
           PLEIN ÉCRAN
           ----------------------------------------------- */

        this.fullscreenButton.addEventListener(
            "click",
            () => {

                this.toggleFullscreen();

            }
        );


        /* -----------------------------------------------
           SOURIS
           ----------------------------------------------- */

        this.container.addEventListener(
            "mouseenter",
            () => {

                this.isPointerOver = true;

                this.showControls();

            }
        );


        this.container.addEventListener(
            "mouseleave",
            () => {

                this.isPointerOver = false;

                if (!this.video.paused) {

                    this.startHideControlsTimer();

                }

            }
        );


        this.container.addEventListener(
            "mousemove",
            () => {

                this.showControls();

            }
        );


        /* -----------------------------------------------
           CLAVIER
           ----------------------------------------------- */

        this.container.addEventListener(
            "keydown",
            (event) => {

                this.handleKeyboard(event);

            }
        );


        this.container.setAttribute(
            "tabindex",
            "0"
        );


        /* -----------------------------------------------
           FULLSCREEN
           ----------------------------------------------- */

        document.addEventListener(
            "fullscreenchange",
            () => {

                this.updateFullscreenButton();

            }
        );


        /* -----------------------------------------------
           PICTURE IN PICTURE
           ----------------------------------------------- */

        this.video.addEventListener(
            "enterpictureinpicture",
            () => {

                this.updatePipButton();

            }
        );


        this.video.addEventListener(
            "leavepictureinpicture",
            () => {

                this.updatePipButton();

            }
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

        const icon =
            this.playButton.querySelector(
                "span"
            );


        if (this.video.paused) {

            icon.textContent = "▶";

            this.playButton.setAttribute(
                "aria-label",
                "Lire la vidéo"
            );

        } else {

            icon.textContent = "❚❚";

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

        const icon =
            this.muteButton.querySelector(
                "span"
            );


        if (
            this.video.muted ||
            this.video.volume === 0
        ) {

            icon.textContent = "🔇";

        } else if (
            this.video.volume < 0.5
        ) {

            icon.textContent = "🔉";

        } else {

            icon.textContent = "🔊";

        }


        this.volume.value =
            this.video.volume;


        this.muteButton.setAttribute(
            "aria-label",
            this.video.muted
                ? "Activer le son"
                : "Couper le son"
        );

    }


    /* =====================================================
       PICTURE IN PICTURE
       ===================================================== */

    async togglePictureInPicture() {

        if (
            !document.pictureInPictureEnabled ||
            !this.video.requestPictureInPicture
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
                "Picture-in-Picture impossible :",
                error
            );

        }

    }


    /* =====================================================
       BOUTON PIP
       ===================================================== */

    updatePipButton() {

        if (
            !document.pictureInPictureEnabled
        ) {

            this.pipButton.hidden = true;

        } else {

            this.pipButton.hidden = false;

        }

    }


    /* =====================================================
       PLEIN ÉCRAN
       ===================================================== */

    async toggleFullscreen() {

        try {

            if (
                !document.fullscreenElement
            ) {

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
       BOUTON PLEIN ÉCRAN
       ===================================================== */

    updateFullscreenButton() {

        const icon =
            this.fullscreenButton.querySelector(
                "span"
            );


        if (
            document.fullscreenElement ===
            this.container
        ) {

            icon.textContent = "×";

            this.fullscreenButton.setAttribute(
                "aria-label",
                "Quitter le plein écran"
            );

        } else {

            icon.textContent = "⛶";

            this.fullscreenButton.setAttribute(
                "aria-label",
                "Plein écran"
            );

        }

    }


    /* =====================================================
       CONTRÔLES AUTOMATIQUES
       ===================================================== */

    showControls() {

        this.container.classList.remove(
            "controls-hidden"
        );


        clearTimeout(
            this.hideControlsTimeout
        );


        if (!this.video.paused) {

            this.startHideControlsTimer();

        }

    }


    startHideControlsTimer() {

        clearTimeout(
            this.hideControlsTimeout
        );


        this.hideControlsTimeout =
            window.setTimeout(
                () => {

                    if (
                        !this.video.paused &&
                        !this.isPointerOver
                    ) {

                        this.container.classList.add(
                            "controls-hidden"
                        );

                    }

                },
                2500
            );

    }


    /* =====================================================
       CLAVIER
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

                this.video.muted =
                    false;

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
            String(minutes).padStart(
                2,
                "0"
            )
            +
            ":"
            +
            String(remainingSeconds).padStart(
                2,
                "0"
            )
        );

    }


    /* =====================================================
       DESTRUCTION
       ===================================================== */

    destroy() {

        clearTimeout(
            this.hideControlsTimeout
        );


        this.container.replaceWith(
            this.video
        );


        this.video.controls = true;

    }

}


/* =========================================================
   INITIALISATION AUTOMATIQUE
   ========================================================= */

document
    .querySelectorAll(
        "video[data-video-player]"
    )
    .forEach(
        (video) => {

            new VideoPlayer(video);

        }
    );


/* =========================================================
   EXPORT
   ========================================================= */

export default VideoPlayer;
