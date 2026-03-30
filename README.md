# FloorPlan 3D Card per Home Assistant

Una card interattiva in 3D per Home Assistant per visualizzare e controllare la tua casa. Supporta luci (con effetti, aloni e coni di luce dinamici configurabili per tipo di lampadario), entità clima, media e molto altro. 
Dispone di un editor drag-and-drop integrato visuale per la creazione delle stanze.

## Installazione tramite HACS
1. Apri **HACS** in Home Assistant
2. Clicca sui 3 puntini in alto a destra e seleziona **Custom repositories**
3. Inserisci l'URL di questo repository, seleziona categoria **Lovelace** (o Plugin) e clicca *Add*
4. Cerca "FloorPlan 3D Card" in HACS e clicca su *Download*
5. Ricarica la finestra del browser.

## Aggiunta in Lovelace
1. Apri una tua plancia e clicca su **Modifica Plancia**
2. Clicca **Aggiungi Scheda** e scorri in basso fino a trovare "3D Floor Plan"
3. Aggiungi la scheda. Di default vedrai una "Stanza Base" creata appositamente per cominciare.
4. Usa le impostazioni native dell'Editor Visivo per configurare `Titolo` e le altezze.
5. Clicca sull'icona della matita ✏️ Edit dentro il riquadro 3D per entrare in modalità composizione visiva (puoi aggiungere stanze, muri, finestre e trascinarli).
6. Premi "Salva" per salvare la configurazione sul tuo Lovelace, e le modifiche si rifletteranno anche nel codice YAML!

---

## 💻 Area Sviluppatori (Build e Modifiche)

Questo progetto utilizza **Vite** per facilitare lo sviluppo e mantenere il codice modulare nella cartella `src/`.

Se vuoi modificare il codice della card:
1. Assicurati di avere Node.js installato.
2. Clona il repository e installa le dipendenze:
   ```bash
   npm install
   ```
3. Fai le tue modifiche all'interno della cartella `src/`.
4. Per compilare e ricostruire il file finale compresso all'interno di `dist/floorplan3d.js` lancia:
   ```bash
   npx vite build
   ```
   *(Oppure aggiungi `npm run build` modificando il `package.json`)*
