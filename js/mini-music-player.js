/* =========================================================
   ASTEROIDE.DESTROYER
   MINI MUSIC PLAYER
   ========================================================= */

const miniMusicPlayer =
    document.querySelector("[data-mini-music-player]");

const miniMusicPlay =
    document.querySelector("[data-mini-music-play]");

const miniMusicNext =
    document.querySelector("[data-mini-music-next]");

const miniMusicTitle =
    document.querySelector("[data-mini-music-title]");

const miniMusicProgress =
    document.querySelector("[data-mini-music-progress]");


/* =========================================================
   INITIALISATION
   ========================================================= */

if (miniMusicPlayer) {

    const miniAudio =
        new Audio();

    const miniPlaylist = [

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


    let miniCurrentTrack = 0;


    /* =====================================================
       CHARGEMENT
       ===================================================== */

    function loadMiniTrack(index) {

        miniCurrentTrack = index;

        const track =
            miniPlaylist[miniCurrentTrack];

        miniAudio.src =
            track.src;

        miniMusicTitle.textContent =
            track.title;

        miniMusicProgress.value =
            0;

    }


    /* =====================================================
       LECTURE / PAUSE
       ===================================================== */

    function toggleMiniMusic() {

        if (miniAudio.paused) {

            miniAudio.play();

        } else {

            miniAudio.pause();

        }

    }


    /* =====================================================
       ÉTAT DE LECTURE
       ===================================================== */

    miniAudio.addEventListener(
        "play",
        () => {

            miniMusicPlay.textContent =
                "❚❚";

            miniMusicPlay.setAttribute(
                "aria-label",
                "Mettre la musique en pause"
            );

        }
    );


    miniAudio.addEventListener(
        "pause",
        () => {

            miniMusicPlay.textContent =
                "▶";

            miniMusicPlay.setAttribute(
                "aria-label",
                "Lire la musique"
            );

        }
    );


    /* =====================================================
       PROGRESSION
       ===================================================== */

    miniAudio.addEventListener(
        "loadedmetadata",
        () => {

            miniMusicProgress.max =
                miniAudio.duration;

        }
    );


    miniAudio.addEventListener(
        "timeupdate",
        () => {

            miniMusicProgress.value =
                miniAudio.currentTime;

        }
    );


    miniMusicProgress.addEventListener(
        "input",
        () => {

            miniAudio.currentTime =
                Number(
                    miniMusicProgress.value
                );

        }
    );


    /* =====================================================
       MUSIQUE SUIVANTE
       ===================================================== */

    function nextMiniTrack() {

        miniCurrentTrack++;

        if (
            miniCurrentTrack >=
            miniPlaylist.length
        ) {

            miniCurrentTrack = 0;

        }

        loadMiniTrack(
            miniCurrentTrack
        );

        miniAudio.play();

    }


    /* =====================================================
       FIN DE LA MUSIQUE
       ===================================================== */

    miniAudio.addEventListener(
        "ended",
        nextMiniTrack
    );


    /* =====================================================
       BOUTONS
       ===================================================== */

    miniMusicPlay.addEventListener(
        "click",
        toggleMiniMusic
    );


    miniMusicNext.addEventListener(
        "click",
        nextMiniTrack
    );


    /* =====================================================
       VOLUME
       ===================================================== */

    miniAudio.volume = 0.8;


    /* =====================================================
       CHARGEMENT INITIAL
       ===================================================== */

    loadMiniTrack(0);

}
