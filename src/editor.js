export const _haEditorSchema = [
  { name: "title", label: "Titolo Scheda", selector: { text: {} } },
  {
    name: "height",
    label: "Altezza Card (px)",
    selector: { number: { min: 200, max: 1000, step: 10, mode: "box" } },
  },
  {
    name: "wall_height",
    label: "Altezza default dei Muri (m)",
    selector: { number: { min: 1, max: 4, step: 0.1, mode: "box" } },
  },
  { name: "sun_entity", label: "Entità Sole (giorno/notte)", selector: { entity: { domain: ["sun"] } } },
  { name: "weather_entity", label: "Entità Meteo (atmosfera)", selector: { entity: { domain: ["weather"] } } },
];

export class FloorPlan3DCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    if (this._yamlEditor) this._yamlEditor.defaultValue = config;
    if (this._haForm) this._haForm.data = config;
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._haForm) this._haForm.hass = hass;
    if (this._yamlEditor) this._yamlEditor.hass = hass;
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: "open" });
      this._render();
    }
  }

  _render() {
    if (!this.shadowRoot || !this._config) return;
    if (!this._initialized) {
      this._initialized = true;
      this.shadowRoot.innerHTML = `
        <style>
          .form-container { margin-bottom: 24px; display: block; }
          .alert { background: rgba(255,152,0,0.1); border-left: 4px solid #ff9800; padding: 12px; margin-bottom: 24px; font-size: 14px; color: var(--primary-text-color); }
          .yaml-container { display: block; }
          .yaml-container p { margin-bottom: 8px; font-weight: bold; color: var(--primary-text-color); }
        </style>
        <div class="alert">
          <strong>\u2728 Suggerimento per l'editor 3D:</strong> Chiudi questa finestra cliccando su "Salva" nell'interfaccia Lovelace, poi usa il pulsante <strong>"✏️ Edit"</strong> che vedi sopra al rettangolo 3D della plancia! Modificando spostamenti, luci e colori da lì, il file YAML della plancia si aggiornerà in automatico.
        </div>
        <div class="form-container">
          <ha-form></ha-form>
        </div>
        <div class="yaml-container">
          <p>Configurazione YAML (generata automaticamente dall'editor 3D interno):</p>
          <ha-yaml-editor></ha-yaml-editor>
        </div>
      `;
      this._haForm = this.shadowRoot.querySelector("ha-form");
      this._haForm.hass = this._hass;
      this._haForm.data = this._config;
      this._haForm.schema = _haEditorSchema;
      this._haForm.computeLabel = (s) => s.label || s.name;
      this._haForm.addEventListener("value-changed", (ev) =>
        this._formChanged(ev),
      );

      this._yamlEditor = this.shadowRoot.querySelector("ha-yaml-editor");
      this._yamlEditor.hass = this._hass;
      this._yamlEditor.defaultValue = this._config;
      this._yamlEditor.addEventListener("value-changed", (ev) =>
        this._yamlChanged(ev),
      );
    } else {
      if (this._haForm && this._haForm.data !== this._config)
        this._haForm.data = this._config;
      if (this._yamlEditor && this._yamlEditor.defaultValue !== this._config) {
        this._yamlEditor.defaultValue = this._config;
      }
    }
  }

  _formChanged(ev) {
    ev.stopPropagation();
    if (!this._config) return;
    const newConfig = { ...this._config, ...ev.detail.value };
    this._dispatchConfig(newConfig);
  }

  _yamlChanged(ev) {
    ev.stopPropagation();
    if (!this._config || !ev.detail.isValid) return;
    this._dispatchConfig(ev.detail.value);
  }

  _dispatchConfig(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
