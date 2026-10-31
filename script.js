/**
 * ============================================================
 * JAVASCRIPT PER IL MATRIMONIO DI NOEMI & DAVIDE
 * Logica interattiva per invito, storia, programma, menu, foto & RSVP
 * ============================================================
 */

document.documentElement.classList.add("js");
document.documentElement.classList.add("intro-active");

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    const config = window.CONFIG;
    if (!config) {
        console.error("CONFIG non trovato. Assicurati che config.js sia caricato prima di script.js.");
        return;
    }

    // 1. INIZIALIZZAZIONE TESTI DINAMICI DA CONFIG
    initDynamicTexts(config);

    // 2. INTRO CON BUSTA & CERALACCA
    initIntroAndAudio(config);

    // 3. COUNTDOWN AL GRANDE GIORNO
    initCountdown(config.sposi.dataMatrimonio);

    // 4. TIMELINE DELLA GIORNATA
    renderTimeline(config.timeline);

    // 5. LOCATION & INDIRIZZI
    renderLocations(config.location);

    // 6. MENU NUZIALE CON SCHEDE
    renderMenu(config.menu);

    // 8. GALLERIA FOTOGRAFICA & LIGHTBOX
    renderGallery(config.galleria);

    // 10. LETTERA DI RINGRAZIAMENTO
    renderLetter(config.lettera, config.sposi);

    // 11. FORM RSVP INTERATTIVO (WHATSAPP & APPUNTI)
    initRsvp(config.sposi, config.rsvp);

    // 12. SCROLL REVEAL & NAVIGAZIONE
    initNavigationAndReveal();
});

/**
 * Inserisce i testi di base configurati nei rispettivi nodi del DOM
 */
function initDynamicTexts(config) {
    const { sposi, hero } = config;
    const initialSposa = sposi.sposa ? sposi.sposa.charAt(0).toUpperCase() : "N";
    const initialSposo = sposi.sposo ? sposi.sposo.charAt(0).toUpperCase() : "M";

    document.title = `${sposi.sposa} & ${sposi.sposo} — Il nostro Matrimonio`;

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text !== undefined) el.textContent = text;
    };

    setText("monogramFirst", initialSposa);
    setText("monogramSecond", initialSposo);
    setText("footerMonogramFirst", initialSposa);
    setText("footerMonogramSecond", initialSposo);
    setText("envelopeInitials", `${initialSposa} & ${initialSposo}`);
    setText("envelopeSeal", `${initialSposa}${initialSposo}`);
    setText("envelopeDate", sposi.dataVisualizzata.split("·")[0].trim());

    setText("introTitle", `${sposi.sposa} & ${sposi.sposo}`);
    setText("introEyebrow", config.intro.eyebrow);
    setText("introLead", config.intro.sottotitolo);
    setText("openIntroBtnText", config.intro.apriBottone);
    setText("silentIntroBtnText", config.intro.entraSenzaMusica);

    setText("heroEyebrow", hero.eyebrow);
    setText("heroNames", `${sposi.sposa} & ${sposi.sposo}`);
    setText("heroPromise", hero.titoloPromessa);
    // Data grande nell'hero, ricavata da dataMatrimonio
    const weddingDate = new Date(sposi.dataMatrimonio);
    if (!isNaN(weddingDate)) {
        const fmt = (opts) => new Intl.DateTimeFormat("it-IT", opts).format(weddingDate);
        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        setText("heroWeekday", capitalize(fmt({ weekday: "long" })));
        setText("heroDay", fmt({ day: "numeric" }));
        setText("heroMonth", capitalize(fmt({ month: "long" })));
        setText("heroYear", fmt({ year: "numeric" }));
        setText("heroDate", `${sposi.luogoBreve} · Ore ${fmt({ hour: "2-digit", minute: "2-digit" })}`);
    } else {
        setText("heroDate", sposi.dataVisualizzata);
    }
    setText("manifestoText", config.manifesto);

    setText("storyEyebrow", config.storia.eyebrow);
    setText("storyTitle", config.storia.titolo);
    setText("storyHighlight", config.storia.fraseEvidenza);

    setText("footerNames", `${sposi.sposa} & ${sposi.sposo}`);
    setText("footerDate", sposi.dataVisualizzata);
    setText("footerHashtag", sposi.hashtag);

    // Render tappe storia
    const storyContainer = document.getElementById("storyTimeline");
    if (storyContainer && Array.isArray(config.storia.tappe)) {
        storyContainer.innerHTML = config.storia.tappe.map((tappa) => `
            <div class="story-card reveal">
                <span class="story-card__dot" aria-hidden="true"></span>
                <div class="story-card__inner">
                    <span class="story-card__date">${escapeHtml(tappa.data)}</span>
                    <h3 class="story-card__title">${escapeHtml(tappa.titolo)}</h3>
                    <p class="story-card__text">${escapeHtml(tappa.testo)}</p>
                </div>
            </div>
        `).join("");
    }
}

