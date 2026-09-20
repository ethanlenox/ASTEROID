/* =========================================================
   ASTÉROÏD.DESTROYER
   PEMP // MISSION BRIEFING
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
    8000;


/* =========================================================
   FERMETURE
   ========================================================= */

function closeIntro() {

    if (!intro) {
        return;
    }


    /*
     * Évite de déclencher plusieurs fois
     * la fermeture.
     */

    if (
        intro.classList.contains("is-hidden")
    ) {
        return;
    }


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


    sessionStorage.setItem(
        INTRO_STORAGE_KEY,
        "true"
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
   ACCESSIBILITÉ
   ========================================================= */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   INTRO DÉJÀ VUE ?
   ========================================================= */

const introAlreadySeen =
    sessionStorage.getItem(
        INTRO_STORAGE_KEY
    );


/* =========================================================
   INITIALISATION
   ========================================================= */

if (
    intro &&
    introAlreadySeen !== "true" &&
    !reducedMotion
) {

    document.body.classList.add(
        "intro-active"
    );

}


/* =========================================================
   INTRO DÉJÀ VUE
   ========================================================= */

if (
    introAlreadySeen === "true"
    ||
    reducedMotion
) {

    closeIntro();

}


/* =========================================================
   FERMETURE AUTOMATIQUE
   ========================================================= */

else {

    window.setTimeout(
        closeIntro,
        INTRO_DURATION
    );

}
