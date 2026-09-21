/* =========================================================
   ASTÉROÏD DESTROYER
   PEMP // MISSION BRIEFING
   JS — INTRO 10 SECONDES
   ========================================================= */

/* =========================================================
   PLANETARY DEFENSE NETWORK
   HUD LIVE DATA
   ========================================================= */

const intro =
    document.querySelector("#intro");

const introSkip =
    document.querySelector("#intro-skip");


/* =========================================================
   CONFIG
   ========================================================= */

const INTRO_STORAGE_KEY =
    "asteroideIntroSeen";

const INTRO_DURATION =
    10000;


/* =========================================================
   ÉLÉMENTS HUD
   ========================================================= */

const hud = {

    connection:
        document.querySelector("#hud-connection"),

    network:
        document.querySelector("#hud-network"),

    core:
        document.querySelector("#hud-core"),

    defense:
        document.querySelector("#hud-defense"),

    threat:
        document.querySelector("#hud-threat"),

    power:
        document.querySelector("#hud-power"),

    powerValue:
        document.querySelector("#hud-power-value"),

    cpu:
        document.querySelector("#hud-cpu"),

    memory:
        document.querySelector("#hud-memory"),

    link:
        document.querySelector("#hud-link"),

    scan:
        document.querySelector("#hud-scan"),

    objects:
        document.querySelector("#hud-objects"),

    velocity:
        document.querySelector("#hud-velocity"),

    distance:
        document.querySelector("#hud-distance"),

    trajectory:
        document.querySelector("#hud-trajectory"),

    target:
        document.querySelector("#hud-target"),

    message:
        document.querySelector("#hud-message"),

    lat:
        document.querySelector("#hud-lat"),

    lng:
        document.querySelector("#hud-lng"),

    alert:
        document.querySelector("#hud-alert"),

    bootPercent:
        document.querySelector("#boot-percent"),

    time:
        document.querySelector("#hud-time")

};


/* =========================================================
   TIMELINE
   ========================================================= */