/**
 * Gestione busta partecipazione e audio musicale di sottofondo
 */
function initIntroAndAudio(config) {
    const envelope = document.getElementById("weddingEnvelope");
    const openBtn = document.getElementById("openExperience");
    const silentBtn = document.getElementById("openWithoutMusic");
    const audio = document.getElementById("bgAudio");
    const audioToggle = document.getElementById("audioToggle");
    const audioLabel = document.getElementById("audioLabel");

    let isAudioPlaying = false;

    if (audioLabel && config.musica.titolo) {
        audioLabel.textContent = config.musica.titolo;
    }

    let isOpened = false;

    const openEnvelope = (withSound = true) => {
        if (isOpened) return;
        isOpened = true;

        if (envelope) {
            envelope.classList.add("is-opening");
        }

        if (withSound && audio) {
            audio.play().then(() => {
                isAudioPlaying = true;
                if (audioToggle) {
                    audioToggle.classList.add("is-playing");
                    audioToggle.setAttribute("aria-pressed", "true");
                }
            }).catch(() => {
                console.log("Riproduzione automatica bloccata dal browser.");
            });
        }

        window.setTimeout(() => {
            document.documentElement.classList.remove("intro-active");
            triggerReveal();
            const skipTarget = document.getElementById("inizio");
            if (skipTarget) skipTarget.focus({ preventScroll: true });
        }, 2500); // lascia finire sigillo, lembo e lettera prima della dissolvenza
    };

    if (openBtn) openBtn.addEventListener("click", () => openEnvelope(true));
    if (envelope) {
        envelope.addEventListener("click", () => openEnvelope(true));
        envelope.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openEnvelope(true);
            }
        });
    }
    if (silentBtn) silentBtn.addEventListener("click", () => openEnvelope(false));

    if (audioToggle && audio) {
        audioToggle.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => {
                    isAudioPlaying = true;
                    audioToggle.classList.add("is-playing");
                    audioToggle.setAttribute("aria-pressed", "true");
                }).catch(console.error);
            } else {
                audio.pause();
                isAudioPlaying = false;
                audioToggle.classList.remove("is-playing");
                audioToggle.setAttribute("aria-pressed", "false");
            }
        });
    }
}

/**
 * Conto alla rovescia in tempo reale al giorno del matrimonio
 */
function initCountdown(targetDateString) {
    const daysEl = document.getElementById("cdDays");
    const hoursEl = document.getElementById("cdHours");
    const minutesEl = document.getElementById("cdMinutes");
    const secondsEl = document.getElementById("cdSeconds");
    const titleEl = document.getElementById("countdownTitle");

    const targetDate = new Date(targetDateString).getTime();
    if (isNaN(targetDate)) return;

    function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            if (titleEl) titleEl.textContent = "Oggi è il nostro giorno speciale! ✨";
            if (daysEl) daysEl.textContent = "00";
            if (hoursEl) hoursEl.textContent = "00";
            if (minutesEl) minutesEl.textContent = "00";
            if (secondsEl) secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
}

/**
 * Renderizza la timeline della giornata con icone SVG eleganti
 */
