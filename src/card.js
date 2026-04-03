import {
  THREE_CDN,
  GLTF_CDN,
  FURN_CAT,
  WL,
  ROOM_COLORS,
  ROOM_EMISSIVES,
  LIGHT_TYPES,
  LIGHT_ICONS,
  DEF_ROOMS,
  DEF_CW,
  DEF_FURN,
  DEF_STATS,
} from "./constants.js";
import { GC, normLights } from "./utils.js";

export class FloorPlan3DCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
    this._rooms = [];
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._roomMeshes = [];
    this._roomFloorMats = {};
    this._roomGlowMeshes = {};
    this._roomPointLights = {};
    this._wallGroup = null;
    this._wallsVisible = true;
    this._selectedRoomId = null;
    this._isDragging = false;
    this._prevMouse = { x: 0, y: 0 };
    this._clickStart = { x: 0, y: 0 };
    this._theta = 0.6;
    this._phi = 1.05;
    this._radius = 16;
    this._orbitTarget = null;
    this._animId = null;
    this._threeLoaded = false;
    this._initialized = false;
    this._cardHeight = 450;
    this._isMobile = false;
    this._editMode = false;
    this._furnMeshes = [];
    this._cwMeshes = [];
    this._selectedEdit = null;
    this._cx = 5;
    this._cz = 2.75;
    this._cwalls = [];
    this._roomIdCounter = 0;
    this._lightFixtures = {};
    this._labelsDirty = true;
    this._lastLabelUpdate = 0;
    this._entityRoomMap = {};
  }
  static getConfigElement() {
    return document.createElement("floorplan-3d-card-editor");
  }
  static getStubConfig() {
    return {
      title: "La mia Casa 3D",
      height: 450,
      wall_height: 2.4,
      rooms: [
        {
          id: "stanza_base",
          name: "Stanza Base",
          position: { x: 5, z: 2, w: 4, d: 3 },
          color: "#AFA9EC",
          emissive: "#7F77DD",
          walls: {
            north: { enabled: true, height: 2.4, thickness: 0.08 },
            south: { enabled: true, height: 2.4, thickness: 0.08 },
            east: { enabled: true, height: 2.4, thickness: 0.08 },
            west: { enabled: true, height: 2.4, thickness: 0.08 },
          },
          entities: {
            lights: [],
            sensors: [],
            climate: [],
            covers: [],
            media: [],
            vacuums: [],
            doors: [],
          },
        },
      ],
      custom_walls: [],
      furniture: [],
      stats: [],
    };
  }
  setConfig(c) {
    this._config = c;
    this._rooms = JSON.parse(JSON.stringify(c.rooms || DEF_ROOMS));
    this._rooms.forEach((r, i) => {
      if (!r.walls) r.walls = {};
      if (r.z_order == null) r.z_order = i;
      ["north", "south", "east", "west"].forEach((d) => {
        if (!r.walls[d])
          r.walls[d] = {
            enabled: true,
            height: c.wall_height || 2.4,
            thickness: 0.08,
          };
      });
      if (!r.entities) r.entities = {};
      r.entities.lights = normLights(r.entities.lights);
      ["sensors", "climate", "covers", "media", "vacuums", "doors"].forEach(
        (k) => {
          if (!r.entities[k]) r.entities[k] = [];
        },
      );
    });
    this._rooms.sort((a, b) => (a.z_order || 0) - (b.z_order || 0));
    this._cwalls = JSON.parse(JSON.stringify(c.custom_walls || DEF_CW));
    this._furniture = JSON.parse(JSON.stringify(c.furniture || DEF_FURN));
    this._statSensors = c.stats || DEF_STATS;
    this._cardHeight = c.height || 450;
    this._wallHeight = c.wall_height || 2.4;
    this._roomIdCounter =
      this._rooms.reduce((mx, r) => {
        const n = parseInt((r.id.match(/\d+$/) || ["0"])[0]);
        return Math.max(mx, n);
      }, 0) + 1;
    this._entityRoomMap = {};
    this._rooms.forEach((r) => {
      [
        ...(r.entities.lights || []).map((lt) => lt.entity),
        ...(r.entities.sensors || []).map((s) => s.entity),
        ...(r.entities.climate || []),
        ...(r.entities.covers || []),
        ...(r.entities.media || []),
        ...(r.entities.vacuums || []),
        ...(r.entities.doors || []),
      ].forEach((eid) => {
        this._entityRoomMap[eid] = r.id;
      });
    });
    this._render();
  }
  set hass(h) {
    const p = this._hass;
    this._hass = h;
    if (!this._initialized && h) this._loadThreeAndInit();
    if (p && h) this._onHassUpdate(p);
  }
  getCardSize() {
    return Math.ceil((this._cardHeight || 450) / 50);
  }
  _checkMobile() {
    this._isMobile =
      (this.shadowRoot?.getElementById?.("wrap")?.clientWidth ||
        window.innerWidth) < 500;
  }
  _render() {
    const h = this._cardHeight;
    this.shadowRoot.innerHTML = `<style>:host{display:block}ha-card{overflow:hidden;position:relative;background:#0a0a0f}.wrap{width:100%;height:${h}px;position:relative;cursor:grab;touch-action:none}.wrap.dragging{cursor:grabbing}canvas{width:100%;height:100%;display:block}.hud{position:absolute;top:10px;left:12px;pointer-events:none;z-index:2}.hud h2{font-size:14px;font-weight:600;color:#fff;margin:0}.stats{display:flex;gap:5px;flex-wrap:wrap;position:absolute;bottom:44px;left:10px;z-index:2;pointer-events:none}.pill{background:rgba(16,16,24,.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:7px;padding:4px 8px;font-size:10px;color:rgba(255,255,255,.5)}.pill strong{color:#fff;font-weight:500}.bar{display:flex;gap:2px;justify-content:center;position:absolute;bottom:8px;left:50%;transform:translateX(-50%);z-index:2;background:rgba(16,16,24,.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:3px}.bar button{padding:5px 10px;border:none;border-radius:6px;font-size:10px;font-weight:500;cursor:pointer;background:transparent;color:rgba(255,255,255,.4);transition:all .15s}.bar button:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8)}.bar button.active{background:rgba(255,255,255,.12);color:#fff}.bar button.ea{background:rgba(250,199,117,.25);color:#FAC775}.bar button.ar{background:rgba(93,202,165,.2);color:#5DCAA5}.panel{position:absolute;top:8px;right:8px;z-index:10;background:rgba(16,16,24,.94);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:14px;width:min(300px,calc(100% - 16px));max-height:calc(100% - 60px);overflow-y:auto;display:none;box-shadow:0 12px 40px rgba(0,0,0,.5)}.panel::-webkit-scrollbar{width:3px}.panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}.panel-hdr{padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,.06)}.panel-hdr h3{font-size:14px;font-weight:600;color:#fff;margin:0;padding-right:28px}.x-btn{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:6px;border:none;background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}.x-btn:hover{background:rgba(255,255,255,.15);color:#fff}.panel-body{padding:8px 12px 12px}.sec{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:rgba(255,255,255,.25);margin:10px 0 5px}.row{display:flex;align-items:center;gap:8px;padding:7px 8px;margin:2px 0;border-radius:9px;background:rgba(255,255,255,.03)}.row:hover{background:rgba(255,255,255,.06)}.ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ico ha-icon{--mdc-icon-size:16px;color:inherit}.info{flex:1;min-width:0}.ename{font-size:10px;color:rgba(255,255,255,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.eval{font-size:12px;font-weight:500;color:#fff;margin-top:1px}.eval.off{color:rgba(255,255,255,.3)}.eextra{font-size:9px;color:rgba(255,255,255,.25);margin-top:1px}.tog{width:38px;height:20px;border-radius:10px;border:none;cursor:pointer;position:relative;transition:background .2s;flex-shrink:0;padding:0}.tog.on{background:#5DCAA5}.tog.off{background:rgba(255,255,255,.12)}.tog::after{content:'';position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s;box-shadow:0 1px 2px rgba(0,0,0,.3)}.tog.on::after{left:20px}.tog.off::after{left:2px}.bri{-webkit-appearance:none;appearance:none;width:100%;height:3px;border-radius:2px;outline:none;margin:5px 0 2px}.bri::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;cursor:pointer}.abtn{display:inline-flex;align-items:center;gap:3px;padding:4px 8px;border-radius:5px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);font-size:10px;font-family:inherit;cursor:pointer;transition:all .15s}.abtn:hover{background:rgba(255,255,255,.1);color:#fff}.abtn.del{border-color:rgba(240,149,149,.3);color:#F09595}.abtn.del:hover{background:rgba(240,149,149,.15)}.abtn.add{border-color:rgba(93,202,165,.3);color:#5DCAA5}.abtn.add:hover{background:rgba(93,202,165,.15)}.abtn.zord{border-color:rgba(175,169,236,.3);color:#AFA9EC;min-width:24px;justify-content:center}.lbl{position:absolute;pointer-events:none;z-index:1;font-size:10px;font-weight:500;white-space:nowrap;text-shadow:0 1px 5px rgba(0,0,0,.9);transform:translate(-50%,-50%)}.toast{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:20;background:rgba(16,16,24,.92);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:5px 12px;font-size:10px;color:#fff;opacity:0;transition:opacity .3s;pointer-events:none}.toast.show{opacity:1}.esl{display:flex;align-items:center;gap:6px;margin:3px 0}.esl label{font-size:10px;color:rgba(255,255,255,.45);min-width:14px;text-align:right}.esl input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,.12);outline:none}.esl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#FAC775;cursor:pointer}.esl .vl{font-size:10px;color:#fff;min-width:30px;text-align:left;font-weight:500}.wc{background:rgba(255,255,255,.03);border-radius:8px;padding:8px 10px;margin:4px 0}.wh{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}.wh span{font-size:11px;font-weight:500;color:rgba(255,255,255,.6)}.wt{width:34px;height:18px;border-radius:9px;border:none;cursor:pointer;position:relative;transition:background .2s;padding:0}.wt.on{background:#5DCAA5}.wt.off{background:rgba(255,255,255,.12)}.wt::after{content:'';position:absolute;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .2s}.wt.on::after{left:18px}.wt.off::after{left:2px}.sv{width:100%;padding:8px;border-radius:8px;border:1px solid rgba(93,202,165,.4);background:rgba(93,202,165,.15);color:#5DCAA5;font-size:11px;font-family:inherit;font-weight:600;cursor:pointer;margin-top:6px}.yb{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px;font-size:8px;font-family:monospace;color:rgba(255,255,255,.5);max-height:100px;overflow-y:auto;white-space:pre;word-break:break-all;margin-top:6px;user-select:all}.cb{width:100%;margin-top:4px;padding:6px;border-radius:6px;border:1px solid rgba(250,199,117,.3);background:rgba(250,199,117,.1);color:#FAC775;font-size:10px;font-family:inherit;font-weight:500;cursor:pointer}.einp{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:5px 8px;font-size:11px;color:#fff;font-family:inherit;width:100%;box-sizing:border-box;outline:none;margin:2px 0}.color-row{display:flex;gap:4px;flex-wrap:wrap;margin:4px 0}.color-swatch{width:22px;height:22px;border-radius:6px;border:2px solid transparent;cursor:pointer;transition:all .15s}.color-swatch:hover{transform:scale(1.15)}.color-swatch.sel{border-color:#fff;box-shadow:0 0 8px rgba(255,255,255,.3)}.overlap-info{background:rgba(250,199,117,.08);border:1px solid rgba(250,199,117,.15);border-radius:8px;padding:8px 10px;margin:6px 0}.overlap-room{display:flex;align-items:center;gap:6px;padding:4px 0;font-size:10px;color:rgba(255,255,255,.6)}.overlap-room .or-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}.overlap-room .or-name{flex:1}.zord-controls{display:flex;align-items:center;gap:4px;margin:6px 0}.zord-badge{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;border-radius:5px;background:rgba(175,169,236,.15);color:#AFA9EC;font-size:10px;font-weight:600;padding:0 4px}.lt-sel{display:flex;gap:3px;flex-wrap:wrap;margin:3px 0}.lt-btn{padding:3px 7px;border-radius:5px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(255,255,255,.4);font-size:9px;font-family:inherit;cursor:pointer}.lt-btn.sel{background:rgba(250,199,117,.15);border-color:rgba(250,199,117,.4);color:#FAC775}.light-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:8px;margin:4px 0}.light-card .lc-hdr{display:flex;align-items:center;gap:6px;margin-bottom:5px}.light-card .lc-dot{width:6px;height:6px;border-radius:50%}.light-card .lc-name{font-size:10px;color:rgba(255,255,255,.6);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.light-card .lc-type{font-size:9px;color:rgba(255,255,255,.3)}@media(max-width:500px){.panel{width:calc(100% - 16px);right:8px;left:8px;top:auto;bottom:44px;max-height:55%}.stats{bottom:40px;gap:3px}.pill{padding:3px 6px;font-size:9px}.bar button{padding:4px 8px;font-size:9px}.hud h2{font-size:12px}.lbl{font-size:9px}}</style><ha-card><div class="wrap" id="wrap"><div class="hud"><h2>${this._config?.title || "Floor plan"}</h2></div><div class="stats" id="stats"></div><div class="panel" id="panel"><button class="x-btn" id="xBtn">&times;</button><div class="panel-hdr"><h3 id="pTitle"></h3></div><div class="panel-body" id="pBody"></div></div><div class="bar" id="bar"><button class="active" data-v="default">3D</button><button data-v="top">Top</button><button data-v="front">Front</button><button data-v="walls">Muri</button><button data-v="edit" id="eb">\u270f\ufe0f Edit</button><button data-v="add-room" id="arb" class="ar" style="display:none">\ud83c\udfe0 + Stanza</button></div><div class="toast" id="toast"></div><div id="lbls"></div><canvas id="c"></canvas></div></ha-card>`;
    this.shadowRoot.getElementById("bar").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      const v = b.dataset.v;
      if (v === "edit") {
        this._editMode = !this._editMode;
        b.classList.toggle("ea", this._editMode);
        const arb = this.shadowRoot.getElementById("arb");
        if (arb) arb.style.display = this._editMode ? "" : "none";
        if (!this._editMode) {
          this._selectedEdit = null;
          this._closePanel();
        } else {
          this._closePanel();
          this._toast("Tap stanza, mobile o muro custom");
        }
        return;
      }
      if (v === "add-room") {
        this._openNewRoomPanel();
        return;
      }
      if (v === "walls") {
        this._wallsVisible = !this._wallsVisible;
        if (this._wallGroup) this._wallGroup.visible = this._wallsVisible;
        b.classList.toggle("active", this._wallsVisible);
        return;
      }
      this.shadowRoot
        .querySelectorAll(
          '.bar button:not([data-v="walls"]):not([data-v="edit"])',
        )
        .forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const mob = this._isMobile;
      if (v === "top") {
        this._phi = 0.16;
        this._theta = 0;
        this._radius = mob ? 16 : 14;
      } else if (v === "front") {
        this._phi = 1.25;
        this._theta = 0;
        this._radius = mob ? 16 : 14;
      } else {
        this._phi = 1.05;
        this._theta = 0.6;
        this._radius = mob ? 18 : 16;
      }
      this._updateCam();
    });
    this.shadowRoot
      .getElementById("xBtn")
      .addEventListener("click", () => this._closePanel());
  }
  async _loadThreeAndInit() {
    if (this._threeLoaded) return;
    if (typeof THREE === "undefined") {
      await new Promise((r, j) => {
        const s = document.createElement("script");
        s.src = THREE_CDN;
        s.onload = r;
        s.onerror = j;
        document.head.appendChild(s);
      });
    }
    if (typeof window.THREE.GLTFLoader === "undefined") {
      await new Promise((r, j) => {
        const s = document.createElement("script");
        s.src = GLTF_CDN;
        s.onload = r;
        s.onerror = j;
        document.head.appendChild(s);
      });
    }
    this._threeLoaded = true;
    this._checkMobile();
    this._initScene();
    this._initialized = true;
    this._updateAllVisuals();
    this._updateStats();
    this._updateAtmosphere();
    // Periodic refresh: sun elevation changes gradually; update every 60s as fallback
    this._atmosphereInterval = setInterval(() => this._updateAtmosphere(), 60000);
  }
  _rebuildScene() {
    if (this._animId) cancelAnimationFrame(this._animId);
    this._scene.traverse((o) => {
      if (o.geometry && !o.geometry._shared) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
        else o.material.dispose();
      }
    });
    while (this._scene.children.length > 0)
      this._scene.remove(this._scene.children[0]);
    this._roomMeshes = [];
    this._roomFloorMats = {};
    this._roomGlowMeshes = {};
    this._roomPointLights = {};
    this._furnMeshes = [];
    this._cwMeshes = [];
    this._lightFixtures = {};
    this._wallGroup = new THREE.Group();
    this._scene.add(this._wallGroup);
    this._buildSceneContent();
    this._updateAllVisuals();
    this._updateStats();
    this._animate();
  }
  _initScene() {
    const wrap = this.shadowRoot.getElementById("wrap"),
      cv = this.shadowRoot.getElementById("c"),
      W = wrap.clientWidth,
      H = this._cardHeight;
    this._scene = new THREE.Scene();
    this._scene.fog = new THREE.FogExp2(0x0a0a0f, 0.02);
    this._camera = new THREE.PerspectiveCamera(
      this._isMobile ? 55 : 45,
      W / H,
      0.1,
      100,
    );
    this._renderer = new THREE.WebGLRenderer({
      canvas: cv,
      antialias: true,
      powerPreference: "high-performance",
    });
    this._renderer.setSize(W, H);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this._renderer.setClearColor(0x0a0a0f);
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this._renderer.toneMappingExposure = 1.2;
    this._wallGroup = new THREE.Group();
    this._scene.add(this._wallGroup);
    this._buildSceneContent();
    this._orbitTarget = new THREE.Vector3(this._cx, 0, this._cz);
    this._radius = this._isMobile ? 18 : 16;
    this._setupControls(cv);
    this._updateCam();
    this._animate();
    new ResizeObserver(() => {
      const w2 = wrap.clientWidth;
      this._checkMobile();
      this._camera.fov = this._isMobile ? 55 : 45;
      this._camera.aspect = w2 / H;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(w2, H);
    }).observe(wrap);
  }
  _buildLightFixture(type, px, pz) {
    const G = GC(),
      group = new THREE.Group(),
      warmW = 0xffe8c0,
      WH = this._wallHeight;
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x444455,
      emissive: 0,
      emissiveIntensity: 0,
      roughness: 0.3,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const metalMat =
      this._smm ||
      (this._smm = new THREE.MeshStandardMaterial({
        color: 0x2a2a38,
        roughness: 0.6,
        metalness: 0.4,
      }));
    const coneMat = new THREE.MeshBasicMaterial({
      color: warmW,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    let coneMesh = null;
    if (type === "ceiling") {
      group.add(new THREE.Mesh(G.cB, metalMat));
      const d = new THREE.Mesh(G.cD, bulbMat);
      d.rotation.x = Math.PI;
      d.position.y = -0.02;
      group.add(d);
      const cG = new THREE.CylinderGeometry(0.05, 1.2, WH - 0.3, 12, 1, true);
      coneMesh = new THREE.Mesh(cG, coneMat);
      coneMesh.position.y = -(WH - 0.3) / 2;
      group.add(coneMesh);
      group.position.set(px, WH - 0.02, pz);
    } else if (type === "table") {
      const lb = new THREE.Mesh(G.tB, metalMat);
      lb.position.y = 0.01;
      group.add(lb);
      const st = new THREE.Mesh(G.tS, metalMat);
      st.position.y = 0.16;
      group.add(st);
      const sh = new THREE.Mesh(
        G.tSh,
        new THREE.MeshStandardMaterial({
          color: 0x554433,
          roughness: 0.8,
          transparent: true,
          opacity: 0.6,
          side: THREE.DoubleSide,
        }),
      );
      sh.position.y = 0.35;
      group.add(sh);
      const bl = new THREE.Mesh(G.tBl, bulbMat);
      bl.position.y = 0.32;
      group.add(bl);
      const cG = new THREE.CylinderGeometry(0.03, 0.35, 0.5, 10, 1, true);
      coneMesh = new THREE.Mesh(cG, coneMat.clone());
      coneMesh.position.y = 0.02;
      group.add(coneMesh);
      group.position.set(px, 0.4, pz);
    } else if (type === "pendant") {
      const w = new THREE.Mesh(G.pW, metalMat);
      w.position.y = 0.3;
      group.add(w);
      const cn = new THREE.Mesh(G.pC, metalMat);
      cn.position.y = 0.6;
      group.add(cn);
      group.add(new THREE.Mesh(G.pG, bulbMat));
      const cG = new THREE.CylinderGeometry(0.04, 1, WH - 0.9, 12, 1, true);
      coneMesh = new THREE.Mesh(cG, coneMat.clone());
      coneMesh.position.y = -(WH - 0.9) / 2;
      group.add(coneMesh);
      group.position.set(px, WH - 0.02, pz);
    } else if (type === "led_strip") {
      group.add(new THREE.Mesh(G.lS, bulbMat));
      const gp = new THREE.Mesh(G.lG, coneMat.clone());
      gp.position.set(0, -0.15, -0.01);
      group.add(gp);
      coneMesh = gp;
      group.position.set(px, WH - 0.15, pz);
    }
    const pl = new THREE.PointLight(warmW, 0, type === "led_strip" ? 3 : 5);
    pl.castShadow = false;
    if (type === "ceiling") pl.position.set(px, WH - 0.15, pz);
    else if (type === "table") pl.position.set(px, 0.75, pz);
    else if (type === "pendant") pl.position.set(px, WH - 0.65, pz);
    else pl.position.set(px, WH - 0.2, pz);
    let sl = null;
    if (type === "ceiling" || type === "pendant") {
      const slY = type === "ceiling" ? WH - 0.1 : WH - 0.65;
      sl = new THREE.SpotLight(warmW, 0, WH, Math.PI / 4, 0.5, 1.5);
      sl.position.set(px, slY, pz);
      sl.target.position.set(px, 0, pz);
      sl.castShadow = false;
      this._scene.add(sl);
      this._scene.add(sl.target);
    }
    const gcG = type === "table" ? G.gS : type === "led_strip" ? G.gM : G.gL;
    const gc = new THREE.Mesh(
      gcG,
      new THREE.MeshBasicMaterial({
        color: warmW,
        transparent: true,
        opacity: 0,
        depthWrite: false,
      }),
    );
    gc.rotation.x = -Math.PI / 2;
    gc.position.set(px, 0.005, pz);
    this._scene.add(gc);
    this._scene.add(group);
    this._scene.add(pl);
    return {
      group,
      bulbMat,
      coneMesh,
      pointLight: pl,
      spotLight: sl,
      glowCircle: gc,
      type,
      _isOn: false,
      _coneBaseOpacity: 0,
      _glowBaseOpacity: 0,
      _bulbBaseIntensity: 0,
    };
  }
  _buildSceneContent() {
    const WH = this._wallHeight,
      G = GC();
    this._ambientLight = new window.THREE.AmbientLight(0x303050, 0.25);
    this._scene.add(this._ambientLight);
    this._hemiLight = new window.THREE.HemisphereLight(0x4466aa, 0x111122, 0.15);
    this._scene.add(this._hemiLight);
    const dir = new window.THREE.DirectionalLight(0xfff4e6, 0.35);
    this._dirLight = dir;
    dir.position.set(10, 18, 12);
    dir.castShadow = true;
    dir.shadow.mapSize.set(512, 512);
    dir.shadow.camera.left = -15;
    dir.shadow.camera.right = 15;
    dir.shadow.camera.top = 15;
    dir.shadow.camera.bottom = -15;
    dir.shadow.bias = -0.001;
    this._scene.add(dir);
    const gnd = new window.THREE.Mesh(
      G.gP,
      new THREE.MeshStandardMaterial({ color: 0x0c0c14, roughness: 1 }),
    );
    gnd.rotation.x = -Math.PI / 2;
    gnd.position.y = -0.02;
    gnd.receiveShadow = true;
    this._scene.add(gnd);
    let mnX = Infinity,
      mxX = -Infinity,
      mnZ = Infinity,
      mxZ = -Infinity;
    this._rooms.forEach((r) => {
      const p = r.position;
      mnX = Math.min(mnX, p.x);
      mxX = Math.max(mxX, p.x + p.w);
      mnZ = Math.min(mnZ, p.z);
      mxZ = Math.max(mxZ, p.z + p.d);
    });
    if (!this._rooms.length) {
      mnX = 0;
      mxX = 10;
      mnZ = 0;
      mxZ = 5.5;
    }
    this._cx = (mnX + mxX) / 2;
    this._cz = (mnZ + mxZ) / 2;
    if (this._orbitTarget) {
      this._orbitTarget.x = this._cx;
      this._orbitTarget.z = this._cz;
    }
    const wM = new THREE.MeshStandardMaterial({
      color: 0x2a2a3e,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const sorted = [...this._rooms].sort(
      (a, b) => (a.z_order || 0) - (b.z_order || 0),
    );
    sorted.forEach((room, ri) => {
      const p = room.position,
        col = new THREE.Color(room.color),
        walls = room.walls || {},
        yOff = ri * 0.001;
      const fMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: new THREE.Color(0),
        emissiveIntensity: 0,
        roughness: 0.6,
        metalness: 0.08,
        transparent: true,
        opacity: 0.75,
      });
      this._roomFloorMats[room.id] = fMat;
      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(p.w - 0.06, 0.06, p.d - 0.06),
        fMat,
      );
      floor.position.set(p.x + p.w / 2, 0.03 + yOff, p.z + p.d / 2);
      floor.receiveShadow = true;
      floor.userData = { roomId: room.id, isRoom: true };
      floor.renderOrder = ri;
      this._scene.add(floor);
      this._roomMeshes.push(floor);
      const gMat = new THREE.MeshBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0,
      });
      const glow = new THREE.Mesh(
        new THREE.PlaneGeometry(p.w + 0.4, p.d + 0.4),
        gMat,
      );
      glow.rotation.x = -Math.PI / 2;
      glow.position.set(p.x + p.w / 2, 0.002 + yOff, p.z + p.d / 2);
      glow.renderOrder = ri;
      this._scene.add(glow);
      this._roomGlowMeshes[room.id] = glow;
      const rpl = new THREE.PointLight(col.getHex(), 0, 6);
      rpl.position.set(p.x + p.w / 2, WH - 0.4, p.z + p.d / 2);
      rpl.castShadow = false;
      this._scene.add(rpl);
      this._roomPointLights[room.id] = rpl;
      const eMat = new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.5,
      });
      this._scene.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(p.x + 0.02, 0.07 + yOff, p.z + 0.02),
            new THREE.Vector3(p.x + p.w - 0.02, 0.07 + yOff, p.z + 0.02),
            new THREE.Vector3(p.x + p.w - 0.02, 0.07 + yOff, p.z + p.d - 0.02),
            new THREE.Vector3(p.x + 0.02, 0.07 + yOff, p.z + p.d - 0.02),
            new THREE.Vector3(p.x + 0.02, 0.07 + yOff, p.z + 0.02),
          ]),
          eMat,
        ),
      );
      [
        {
          d: "north",
          px: p.x + p.w / 2,
          pz: p.z,
          sx: p.w,
          sz: walls.north?.thickness || 0.08,
        },
        {
          d: "south",
          px: p.x + p.w / 2,
          pz: p.z + p.d,
          sx: p.w,
          sz: walls.south?.thickness || 0.08,
        },
        {
          d: "west",
          px: p.x,
          pz: p.z + p.d / 2,
          sx: walls.west?.thickness || 0.08,
          sz: p.d,
        },
        {
          d: "east",
          px: p.x + p.w,
          pz: p.z + p.d / 2,
          sx: walls.east?.thickness || 0.08,
          sz: p.d,
        },
      ].forEach((wd) => {
        const wc = walls[wd.d] || {
          enabled: true,
          height: WH,
          thickness: 0.08,
        };
        if (!wc.enabled) return;
        const wh = wc.height || WH;
        const w = new THREE.Mesh(G.uB, wM);
        w.scale.set(wd.sx, wh, wd.sz);
        w.position.set(wd.px, wh / 2, wd.pz);
        w.receiveShadow = true;
        this._wallGroup.add(w);
      });
      const tMat = new THREE.LineBasicMaterial({
        color: col,
        transparent: true,
        opacity: 0.2,
      });
      this._wallGroup.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(p.x, WH, p.z),
            new THREE.Vector3(p.x + p.w, WH, p.z),
            new THREE.Vector3(p.x + p.w, WH, p.z + p.d),
            new THREE.Vector3(p.x, WH, p.z + p.d),
            new THREE.Vector3(p.x, WH, p.z),
          ]),
          tMat,
        ),
      );
      (room.entities.lights || []).forEach((lt, li) => {
        const eid = lt.entity,
          ltype = lt.type || "ceiling";
        const cols = Math.ceil(Math.sqrt(room.entities.lights.length)),
          rows = Math.ceil(room.entities.lights.length / cols);
        const ci = li % cols,
          rr = Math.floor(li / cols);
        let lx = p.x + (p.w * (ci + 1)) / (cols + 1),
          lz = p.z + (p.d * (rr + 1)) / (rows + 1);
        if (lt.offset_x != null) lx += lt.offset_x;
        if (lt.offset_z != null) lz += lt.offset_z;
        this._lightFixtures[eid] = this._buildLightFixture(ltype, lx, lz);
      });
    });
    if (this._rooms.length > 0) {
      const oMat = new THREE.MeshStandardMaterial({
        color: 0x3a3a50,
        transparent: true,
        opacity: 0.45,
        roughness: 0.8,
      });
      const tw = mxX - mnX,
        td = mxZ - mnZ;
      [
        [this._cx, mnZ, tw, 0.14],
        [this._cx, mxZ, tw, 0.14],
        [mnX, this._cz, 0.14, td],
        [mxX, this._cz, 0.14, td],
      ].forEach(([px, pz, sx, sz]) => {
        const w = new THREE.Mesh(G.uB, oMat);
        w.scale.set(sx, WH + 0.3, sz);
        w.position.set(px, (WH + 0.3) / 2, pz);
        w.receiveShadow = true;
        this._wallGroup.add(w);
      });
    }
    const cwMat = new THREE.MeshStandardMaterial({
      color: 0x4a4a5e,
      transparent: true,
      opacity: 0.4,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
    this._cwalls.forEach((cw, idx) => {
      const wh = cw.height || WH;
      const m = new THREE.Mesh(G.uB, cwMat);
      m.scale.set(cw.w || 2, wh, cw.thickness || 0.1);
      m.position.set(cw.x || 0, wh / 2, cw.z || 0);
      if (cw.rotation) m.rotation.y = (cw.rotation * Math.PI) / 180;
      m.receiveShadow = true;
      m.userData = { isCustomWall: true, cwIdx: idx };
      this._wallGroup.add(m);
      this._cwMeshes.push(m);
    });
    this._furniture.forEach((f, idx) => {
      const cat = FURN_CAT[f.type];
      if (!cat) return;
      const fw = f.w || cat.w,
        fh = f.h || cat.h,
        fd = f.d || cat.d;
      const fc = f.color ? new window.THREE.Color(f.color).getHex() : cat.color;
      
      const buildFallback = () => {
        const mo = { color: fc, roughness: 0.9 };
        if (cat.emissive) {
          mo.emissive = cat.emissive;
          mo.emissiveIntensity = 0.1;
        }
        const mesh = new window.THREE.Mesh(G.uB, new window.THREE.MeshStandardMaterial(mo));
        mesh.scale.set(fw, fh, fd);
        mesh.position.set(f.x, fh / 2, f.z);
        if (f.rotation) mesh.rotation.y = (f.rotation * Math.PI) / 180;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { isFurniture: true, furnIdx: idx };
        this._scene.add(mesh);
        this._furnMeshes.push(mesh);
      };

      if (f.url && typeof window.THREE.GLTFLoader !== "undefined") {
        const loader = new window.THREE.GLTFLoader();
        loader.load(f.url, (gltf) => {
          const model = gltf.scene;
          const box = new window.THREE.Box3().setFromObject(model);
          const size = new window.THREE.Vector3();
          box.getSize(size);
          const scale = Math.min(fw / size.x, Math.min(fh / size.y, fd / size.z));
          model.scale.setScalar(scale);
          const center = new window.THREE.Vector3();
          box.getCenter(center);
          model.position.sub(center.multiplyScalar(scale));
          model.position.y += fh / 2;
          
          const group = new window.THREE.Group();
          group.add(model);
          group.position.set(f.x, 0, f.z);
          if (f.rotation) group.rotation.y = (f.rotation * Math.PI) / 180;
          group.userData = { isFurniture: true, furnIdx: idx };
          model.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
          this._scene.add(group);
          this._furnMeshes.push(group);
        }, undefined, () => buildFallback());
      } else {
        buildFallback();
      }
    });
  }
  _setupControls(cv) {
    const rc = new THREE.Raycaster(),
      m = new THREE.Vector2();
    cv.addEventListener("pointerdown", (e) => {
      this._isDragging = true;
      this._prevMouse = this._clickStart = { x: e.clientX, y: e.clientY };
      this.shadowRoot.getElementById("wrap").classList.add("dragging");
    });
    cv.addEventListener("pointermove", (e) => {
      if (!this._isDragging) return;
      this._theta -= (e.clientX - this._prevMouse.x) * 0.004;
      this._phi = Math.max(
        0.15,
        Math.min(1.5, this._phi + (e.clientY - this._prevMouse.y) * 0.004),
      );
      this._prevMouse = { x: e.clientX, y: e.clientY };
      this._updateCam();
      this._labelsDirty = true;
    });
    cv.addEventListener("pointerup", () => {
      this._isDragging = false;
      this.shadowRoot.getElementById("wrap").classList.remove("dragging");
    });
    cv.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        this._radius = Math.max(
          5,
          Math.min(30, this._radius + e.deltaY * 0.008),
        );
        this._updateCam();
        this._labelsDirty = true;
      },
      { passive: false },
    );
    let lp = 0;
    cv.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX,
            dy = e.touches[0].clientY - e.touches[1].clientY;
          lp = Math.sqrt(dx * dx + dy * dy);
        }
      },
      { passive: true },
    );
    cv.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX,
            dy = e.touches[0].clientY - e.touches[1].clientY,
            d = Math.sqrt(dx * dx + dy * dy);
          this._radius = Math.max(
            5,
            Math.min(30, this._radius + (lp - d) * 0.04),
          );
          lp = d;
          this._updateCam();
          this._labelsDirty = true;
        }
      },
      { passive: true },
    );
    cv.addEventListener("click", (e) => {
      if (
        Math.abs(e.clientX - this._clickStart.x) > 8 ||
        Math.abs(e.clientY - this._clickStart.y) > 8
      )
        return;
      const rect = cv.getBoundingClientRect();
      m.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      m.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      rc.setFromCamera(m, this._camera);
      if (this._editMode) {
        const hits = rc.intersectObjects([
          ...this._roomMeshes,
          ...this._furnMeshes,
          ...this._cwMeshes,
        ]);
        if (hits.length > 0) {
          const o = hits[0].object;
          if (o.userData.isRoom) this._openEditRoom(o.userData.roomId);
          else if (o.userData.isFurniture)
            this._openEditFurniture(o.userData.furnIdx);
          else if (o.userData.isCustomWall) this._openEditCW(o.userData.cwIdx);
        } else this._closePanel();
      } else {
        const hits = rc.intersectObjects(this._roomMeshes);
        if (hits.length > 0) this._openPanel(hits[0].object.userData.roomId);
        else this._closePanel();
      }
    });
  }
  _updateCam() {
    if (!this._camera || !this._orbitTarget) return;
    const t = this._orbitTarget;
    this._camera.position.set(
      t.x + this._radius * Math.sin(this._phi) * Math.cos(this._theta),
      t.y + this._radius * Math.cos(this._phi),
      t.z + this._radius * Math.sin(this._phi) * Math.sin(this._theta),
    );
    this._camera.lookAt(t);
  }
  _animate() {
    this._animId = requestAnimationFrame(() => this._animate());
    const t = performance.now() * 0.001;
    for (const eid in this._lightFixtures) {
      const f = this._lightFixtures[eid];
      if (!f._isOn) continue;
      const pulse = 0.85 + Math.sin(t * 2 + eid.length) * 0.15;
      if (f.coneMesh) f.coneMesh.material.opacity = f._coneBaseOpacity * pulse;
      if (f.glowCircle)
        f.glowCircle.material.opacity = f._glowBaseOpacity * pulse;
      if (f.bulbMat) f.bulbMat.emissiveIntensity = f._bulbBaseIntensity * pulse;
    }
    const now = performance.now();
    if (this._labelsDirty || now - this._lastLabelUpdate > 100) {
      this._updateLabels();
      this._lastLabelUpdate = now;
      this._labelsDirty = false;
    }
    this._renderer.render(this._scene, this._camera);
  }
  _updateLabels() {
    const c = this.shadowRoot.getElementById("lbls"),
      cv = this.shadowRoot.getElementById("c");
    if (!c || !cv || !this._camera) return;
    const rect = cv.getBoundingClientRect();
    let h = "";
    this._rooms.forEach((room) => {
      const p = room.position,
        pos = new THREE.Vector3(
          p.x + p.w / 2,
          this._wallHeight + 0.4,
          p.z + p.d / 2,
        ),
        pr = pos.clone().project(this._camera);
      if (pr.z > 1) return;
      const x = (pr.x * 0.5 + 0.5) * rect.width,
        y = (-pr.y * 0.5 + 0.5) * rect.height,
        lit = this._getRoomLitCount(room.id);
      h += `<div class="lbl" style="left:${x}px;top:${y}px;color:${room.color}">${room.name}${lit > 0 ? " \u00b7 " + lit + "\ud83d\udca1" : ""}</div>`;
    });
    c.innerHTML = h;
  }
  _getOverlappingRooms(rid) {
    const room = this._rooms.find((r) => r.id === rid);
    if (!room) return [];
    const p = room.position,
      ov = [];
    this._rooms.forEach((r) => {
      if (r.id === rid) return;
      const rp = r.position;
      if (
        p.x < rp.x + rp.w &&
        p.x + p.w > rp.x &&
        p.z < rp.z + rp.d &&
        p.z + p.d > rp.z
      )
        ov.push(r);
    });
    return ov;
  }
  _moveZOrder(rid, dir) {
    const room = this._rooms.find((r) => r.id === rid);
    if (!room) return;
    const ov = this._getOverlappingRooms(rid);
    if (!ov.length) return;
    const all = [room, ...ov].sort(
      (a, b) => (a.z_order || 0) - (b.z_order || 0),
    );
    const ci = all.findIndex((r) => r.id === rid);
    if (dir === "up" && ci < all.length - 1) {
      const sw = all[ci + 1];
      const tmp = room.z_order;
      room.z_order = sw.z_order;
      sw.z_order = tmp;
      if (room.z_order === sw.z_order) room.z_order++;
    } else if (dir === "down" && ci > 0) {
      const sw = all[ci - 1];
      const tmp = room.z_order;
      room.z_order = sw.z_order;
      sw.z_order = tmp;
      if (room.z_order === sw.z_order) room.z_order--;
    }
    this._rebuildScene();
  }
  _sl(lb, pr, vl, mn, mx, st, tgt, ex = "") {
    return `<div class="esl"><label>${lb}</label><input type="range" min="${mn}" max="${mx}" step="${st}" value="${vl}" data-prop="${pr}" data-target="${tgt}" ${ex}><span class="vl">${st < 0.05 ? Number(vl).toFixed(2) : pr === "rotation" ? Number(vl).toFixed(0) : Number(vl).toFixed(1)}</span></div>`;
  }
  _openEditRoom(rid) {
    const room = this._rooms.find((r) => r.id === rid);
    if (!room) return;
    this._selectedRoomId = rid;
    this._selectedEdit = { type: "room", id: rid };
    this.shadowRoot.getElementById("pTitle").textContent =
      "\u270f\ufe0f " + room.name;
    const body = this.shadowRoot.getElementById("pBody");
    const p = room.position;
    let h = '<div class="sec">Nome stanza</div>';
    h += `<input class="einp" type="text" value="${room.name}" data-act="rename-room" data-rid="${rid}" placeholder="Nome stanza"/>`;
    h += `<div style="font-size:9px;color:rgba(255,255,255,.2);margin:2px 0">ID: ${room.id}</div>`;
    h += '<div class="sec">Colore</div><div class="color-row">';
    ROOM_COLORS.forEach((c, i) => {
      h += `<div class="color-swatch${c === room.color ? " sel" : ""}" style="background:${c}" data-act="set-color" data-ci="${i}" data-rid="${rid}"></div>`;
    });
    h += "</div>";
    const ov = this._getOverlappingRooms(rid);
    if (ov.length > 0) {
      h +=
        '<div class="overlap-info"><div class="oi-title">\u26a0\ufe0f Sovrapposizioni</div>';
      ov.forEach((or) => {
        h += `<div class="overlap-room"><div class="or-dot" style="background:${or.color}"></div><span class="or-name">${or.name}</span><span class="zord-badge">z:${or.z_order || 0}</span></div>`;
      });
      h += `<div style="margin-top:6px;font-size:10px;color:rgba(255,255,255,.4)">Ordine stanza:</div><div class="zord-controls"><button class="abtn zord" data-act="zord-down" data-rid="${rid}">\u2193 Sotto</button><span class="zord-badge">z:${room.z_order || 0}</span><button class="abtn zord" data-act="zord-up" data-rid="${rid}">\u2191 Sopra</button></div></div>`;
    }
    h += '<div class="sec">Luci (tipo modello 3D)</div>';
    const lights = room.entities.lights || [];
    if (lights.length) {
      lights.forEach((lt, li) => {
        h += `<div class="light-card"><div class="lc-hdr"><div class="lc-dot" style="background:${room.color}"></div><span class="lc-name">${lt.entity}</span><span class="lc-type">${LIGHT_TYPES[lt.type] || lt.type}</span></div><div class="lt-sel">`;
        Object.keys(LIGHT_TYPES).forEach((t) => {
          h += `<button class="lt-btn${lt.type === t ? " sel" : ""}" data-lt-entity="${li}" data-lt-type="${t}" data-lt-rid="${rid}">${LIGHT_TYPES[t]}</button>`;
        });
        h += "</div></div>";
      });
    } else
      h +=
        '<div style="font-size:10px;color:rgba(255,255,255,.25);padding:4px 0">Nessuna luce</div>';
    h += '<div class="sec">Posizione e dimensioni</div>';
    h +=
      this._sl("X", "x", p.x, 0, 15, 0.1, "room", `data-rid="${rid}"`) +
      this._sl("Z", "z", p.z, 0, 15, 0.1, "room", `data-rid="${rid}"`) +
      this._sl("W", "w", p.w, 0.5, 10, 0.1, "room", `data-rid="${rid}"`) +
      this._sl("D", "d", p.d, 0.5, 10, 0.1, "room", `data-rid="${rid}"`);
    h += '<div class="sec">Muri</div>';
    ["north", "south", "east", "west"].forEach((dir) => {
      const wc = room.walls[dir] || {
        enabled: true,
        height: this._wallHeight,
        thickness: 0.08,
      };
      h += `<div class="wc"><div class="wh"><span>${WL[dir]}</span><button class="wt ${wc.enabled ? "on" : "off"}" data-wa="wt" data-wd="${dir}" data-wr="${rid}"></button></div>${wc.enabled ? this._sl("H", "height", wc.height, 0.3, 3, 0.1, "wall", `data-wd="${dir}" data-rid="${rid}"`) + this._sl("T", "thickness", wc.thickness, 0.02, 0.3, 0.01, "wall", `data-wd="${dir}" data-rid="${rid}"`) : ""}</div>`;
    });
    h +=
      '<div class="sec">Aggiungi</div><div style="display:flex;gap:4px;flex-wrap:wrap;">';
    h += '<button class="abtn add" data-act="add-cw">+ Muro</button>';
    Object.keys(FURN_CAT).forEach((t) => {
      h += `<button class="abtn add" data-act="add-furn" data-ft="${t}" style="font-size:9px;">${t}</button>`;
    });
    h += "</div>";
    h += `<div class="sec">Zona pericolosa</div><button class="abtn del" data-act="del-room" data-rid="${rid}" style="width:100%;justify-content:center;padding:6px">\ud83d\uddd1\ufe0f Elimina "${room.name}"</button>`;
    h += this._yb();
    body.innerHTML = h;
    this.shadowRoot.getElementById("panel").style.display = "block";
    this._wireEdit(body);
  }
  _openNewRoomPanel() {
    this._selectedEdit = { type: "new-room" };
    this.shadowRoot.getElementById("pTitle").textContent =
      "\ud83c\udfe0 Nuova stanza";
    const body = this.shadowRoot.getElementById("pBody");
    const ci = this._rooms.length % ROOM_COLORS.length;
    let h =
      '<div class="sec">Nome</div><input class="einp" type="text" id="newRoomName" placeholder="es. Cameretta" value=""/><div class="sec">ID (opzionale)</div><input class="einp" type="text" id="newRoomId" placeholder="auto-generato"/><div class="sec">Colore</div><div class="color-row" id="newRoomColors">';
    ROOM_COLORS.forEach((c, i) => {
      h += `<div class="color-swatch${i === ci ? " sel" : ""}" style="background:${c}" data-nci="${i}"></div>`;
    });
    h += '</div><div class="sec">Dimensioni iniziali</div>';
    h +=
      this._sl("W", "nw", 3, 0.5, 10, 0.1, "none") +
      this._sl("D", "nd", 3, 0.5, 10, 0.1, "none");
    h +=
      '<button class="sv" data-act="create-room">\ud83c\udfe0 Crea stanza</button>';
    body.innerHTML = h;
    this.shadowRoot.getElementById("panel").style.display = "block";
    body.querySelectorAll("[data-nci]").forEach((sw) => {
      sw.addEventListener("click", () => {
        body
          .querySelectorAll("[data-nci]")
          .forEach((s) => s.classList.remove("sel"));
        sw.classList.add("sel");
      });
    });
    body.querySelectorAll("input[type=range]").forEach((sl) => {
      sl.addEventListener("input", () => {
        const st = parseFloat(sl.step);
        sl.nextElementSibling.textContent =
          st < 0.05
            ? parseFloat(sl.value).toFixed(2)
            : parseFloat(sl.value).toFixed(1);
      });
    });
    body
      .querySelector('[data-act="create-room"]')
      .addEventListener("click", () => {
        const name =
          body.querySelector("#newRoomName").value.trim() ||
          "Stanza " + (this._rooms.length + 1);
        let id = body
          .querySelector("#newRoomId")
          .value.trim()
          .toLowerCase()
          .replace(/[^a-z0-9_]/g, "");
        if (!id)
          id =
            name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "_")
              .replace(/^_|_$/g, "") || "room_" + this._roomIdCounter;
        while (this._rooms.find((r) => r.id === id))
          id += "_" + ++this._roomIdCounter;
        const selSw = body.querySelector("[data-nci].sel");
        const cci = selSw ? parseInt(selSw.dataset.nci) : 0;
        const nw =
          parseFloat(body.querySelector('[data-prop="nw"]').value) || 3;
        const nd =
          parseFloat(body.querySelector('[data-prop="nd"]').value) || 3;
        const mxZ = this._rooms.reduce(
          (mx, r) => Math.max(mx, r.z_order || 0),
          0,
        );
        this._rooms.push({
          id,
          name,
          position: {
            x: this._cx - nw / 2,
            z: this._cz - nd / 2,
            w: nw,
            d: nd,
          },
          color: ROOM_COLORS[cci],
          emissive: ROOM_EMISSIVES[cci],
          z_order: mxZ + 1,
          walls: {
            north: { enabled: true, height: this._wallHeight, thickness: 0.08 },
            south: { enabled: true, height: this._wallHeight, thickness: 0.08 },
            east: { enabled: true, height: this._wallHeight, thickness: 0.08 },
            west: { enabled: true, height: this._wallHeight, thickness: 0.08 },
          },
          entities: {
            lights: [],
            sensors: [],
            climate: [],
            covers: [],
            media: [],
            vacuums: [],
            doors: [],
          },
        });
        this._roomIdCounter++;
        this._rebuildScene();
        this._openEditRoom(id);
        this._toast("Stanza creata!");
      });
  }
  _openEditFurniture(idx) {
    const f = this._furniture[idx];
    if (!f) return;
    const cat = FURN_CAT[f.type] || { w: 1, h: 1, d: 1 };
    this._selectedEdit = { type: "furn", idx };
    this.shadowRoot.getElementById("pTitle").textContent =
      "\u270f\ufe0f " + f.type;
    const body = this.shadowRoot.getElementById("pBody");
    let h =
      '<div class="sec">Posizione</div>' +
      this._sl("X", "x", f.x, 0, 15, 0.1, "furn", `data-fi="${idx}"`) +
      this._sl("Z", "z", f.z, 0, 15, 0.1, "furn", `data-fi="${idx}"`);
    h +=
      '<div class="sec">Modello 3D (.glb)</div>' +
      `<input class="einp" type="text" placeholder="es. /local/mio_modello.glb" value="${f.url || ""}" data-prop="url" data-target="furn" data-fi="${idx}" />` +
      '<div class="sec">Dimensioni (Inviluppo)</div>' +
      this._sl(
        "W",
        "w",
        f.w || cat.w,
        0.1,
        5,
        0.1,
        "furn",
        `data-fi="${idx}"`,
      ) +
      this._sl(
        "H",
        "h",
        f.h || cat.h,
        0.05,
        3,
        0.05,
        "furn",
        `data-fi="${idx}"`,
      ) +
      this._sl("D", "d", f.d || cat.d, 0.1, 5, 0.1, "furn", `data-fi="${idx}"`);
    h +=
      '<div class="sec">Rotazione</div>' +
      this._sl(
        "\u00b0",
        "rotation",
        f.rotation || 0,
        0,
        360,
        5,
        "furn",
        `data-fi="${idx}"`,
      );
    h += `<div class="sec">Azioni</div><button class="abtn del" data-act="del-furn" data-fi="${idx}">\ud83d\uddd1\ufe0f Elimina</button>`;
    h += this._yb();
    body.innerHTML = h;
    this.shadowRoot.getElementById("panel").style.display = "block";
    this._wireEdit(body);
  }
  _openEditCW(idx) {
    const cw = this._cwalls[idx];
    if (!cw) return;
    this._selectedEdit = { type: "cw", idx };
    this.shadowRoot.getElementById("pTitle").textContent =
      "\u270f\ufe0f Muro #" + (idx + 1);
    const body = this.shadowRoot.getElementById("pBody");
    let h =
      '<div class="sec">Posizione</div>' +
      this._sl("X", "x", cw.x || 0, 0, 15, 0.1, "cw", `data-ci="${idx}"`) +
      this._sl("Z", "z", cw.z || 0, 0, 15, 0.1, "cw", `data-ci="${idx}"`);
    h +=
      '<div class="sec">Dimensioni</div>' +
      this._sl("W", "w", cw.w || 2, 0.1, 10, 0.1, "cw", `data-ci="${idx}"`) +
      this._sl(
        "H",
        "height",
        cw.height || this._wallHeight,
        0.3,
        3,
        0.1,
        "cw",
        `data-ci="${idx}"`,
      ) +
      this._sl(
        "T",
        "thickness",
        cw.thickness || 0.1,
        0.02,
        0.3,
        0.01,
        "cw",
        `data-ci="${idx}"`,
      );
    h +=
      '<div class="sec">Rotazione</div>' +
      this._sl(
        "\u00b0",
        "rotation",
        cw.rotation || 0,
        0,
        360,
        5,
        "cw",
        `data-ci="${idx}"`,
      );
    h += `<div class="sec">Azioni</div><button class="abtn del" data-act="del-cw" data-ci="${idx}">\ud83d\uddd1\ufe0f Elimina muro</button>`;
    h += this._yb();
    body.innerHTML = h;
    this.shadowRoot.getElementById("panel").style.display = "block";
    this._wireEdit(body);
  }
  _wireEdit(body) {
    body.querySelectorAll("input.einp[data-target]").forEach((inp) => {
      inp.addEventListener("change", () => {
        const tg = inp.dataset.target;
        if (tg === "furn") {
          const f = this._furniture[parseInt(inp.dataset.fi)];
          if (f) f[inp.dataset.prop] = inp.value.trim();
        }
        this._rebuildScene();
        const yb = this.shadowRoot.querySelector(".yb");
        if (yb) yb.textContent = this._generateYAML();
      });
    });
    body.querySelectorAll("input[type=range]").forEach((sl) => {
      sl.addEventListener("input", () => {
        const v = parseFloat(sl.value),
          st = parseFloat(sl.step);
        sl.nextElementSibling.textContent =
          st < 0.05
            ? v.toFixed(2)
            : sl.dataset.prop === "rotation"
              ? v.toFixed(0)
              : v.toFixed(1);
        const tg = sl.dataset.target;
        if (tg === "room") {
          const r = this._rooms.find((r) => r.id === sl.dataset.rid);
          if (r) r.position[sl.dataset.prop] = v;
        } else if (tg === "wall") {
          const r = this._rooms.find((r) => r.id === sl.dataset.rid);
          if (r && r.walls[sl.dataset.wd])
            r.walls[sl.dataset.wd][sl.dataset.prop] = v;
        } else if (tg === "furn") {
          const f = this._furniture[parseInt(sl.dataset.fi)];
          if (f) f[sl.dataset.prop] = v;
        } else if (tg === "cw") {
          const cw = this._cwalls[parseInt(sl.dataset.ci)];
          if (cw) cw[sl.dataset.prop] = v;
        }
        this._rebuildScene();
        const yb = this.shadowRoot.querySelector(".yb");
        if (yb) yb.textContent = this._generateYAML();
      });
    });
    body.querySelectorAll('[data-wa="wt"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        const r = this._rooms.find((r) => r.id === btn.dataset.wr);
        if (r && r.walls[btn.dataset.wd]) {
          r.walls[btn.dataset.wd].enabled = !r.walls[btn.dataset.wd].enabled;
          this._rebuildScene();
          this._openEditRoom(btn.dataset.wr);
        }
      });
    });
    body.querySelectorAll('[data-act="rename-room"]').forEach((inp) => {
      inp.addEventListener("change", () => {
        const r = this._rooms.find((r) => r.id === inp.dataset.rid);
        if (r) {
          r.name = inp.value.trim() || r.name;
          this._rebuildScene();
          this._toast("Rinominata: " + r.name);
        }
      });
    });
    body.querySelectorAll('[data-act="set-color"]').forEach((sw) => {
      sw.addEventListener("click", () => {
        const r = this._rooms.find((r) => r.id === sw.dataset.rid);
        const ci = parseInt(sw.dataset.ci);
        if (r) {
          r.color = ROOM_COLORS[ci];
          r.emissive = ROOM_EMISSIVES[ci];
          body
            .querySelectorAll('[data-act="set-color"]')
            .forEach((s) => s.classList.remove("sel"));
          sw.classList.add("sel");
          this._rebuildScene();
          const yb = this.shadowRoot.querySelector(".yb");
          if (yb) yb.textContent = this._generateYAML();
        }
      });
    });
    body.querySelectorAll('[data-act="zord-up"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        this._moveZOrder(btn.dataset.rid, "up");
        this._openEditRoom(btn.dataset.rid);
      });
    });
    body.querySelectorAll('[data-act="zord-down"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        this._moveZOrder(btn.dataset.rid, "down");
        this._openEditRoom(btn.dataset.rid);
      });
    });
    body.querySelectorAll(".lt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const rid = btn.dataset.ltRid,
          li = parseInt(btn.dataset.ltEntity),
          lt = btn.dataset.ltType;
        const r = this._rooms.find((r) => r.id === rid);
        if (r && r.entities.lights[li]) {
          r.entities.lights[li].type = lt;
          const card = btn.closest(".light-card");
          if (card) {
            card
              .querySelectorAll(".lt-btn")
              .forEach((b) => b.classList.remove("sel"));
            btn.classList.add("sel");
            card.querySelector(".lc-type").textContent = LIGHT_TYPES[lt];
          }
          this._rebuildScene();
          const yb = this.shadowRoot.querySelector(".yb");
          if (yb) yb.textContent = this._generateYAML();
          this._toast(LIGHT_TYPES[lt]);
        }
      });
    });
    body.querySelectorAll("[data-act]").forEach((btn) => {
      const act = btn.dataset.act;
      if (
        [
          "rename-room",
          "set-color",
          "zord-up",
          "zord-down",
          "create-room",
        ].includes(act)
      )
        return;
      btn.addEventListener("click", () => {
        if (act === "del-furn") {
          this._furniture.splice(parseInt(btn.dataset.fi), 1);
          this._rebuildScene();
          this._closePanel();
          this._toast("Eliminato");
        } else if (act === "del-cw") {
          this._cwalls.splice(parseInt(btn.dataset.ci), 1);
          this._rebuildScene();
          this._closePanel();
          this._toast("Muro eliminato");
        } else if (act === "del-room") {
          const rid = btn.dataset.rid;
          const room = this._rooms.find((r) => r.id === rid);
          if (room && confirm(`Eliminare "${room.name}"?`)) {
            this._rooms = this._rooms.filter((r) => r.id !== rid);
            this._rebuildScene();
            this._closePanel();
            this._toast("Stanza eliminata!");
          }
        } else if (act === "add-cw") {
          this._cwalls.push({
            x: this._cx,
            z: this._cz,
            w: 2,
            height: this._wallHeight,
            thickness: 0.1,
            rotation: 0,
          });
          this._rebuildScene();
          this._openEditCW(this._cwalls.length - 1);
          this._toast("Muro aggiunto");
        } else if (act === "add-furn") {
          const t = btn.dataset.ft,
            cat = FURN_CAT[t];
          this._furniture.push({
            type: t,
            x: this._cx,
            z: this._cz,
            w: cat.w,
            h: cat.h,
            d: cat.d,
          });
          this._rebuildScene();
          this._openEditFurniture(this._furniture.length - 1);
          this._toast("Aggiunto");
        } else if (act === "save") {
          this._saveConfig();
        }
      });
    });
    const cb = this.shadowRoot.querySelector(".cb");
    if (cb)
      cb.addEventListener("click", () => {
        navigator.clipboard
          ?.writeText(this._generateYAML())
          .then(() => this._toast("YAML copiato!"))
          .catch(() => this._toast("Seleziona e copia"));
      });
    const sv = this.shadowRoot.querySelector(".sv");
    if (sv && !sv.dataset.act)
      sv.addEventListener("click", () => this._saveConfig());
  }
  _yb() {
    return `<button class="sv" data-act="save">\ud83d\udcbe Salva</button><div class="sec">YAML</div><div class="yb">${this._generateYAML()}</div><button class="cb">\ud83d\udccb Copia YAML</button>`;
  }
  _saveConfig() {
    const nc = {
      ...this._config,
      rooms: JSON.parse(JSON.stringify(this._rooms)),
      furniture: JSON.parse(JSON.stringify(this._furniture)),
    };
    if (this._cwalls.length)
      nc.custom_walls = JSON.parse(JSON.stringify(this._cwalls));
    else delete nc.custom_walls;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: nc },
        bubbles: true,
        composed: true,
      }),
    );
    this._config = nc;
    this._toast("Salvato!");
  }
  _generateYAML() {
    let y = `type: custom:floorplan-3d-card\ntitle: ${this._config?.title || "Casa"}\nheight: ${this._cardHeight}\nwall_height: ${this._wallHeight}\n`;
    if (this._config?.sun_entity) y += `sun_entity: ${this._config.sun_entity}\n`;
    if (this._config?.weather_entity) y += `weather_entity: ${this._config.weather_entity}\n`;
    y += `rooms:\n`;
    this._rooms.forEach((r) => {
      const p = r.position;
      y += `  - id: ${r.id}\n    name: ${r.name}\n    position:\n      x: ${p.x}\n      z: ${p.z}\n      w: ${p.w}\n      d: ${p.d}\n    color: "${r.color}"\n    emissive: "${r.emissive}"\n`;
      if (r.z_order != null) y += `    z_order: ${r.z_order}\n`;
      y += `    walls:\n`;
      ["north", "south", "east", "west"].forEach((d) => {
        const wc = r.walls[d];
        y += `      ${d}:\n        enabled: ${wc.enabled}\n        height: ${wc.height}\n        thickness: ${wc.thickness}\n`;
      });
      y += `    entities:\n      lights:\n`;
      const lts = r.entities.lights || [];
      if (lts.length)
        lts.forEach((lt) => {
          y += `        - entity: ${lt.entity}\n          type: ${lt.type || "ceiling"}\n`;
        });
      else y += `        []\n`;
      y += `      sensors:\n`;
      (r.entities.sensors || []).forEach(
        (s) =>
          (y += `        - entity: ${s.entity}\n          icon: ${s.icon}\n          label: ${s.label}\n          unit: "${s.unit}"\n`),
      );
      if (!(r.entities.sensors || []).length) y += `        []\n`;
      ["climate", "covers", "media", "vacuums", "doors"].forEach((k) => {
        const arr = r.entities[k] || [];
        if (arr.length) {
          y += `      ${k}:\n`;
          arr.forEach((e) => (y += `        - ${e}\n`));
        } else y += `      ${k}: []\n`;
      });
    });
    if (this._cwalls.length) {
      y += `\ncustom_walls:\n`;
      this._cwalls.forEach((cw) => {
        y += `  - x: ${cw.x}\n    z: ${cw.z}\n    w: ${cw.w || 2}\n    height: ${cw.height || this._wallHeight}\n    thickness: ${cw.thickness || 0.1}\n    rotation: ${cw.rotation || 0}\n`;
      });
    }
    y += `\nfurniture:\n`;
    this._furniture.forEach((f) => {
      y += `  - type: ${f.type}\n    x: ${f.x}\n    z: ${f.z}\n`;
      if (f.w) y += `    w: ${f.w}\n`;
      if (f.h) y += `    h: ${f.h}\n`;
      if (f.d) y += `    d: ${f.d}\n`;
      if (f.rotation) y += `    rotation: ${f.rotation}\n`;
      if (f.url) y += `    url: "${f.url}"\n`;
    });
    y += `\nstats:\n`;
    this._statSensors.forEach(
      (s) => (y += `  - entity: ${s.entity}\n    label: ${s.label}\n`),
    );
    return y;
  }
  _s(e) {
    return this._hass?.states?.[e] || null;
  }
  _sv(e) {
    return this._s(e)?.state || "unavailable";
  }
  _fn(e) {
    return (
      this._s(e)?.attributes?.friendly_name ||
      e.split(".").pop().replace(/_/g, " ")
    );
  }
  _getLightEntityId(lt) {
    return typeof lt === "string" ? lt : lt.entity;
  }
  _getRoomLightLevel(rid) {
    const r = this._rooms.find((r) => r.id === rid);
    if (!r) return 0;
    let t = 0,
      c = 0;
    (r.entities.lights || []).forEach((lt) => {
      const s = this._s(lt.entity);
      if (this._isEntityActive(s)) {
        t +=
          s.attributes?.brightness != null ? s.attributes.brightness / 255 : 1;
        c++;
      }
    });
    return c > 0 ? t / c : 0;
  }
  _getRoomLitCount(rid) {
    const r = this._rooms.find((r) => r.id === rid);
    return r
      ? (r.entities.lights || []).filter((lt) =>
          this._isEntityActive(this._s(lt.entity)),
        ).length
      : 0;
  }

  _isEntityActive(stateObj) {
    if (
      !stateObj ||
      stateObj.state === "unavailable" ||
      stateObj.state === "unknown"
    )
      return false;
    const domain = stateObj.entity_id.split(".")[0];
    const state = stateObj.state;
    switch (domain) {
      case "light":
      case "switch":
      case "input_boolean":
        return state === "on";
      case "climate":
        return state !== "off";
      case "media_player":
        return ["playing", "paused", "buffering", "on"].includes(state);
      case "cover":
        return state === "open" || state === "opening";
      case "vacuum":
        return ["cleaning", "returning"].includes(state);
      case "binary_sensor":
        return state === "on";
      default:
        return (
          state === "on" ||
          state === "true" ||
          state === "active" ||
          state === "open"
        );
    }
  }

  _updateAtmosphere() {
    if (!this._scene || !this._hass || !this._config) return;
    // Use configured entity or auto-detect sun.sun
    const sEnt = this._config.sun_entity ||
      (this._hass.states?.["sun.sun"] ? "sun.sun" : null);
    const wEnt = this._config.weather_entity;
    let isNight = false;
    let elevation = 45; // default: midday
    let wState = "sunny";

    if (sEnt) {
      const sunState = this._hass.states?.[sEnt];
      isNight = sunState?.state === "below_horizon";
      elevation = sunState?.attributes?.elevation ?? (isNight ? -10 : 45);
    }
    if (wEnt) wState = this._sv(wEnt);

    // Gradual transitions: dawn (-6°→10°) and dusk (same range descending)
    const isDawnDusk = !isNight && elevation >= -6 && elevation < 10;
    // t=0 at horizon, t=1 at elevation 10°
    const dawnT = isDawnDusk ? Math.max(0, (elevation + 6) / 16) : (isNight ? 0 : 1);

    let skyCol = 0x0a0a0f;
    let fogDensity = 0.02;
    let hemiSky = 0x4466aa;
    let hemiGnd = 0x111122;
    let ambCol = 0x303050;
    let dirInt = 0;

    if (!isNight) {
      const isStorm = wState.includes("lightning");
      const isRain  = wState.includes("rain") || wState.includes("pour") || wState.includes("storm") || isStorm;
      const isCloud = wState.includes("cloud") || wState.includes("partly");
      const isFog   = wState.includes("fog");
      const isSnow  = wState.includes("snow") || wState.includes("sleet") || wState.includes("hail");
      const isWind  = wState.includes("wind");

      if (isRain || isStorm) {
        skyCol = 0x666677; fogDensity = 0.04; hemiSky = 0x8899aa; hemiGnd = 0x444455; ambCol = 0x505060; dirInt = isStorm ? 0.05 : 0.1;
      } else if (isFog) {
        skyCol = 0x999999; fogDensity = 0.08; hemiSky = 0xaaaaaa; hemiGnd = 0x666666; ambCol = 0x606060; dirInt = 0.05;
      } else if (isSnow) {
        skyCol = 0xaabbcc; fogDensity = 0.035; hemiSky = 0xddeeff; hemiGnd = 0x8899aa; ambCol = 0x808898; dirInt = 0.15;
      } else if (isCloud) {
        skyCol = 0x8899aa; fogDensity = 0.025; hemiSky = 0xaabbcc; hemiGnd = 0x555566; ambCol = 0x707080; dirInt = 0.2;
      } else if (isWind) {
        skyCol = 0x88aacc; fogDensity = 0.015; hemiSky = 0xbbccdd; hemiGnd = 0x444455; ambCol = 0x7080a0; dirInt = 0.4;
      } else {
        // sunny
        skyCol = 0x87ceeb; fogDensity = 0.01; hemiSky = 0xffffff; hemiGnd = 0x444444; ambCol = 0x9090a0; dirInt = 0.5;
      }

      if (isDawnDusk) {
        // Blend from night values toward day values at dawn/dusk
        const nightSky = 0x1a0f00; // warm dark orange horizon
        const r = (c) => (c >> 16) & 0xff, g = (c) => (c >> 8) & 0xff, b = (c) => c & 0xff;
        const lerp = (a, b, t) => Math.round(a + (b - a) * t);
        const blend = (night, day, t) =>
          (lerp(r(night), r(day), t) << 16) | (lerp(g(night), g(day), t) << 8) | lerp(b(night), b(day), t);
        skyCol   = blend(nightSky, skyCol, dawnT);
        ambCol   = blend(0x100808, ambCol, dawnT);
        hemiSky  = blend(0x221100, hemiSky, dawnT);
        dirInt   = dirInt * dawnT;
        fogDensity = fogDensity * (0.5 + 0.5 * dawnT);
      }
    } else {
      if (wState.includes("rain") || wState.includes("storm") || wState.includes("lightning") || wState.includes("fog")) {
        skyCol = 0x050508; fogDensity = 0.04;
      }
    }

    if (this._renderer) this._renderer.setClearColor(skyCol);
    if (this._scene.fog) { this._scene.fog.color.setHex(skyCol); this._scene.fog.density = fogDensity; }
    if (this._ambientLight) this._ambientLight.color.setHex(ambCol);
    if (this._hemiLight) { this._hemiLight.color.setHex(hemiSky); this._hemiLight.groundColor.setHex(hemiGnd); }
    if (this._dirLight) this._dirLight.intensity = dirInt;
  }

  _onHassUpdate(prev) {
    if (!this._hass || !prev) return;
    
    const sEnt = this._config?.sun_entity || "sun.sun";
    const wEnt = this._config?.weather_entity;
    const sunChanged = this._hass.states?.[sEnt]?.state !== prev.states?.[sEnt]?.state ||
      this._hass.states?.[sEnt]?.attributes?.elevation !== prev.states?.[sEnt]?.attributes?.elevation;
    const weatherChanged = wEnt && (
      this._hass.states?.[wEnt]?.state !== prev.states?.[wEnt]?.state ||
      this._hass.states?.[wEnt]?.attributes?.temperature !== prev.states?.[wEnt]?.attributes?.temperature
    );
    if (sunChanged || weatherChanged) {
      this._updateAtmosphere();
    }
    if (weatherChanged) {
      this._updateStats();
    }

    const changed = new Set();
    let statsChanged = false;
    for (const eid in this._entityRoomMap) {
      const cs = this._hass.states?.[eid],
        ps = prev.states?.[eid];
      if (
        cs?.state !== ps?.state ||
        cs?.attributes?.brightness !== ps?.attributes?.brightness ||
        cs?.attributes?.rgb_color?.join() !== ps?.attributes?.rgb_color?.join()
      )
        changed.add(this._entityRoomMap[eid]);
    }
    for (const s of this._statSensors) {
      if (
        this._hass.states?.[s.entity]?.state !== prev.states?.[s.entity]?.state
      )
        statsChanged = true;
    }
    changed.forEach((rid) => {
      this._updateRoomVisual(rid);
      this._labelsDirty = true;
    });
    if (statsChanged) this._updateStats();
    if (
      this._selectedRoomId &&
      changed.has(this._selectedRoomId) &&
      !this._editMode
    )
      this._openPanel(this._selectedRoomId);
  }

  _updateRoomVisual(rid) {
    const r = this._rooms.find((r) => r.id === rid);
    if (!r) return;
    const lv = this._getRoomLightLevel(rid);
    const mat = this._roomFloorMats[rid],
      glow = this._roomGlowMeshes[rid],
      pl = this._roomPointLights[rid];
    if (mat) {
      mat.emissive =
        lv > 0 ? new THREE.Color(r.emissive || r.color) : new THREE.Color(0);
      mat.emissiveIntensity = this._selectedRoomId === rid ? 0.35 : lv * 0.25;
    }
    if (glow) glow.material.opacity = lv * 0.1;
    if (pl) pl.intensity = lv * 0.4;
    (r.entities.lights || []).forEach((lt) => {
      const eid = lt.entity,
        f = this._lightFixtures[eid];
      if (!f) return;
      const s = this._s(eid);
      const on = this._isEntityActive(s);
      const bri =
        s?.attributes?.brightness != null
          ? s.attributes.brightness / 255
          : on
            ? 1
            : 0;
      const hc = s?.attributes?.rgb_color;
      const lc = hc
        ? new THREE.Color(hc[0] / 255, hc[1] / 255, hc[2] / 255)
        : new THREE.Color(0xffe8c0);
      f._isOn = on;
      if (on) {
        f.bulbMat.emissive.copy(lc);
        f.bulbMat.emissiveIntensity = 0.8 * bri;
        f._bulbBaseIntensity = 0.8 * bri;
        f.bulbMat.color
          .copy(lc)
          .multiplyScalar(0.3)
          .add(new THREE.Color(0x444455).multiplyScalar(0.7));
        f.pointLight.color.copy(lc);
        f.pointLight.intensity =
          bri * (f.type === "table" ? 1.5 : f.type === "led_strip" ? 1 : 2.5);
        if (f.spotLight) {
          f.spotLight.color.copy(lc);
          f.spotLight.intensity = bri * 2;
        }
        if (f.coneMesh) {
          f.coneMesh.material.color.copy(lc);
          const bo =
            f.type === "ceiling"
              ? 0.06 * bri
              : f.type === "pendant"
                ? 0.07 * bri
                : f.type === "table"
                  ? 0.04 * bri
                  : 0.12 * bri;
          f.coneMesh.material.opacity = bo;
          f._coneBaseOpacity = bo;
        }
        if (f.glowCircle) {
          f.glowCircle.material.color.copy(lc);
          const go = f.type === "table" ? 0.08 * bri : 0.15 * bri;
          f.glowCircle.material.opacity = go;
          f._glowBaseOpacity = go;
        }
      } else {
        f.bulbMat.emissive.set(0);
        f.bulbMat.emissiveIntensity = 0;
        f.bulbMat.color.set(0x444455);
        f._bulbBaseIntensity = 0;
        f.pointLight.intensity = 0;
        if (f.spotLight) f.spotLight.intensity = 0;
        if (f.coneMesh) {
          f.coneMesh.material.opacity = 0;
          f._coneBaseOpacity = 0;
        }
        if (f.glowCircle) {
          f.glowCircle.material.opacity = 0;
          f._glowBaseOpacity = 0;
        }
      }
    });
  }

  _updateAllVisuals() {
    this._rooms.forEach((r) => this._updateRoomVisual(r.id));
  }
  _weatherLabel(state) {
    const map = {
      "sunny": "☀️ Soleggiato", "clear-night": "🌙 Sereno",
      "partlycloudy": "⛅ Parz. nuvoloso", "cloudy": "☁️ Nuvoloso",
      "fog": "🌫️ Nebbia", "rainy": "🌧️ Pioggia", "pouring": "🌧️ Acquazzone",
      "lightning": "⛈️ Temporale", "lightning-rainy": "⛈️ Temporale",
      "snowy": "❄️ Neve", "snowy-rainy": "🌨️ Nevischio",
      "hail": "🌨️ Grandine", "windy": "💨 Vento", "windy-variant": "💨 Vento",
      "exceptional": "⚠️ Condizioni eccezionali",
    };
    return map[state] || state;
  }

  _updateStats() {
    const el = this.shadowRoot.getElementById("stats");
    if (!el || !this._hass) return;
    let pills = "";
    const wEnt = this._config?.weather_entity;
    if (wEnt) {
      const ws = this._hass.states?.[wEnt];
      if (ws && ws.state !== "unavailable") {
        const temp = ws.attributes?.temperature;
        const unit = ws.attributes?.temperature_unit ?? "°C";
        const label = this._weatherLabel(ws.state);
        const tempStr = temp != null ? ` <strong>${Math.round(temp)}${unit}</strong>` : "";
        pills += `<div class="pill">${label}${tempStr}</div>`;
      }
    }
    pills += this._statSensors
      .map((s) => {
        const v = this._sv(s.entity);
        const unit = s.unit ?? this._hass?.states?.[s.entity]?.attributes?.unit_of_measurement ?? "";
        return v !== "unavailable"
          ? `<div class="pill">${s.label} <strong>${v}${unit}</strong></div>`
          : "";
      })
      .join("");
    el.innerHTML = pills;
  }

  _openPanel(rid) {
    const room = this._rooms.find((r) => r.id === rid);
    if (!room || !this._hass) return;
    this._selectedRoomId = rid;
    this.shadowRoot.getElementById("pTitle").textContent = room.name;
    const body = this.shadowRoot.getElementById("pBody"),
      ent = room.entities;
    let h = "";
    if (ent.lights?.length) {
      h += '<div class="sec">Luci</div>';
      ent.lights.forEach((lt) => {
        const eid = lt.entity,
          ltype = lt.type || "ceiling",
          s = this._s(eid);
        const on = this._isEntityActive(s);
        const b = s?.attributes?.brightness,
          pct = b != null ? Math.round((b / 255) * 100) : on ? 100 : 0,
          icon = LIGHT_ICONS[ltype] || "mdi:lightbulb";
        h += `<div class="row"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="${on ? icon : "mdi:lightbulb-off-outline"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)} <span style="opacity:.4;font-size:9px">\u00b7 ${LIGHT_TYPES[ltype] || ltype}</span></div><div class="eval ${on ? "" : "off"}">${on ? pct + "%" : "Off"}</div>${on ? `<input type="range" class="bri" min="1" max="100" value="${pct}" style="background:linear-gradient(90deg,${room.color} ${pct}%,rgba(255,255,255,.1) ${pct}%)" data-entity="${eid}" data-a="bri"/>` : ""}</div><button class="tog ${on ? "on" : "off"}" data-entity="${eid}" data-a="tog-light"></button></div>`;
      });
    }
    if (ent.climate?.length) {
      h += '<div class="sec">Clima</div>';
      ent.climate.forEach((eid) => {
        const s = this._s(eid);
        if (!s || s.state === "unavailable") return;
        const on = this._isEntityActive(s);
        const off = !on;
        const cur = s.attributes?.current_temperature,
          tgt = s.attributes?.temperature;
        h += `<div class="row"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="mdi:snowflake"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)}</div><div class="eval ${off ? "off" : ""}">${off ? "Off" : s.state}${cur != null ? " \u00b7 " + cur + "\u00b0C" : ""}${tgt != null ? " \u2192 " + tgt + "\u00b0C" : ""}</div></div><button class="tog ${off ? "off" : "on"}" data-entity="${eid}" data-a="tog-climate"></button></div>`;
      });
    }
    if (ent.sensors?.length) {
      h += '<div class="sec">Sensori</div>';
      ent.sensors.forEach((sn) => {
        const v = this._sv(sn.entity);
        if (v === "unavailable") return;
        h += `<div class="row"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="${sn.icon || "mdi:eye"}"></ha-icon></div><div class="info"><div class="ename">${sn.label}</div><div class="eval">${v}${sn.unit || ""}</div></div></div>`;
      });
    }
    if (ent.doors?.length) {
      h += '<div class="sec">Porte</div>';
      ent.doors.forEach((eid) => {
        const s = this._s(eid);
        if (!s || s.state === "unavailable") return;
        const op = this._isEntityActive(s);
        h += `<div class="row"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="mdi:${op ? "door-open" : "door-closed-lock"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)}</div><div class="eval">${op ? "Aperta" : "Chiusa"}</div></div></div>`;
      });
    }
    if (ent.covers?.length) {
      h += '<div class="sec">Tende</div>';
      ent.covers.forEach((eid) => {
        const s = this._s(eid);
        if (!s || s.state === "unavailable") return;
        h += `<div class="row" style="flex-wrap:wrap"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="mdi:blinds"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)}</div><div class="eval">${s.state}</div></div><div style="width:100%;padding-left:38px;margin-top:4px;display:flex;gap:4px"><button class="abtn" data-entity="${eid}" data-a="cover-open">Apri</button><button class="abtn" data-entity="${eid}" data-a="cover-close">Chiudi</button><button class="abtn" data-entity="${eid}" data-a="cover-stop">Stop</button></div></div>`;
      });
    }
    if (ent.vacuums?.length) {
      h += '<div class="sec">Robot</div>';
      ent.vacuums.forEach((eid) => {
        const s = this._s(eid);
        if (!s) return;
        h += `<div class="row" style="flex-wrap:wrap"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="mdi:robot-vacuum"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)}</div><div class="eval">${s.state}</div></div><div style="width:100%;padding-left:38px;margin-top:4px;display:flex;gap:4px"><button class="abtn" data-entity="${eid}" data-a="vac-start">Start</button><button class="abtn" data-entity="${eid}" data-a="vac-dock">Dock</button><button class="abtn" data-entity="${eid}" data-a="vac-pause">Pausa</button></div></div>`;
      });
    }
    if (ent.media?.length) {
      h += '<div class="sec">Media</div>';
      ent.media.forEach((eid) => {
        const s = this._s(eid);
        if (!s || s.state === "unavailable") return;
        const on = this._isEntityActive(s);
        const off = !on;
        const title = s.attributes?.media_title,
          artist = s.attributes?.media_artist;
        h += `<div class="row"><div class="ico" style="background:${room.color}22;color:${room.color}"><ha-icon icon="mdi:${s.attributes?.device_class === "tv" ? "television" : "speaker"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(eid)}</div><div class="eval ${off ? "off" : ""}">${s.state}</div>${title ? `<div class="eextra">${artist ? artist + " \u2013 " : ""}${title}</div>` : ""}</div><button class="tog ${off ? "off" : "on"}" data-entity="${eid}" data-a="tog-gen"></button></div>`;
      });
    }
    if (ent.lights?.length) {
      h += '<div class="sec">Azioni rapide</div>';
      h += `<div style="display:flex;gap:4px"><button class="abtn" data-room="${rid}" data-a="all-off">Tutto off</button><button class="abtn" data-room="${rid}" data-a="all-on">Tutto on</button></div>`;
    }
    body.innerHTML = h;
    this.shadowRoot.getElementById("panel").style.display = "block";
    body.onclick = (e) => this._handleClick(e);
    body.oninput = (e) => this._handleInput(e, room);
    this._updateAllVisuals();
  }

  _closePanel() {
    this._selectedRoomId = null;
    this._selectedEdit = null;
    this.shadowRoot.getElementById("panel").style.display = "none";
    this._updateAllVisuals();
  }
  async _call(d, s, dt) {
    try {
      this._toast(`${d}.${s}`);
      await this._hass.callService(d, s, dt);
    } catch (e) {
      this._toast("Errore: " + e.message);
    }
  }

  _handleClick(e) {
    const b = e.target.closest("[data-a]");
    if (!b) return;
    const a = b.dataset.a,
      eid = b.dataset.entity,
      rid = b.dataset.room;
    switch (a) {
      case "tog-light":
        this._call(
          "light",
          this._isEntityActive(this._s(eid)) ? "turn_off" : "turn_on",
          { entity_id: eid },
        );
        break;
      case "tog-climate":
        this._call(
          "climate",
          this._isEntityActive(this._s(eid)) ? "turn_off" : "turn_on",
          { entity_id: eid },
        );
        break;
      case "tog-gen": {
        const d = eid.split(".")[0];
        this._call(
          d,
          this._isEntityActive(this._s(eid)) ? "turn_off" : "turn_on",
          { entity_id: eid },
        );
        break;
      }
      case "cover-open":
        this._call("cover", "open_cover", { entity_id: eid });
        break;
      case "cover-close":
        this._call("cover", "close_cover", { entity_id: eid });
        break;
      case "cover-stop":
        this._call("cover", "stop_cover", { entity_id: eid });
        break;
      case "vac-start":
        this._call("vacuum", "start", { entity_id: eid });
        break;
      case "vac-dock":
        this._call("vacuum", "return_to_base", { entity_id: eid });
        break;
      case "vac-pause":
        this._call("vacuum", "pause", { entity_id: eid });
        break;
      case "all-off":
        this._rooms
          .find((r) => r.id === rid)
          ?.entities.lights?.forEach((lt) =>
            this._call("light", "turn_off", { entity_id: lt.entity }),
          );
        break;
      case "all-on":
        this._rooms
          .find((r) => r.id === rid)
          ?.entities.lights?.forEach((lt) =>
            this._call("light", "turn_on", { entity_id: lt.entity }),
          );
        break;
    }
  }

  _handleInput(e, room) {
    const sl = e.target.closest('[data-a="bri"]');
    if (!sl) return;
    const eid = sl.dataset.entity,
      pct = parseInt(sl.value);
    sl.style.background = `linear-gradient(90deg,${room.color} ${pct}%,rgba(255,255,255,.1) ${pct}%)`;
    clearTimeout(this._briT);
    this._briT = setTimeout(
      () =>
        this._call("light", "turn_on", {
          entity_id: eid,
          brightness: Math.round((pct / 100) * 255),
        }),
      200,
    );
  }
  _toast(msg) {
    const t = this.shadowRoot.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => t.classList.remove("show"), 1500);
  }
  disconnectedCallback() {
    if (this._animId) cancelAnimationFrame(this._animId);
    if (this._atmosphereInterval) clearInterval(this._atmosphereInterval);
  }
}
