document.getElementById("forma-odigraj-mec").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const ekipa1 = document.getElementById("ekipa1").value;
    const ekipa2 = document.getElementById("ekipa2").value;
    document.getElementById("ekipa1-servis").textContent = ekipa1;
    document.getElementById("ekipa2-servis").textContent = ekipa2;

    
    document.getElementById("prvi-servis").style.display = "grid";

    let servis;

    document.getElementById("prvi-servis").addEventListener("submit", async function(event) {
        event.preventDefault();

        servis = document.querySelector('input[name="servis"]:checked').value === "a" ? 1 : 2;

        document.getElementById("tok-meca").style.display = "block";
        document.querySelector(".match-layout").classList.add("is-playing");
        document.getElementById("unos-ekipa").style.display = "none";
        document.getElementById("unos-h1").style.display = "none";
        document.getElementById("prvi-servis").style.display = "none";
        document.getElementById("forma-odigraj-mec").style.display = "none";
        prilagodiNaziveEkipa();
        azurirajServis();
    });

    let poeni = { ekipa1: 0, ekipa2: 0 };
    let setovi = { ekipa1: 0, ekipa2: 0 };

    document.getElementById("ekipa1-ime").textContent = ekipa1;
    document.getElementById("ekipa2-ime").textContent = ekipa2;
    document.getElementById("plus1").textContent = `Poen ${ekipa1}`;
    document.getElementById("plus2").textContent = `Poen ${ekipa2}`;
    document.getElementById("rezultat-setovi").textContent = `${setovi.ekipa1} : ${setovi.ekipa2}`;
    document.getElementById("rezultat-poeni").textContent = `${poeni.ekipa1} : ${poeni.ekipa2}`;

    function prilagodiNaziveEkipa() {
        document.querySelectorAll(".score-team-name").forEach(function(naziv) {
            naziv.style.fontSize = "";
            let velicinaSlova = parseFloat(getComputedStyle(naziv).fontSize);

            while (naziv.clientWidth > 0 && velicinaSlova > 12) {
                const visinaReda = parseFloat(getComputedStyle(naziv).lineHeight);
                const brojRedova = naziv.scrollHeight / visinaReda;
                if (brojRedova <= 2.05) {
                    break;
                }

                velicinaSlova *= 0.9;
                naziv.style.fontSize = `${velicinaSlova}px`;
            }
        });
    }

    window.addEventListener("resize", prilagodiNaziveEkipa);

    function azurirajServis() {
        document.getElementById("ekipa1-prikaz").classList.toggle("is-serving", servis === 1);
        document.getElementById("ekipa2-prikaz").classList.toggle("is-serving", servis === 2);
    }
    
    function azurirajRezultat() {
        document.getElementById("rezultat-poeni").textContent = `${poeni.ekipa1} : ${poeni.ekipa2}`;
    }

    function azurirajSetove() {
        document.getElementById("rezultat-setovi").textContent = `${setovi.ekipa1} : ${setovi.ekipa2}`;
        provjeriSet();
    }

    function provjeriSet() {

        if (poeni.ekipa1 >= 21 && poeni.ekipa1 - poeni.ekipa2 >= 2) {
            setovi.ekipa1++;
            servis = 2;
            poeni.ekipa1 = 0;
            poeni.ekipa2 = 0;
            azurirajRezultat();
            azurirajSetove();
        } else if (poeni.ekipa2 >= 21 && poeni.ekipa2 - poeni.ekipa1 >= 2) {
            setovi.ekipa2++;
            servis = 1;
            poeni.ekipa1 = 0;
            poeni.ekipa2 = 0;
            azurirajRezultat();
            azurirajSetove();
        }

        if (setovi.ekipa1 === 3 || setovi.ekipa2 === 3) {
            let pobjednik = setovi.ekipa1 === 3 ? ekipa1 : ekipa2;
            document.getElementById("komande-rezultat").style.display = "none";
            document.getElementById("prikaz-pobjednika").style.display = "block";
            document.getElementById("pobjednik").textContent = `Pobjednik meča je: \n${pobjednik}`;
        }
    }

    let prethodnoStanje = null;

    document.getElementById("plus1").addEventListener("click", function() {
        prethodnoStanje = {
            poeni: { ...poeni },
            setovi: { ...setovi },
            servis
        };
        poeni.ekipa1++;
        servis = 1;
        azurirajRezultat();
        provjeriSet();
        azurirajServis();
    });

    document.getElementById("plus2").addEventListener("click", function() {
        prethodnoStanje = {
            poeni: { ...poeni },
            setovi: { ...setovi },
            servis
        };
        poeni.ekipa2++;
        servis = 2;
        azurirajRezultat();
        provjeriSet();
        azurirajServis();
    });

    document.getElementById("ponisti").addEventListener("click", function() {
        if (prethodnoStanje) {
            poeni = prethodnoStanje.poeni;
            setovi = prethodnoStanje.setovi;
            servis = prethodnoStanje.servis;
            document.getElementById("rezultat-setovi").textContent = `${setovi.ekipa1} : ${setovi.ekipa2}`;
            azurirajRezultat();
            azurirajServis();
            prethodnoStanje = null;
        }
    });

    document.getElementById("novi-mec").addEventListener("click", function() {
        location.reload();
    });

    document.getElementById("nastavi").addEventListener("click", function() {
        document.getElementById("prikaz-pobjednika").style.display = "none";
        document.getElementById("komande-rezultat").style.display = "grid";
        poeni.ekipa1 = 0;
        poeni.ekipa2 = 0;
        setovi.ekipa1 = 0;
        setovi.ekipa2 = 0;
        azurirajRezultat();
        azurirajSetove();
    });
});