function renderTimeline(timelineConfig) {
    const container = document.getElementById("timelineGrid");
    if (!container || !timelineConfig || !Array.isArray(timelineConfig.eventi)) return;

    const iconMap = {
        rings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="12" r="5"/><circle cx="16" cy="12" r="5"/></svg>`,
        cocktail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 22h8M12 11v11M19 3l-7 8-7-8h14z"/></svg>`,
        dinner: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v20M6 2v20M3 2v6a3 3 0 0 0 6 0V2M18 8a3 3 0 0 0 3-3V2h-6v3a3 3 0 0 0 3 3z"/></svg>`,
        cake: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s2-1 4 0 4 0 4 0 2-1 4 0 4 0 4 0"/><path d="M12 7V4M12 4a1 1 0 0 1 1-1c1 1 0 2-1 2s-2-1-1-2a1 1 0 0 1 1 1z"/></svg>`,
        party: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m19 14 3-3-8.5-8.5-3 3 1.5 1.5-5 5L4 9l-2 2 7 7 2-2-3-3 5-5 1.5 1.5z"/><path d="M14 19l2 2M17 16l2 2"/></svg>`
    };

    container.innerHTML = timelineConfig.eventi.map(ev => `
        <div class="timeline-event reveal">
            <div class="timeline-event__icon">
                ${iconMap[ev.icona] || iconMap.rings}
            </div>
            <span class="timeline-event__time">${escapeHtml(ev.ora)}</span>
            <h3 class="timeline-event__title">${escapeHtml(ev.titolo)}</h3>
            <span class="timeline-event__venue">${escapeHtml(ev.luogo)}</span>
            <p class="timeline-event__desc">${escapeHtml(ev.descrizione)}</p>
        </div>
    `).join("");
}

/**
 * Renderizza i luoghi con bottoni per Google Maps e Waze
 */
function renderLocations(locationConfig) {
    const container = document.getElementById("locationsGrid");
    if (!container || !locationConfig || !Array.isArray(locationConfig.luoghi)) return;

    container.innerHTML = locationConfig.luoghi.map(loc => `
        <article class="location-card reveal">
            <div>
                <span class="location-card__type">${escapeHtml(loc.tipo)}</span>
                <h3 class="location-card__name">${escapeHtml(loc.nome)}</h3>
                <p class="location-card__address">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${escapeHtml(loc.indirizzo)}</span>
                </p>
                <div class="location-card__note">${escapeHtml(loc.note)}</div>
            </div>
            <div class="location-card__actions">
                <a class="btn-outline" href="${escapeHtml(loc.linkMaps)}" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/></svg>
                    <span>Google Maps</span>
                </a>
                <a class="btn-outline" href="${escapeHtml(loc.linkWaze)}" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
                    <span>Waze</span>
                </a>
            </div>
        </article>
    `).join("");
}

/**
 * Renderizza il Menu con navigazione a schede interattive
 */
