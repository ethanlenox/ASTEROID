/* =========================================================
   ASTEROIDE.DESTROYER
   INTRO SYSTEM
   ========================================================= */

const intro = document.querySelector("#intro");
const introSkip = document.querySelector("#intro-skip");


/* =========================================================
   CONFIGURATION
   ========================================================= */

const INTRO_STORAGE_KEY =
    "asteroideIntroSeen";

const INTRO_DURATION =
    5000;


/* =========================================================
   FERMETURE
   ========================================================= */

function closeIntro() {

    if (!intro) {
        return;
    }

    intro.classList.add("is-hidden");

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
   PASSER L'INTRO
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
   DÉCISION
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
