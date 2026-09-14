 /* =========================================================
   ASTEROIDE.DESTROYER
   MUSIC PLAYER
   ========================================================= */

const musicPlayer =
    document.querySelector("[data-music-player]");

const musicPlay =
    document.querySelector("[data-music-play]");

const musicPrev =
    document.querySelector("[data-music-prev]");

const musicNext =
    document.querySelector("[data-music-next]");

const musicProgress =
    document.querySelector("[data-music-progress]");

const musicVolume =
    document.querySelector("[data-music-volume]");

const musicTitle =
    document.querySelector("[data-music-title]");

const musicNumber =
    document.querySelector("[data-music-number]");

const musicStatus =
    document.querySelector("[data-music-status]");

const musicCurrent =
    document.querySelector("[data-music-current]");

const musicDuration =
    document.querySelector("[data-music-duration]");


/* =========================================================
   PLAYLIST
   ========================================================= */

const musicPlaylist = [

{
        title: "Saturn 80",
        src: "son/saturn 80.mp3"
    },

    {
        title: "Étoile lunaire",
        src: "son/etoile lunaire.mp3"
    },
 
    {
        title: "Green Horizon",
        src: "son/green horizon.mp3"
    },

    {
        title: "Lune solaire",
        src: "son/lune solaire.mp3"
    },

    {
        title: "Numérique spatial",
        src: "son/numerique spatial.mp3"
    },

    {
        title: "Orbite coloré",
        src: "son/orbite coloré.mp3"
    },

 
    {
        title: "Comet",
        src: "son/Comet.mp3"
    },

    {
        title: "cosmic sylver",
        src: "son/cosmic sylver.mp3"
    },
 
    {
        title: "souffrance",
        src: "son/bonus.mp3"
    },

     {
        title: "Speed",
        src: "son/speed.mp3"
    },

    {
        title: "flash ecarlate",
        src: "son/flash ecarlate.mp3"
    },

    {
        title: "metal chaos",
        src: "son/metal chaos.mp3"
    },

    
    {
        title: "Pixel Rush",
        src: "son/Pixel Rush.mp3"
    },
 

    {
        title: "retro gold",
        src: "son/retro gold.mp3"
    },

    {
        title: "rupture celeste",
        src: "son/rupture celeste.mp3"
    },

    {
        title: "stone fire",
        src: "son/stone fire.mp3"
    },

    {
        title: "temporis",
        src: "son/temporis.mp3"
    },

    {
        title: "stylise rock",
        src: "son/stylise rock.mp3"
    },

    {
        title: "union world",
        src: "son/union world.mp3"
    },
 
    {
        title: "Boss",
        src: "son/boss.mp3"
    },

    {
        title: "Generique de fin",
        src: "son/generique de fin ne pas mettre dans le jeu.mp3"
    }
  
];


let currentTrack = 0;


/* =========================================================
   INITIALISATION
   ========================================================= */

function loadTrack(index) {

    if (!musicPlayer) {
        return;
    }

    currentTrack = index;

    const track =
        musicPlaylist[currentTrack];

    musicPlayer.src =
        track.src;

    musicTitle.textContent =
        track.title;

    musicNumber.textContent =
        String(currentTrack + 1)
            .padStart(2, "0");

    musicStatus.textContent =
        "Prêt à jouer";

    musicProgress.value = 0;

    musicCurrent.textContent =
        "00:00";

    musicDuration.textContent =
        "00:00";
}


/* =========================================================
   LECTURE / PAUSE
   ========================================================= */

function toggleMusic() {

    if (!musicPlayer) {
        return;
    }

    if (musicPlayer.paused) {

        musicPlayer.play();

    } else {

        musicPlayer.pause();

    }

}


/* =========================================================
   ÉTAT DE LECTURE
   ========================================================= */

musicPlayer?.addEventListener(
    "play",
    () => {

        musicPlay.textContent =
            "❚❚";

        musicPlay.setAttribute(
            "aria-label",
            "Mettre la musique en pause"
        );

        musicStatus.textContent =
            "Lecture en cours";

    }
);


musicPlayer?.addEventListener(
    "pause",
    () => {

        musicPlay.textContent =
            "▶";

        musicPlay.setAttribute(
            "aria-label",
            "Lire la musique"
        );

        musicStatus.textContent =
            "En pause";

    }
);


/* =========================================================
   PROGRESSION
   ========================================================= */

musicPlayer?.addEventListener(
    "loadedmetadata",
    () => {

        musicProgress.max =
            musicPlayer.duration;

        musicDuration.textContent =
            formatTime(
                musicPlayer.duration
            );

    }
);


musicPlayer?.addEventListener(
    "timeupdate",
    () => {

        musicProgress.value =
            musicPlayer.currentTime;

        musicCurrent.textContent =
            formatTime(
                musicPlayer.currentTime
            );

    }
);


musicProgress?.addEventListener(
    "input",
    () => {

        musicPlayer.currentTime =
            Number(musicProgress.value);

    }
);


/* =========================================================
   VOLUME
   ========================================================= */

musicVolume?.addEventListener(
    "input",
    () => {

        musicPlayer.volume =
            Number(musicVolume.value);

    }
);


/* =========================================================
   MUSIQUE PRÉCÉDENTE
   ========================================================= */

function previousTrack() {

    currentTrack--;

    if (currentTrack < 0) {

        currentTrack =
            musicPlaylist.length - 1;

    }

    loadTrack(currentTrack);

    musicPlayer.play();

}


/* =========================================================
   MUSIQUE SUIVANTE
   ========================================================= */

function nextTrack() {

    currentTrack++;

    if (
        currentTrack >=
        musicPlaylist.length
    ) {

        currentTrack = 0;

    }

    loadTrack(currentTrack);

    musicPlayer.play();

}


/* =========================================================
   FIN DE LA MUSIQUE
   ========================================================= */

musicPlayer?.addEventListener(
    "ended",
    nextTrack
);


/* =========================================================
   BOUTONS
   ========================================================= */

musicPlay?.addEventListener(
    "click",
    toggleMusic
);


musicPrev?.addEventListener(
    "click",
    previousTrack
);


musicNext?.addEventListener(
    "click",
    nextTrack
);


/* =========================================================
   FORMAT DU TEMPS
   ========================================================= */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "00:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds).padStart(2, "0")
    );

}


/* =========================================================
   INITIALISATION DU VOLUME
   ========================================================= */

if (musicPlayer) {

    musicPlayer.volume = 0.8;

}


/* =========================================================
   CHARGEMENT INITIAL
   ========================================================= */

loadTrack(0);