function renderMenu(menuConfig) {
    const tabsContainer = document.getElementById("menuTabs");
    const contentContainer = document.getElementById("menuContent");
    const noticeEl = document.getElementById("menuNotice");

    if (!tabsContainer || !contentContainer || !menuConfig || !Array.isArray(menuConfig.sezioni)) return;

    if (noticeEl && menuConfig.notaIntolleranze) {
        noticeEl.innerHTML = `<strong>Attenzione alle esigenze alimentari</strong>${escapeHtml(menuConfig.notaIntolleranze)}`;
    }

    // Costruisci bottoni schede
    tabsContainer.innerHTML = menuConfig.sezioni.map((sez, index) => `
        <button class="menu-tab-btn ${index === 0 ? 'is-active' : ''}" type="button" data-index="${index}">
            ${escapeHtml(sez.categoria.split('&')[0].trim())}
        </button>
    `).join("");

    // Costruisci contenuto sezioni
    contentContainer.innerHTML = menuConfig.sezioni.map((sez, index) => {
        const dishListHtml = Array.isArray(sez.piatti) ? sez.piatti.map(piatto => {
            const badgesHtml = Array.isArray(piatto.badge) ? piatto.badge.map(b => `<span class="diet-badge">${escapeHtml(b)}</span>`).join("") : "";
            return `
                <div class="menu-dish">
                    <div class="menu-dish__title-wrap">
                        <h4 class="menu-dish__title">${escapeHtml(piatto.titolo)}</h4>
                        <div class="menu-dish__badges">${badgesHtml}</div>
                    </div>
                    <p class="menu-dish__detail">${escapeHtml(piatto.dettaglio)}</p>
                </div>
            `;
        }).join("") : "";

        return `
            <div class="menu-course ${index === 0 ? 'is-active' : ''}" id="menuCourse-${index}">
                <div class="menu-course__card">
                    <div class="menu-course__header">
                        <h3 class="menu-course__title">${escapeHtml(sez.categoria)}</h3>
                        <p class="menu-course__subtitle">${escapeHtml(sez.descrizione)}</p>
                    </div>
                    ${sez.testo ? `<p class="menu-course__text">${escapeHtml(sez.testo)}</p>` : ""}
                    ${dishListHtml ? `<div class="menu-dish-list">${dishListHtml}</div>` : ""}
                </div>
            </div>
        `;
    }).join("");

    // Gestione click schede
    const tabButtons = tabsContainer.querySelectorAll(".menu-tab-btn");
    const coursePanels = contentContainer.querySelectorAll(".menu-course");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetIdx = btn.dataset.index;

            tabButtons.forEach(b => b.classList.remove("is-active"));
            coursePanels.forEach(p => p.classList.remove("is-active"));

            btn.classList.add("is-active");
            const targetPanel = document.getElementById(`menuCourse-${targetIdx}`);
            if (targetPanel) targetPanel.classList.add("is-active");
        });
    });
}

/**
 * Galleria fotografica orizzontale & Lightbox
 */
