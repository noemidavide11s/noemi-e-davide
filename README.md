# Matrimonio Noemi & Davide — 11 Settembre 2027

Sito-invito statico (solo HTML, CSS e JavaScript): partecipazione con busta animata, conto alla rovescia, storia, programma, luoghi, menu, lettera e conferma presenza (RSVP) via WhatsApp.

## Cosa modificare: `config.js`

Tutti i testi sono in [config.js](config.js).

| Cosa | Dove |
|---|---|
| Data, ora, luogo, hashtag | `sposi` |
| **Numero WhatsApp che riceve le conferme** | `sposi.whatsappContatto` |
| Storia, programma, luoghi (con link Maps/Waze) | `storia`, `timeline`, `location` |
| Menu | `menu.sezioni` |
| Foto del carosello | `galleria.foto` — vuoto = riquadri bianchi |
| Canzone | `musica` e `music/music.mp3` |

Foto: copia i file in `photos/` e aggiungi nel `config.js`
`{ src: "photos/nome.jpg", alt: "Descrizione", didascalia: "Testo breve" }`

## Come funziona la conferma su WhatsApp

1. L'invitato compila il modulo (nome, presenza, persone, dieta, dedica).
2. Il sito apre WhatsApp con il messaggio **già scritto**, indirizzato al numero in `sposi.whatsappContatto`. L'invitato preme solo *Invia*.
3. Se WhatsApp non si apre, compaiono un link di emergenza e il pulsante "Copia il messaggio".

Il numero va scritto in formato internazionale, ad es. `"+393401234567"`. Il sito non salva nulla da nessuna parte: le risposte arrivano solo nella chat WhatsApp del numero indicato.

## Pubblicazione gratuita su GitHub Pages

Serve un account GitHub gratuito.

1. Su github.com: **New repository** → nome es. `noemi-e-davide` → **Public** → *Create*.
   (Con l'account gratuito GitHub Pages funziona solo con repository pubblici, vedi note.)
2. Dalla cartella del progetto, nel terminale:
   ```
   git remote add origin https://github.com/TUOUSER/noemi-e-davide.git
   git push -u origin main
   ```
3. Su GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. Dopo 1–2 minuti il sito è su `https://TUOUSER.github.io/noemi-e-davide/`.
5. Per aggiornare: modifica i file, poi `git add -A`, `git commit -m "aggiornamento"`, `git push`.

### Anteprima del link su WhatsApp (immagine + titolo)

Dopo il passo 4, in [index.html](index.html) sostituisci il commento `og:image` con:
```html
<meta property="og:image" content="https://TUOUSER.github.io/noemi-e-davide/og-image.jpg">
```
WhatsApp memorizza l'anteprima: se la cambi dopo aver già condiviso il link, può servire un po' di tempo.

## Note importanti

- **Il repository è pubblico**: chiunque conosca l'indirizzo può leggere anche `config.js`, quindi **numero WhatsApp, orari e luoghi sono visibili**. Il sito ha `noindex` e `robots.txt`, così Google non lo mostra nei risultati, ma non è protetto da password. Non inserire dati sensibili (es. elenco completo degli invitati).
- La canzone (`music/music.mp3`, 3,7 MB) deve poter essere usata: verifica i diritti prima di una pubblicazione definitiva.
- Per un indirizzo proprio (es. `noemiedavide.it`) si può collegare un dominio più avanti da **Settings → Pages → Custom domain**.
- Per provare in locale basta aprire `index.html` nel browser.
