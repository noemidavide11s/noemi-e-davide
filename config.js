/**
 * ============================================================
 * CONFIGURAZIONE MATRIMONIO DI NOEMI & DAVIDE
 * ============================================================
 * Tutti i contenuti, i testi, i tavoli e il menu del sito
 * sono raccolti qui. Puoi modificare questo file in qualsiasi
 * momento per aggiornare i dettagli del matrimonio!
 */

const CONFIG = {
    // 1. DATI DEGLI SPOSI E DELL'EVENTO
    sposi: {
        sposa: "Noemi",
        sposo: "Davide",
        monogramma: "N & D",
        dataMatrimonio: "2027-09-11T11:00:00", // Formato ISO AAAA-MM-GGTHH:MM:SS
        dataVisualizzata: "11 Settembre 2027 · Ore 11:00",
        luogoBreve: "Faggiano (TA)",
        hashtag: "#NoemiEDavide2027",
        rsvpEntroData: "30 Giugno 2027",
        // Numero WhatsApp che riceve le conferme (RSVP). SOSTITUISCI quello di esempio.
        // Formato: +39 seguito dal cellulare, es. "+393401234567". Il file è pubblico: usa un numero che puoi mostrare.
        whatsappContatto: "+393401587415",
        emailContatto: "noemi02.giacca@gmail.com"
    },

    // 2. PARTECIPAZIONE / BUSTA INIZIALE
    intro: {
        eyebrow: "Un invito speciale per te",
        titolo: "Noemi & Davide",
        sottotitolo: "Stiamo per iniziare il nostro viaggio più bello e desideriamo averti al nostro fianco.",
        sigilloMonogramma: "ND",
        apriBottone: "Apri la Partecipazione",
        entraSenzaMusica: "Entra senza musica"
    },

    // 3. MUSICA DI SOTTOFONDO
    musica: {
        file: "music/music.mp3",
        titolo: "Il regalo più grande",
        autore: "Tommaso Paradiso"
    },

    // 4. HERO SECTION
    hero: {
        eyebrow: "Il nostro giorno speciale",
        titoloPromessa: "Insieme, verso il nostro per sempre.",
        descrizione: "Una giornata di amore, risate, sguardi e ricordi indimenticabili da vivere e festeggiare insieme a te."
    },

    // 5. CITAZIONE INIZIALE / MANIFESTO
    manifesto: "«L'amore non è guardarsi l'un l'altro, ma guardare insieme nella stessa direzione.»",

    // 6. LA NOSTRA STORIA (Love Story / Tappe degli sposi)
    storia: {
        eyebrow: "Il nostro cammino",
        titolo: "Come è nata la nostra favola",
        fraseEvidenza: "Da quando l'amicizia è diventata amore abbiamo capito che ogni giorno insieme sarebbe stato una scelta meravigliosa.",
        tappe: [
            {
                numero: "01",
                data: "Dicembre 2019",
                titolo: "Quando l'amicizia è diventata amore",
                testo: "Eravamo amici, e non ce n'eravamo accorti: tra una risata e un caffè, il cuore aveva già scelto. Poi una sera di dicembre, tra luci accese e parole che non trovavano più il coraggio di restare mute, quell'amicizia ha cambiato nome. Non è stato un fulmine, ma un'alba: lenta, luminosa, impossibile da fermare."
            },
            {
                numero: "02",
                data: "Febbraio 2020",
                titolo: "Il primo viaggio",
                testo: "Una fuga a Parigi tra stradine piene d'arte, passeggiate senza meta e la consapevolezza che, ovunque fossimo nel mondo, la vera casa eravamo noi."
            },
            {
                numero: "03",
                data: "Giugno 2024",
                titolo: "La nostra prima casa",
                testo: "Ancora non è finita, ma è già nostra. Tra progetti disegnati su un foglio, campioni di colore appesi alle pareti e mille idee su dove mettere ogni cosa, stiamo immaginando le stanze in cui vivremo. Una casa si costruisce così: un sogno alla volta, insieme."
            },
            {
                numero: "04",
                data: "Agosto 2025",
                titolo: "La proposta",
                testo: "Nel giorno in cui Davide spegneva trent'anni, tra amici, abbracci e brindisi, è arrivata la sorpresa più grande. Il cuore a mille, le mani tremanti, la domanda che aspettavamo da una vita. E la risposta è stata un 'Sì!' colmo di lacrime e gioia: il regalo più bello di tutti."
            }
        ]
    },

    // 7. PROGRAMMA DELLA GIORNATA (Timeline)
    timeline: {
        eyebrow: "Il programma",
        titolo: "I momenti del nostro giorno",
        sottotitolo: "Ecco come si svolgerà la giornata per condividere ogni istante con noi.",
        eventi: [
            {
                ora: "11:00",
                titolo: "La Cerimonia",
                luogo: "Chiesa di Santa Maria Assunta, Faggiano",
                descrizione: "Il momento più emozionante: lo scambio delle promesse e degli anelli.",
                icona: "rings"
            },
            {
                ora: "13:00",
                titolo: "Inizio del Ricevimento",
                luogo: "Masseria La Grande Quercia",
                descrizione: "Brindisi di benvenuto, il pranzo nuziale e la festa che comincia, tra la campagna di Mottola.",
                icona: "cocktail"
            },
            {
                ora: "20:00",
                titolo: "Taglio della Torta",
                luogo: "Masseria La Grande Quercia",
                descrizione: "Il dolce momento da condividere, con un brindisi insieme a tutti voi.",
                icona: "cake"
            },
            {
                ora: "22:00",
                titolo: "Open Bar & DJ Party",
                luogo: "Masseria La Grande Quercia",
                descrizione: "Cocktail, pista da ballo e musica fino a tarda notte!",
                icona: "party"
            }
        ]
    },

    // 8. I LUOGHI / LOCATION (Con collegamenti mappe e navigatori)
    location: {
        eyebrow: "Come raggiungerci",
        titolo: "I luoghi della celebrazione",
        luoghi: [
            {
                tipo: "La Cerimonia",
                nome: "Chiesa di Santa Maria Assunta",
                orario: "Ore 11:00",
                indirizzo: "Faggiano (TA)",
                note: "Ti consigliamo di arrivare con qualche minuto di anticipo.",
                linkMaps: "https://www.google.com/maps/search/?api=1&query=Chiesa+Santa+Maria+Assunta+Faggiano+TA",
                linkWaze: "https://waze.com/ul?q=Chiesa%20Santa%20Maria%20Assunta%20Faggiano%20TA&navigate=yes"
            },
            {
                tipo: "Il Ricevimento & La Festa",
                nome: "Masseria La Grande Quercia",
                orario: "Dalle ore 13:00 in poi",
                indirizzo: "San Basilio, Mottola (TA)",
                note: "Dopo la cerimonia ci trasferiremo in masseria: il ricevimento comincia alle 13:00.",
                linkMaps: "https://www.google.com/maps/search/?api=1&query=Masseria+La+Grande+Quercia+San+Basilio+Mottola+TA",
                linkWaze: "https://waze.com/ul?q=Masseria%20La%20Grande%20Quercia%20San%20Basilio%20Mottola%20TA&navigate=yes"
            }
        ]
    },

    // 9. MENU DEL MATRIMONIO
    menu: {
        eyebrow: "Percorso enogastronomico",
        titolo: "Il Menu Nuziale",
        notaIntolleranze: "La cucina è attrezzata per qualsiasi esigenza alimentare (celiachia, vegetariano, vegano, allergie specifiche o menu bimbi). Segnalalo semplicemente nella conferma RSVP in fondo alla pagina.",
        sezioni: [
            {
                categoria: "Aia delle Sagre",
                descrizione: "L'aperitivo di benvenuto",
                testo: "Un viaggio tra le sagre di Puglia, riunite in un'unica grande aia: un percorso di assaggi dove incontrare e gustare una selezione di piatti tipici della tradizione pugliese, tra sapori genuini, profumi di festa e convivialità."
            },
            {
                categoria: "I Primi Piatti",
                descrizione: "La tradizione incontra la raffinatezza contemporanea",
                piatti: [
                    {
                        titolo: "Risotto Carnaroli Riserva mantecato ai fiori di zucca",
                        dettaglio: "Con cuore di burrata pugliese, zeste di limone d'Amalfi e perle di gambero rosso di Mazara",
                        badge: ["Specialità Chef", "Senza Glutine"]
                    },
                    {
                        titolo: "Tortelli di pasta fresca tirata a mano al mattarello",
                        dettaglio: "Farciti con ricotta nostrana ed erbette di campo, glassati al burro fuso di malga e tartufo nero estivo",
                        badge: ["Fatto a Mano", "Vegetariano"]
                    }
                ]
            },
            {
                categoria: "Il Secondo Piatto",
                descrizione: "Cotture lente e profumi della terra",
                piatti: [
                    {
                        titolo: "Filetto di manzo piemontese in crosta di erbe fini",
                        dettaglio: "Accompagnato da riduzione al Sangiovese Superiore di Romagna e jus leggero al rosmarino",
                        badge: ["Carne"]
                    }
                ]
            },
            {
                categoria: "Dolcezza",
                descrizione: "Il gran finale",
                testo: "Prelibatezze della pasticceria e angoli live da vivere e gustare insieme, per chiudere in dolcezza con la torta nuziale."
            }
        ]
    },

    // 11. CAROSELLO FOTO DELLA COPPIA
    galleria: {
        eyebrow: "Gli attimi più belli",
        titolo: "Album del Matrimonio",
        sottotitolo: "Durante la giornata scatta foto e caricale qui per condividerle con noi!",
        // Per aggiungere una foto: copiala in photos/ e aggiungi una riga come le altre (w e h = larghezza e altezza in pixel).
        foto: [
            { src: "photos/foto-1.jpg", alt: "Noemi e Davide in auto, con un bacio sulla guancia", w: 945, h: 720 },
            { src: "photos/foto-2.jpg", alt: "Noemi e Davide si baciano davanti al camino", w: 1200, h: 1600 },
            { src: "photos/foto-3.jpg", alt: "Noemi e Davide seduti accanto a una fontana, sorridenti", w: 1200, h: 1600 },
            { src: "photos/foto-4.jpg", alt: "Davide in ginocchio con l'anello davanti a Noemi, tra gli applausi degli amici", w: 1600, h: 1066 },
            { src: "photos/foto-5.jpg", alt: "Noemi e Davide si baciano allo stadio, con la sciarpa del concerto", w: 1200, h: 1600 },
            { src: "photos/foto-6.jpg", alt: "Noemi e Davide in posa a bordo piscina", w: 1200, h: 1600 }
        ],
    },

    // 12. DEDICA / LETTERA DI NOEMI & DAVIDE AGLI INVITATI
    lettera: {
        eyebrow: "Dal cuore",
        titolo: "Un grazie sincero",
        paragrafi: [
            "Se oggi siamo qui a celebrare questo traguardo è anche grazie a ciascuno di voi. Ognuno dei presenti ha lasciato un segno, un sorriso, un consiglio o un ricordo indelebile nel cammino che ci ha uniti.",
            "Questo matrimonio non è solo la festa del nostro amore, ma un grande abbraccio rivolto a chi ci ha visto crescere, sostenerci e imparare a amarci ogni giorno di più.",
            "Grazie di essere qui, di condividere questa gioia immensa e di rendere eterno questo giorno con la vostra presenza affettuosa."
        ],
        chiusura: "Con tutto il nostro affetto e gratitudine,",
        firma: "Noemi & Davide"
    },

    // 13. CONFERMA PRESENZA (RSVP)
    rsvp: {
        eyebrow: "Conferma Presenza",
        titolo: "Sarai dei nostri?",
        sottotitolo: "Ti chiediamo cortesemente di confermare la tua presenza entro il 30 Giugno 2027 per permetterci di organizzare ogni dettaglio con la massima cura.",
        opzioniDieta: [
            "Nessuna intolleranza (Menu Tradizionale)",
            "Menu Vegetariano",
            "Menu Vegano",
            "Celiaco / Senza Glutine",
            "Intolleranza al Lattosio",
            "Allergia alla frutta a guscio",
            "Menu Bambino"
        ]
    }
};

window.CONFIG = CONFIG;