function renderGallery(galleriaConfig) {
    const track = document.getElementById("galleryTrack");
    const viewport = document.getElementById("galleryViewport");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");

    const lightbox = document.getElementById("photoLightbox");
    const lbImg = document.getElementById("lightboxImage");
    const lbCap = document.getElementById("lightboxCaption");
    const lbClose = document.getElementById("lightboxClose");
    const lbPrev = document.getElementById("lightboxPrev");
    const lbNext = document.getElementById("lightboxNext");

    if (!track) return;

    const configuredPhotos = galleriaConfig && Array.isArray(galleriaConfig.foto) ? galleriaConfig.foto : [];
    const hasRealPhotos = configuredPhotos.length > 0;
    // Finché non ci sono foto vere: sei riquadri bianchi come segnaposto
    const foto = hasRealPhotos
        ? configuredPhotos
        : Array.from({ length: 6 }, () => ({ placeholder: true }));
    let currentIndex = 0;

    // Renderizza schede foto
    track.innerHTML = foto.map((f, i) => f.placeholder ? `
        <figure class="photo-card photo-card--placeholder">
            <div class="photo-card__blank" role="img" aria-label="Spazio per una fotografia di Noemi e Davide"></div>
        </figure>
    ` : `
        <figure class="photo-card" data-index="${i}">
            <button class="photo-card__button" type="button" aria-label="Ingrandisci foto: ${escapeHtml(f.alt)}">
                <img src="${escapeHtml(f.src)}" alt="${escapeHtml(f.alt)}"${f.w && f.h ? ` width="${f.w}" height="${f.h}"` : ""} loading="lazy">
            </button>
            <figcaption class="${f.didascalia ? "" : "is-counter-only"}">
                ${f.didascalia ? `<span>${escapeHtml(f.didascalia)}</span>` : ""}
                <span>${String(i + 1).padStart(2, "0")} / ${String(foto.length).padStart(2, "0")}</span>
            </figcaption>
        </figure>
    `).join("");

    // Lightbox handlers
    const openLightbox = (index) => {
        currentIndex = (index + foto.length) % foto.length;
        if (lbImg) {
            lbImg.src = foto[currentIndex].src;
            lbImg.alt = foto[currentIndex].alt || "";
        }
        if (lbCap) lbCap.textContent = foto[currentIndex].didascalia || "";
        if (lightbox) {
            lightbox.classList.add("is-open");
            document.body.style.overflow = "hidden";
        }
    };

    const closeLightbox = () => {
        if (lightbox) {
            lightbox.classList.remove("is-open");
            document.body.style.overflow = "";
        }
    };

    track.querySelectorAll(".photo-card__button").forEach((btn, idx) => {
        btn.addEventListener("click", () => openLightbox(idx));
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    if (lbPrev) lbPrev.addEventListener("click", () => openLightbox(currentIndex - 1));
    if (lbNext) lbNext.addEventListener("click", () => openLightbox(currentIndex + 1));

    document.addEventListener("keydown", (e) => {
        if (!lightbox || !lightbox.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") openLightbox(currentIndex - 1);
        if (e.key === "ArrowRight") openLightbox(currentIndex + 1);
    });

    // Frecce viewport
    if (prevBtn && viewport) {
        prevBtn.addEventListener("click", () => {
            viewport.scrollBy({ left: -320, behavior: "smooth" });
        });
    }
    if (nextBtn && viewport) {
        nextBtn.addEventListener("click", () => {
            viewport.scrollBy({ left: 320, behavior: "smooth" });
        });
    }
}

/**
 * Renderizza la lettera/dedica degli sposi
 */
function renderLetter(letteraConfig, sposi) {
    const paragraphsContainer = document.getElementById("letterParagraphs");
    const signoffEl = document.getElementById("letterSignoff");
    const signatureEl = document.getElementById("letterSignature");

    if (letteraConfig && paragraphsContainer && Array.isArray(letteraConfig.paragrafi)) {
        paragraphsContainer.innerHTML = letteraConfig.paragrafi.map(p => `
            <p>${escapeHtml(p)}</p>
        `).join("");
    }

    if (signoffEl && letteraConfig.chiusura) signoffEl.textContent = letteraConfig.chiusura;
    if (signatureEl) signatureEl.textContent = `${sposi.sposa} & ${sposi.sposo}`;
}

/**
 * Gestione form RSVP: genera link WhatsApp formattato o copia testo
 */
function initRsvp(sposi, rsvpConfig) {
    const form = document.getElementById("rsvpForm");
    const dietSelect = document.getElementById("rsvpDiet");
    const feedback = document.getElementById("rsvpFeedback");

    if (dietSelect && rsvpConfig && Array.isArray(rsvpConfig.opzioniDieta)) {
        dietSelect.innerHTML = rsvpConfig.opzioniDieta.map(opt => `
            <option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>
        `).join("");
    }

    if (!form) return;

    // Se l'invitato non partecipa, numero persone e dieta non servono
    const attendanceRow = form.querySelector(".form-row");
    const isAttending = () => form.querySelector('input[name="attendance"]:checked') === form.querySelector('input[name="attendance"]');
    const syncAttendance = () => {
        if (!attendanceRow) return;
        const attending = isAttending();
        attendanceRow.hidden = !attending;
        attendanceRow.querySelectorAll("select").forEach(s => { s.disabled = !attending; });
    };
    form.querySelectorAll('input[name="attendance"]').forEach(r => r.addEventListener("change", syncAttendance));
    syncAttendance();

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("rsvpName");
        const name = nameInput.value.trim();
        const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Sì, ci sarò";
        const attending = isAttending();
        const guestsCount = document.getElementById("rsvpGuests").value;
        const diet = document.getElementById("rsvpDiet").value;
        const notes = document.getElementById("rsvpNotes").value.trim();

        if (!name) {
            if (feedback) {
                feedback.textContent = "Per favore, inserisci il tuo nome e cognome.";
                feedback.classList.add("is-visible", "is-error");
            }
            nameInput.focus();
            return;
        }
        if (feedback) feedback.classList.remove("is-error");

        // Costruisci messaggio per WhatsApp
        const details = attending
            ? `👥 *Numero Ospiti:* ${guestsCount}\n🍽️ *Dieta / Intolleranze:* ${diet}\n`
            : "";
        const msg =
`💍 *CONFERMA MATRIMONIO DI ${sposi.sposa.toUpperCase()} & ${sposi.sposo.toUpperCase()}*

👤 *Nome Invitato:* ${name}
✨ *Presenza:* ${attendance}
${details}${notes ? `💌 *Messaggio per gli Sposi:* "${notes}"` : ""}

${attending ? "Non vediamo l'ora di festeggiare con voi! 🥂" : "Un abbraccio e tanti auguri! ❤️"}`;

        const waPhone = normalizeWhatsappNumber(sposi.whatsappContatto);
        const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;

        // Conferma a schermo, con piano B se WhatsApp non si apre da solo
        if (feedback) {
            feedback.innerHTML = `Grazie <strong>${escapeHtml(name)}</strong>! Si sta aprendo WhatsApp con la conferma già scritta: ti basta premere <em>Invia</em>.<br>
                <a class="rsvp-feedback__link" href="${escapeHtml(waUrl)}" target="_blank" rel="noopener noreferrer">WhatsApp non si è aperto? Tocca qui</a>
                &nbsp;·&nbsp;
                <button class="rsvp-feedback__link" id="rsvpCopyBtn" type="button">Copia il messaggio</button>`;
            feedback.classList.add("is-visible");

            const copyBtn = document.getElementById("rsvpCopyBtn");
            if (copyBtn) {
                copyBtn.addEventListener("click", async () => {
                    const ok = await copyText(msg);
                    copyBtn.textContent = ok ? "Messaggio copiato ✓" : "Copia non riuscita";
                });
            }
        }

        // Apri WhatsApp; se il browser blocca la nuova scheda, vai direttamente al link
        const win = window.open(waUrl, "_blank");
        if (!win) window.location.href = waUrl;
    });
}

/**
 * Porta il numero in formato internazionale senza simboli (es. "393401234567")
 */
function normalizeWhatsappNumber(raw) {
    let n = String(raw || "").replace(/[^0-9]/g, "");
    if (n.startsWith("00")) n = n.slice(2);
    if (n.length === 10 && n.startsWith("3")) n = "39" + n; // cellulare italiano scritto senza prefisso
    return n;
}

/**
 * Copia un testo negli appunti, con piano B per i browser senza Clipboard API
 */
async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) { /* passa al piano B */ }

    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    ta.remove();
    return ok;
}

