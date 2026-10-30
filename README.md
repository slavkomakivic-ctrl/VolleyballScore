# Rakani Open 2027 — semafor

Samostalna PWA aplikacija izdvojena iz projekta. Ne zahtijeva API ni serversku bazu; rezultat meča se vodi u pregledaču. Nakon prvog učitavanja aplikacija radi i bez interneta.

## GitHub Pages

1. Napravite GitHub repozitorij za aplikaciju.
2. Kopirajte sadržaj ovog foldera u korijen repozitorija.
3. Na GitHubu otvorite **Settings → Pages**, izaberite **Deploy from a branch**, zatim granu `main` i folder `/ (root)`.
4. Sačekajte da GitHub Pages objavi sajt. PWA instalacija zahtijeva HTTPS, koji GitHub Pages obezbjeđuje.

Sve putanje su relativne, tako da aplikacija radi i na adresi projekta oblika `https://korisnik.github.io/naziv-repozitorija/`.

## Lokalno pokretanje

Iz ovog foldera pokrenite `python -m http.server 8000`, pa otvorite `http://localhost:8000`. Service worker ne radi direktno otvaranjem HTML fajla (`file://`).

Za objavu izmjena aplikacije povećajte verziju `CACHE_NAME` u `service-worker.js`; time će pregledač preuzeti novi app shell.
