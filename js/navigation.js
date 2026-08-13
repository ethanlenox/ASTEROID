/* =========================================================
   ASTEROIDE.DESTROYER
   NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
   OUVERTURE / FERMETURE DU MENU
   ========================================================= */

function toggleMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    const isOpen =
        navMenu.classList.toggle("is-open");

    menuToggle.classList.toggle(
        "is-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Fermer le menu"
            : "Ouvrir le menu"
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}


/* =========================================================
   FERMETURE
   ========================================================= */

function closeMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("is-open");

    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Ouvrir le menu"
    );

    document.body.classList.remove(
        "menu-open"
    );
}


/* =========================================================
   BOUTON MENU
   ========================================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );
}


/* =========================================================
   FERMETURE APRÈS CLIC
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);

/* =========================================================
   PAGE ACTIVE
   ========================================================= */

function setActivePage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    navLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop();


        if (!linkPage) {
            return;
        }


        if (
            linkPage === currentPage ||
            (
                currentPage === ""
                && linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


setActivePage();