/**
 * Gestione navigazione e animazioni di rivelazione
 */
function initNavigationAndReveal() {
    const header = document.querySelector(".site-header");
    const mobileToggle = document.getElementById("mobileNavToggle");
    const mobileMenu = document.getElementById("mobileMenuOverlay");

    // Header scuro allo scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            header?.classList.add("is-scrolled");
        } else {
            header?.classList.remove("is-scrolled");
        }
    }, { passive: true });

    // Menu Mobile
    if (mobileToggle && mobileMenu) {
        const setMenuOpen = (open) => {
            mobileMenu.classList.toggle("is-open", open);
            mobileToggle.classList.toggle("is-open", open);
            mobileToggle.setAttribute("aria-expanded", String(open));
            mobileToggle.setAttribute("aria-label", open ? "Chiudi menu di navigazione" : "Apri menu di navigazione");
            mobileMenu.setAttribute("aria-hidden", String(!open));
            document.documentElement.classList.toggle("menu-open", open);
        };

        mobileToggle.addEventListener("click", () => {
            setMenuOpen(!mobileMenu.classList.contains("is-open"));
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => setMenuOpen(false));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
                setMenuOpen(false);
                mobileToggle.focus();
            }
        });

        window.matchMedia("(min-width: 1180px)").addEventListener("change", (e) => {
            if (e.matches) setMenuOpen(false);
        });
    }

    // Evidenzia nel menu la sezione attualmente visibile
    const navLinks = document.querySelectorAll(".site-nav a, .mobile-menu-overlay a");
    const sections = Array.from(new Set(Array.from(navLinks).map(a => a.getAttribute("href"))))
        .map(href => document.querySelector(href))
        .filter(Boolean);

    if (sections.length && "IntersectionObserver" in window) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = `#${entry.target.id}`;
                navLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach(s => spy.observe(s));
    }

    triggerReveal();
}

function triggerReveal() {
    const reveals = document.querySelectorAll(".reveal:not(.is-revealed)");
    if (!("IntersectionObserver" in window)) {
        reveals.forEach(el => el.classList.add("is-revealed"));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
