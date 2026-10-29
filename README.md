# westkoop.com

Statische website van Westkoop B.V., in het Nederlands en Engels. Gehost op GitHub Pages met het eigen domein westkoop.com. Geen build-stap, geen cookies, geen externe diensten: elke map is direct de website.

## Structuur

| Pad | Wat |
| --- | --- |
| `index.html` | Landingspagina, Nederlands (`/`) |
| `en/index.html` | Landingspagina, Engels (`/en/`) |
| `privacy/index.html`, `en/privacy/index.html` | Privacyverklaring NL en EN |
| `404.html` | Pagina voor adressen die niet bestaan |
| `assets/css/site.css` | Alle opmaak. Bovenaan staan de kleuren, maten en lettertypes uit het Westkoop Design System |
| `assets/js/site.js` | De animaties: loader, woord-voor-woord, de route van kweker naar klant |
| `assets/fonts/` | Archivo en Instrument Serif (SIL Open Font License, zie de OFL-bestanden) |
| `assets/img/` | Logo's, favicon, iconen en `og-image.png` (de afbeelding bij gedeelde links) |
| `CNAME` | Het eigen domein: `westkoop.com` |
| `robots.txt`, `sitemap.xml`, `site.webmanifest` | Voor zoekmachines en telefoons |

## Teksten aanpassen

- Pas de tekst direct aan in `index.html` (NL) en `en/index.html` (EN). Houd beide talen gelijk.
- In de grote kop staat een `|` tussen twee zinnen: dat is een vaste regelbreuk.
- **KvK-nummer** 42090789 staat in de footer van elke pagina en in de privacyverklaring.
- Contact staat op de site als info@westkoop.com en +31 6 31 91 27 10.

## Live zetten met GitHub Pages

1. Maak op GitHub een nieuwe repository, bijvoorbeeld `westkoop-site`. Met een gratis GitHub-account moet die **public** zijn voor GitHub Pages.
2. Upload de inhoud van deze map naar de hoofdmap van de repository: *Add file → Upload files*, of met git:

   ```bash
   git init
   git add .
   git commit -m "Westkoop website"
   git branch -M main
   git remote add origin https://github.com/GEBRUIKERSNAAM/westkoop-site.git
   git push -u origin main
   ```

3. Ga in de repository naar *Settings → Pages*. Kies bij *Build and deployment* de bron **Deploy from a branch**, branch **main**, map **/ (root)**, en klik *Save*.
4. Vul bij *Custom domain* `westkoop.com` in en klik *Save*. Het `CNAME`-bestand staat er al.
5. Zet de DNS goed (zie hieronder). Zodra GitHub het domein herkent, vink je **Enforce HTTPS** aan; dat kan tot 24 uur duren.

## DNS voor westkoop.com

Stel dit in bij de partij waar je de DNS van westkoop.com beheert.

| Type | Naam | Waarde |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA (optioneel) | @ | 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153 |
| CNAME | www | GEBRUIKERSNAAM.github.io |

- **Laat de MX- en TXT-records van Gmail/Google Workspace staan.** Die regelen je e-mail; de website heeft ze niet nodig en raakt ze niet.
- Verwijder eventuele oude A-records voor `@` die naar een andere server wijzen.
- Aanrader: verifieer het domein in GitHub (profiel → *Settings → Pages → Add a domain*). GitHub geeft dan een TXT-record om toe te voegen. Zo kan niemand anders westkoop.com aan een eigen GitHub-site koppelen.

## Na livegang controleren

- https://westkoop.com en https://www.westkoop.com openen de site met een slotje.
- https://westkoop.com/en/ toont de Engelse versie; de NL/EN-knop wisselt.
- Een link naar westkoop.com in WhatsApp of LinkedIn toont `og-image.png`.
- De e-mailhandtekening laadt het logo van https://westkoop.com/assets/img/westkoop-logo-email.png.

## Ontwerp

Kleuren, lettertypes en animaties volgen het Westkoop Design System. Animaties staan stil voor bezoekers die *minder beweging* hebben ingesteld, en de loader verschijnt één keer per bezoek.