const phases = [

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


let timers = [];

let liveInterval = null;

let clockInterval = null;

let closed = false;

let startedAt = 0;


/* =========================================================
   HELPERS
   ========================================================= */

function setText(element, value) {

    if (!element) {
        return;
    }

    if (element.textContent !== value) {

        element.textContent =
            value;

        element.classList.remove(
            "changed"
        );

        void element.offsetWidth;

        element.classList.add(
            "changed"
        );

    }

}


function setPower(value) {

    if (hud.power) {

        hud.power.style.width =
            `${value}%`;

    }

    setText(
        hud.powerValue,
        `${String(value).padStart(2, "0")}%`
    );
}


function setState(state) {

    if (!intro || closed) {
        return;
    }

    intro.classList.remove(
        "state-connect",
        "state-sync",
        "state-detect",
        "state-alert",
        "state-complete"
    );

    intro.classList.add(
        state
    );

}


/* =========================================================
   DONNÉES — CONNEXION
   ========================================================= */

function connectionPhase() {

    setText(
        hud.connection,
        "CONNECTING"
    );

    setText(
        hud.network,
        "LINKING"
    );

    setText(
        hud.core,
        "BOOTING"
    );

    setText(
        hud.defense,
        "STANDBY"
    );

    setText(
        hud.threat,
        "NONE"
    );

    setText(
        hud.scan,
        "INITIALIZING"
    );

    setText(
        hud.objects,
        "000"
    );

    setText(
        hud.velocity,
        "---"
    );

    setText(
        hud.distance,
        "---"
    );

    setText(
        hud.trajectory,
        "---"
    );

    setText(
        hud.target,
        "NO TARGET"
    );

    setText(
        hud.message,
        "ESTABLISHING SECURE CONNECTION..."
    );

    setPower(18);

}


/* =========================================================
   DONNÉES — SYNCHRONISATION
   ========================================================= */

function syncPhase() {

    setText(
        hud.connection,
        "CONNECTED"
    );

    setText(
        hud.network,
        "ONLINE"
    );

    setText(
        hud.core,
        "READY"
    );

    setText(
        hud.defense,
        "ARMED"
    );

    setText(
        hud.threat,
        "LOW"
    );

    setText(
        hud.scan,
        "ACTIVE"
    );

    setText(
        hud.message,
        "PEMP NETWORK SYNCHRONIZED"
    );

    setPower(57);

}


/* =========================================================
   DONNÉES — DÉTECTION
   ========================================================= */

function detectPhase() {

    setText(
        hud.connection,
        "LOCKING"
    );

    setText(
        hud.network,
        "ONLINE"
    );

    setText(
        hud.core,
        "TRACKING"
    );

    setText(
        hud.defense,
        "ARMED"
    );

    setText(
        hud.threat,
        "ELEVATED"
    );

    setText(
        hud.scan,
        "OBJECT DETECTED"
    );

    setText(
        hud.objects,
        "001"
    );

    setText(
        hud.velocity,
        "27.4 KM/S"
    );

    setText(
        hud.distance,
        "1842 KM"
    );

    setText(
        hud.trajectory,
        "INTERCEPT"
    );

    setText(
        hud.target,
        "OBJECT 001"
    );

    setText(
        hud.message,
        "UNKNOWN OBJECT // TRACKING..."
    );

    setPower(76);

}


/* =========================================================
   DONNÉES — ALERTE
   ========================================================= */

function alertPhase() {

    setText(
        hud.connection,
        "LOCKED"
    );

    setText(
        hud.network,
        "ONLINE"
    );

    setText(
        hud.core,
        "TARGET LOCK"
    );

    setText(
        hud.defense,
        "ACTIVE"
    );

    setText(
        hud.threat,
        "CRITICAL"
    );

    setText(
        hud.scan,
        "TRACK CONFIRMED"
    );

    setText(
        hud.objects,
        "001"
    );

    setText(
        hud.velocity,
        "31.8 KM/S"
    );

    setText(
        hud.distance,
        "0924 KM"
    );

    setText(
        hud.trajectory,
        "IMPACT VECTOR"
    );

    setText(
        hud.target,
        "TARGET LOCKED"
    );

    setText(
        hud.message,
        "WARNING // IMPACT TRAJECTORY CONFIRMED"
    );

    setPower(94);

}


/* =========================================================
   DONNÉES — FINAL
   ========================================================= */

function completePhase() {

    setText(
        hud.connection,
        "SECURE"
    );

    setText(
        hud.network,
        "ONLINE"
    );

    setText(
        hud.core,
        "STABLE"
    );

    setText(
        hud.defense,
        "ACTIVE"
    );

    setText(
        hud.threat,
        "TRACKED"
    );

    setText(
        hud.scan,
        "COMPLETE"
    );

    setText(
        hud.objects,
        "001"
    );

    setText(
        hud.velocity,
        "31.8 KM/S"
    );

    setText(
        hud.distance,
        "LOCKED"
    );

    setText(
        hud.trajectory,
        "SECURED"
    );

    setText(
        hud.target,
        "INTERCEPT READY"
    );

    setText(
        hud.message,
        "PEMP DEFENSE SYSTEM ONLINE"
    );

    setPower(100);

}


/* =========================================================
   LIVE DATA
   ========================================================= */

function updateLiveData() {

    if (closed) {
        return;
    }

    const elapsed =
        Date.now() - startedAt;


    /*
     * CPU
     */

    const cpu =
        24 +
        Math.floor(
            Math.random() * 18
        );


    /*
     * MEM
     */

    const memory =
        38 +
        Math.floor(
            Math.random() * 14
        );


    /*
     * LINK
     */

    const link =
        82 +
        Math.floor(
            Math.random() * 17
        );


    setText(
        hud.cpu,
        `${cpu}%`
    );

    setText(
        hud.memory,
        `${memory}%`
    );

    setText(
        hud.link,
        `${link}%`
    );


    /*
     * Coordonnées HUD fictives
     * pour donner une sensation
     * de système actif.
     */

    if (elapsed > 3800) {

        const lat =
            "48." +
            String(
                8200 +
                Math.floor(
                    Math.random() * 900
                )
            );

        const lng =
            "002." +
            String(
                1000 +
                Math.floor(
                    Math.random() * 900
                )
            );

        setText(
            hud.lat,
            lat
        );

        setText(
            hud.lng,
            lng
        );

    }

}


/* =========================================================
   HORLOGE HUD
   ========================================================= */

function updateClock() {

    if (!hud.time) {
        return;
    }

    const elapsed =
        Date.now() - startedAt;

    const seconds =
        Math.min(
            Math.floor(
                elapsed / 1000
            ),
            10
        );

    const tenth =
        Math.floor(
            (elapsed % 1000) / 100
        );

    setText(
        hud.time,
        `00:00:${String(seconds).padStart(2, "0")}.${tenth}`
    );

}


/* =========================================================
   PROGRESSION
   ========================================================= */

function updateProgress() {

    if (!hud.bootPercent) {
        return;
    }

    const elapsed =
        Date.now() - startedAt;

    const percent =
        Math.min(
            100,
            Math.floor(
                (elapsed / INTRO_DURATION) * 100
            )
        );

    setText(
        hud.bootPercent,
        `${String(percent).padStart(2, "0")}%`
    );

}


/* =========================================================
   DÉMARRAGE
   ========================================================= */

function startIntro() {

    startedAt =
        Date.now();


    setState(
        "state-connect"
    );


    connectionPhase();


    phases.forEach(
        ({ time, state }) => {

            if (time === 0) {
                return;
            }

            const timer =
                setTimeout(
                    () => {

                        setState(
                            state
                        );


                        if (
                            state ===
                            "state-sync"
                        ) {

                            syncPhase();

                        }


                        if (
                            state ===
                            "state-detect"
                        ) {

                            detectPhase();

                        }


                        if (
                            state ===
                            "state-alert"
                        ) {

                            alertPhase();

                        }


                        if (
                            state ===
                            "state-complete"
                        ) {

                            completePhase();

                        }

                    },
                    time
                );


            timers.push(
                timer
            );

        }
    );


    liveInterval =
        setInterval(
            () => {

                updateLiveData();
                updateProgress();

            },
            350
        );


    clockInterval =
        setInterval(
            updateClock,
            100
        );


    timers.push(
        setTimeout(
            closeIntro,
            INTRO_DURATION
        )
    );

}


/* =========================================================
   FERMETURE
   ========================================================= */

function closeIntro() {

    if (
        !intro ||
        closed
    ) {
        return;
    }


    closed =
        true;


    timers.forEach(
        clearTimeout
    );


    timers =
        [];


    if (liveInterval) {

        clearInterval(
            liveInterval
        );

    }


    if (clockInterval) {

        clearInterval(
            clockInterval
        );

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


    try {

        sessionStorage.setItem(
            INTRO_STORAGE_KEY,
            "true"
        );

    } catch (error) {}

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
   ESC
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            !closed
        ) {

            closeIntro();

        }

    }
);


/* =========================================================
   SESSION
   ========================================================= */

let alreadySeen =
    false;


try {

    alreadySeen =
        sessionStorage.getItem(
            INTRO_STORAGE_KEY
        ) === "true";

} catch (error) {

    alreadySeen =
        false;

}


/* =========================================================
   LANCEMENT
   ========================================================= */

if (
    intro &&
    !alreadySeen
) {

    document.body.classList.add(
        "intro-active"
    );

    startIntro();

}
else if (intro) {

    intro.classList.add(
        "is-hidden"
    );

    intro.setAttribute(
        "aria-hidden",
        "true"
    );

}
