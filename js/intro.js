/* =========================================================
   ASTÉROÏD DESTROYER
   PEMP // MISSION BRIEFING
   JS — INTRO 10 SECONDES
   ========================================================= */

const intro =
    document.querySelector("#intro");

const introSkip =
    document.querySelector("#intro-skip");


/* =========================================================
   CONFIGURATION
   ========================================================= */

const INTRO_STORAGE_KEY =
    "asteroideIntroSeen";

const INTRO_DURATION =
    10000;


/*
 * Timings de l'interface
 *
 * 0s → connexion
 * 1.8s → réseau synchronisé
 * 3.8s → objet détecté
 * 5.8s → alerte
 * 8.4s → défense active
 * 10s → sortie
 */

const TIMELINE = [

    {
        time: 0,
        state: "state-connect"
    },

    {
        time: 1800,
        state: "state-sync"
    },

    {
        time: 3800,
        state: "state-detect"
    },

    {
        time: 5800,
        state: "state-alert"
    },

    {
        time: 8400,
        state: "state-complete"
    }

];


/* =========================================================
   VARIABLES INTERNES
   ========================================================= */

let introClosed =
    false;

let timelineTimers =
    [];

let closeTimer =
    null;


/* =========================================================
   RÉDUCTION DES ANIMATIONS
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   UTILITAIRE
   ========================================================= */

function clearIntroStates() {

    if (!intro) {
        return;
    }

    intro.classList.remove(
        "state-connect",
        "state-sync",
        "state-detect",
        "state-alert",
        "state-complete"
    );
}


/* =========================================================
   CHANGER L'ÉTAT
   ========================================================= */

function setIntroState(state) {

    if (
        !intro ||
        introClosed
    ) {
        return;
    }

    clearIntroStates();

    if (state) {

        intro.classList.add(
            state
        );

    }

}


/* =========================================================
   DÉMARRAGE DE LA TIMELINE
   ========================================================= */

function startTimeline() {

    if (
        !intro ||
        reducedMotion
    ) {
        return;
    }


    /*
     * État initial immédiat
     */

    setIntroState(
        "state-connect"
    );


    /*
     * Programme les différentes
     * phases de l'interface.
     */

    TIMELINE.forEach(
        ({ time, state }) => {

            if (time === 0) {
                return;
            }


            const timer =
                window.setTimeout(
                    () => {

                        setIntroState(
                            state
                        );

                    },
                    time
                );


            timelineTimers.push(
                timer
            );

        }
    );

}


/* =========================================================
   ARRÊT DE LA TIMELINE
   ========================================================= */

function stopTimeline() {

    timelineTimers.forEach(
        (timer) => {

            window.clearTimeout(
                timer
            );

        }
    );

    timelineTimers = [];


    if (closeTimer !== null) {

        window.clearTimeout(
            closeTimer
        );

        closeTimer = null;

    }

}


/* =========================================================
   FERMETURE
   ========================================================= */

function closeIntro() {

    if (!intro) {
        return;
    }


    /*
     * Empêche une double fermeture.
     */

    if (introClosed) {
        return;
    }


    introClosed =
        true;


    stopTimeline();


    /*
     * Dernière impulsion avant
     * la disparition.
     */

    clearIntroStates();


    intro.classList.add(
        "state-complete"
    );


    /*
     * Petite pause pour laisser
     * respirer l'état final.
     */

    window.setTimeout(
        () => {

            intro.classList.add(
                "is-hidden"
            );

            document.body.classList.remove(
                "intro-active"
            );

            intro.setAttribute(
                "aria-hidden",
                "true"
            );


            /*
             * L'intro ne se rejoue pas
             * pendant cette session.
             */

            try {

                sessionStorage.setItem(
                    INTRO_STORAGE_KEY,
                    "true"
                );

            } catch (error) {

                /*
                 * sessionStorage peut être bloqué
                 * dans certains environnements.
                 */

            }

        },
        180
    );

}


/* =========================================================
   BOUTON PASSER
   ========================================================= */

if (introSkip) {

    introSkip.addEventListener(
        "click",
        closeIntro
    );

}


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            !introClosed
        ) {

            closeIntro();

        }

    }
);


/* =========================================================
   VÉRIFICATION SESSION
   ========================================================= */

let introAlreadySeen =
    false;


try {

    introAlreadySeen =
        sessionStorage.getItem(
            INTRO_STORAGE_KEY
        ) === "true";

} catch (error) {

    introAlreadySeen =
        false;

}


/* =========================================================
   INTRO DÉJÀ VUE
   ========================================================= */

if (
    introAlreadySeen ||
    reducedMotion
) {

    if (intro) {

        intro.classList.add(
            "is-hidden"
        );

        intro.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    document.body.classList.remove(
        "intro-active"
    );

}


/* =========================================================
   DÉMARRAGE
   ========================================================= */

else if (intro) {

    document.body.classList.add(
        "intro-active"
    );


    intro.classList.remove(
        "is-hidden"
    );


    intro.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
     * Démarre les états
     * de l'interface.
     */

    startTimeline();


    /*
     * Fermeture automatique
     * après exactement 10 secondes.
     */

    closeTimer =
        window.setTimeout(
            closeIntro,
            INTRO_DURATION
        );

}


/* =========================================================
   SÉCURITÉ
   ========================================================= */

window.addEventListener(
    "pagehide",
    () => {

        stopTimeline();

    }
);
