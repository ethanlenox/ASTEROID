/* =========================================================
   ASTEROIDE.DESTROYER
   INTRODUCTION
   ========================================================= */

const intro = document.querySelector("#intro");
const introSkip = document.querySelector("#intro-skip");


/* =========================================================
   FERMER L'INTRO
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
        "asteroideIntroSeen",
        "true"
    );

}


/* =========================================================
   PASSER
   ========================================================= */

if (introSkip) {

    introSkip.addEventListener(
        "click",
        closeIntro
    );

}


/* =========================================================
   SESSION STORAGE
   ========================================================= */

const introAlreadySeen =
    sessionStorage.getItem(
        "asteroideIntroSeen"
    );


if (introAlreadySeen === "true") {

    closeIntro();

}

/* =========================================================
   FIN AUTOMATIQUE
   ========================================================= */

if (intro && introAlreadySeen !== "true") {

    setTimeout(() => {

        closeIntro();

    }, 5000);

}
