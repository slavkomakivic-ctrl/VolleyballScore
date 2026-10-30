if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js").catch((error) => {
            console.error("Registracija service workera nije uspjela:", error);
        });
    });
}
