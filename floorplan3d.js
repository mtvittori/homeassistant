//#region \0rolldown/runtime.js
var e = (e, t) => () => (e && (t = e(e = 0)), t), t = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), n, r, i, a, o, s, c, l, u, d, f, p, m = e((() => {
	n = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", r = "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js", i = {
		bed: {
			w: 1.6,
			h: .35,
			d: 2,
			color: 3355460
		},
		sofa: {
			w: 2,
			h: .4,
			d: .8,
			color: 3355460
		},
		desk: {
			w: 1.6,
			h: .04,
			d: .6,
			color: 3355460
		},
		table: {
			w: 1.2,
			h: .75,
			d: .8,
			color: 3355460
		},
		tv: {
			w: 1.4,
			h: .8,
			d: .05,
			color: 1118488,
			emissive: 1118498
		},
		wardrobe: {
			w: 1.8,
			h: 2,
			d: .5,
			color: 2763320
		},
		chair: {
			w: .5,
			h: .45,
			d: .5,
			color: 3355460
		},
		bath: {
			w: .7,
			h: .55,
			d: 1.6,
			color: 14540264
		},
		shower: {
			w: .9,
			h: .05,
			d: .9,
			color: 12303308
		},
		kitchen_counter: {
			w: 2.5,
			h: .9,
			d: .6,
			color: 3816008
		},
		fridge: {
			w: .7,
			h: 1.8,
			d: .7,
			color: 13421772
		},
		washing: {
			w: .6,
			h: .85,
			d: .6,
			color: 14540253
		}
	}, a = {
		north: "Nord ↑",
		south: "Sud ↓",
		east: "Est →",
		west: "Ovest ←"
	}, o = [
		"#5DCAA5",
		"#AFA9EC",
		"#85B7EB",
		"#F0997B",
		"#FAC775",
		"#E88ECA",
		"#7BCCE0",
		"#C4E87B",
		"#EB8585",
		"#A5C4FA",
		"#D4A5FA",
		"#FAD4A5"
	], s = [
		"#1D9E75",
		"#7F77DD",
		"#378ADD",
		"#D85A30",
		"#BA7517",
		"#C44E9E",
		"#3BA0B8",
		"#8BBB3B",
		"#C44444",
		"#5588DD",
		"#9955DD",
		"#DD9955"
	], c = {
		ceiling: "Plafoniera",
		table: "Lampada mobile",
		pendant: "Lampadario",
		led_strip: "Striscia LED"
	}, l = {
		ceiling: "mdi:ceiling-light",
		table: "mdi:lamp",
		pendant: "mdi:chandelier",
		led_strip: "mdi:led-strip-variant"
	}, u = [
		{
			id: "camera",
			name: "Camera da letto",
			position: {
				x: 0,
				z: 0,
				w: 3.2,
				d: 3.5
			},
			color: "#5DCAA5",
			emissive: "#1D9E75",
			walls: {
				north: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				south: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				east: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				west: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				}
			},
			entities: {
				lights: [{
					entity: "light.camera",
					type: "ceiling"
				}, {
					entity: "light.comodino_mamo",
					type: "table"
				}],
				sensors: [
					{
						entity: "sensor.sensore_camera_temperature",
						icon: "mdi:thermometer",
						label: "Temperatura",
						unit: "°C"
					},
					{
						entity: "sensor.sensore_camera_humidity",
						icon: "mdi:water-percent",
						label: "Umidità",
						unit: "%"
					},
					{
						entity: "sensor.sensore_camera_pm2_5",
						icon: "mdi:blur",
						label: "PM2.5",
						unit: " μg/m³"
					}
				],
				climate: [],
				covers: [],
				media: [],
				vacuums: [],
				doors: []
			}
		},
		{
			id: "studio",
			name: "Studio",
			position: {
				x: 3.2,
				z: 0,
				w: 3.3,
				d: 3.5
			},
			color: "#AFA9EC",
			emissive: "#7F77DD",
			walls: {
				north: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				south: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				east: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				west: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				}
			},
			entities: {
				lights: [{
					entity: "light.studio",
					type: "ceiling"
				}],
				sensors: [],
				climate: ["climate.condizionatore_studio_air_conditioner"],
				covers: ["cover.tenda_studio"],
				media: ["media_player.poddino"],
				vacuums: [],
				doors: []
			}
		},
		{
			id: "soggiorno",
			name: "Soggiorno",
			position: {
				x: 6.5,
				z: 0,
				w: 3.5,
				d: 5.5
			},
			color: "#85B7EB",
			emissive: "#378ADD",
			walls: {
				north: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				south: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				east: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				west: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				}
			},
			entities: {
				lights: [
					{
						entity: "light.cucina",
						type: "ceiling"
					},
					{
						entity: "light.lizzie",
						type: "table"
					},
					{
						entity: "light.luce_salone",
						type: "pendant"
					},
					{
						entity: "light.linda",
						type: "led_strip"
					}
				],
				sensors: [{
					entity: "sensor.condizionatore_salone_indoor_temperature",
					icon: "mdi:thermometer",
					label: "Temp interna",
					unit: "°C"
				}, {
					entity: "sensor.condizionatore_salone_outdoor_temperature",
					icon: "mdi:thermometer",
					label: "Temp esterna",
					unit: "°C"
				}],
				climate: ["climate.condizionatore_salone_air_conditioner", "climate.castform"],
				covers: [],
				media: ["media_player.the_frame", "media_player.linda_2"],
				vacuums: ["vacuum.eufymia"],
				doors: ["binary_sensor.abomasnow_door", "binary_sensor.sensore_balcone_door"]
			}
		},
		{
			id: "bagno",
			name: "Bagno",
			position: {
				x: 0,
				z: 3.5,
				w: 2.5,
				d: 2
			},
			color: "#F0997B",
			emissive: "#D85A30",
			walls: {
				north: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				south: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				east: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				west: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				}
			},
			entities: {
				lights: [{
					entity: "light.bagno",
					type: "ceiling"
				}, {
					entity: "light.bagno2",
					type: "led_strip"
				}],
				sensors: [],
				climate: [],
				covers: [],
				media: [],
				vacuums: [],
				doors: []
			}
		},
		{
			id: "cucina",
			name: "Cucina",
			position: {
				x: 2.5,
				z: 3.5,
				w: 4,
				d: 2
			},
			color: "#FAC775",
			emissive: "#BA7517",
			walls: {
				north: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				south: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				},
				east: {
					enabled: !1,
					height: 2.4,
					thickness: .08
				},
				west: {
					enabled: !0,
					height: 2.4,
					thickness: .08
				}
			},
			entities: {
				lights: [],
				sensors: [],
				climate: [],
				covers: [],
				media: [],
				vacuums: [],
				doors: ["binary_sensor.sensore_porta_door"]
			}
		}
	], d = [], f = [
		{
			type: "bed",
			x: 1.6,
			z: 1.2
		},
		{
			type: "desk",
			x: 4.85,
			z: 1.5
		},
		{
			type: "sofa",
			x: 8.25,
			z: 3.5
		},
		{
			type: "tv",
			x: 8.25,
			z: .12
		}
	], p = [
		{
			entity: "sensor.condizionatore_salone_air_temperature_outdoor",
			label: "Ext"
		},
		{
			entity: "sensor.condizionatore_salone_indoor_temperature",
			label: "Salone"
		},
		{
			entity: "sensor.condizionatore_studio_indoor_temperature",
			label: "Studio"
		},
		{
			entity: "sensor.sensore_camera_temperature",
			label: "Camera"
		}
	];
}));
//#endregion
//#region src/utils.js
function h(e) {
	return e ? e.map((e) => typeof e == "string" ? {
		entity: e,
		type: "ceiling"
	} : e && e.entity ? {
		entity: e.entity,
		type: e.type || "ceiling",
		offset_x: e.offset_x,
		offset_z: e.offset_z
	} : {
		entity: String(e),
		type: "ceiling"
	}) : [];
}
function g() {
	if (_) return _;
	if (window.THREE === void 0) return {};
	let e = window.THREE;
	return _ = {
		cB: new e.CylinderGeometry(.18, .18, .03, 12),
		cD: new e.SphereGeometry(.15, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2),
		tB: new e.CylinderGeometry(.06, .08, .02, 8),
		tS: new e.CylinderGeometry(.015, .015, .28, 6),
		tSh: new e.CylinderGeometry(.08, .12, .14, 10, 1, !0),
		tBl: new e.SphereGeometry(.035, 6, 6),
		pW: new e.CylinderGeometry(.005, .005, .6, 4),
		pC: new e.CylinderGeometry(.06, .06, .02, 8),
		pG: new e.SphereGeometry(.12, 12, 8),
		lS: new e.BoxGeometry(.8, .02, .02),
		lG: new e.PlaneGeometry(.9, .3),
		gS: new e.CircleGeometry(.4, 16),
		gM: new e.CircleGeometry(.5, 16),
		gL: new e.CircleGeometry(.8, 16),
		gP: new e.PlaneGeometry(50, 50),
		uB: new e.BoxGeometry(1, 1, 1)
	}, _;
}
var _, v = e((() => {
	_ = null;
})), y, b = e((() => {
	m(), v(), y = class extends HTMLElement {
		constructor() {
			super(), this.attachShadow({ mode: "open" }), this._hass = null, this._config = null, this._rooms = [], this._scene = null, this._camera = null, this._renderer = null, this._roomMeshes = [], this._roomFloorMats = {}, this._roomGlowMeshes = {}, this._roomPointLights = {}, this._wallGroup = null, this._wallsVisible = !0, this._selectedRoomId = null, this._isDragging = !1, this._prevMouse = {
				x: 0,
				y: 0
			}, this._clickStart = {
				x: 0,
				y: 0
			}, this._theta = .6, this._phi = 1.05, this._radius = 16, this._orbitTarget = null, this._animId = null, this._threeLoaded = !1, this._initialized = !1, this._cardHeight = 450, this._isMobile = !1, this._editMode = !1, this._furnMeshes = [], this._cwMeshes = [], this._selectedEdit = null, this._cx = 5, this._cz = 2.75, this._cwalls = [], this._roomIdCounter = 0, this._lightFixtures = {}, this._labelsDirty = !0, this._lastLabelUpdate = 0, this._entityRoomMap = {};
		}
		static getConfigElement() {
			return document.createElement("floorplan-3d-card-editor");
		}
		static getStubConfig() {
			return {
				title: "La mia Casa 3D",
				height: 450,
				wall_height: 2.4,
				rooms: [{
					id: "stanza_base",
					name: "Stanza Base",
					position: {
						x: 5,
						z: 2,
						w: 4,
						d: 3
					},
					color: "#AFA9EC",
					emissive: "#7F77DD",
					walls: {
						north: {
							enabled: !0,
							height: 2.4,
							thickness: .08
						},
						south: {
							enabled: !0,
							height: 2.4,
							thickness: .08
						},
						east: {
							enabled: !0,
							height: 2.4,
							thickness: .08
						},
						west: {
							enabled: !0,
							height: 2.4,
							thickness: .08
						}
					},
					entities: {
						lights: [],
						sensors: [],
						climate: [],
						covers: [],
						media: [],
						vacuums: [],
						doors: []
					}
				}],
				custom_walls: [],
				furniture: [],
				stats: []
			};
		}
		setConfig(e) {
			this._config = e, this._rooms = JSON.parse(JSON.stringify(e.rooms || u)), this._rooms.forEach((t, n) => {
				t.walls ||= {}, t.z_order ??= n, [
					"north",
					"south",
					"east",
					"west"
				].forEach((n) => {
					t.walls[n] || (t.walls[n] = {
						enabled: !0,
						height: e.wall_height || 2.4,
						thickness: .08
					});
				}), t.entities ||= {}, t.entities.lights = h(t.entities.lights), [
					"sensors",
					"climate",
					"covers",
					"media",
					"vacuums",
					"doors"
				].forEach((e) => {
					t.entities[e] || (t.entities[e] = []);
				});
			}), this._rooms.sort((e, t) => (e.z_order || 0) - (t.z_order || 0)), this._cwalls = JSON.parse(JSON.stringify(e.custom_walls || d)), this._furniture = JSON.parse(JSON.stringify(e.furniture || f)), this._cars = JSON.parse(JSON.stringify(e.cars || [])), this._statSensors = e.stats || p, this._cardHeight = e.height || 450, this._wallHeight = e.wall_height || 2.4, this._roomIdCounter = this._rooms.reduce((e, t) => {
				let n = parseInt((t.id.match(/\d+$/) || ["0"])[0]);
				return Math.max(e, n);
			}, 0) + 1, this._entityRoomMap = {}, this._rooms.forEach((e) => {
				[
					...(e.entities.lights || []).map((e) => e.entity),
					...(e.entities.sensors || []).map((e) => e.entity),
					...e.entities.climate || [],
					...e.entities.covers || [],
					...e.entities.media || [],
					...e.entities.vacuums || [],
					...e.entities.doors || []
				].forEach((t) => {
					this._entityRoomMap[t] = e.id;
				});
			}), this._render();
		}
		set hass(e) {
			let t = this._hass;
			this._hass = e, !this._initialized && e && this._loadThreeAndInit(), t && e && this._onHassUpdate(t);
		}
		getCardSize() {
			return Math.ceil((this._cardHeight || 450) / 50);
		}
		_checkMobile() {
			this._isMobile = (this.shadowRoot?.getElementById?.("wrap")?.clientWidth || window.innerWidth) < 500;
		}
		_render() {
			let e = this._cardHeight;
			this.shadowRoot.innerHTML = `<style>:host{display:block}ha-card{overflow:hidden;position:relative;background:#0a0a0f}.wrap{width:100%;height:${e}px;position:relative;cursor:grab;touch-action:none}.wrap.dragging{cursor:grabbing}canvas{width:100%;height:100%;display:block}.hud{position:absolute;top:10px;left:12px;pointer-events:none;z-index:2}.hud h2{font-size:14px;font-weight:600;color:#fff;margin:0}.stats{display:flex;gap:5px;flex-wrap:wrap;position:absolute;bottom:44px;left:10px;z-index:2;pointer-events:none}.pill{background:rgba(16,16,24,.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:7px;padding:4px 8px;font-size:10px;color:rgba(255,255,255,.5)}.pill strong{color:#fff;font-weight:500}.bar{display:flex;gap:2px;justify-content:center;position:absolute;bottom:8px;left:50%;transform:translateX(-50%);z-index:2;background:rgba(16,16,24,.85);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08);border-radius:9px;padding:3px}.bar button{padding:5px 10px;border:none;border-radius:6px;font-size:10px;font-weight:500;cursor:pointer;background:transparent;color:rgba(255,255,255,.4);transition:all .15s}.bar button:hover{background:rgba(255,255,255,.08);color:rgba(255,255,255,.8)}.bar button.active{background:rgba(255,255,255,.12);color:#fff}.bar button.ea{background:rgba(250,199,117,.25);color:#FAC775}.bar button.ar{background:rgba(93,202,165,.2);color:#5DCAA5}.panel{position:absolute;top:8px;right:8px;z-index:10;background:rgba(16,16,24,.94);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:14px;width:min(300px,calc(100% - 16px));max-height:calc(100% - 60px);overflow-y:auto;display:none;box-shadow:0 12px 40px rgba(0,0,0,.5)}.panel::-webkit-scrollbar{width:3px}.panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,.12);border-radius:2px}.panel-hdr{padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,.06)}.panel-hdr h3{font-size:14px;font-weight:600;color:#fff;margin:0;padding-right:28px}.x-btn{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:6px;border:none;background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center}.x-btn:hover{background:rgba(255,255,255,.15);color:#fff}.panel-body{padding:8px 12px 12px}.sec{font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:rgba(255,255,255,.25);margin:10px 0 5px}.row{display:flex;align-items:center;gap:8px;padding:7px 8px;margin:2px 0;border-radius:9px;background:rgba(255,255,255,.03)}.row:hover{background:rgba(255,255,255,.06)}.ico{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ico ha-icon{--mdc-icon-size:16px;color:inherit}.info{flex:1;min-width:0}.ename{font-size:10px;color:rgba(255,255,255,.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.eval{font-size:12px;font-weight:500;color:#fff;margin-top:1px}.eval.off{color:rgba(255,255,255,.3)}.eextra{font-size:9px;color:rgba(255,255,255,.25);margin-top:1px}.tog{width:38px;height:20px;border-radius:10px;border:none;cursor:pointer;position:relative;transition:background .2s;flex-shrink:0;padding:0}.tog.on{background:#5DCAA5}.tog.off{background:rgba(255,255,255,.12)}.tog::after{content:'';position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s;box-shadow:0 1px 2px rgba(0,0,0,.3)}.tog.on::after{left:20px}.tog.off::after{left:2px}.bri{-webkit-appearance:none;appearance:none;width:100%;height:3px;border-radius:2px;outline:none;margin:5px 0 2px}.bri::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:#fff;cursor:pointer}.abtn{display:inline-flex;align-items:center;gap:3px;padding:4px 8px;border-radius:5px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:rgba(255,255,255,.6);font-size:10px;font-family:inherit;cursor:pointer;transition:all .15s}.abtn:hover{background:rgba(255,255,255,.1);color:#fff}.abtn.del{border-color:rgba(240,149,149,.3);color:#F09595}.abtn.del:hover{background:rgba(240,149,149,.15)}.abtn.add{border-color:rgba(93,202,165,.3);color:#5DCAA5}.abtn.add:hover{background:rgba(93,202,165,.15)}.abtn.zord{border-color:rgba(175,169,236,.3);color:#AFA9EC;min-width:24px;justify-content:center}.lbl{position:absolute;pointer-events:none;z-index:1;font-size:10px;font-weight:500;white-space:nowrap;text-shadow:0 1px 5px rgba(0,0,0,.9);transform:translate(-50%,-50%)}.toast{position:absolute;top:10px;left:50%;transform:translateX(-50%);z-index:20;background:rgba(16,16,24,.92);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.1);border-radius:7px;padding:5px 12px;font-size:10px;color:#fff;opacity:0;transition:opacity .3s;pointer-events:none}.toast.show{opacity:1}.esl{display:flex;align-items:center;gap:6px;margin:3px 0}.esl label{font-size:10px;color:rgba(255,255,255,.45);min-width:14px;text-align:right}.esl input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:3px;border-radius:2px;background:rgba(255,255,255,.12);outline:none}.esl input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#FAC775;cursor:pointer}.esl .vl{font-size:10px;color:#fff;min-width:30px;text-align:left;font-weight:500}.wc{background:rgba(255,255,255,.03);border-radius:8px;padding:8px 10px;margin:4px 0}.wh{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}.wh span{font-size:11px;font-weight:500;color:rgba(255,255,255,.6)}.wt{width:34px;height:18px;border-radius:9px;border:none;cursor:pointer;position:relative;transition:background .2s;padding:0}.wt.on{background:#5DCAA5}.wt.off{background:rgba(255,255,255,.12)}.wt::after{content:'';position:absolute;top:2px;width:14px;height:14px;border-radius:50%;background:#fff;transition:left .2s}.wt.on::after{left:18px}.wt.off::after{left:2px}.sv{width:100%;padding:8px;border-radius:8px;border:1px solid rgba(93,202,165,.4);background:rgba(93,202,165,.15);color:#5DCAA5;font-size:11px;font-family:inherit;font-weight:600;cursor:pointer;margin-top:6px}.yb{background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px;font-size:8px;font-family:monospace;color:rgba(255,255,255,.5);max-height:100px;overflow-y:auto;white-space:pre;word-break:break-all;margin-top:6px;user-select:all}.cb{width:100%;margin-top:4px;padding:6px;border-radius:6px;border:1px solid rgba(250,199,117,.3);background:rgba(250,199,117,.1);color:#FAC775;font-size:10px;font-family:inherit;font-weight:500;cursor:pointer}.einp{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:5px 8px;font-size:11px;color:#fff;font-family:inherit;width:100%;box-sizing:border-box;outline:none;margin:2px 0}.color-row{display:flex;gap:4px;flex-wrap:wrap;margin:4px 0}.color-swatch{width:22px;height:22px;border-radius:6px;border:2px solid transparent;cursor:pointer;transition:all .15s}.color-swatch:hover{transform:scale(1.15)}.color-swatch.sel{border-color:#fff;box-shadow:0 0 8px rgba(255,255,255,.3)}.overlap-info{background:rgba(250,199,117,.08);border:1px solid rgba(250,199,117,.15);border-radius:8px;padding:8px 10px;margin:6px 0}.overlap-room{display:flex;align-items:center;gap:6px;padding:4px 0;font-size:10px;color:rgba(255,255,255,.6)}.overlap-room .or-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}.overlap-room .or-name{flex:1}.zord-controls{display:flex;align-items:center;gap:4px;margin:6px 0}.zord-badge{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;border-radius:5px;background:rgba(175,169,236,.15);color:#AFA9EC;font-size:10px;font-weight:600;padding:0 4px}.lt-sel{display:flex;gap:3px;flex-wrap:wrap;margin:3px 0}.lt-btn{padding:3px 7px;border-radius:5px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(255,255,255,.4);font-size:9px;font-family:inherit;cursor:pointer}.lt-btn.sel{background:rgba(250,199,117,.15);border-color:rgba(250,199,117,.4);color:#FAC775}.light-card{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:9px;padding:8px;margin:4px 0}.light-card .lc-hdr{display:flex;align-items:center;gap:6px;margin-bottom:5px}.light-card .lc-dot{width:6px;height:6px;border-radius:50%}.light-card .lc-name{font-size:10px;color:rgba(255,255,255,.6);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.light-card .lc-type{font-size:9px;color:rgba(255,255,255,.3)}@media(max-width:500px){.panel{width:calc(100% - 16px);right:8px;left:8px;top:auto;bottom:44px;max-height:55%}.stats{bottom:40px;gap:3px}.pill{padding:3px 6px;font-size:9px}.bar button{padding:4px 8px;font-size:9px}.hud h2{font-size:12px}.lbl{font-size:9px}}</style><ha-card><div class="wrap" id="wrap"><div class="hud"><h2>${this._config?.title || "Floor plan"}</h2></div><div class="stats" id="stats"></div><div class="panel" id="panel"><button class="x-btn" id="xBtn">&times;</button><div class="panel-hdr"><h3 id="pTitle"></h3></div><div class="panel-body" id="pBody"></div></div><div class="bar" id="bar"><button class="active" data-v="default">3D</button><button data-v="top">Top</button><button data-v="front">Front</button><button data-v="walls">Muri</button><button data-v="edit" id="eb">\u270f\ufe0f Edit</button><button data-v="add-room" id="arb" class="ar" style="display:none">\ud83c\udfe0 + Stanza</button></div><div class="toast" id="toast"></div><div id="lbls"></div><canvas id="c"></canvas></div></ha-card>`, this.shadowRoot.getElementById("bar").addEventListener("click", (e) => {
				let t = e.target.closest("button");
				if (!t) return;
				let n = t.dataset.v;
				if (n === "edit") {
					this._editMode = !this._editMode, t.classList.toggle("ea", this._editMode);
					let e = this.shadowRoot.getElementById("arb");
					e && (e.style.display = this._editMode ? "" : "none"), this._editMode ? (this._closePanel(), this._toast("Tap stanza, mobile o muro custom")) : (this._selectedEdit = null, this._closePanel());
					return;
				}
				if (n === "add-room") {
					this._openNewRoomPanel();
					return;
				}
				if (n === "walls") {
					this._wallsVisible = !this._wallsVisible, this._wallGroup && (this._wallGroup.visible = this._wallsVisible), t.classList.toggle("active", this._wallsVisible);
					return;
				}
				this.shadowRoot.querySelectorAll(".bar button:not([data-v=\"walls\"]):not([data-v=\"edit\"])").forEach((e) => e.classList.remove("active")), t.classList.add("active");
				let r = this._isMobile;
				n === "top" ? (this._phi = .16, this._theta = 0, this._radius = r ? 16 : 14) : n === "front" ? (this._phi = 1.25, this._theta = 0, this._radius = r ? 16 : 14) : (this._phi = 1.05, this._theta = .6, this._radius = r ? 18 : 16), this._updateCam();
			}), this.shadowRoot.getElementById("xBtn").addEventListener("click", () => this._closePanel());
		}
		async _loadThreeAndInit() {
			this._threeLoaded || (typeof THREE > "u" && await new Promise((e, t) => {
				let r = document.createElement("script");
				r.src = n, r.onload = e, r.onerror = t, document.head.appendChild(r);
			}), window.THREE.GLTFLoader === void 0 && await new Promise((e, t) => {
				let n = document.createElement("script");
				n.src = r, n.onload = e, n.onerror = t, document.head.appendChild(n);
			}), this._threeLoaded = !0, this._checkMobile(), this._initScene(), this._initialized = !0, this._updateAllVisuals(), this._updateStats(), this._updateAtmosphere(), this._atmosphereInterval = setInterval(() => this._updateAtmosphere(), 6e4));
		}
		_rebuildScene() {
			for (this._animId && cancelAnimationFrame(this._animId), this._scene.traverse((e) => {
				e.geometry && !e.geometry._shared && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.dispose()) : e.material.dispose());
			}); this._scene.children.length > 0;) this._scene.remove(this._scene.children[0]);
			this._roomMeshes = [], this._roomFloorMats = {}, this._roomGlowMeshes = {}, this._roomPointLights = {}, this._furnMeshes = [], this._cwMeshes = [], this._lightFixtures = {}, this._skyDomeMesh = null, this._sunMesh = null, this._moonMesh = null, this._starsMesh = null, this._cloudMeshes = [], this._wallGroup = new THREE.Group(), this._scene.add(this._wallGroup), this._buildSceneContent(), this._updateAllVisuals(), this._updateStats(), this._animate();
		}
		_initScene() {
			let e = this.shadowRoot.getElementById("wrap"), t = this.shadowRoot.getElementById("c"), n = e.clientWidth, r = this._cardHeight;
			this._scene = new THREE.Scene(), this._scene.fog = new THREE.FogExp2(657935, .02), this._camera = new THREE.PerspectiveCamera(this._isMobile ? 55 : 45, n / r, .1, 100), this._renderer = new THREE.WebGLRenderer({
				canvas: t,
				antialias: !0,
				powerPreference: "high-performance"
			}), this._renderer.setSize(n, r), this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)), this._renderer.setClearColor(657935), this._renderer.shadowMap.enabled = !0, this._renderer.shadowMap.type = THREE.PCFSoftShadowMap, this._renderer.toneMapping = THREE.ACESFilmicToneMapping, this._renderer.toneMappingExposure = 1.2, this._wallGroup = new THREE.Group(), this._scene.add(this._wallGroup), this._buildSceneContent(), this._orbitTarget = new THREE.Vector3(this._cx, 0, this._cz), this._radius = this._isMobile ? 18 : 16, this._setupControls(t), this._updateCam(), this._animate(), new ResizeObserver(() => {
				let t = e.clientWidth;
				this._checkMobile(), this._camera.fov = this._isMobile ? 55 : 45, this._camera.aspect = t / r, this._camera.updateProjectionMatrix(), this._renderer.setSize(t, r);
			}).observe(e);
		}
		_buildLightFixture(e, t, n) {
			let r = g(), i = new THREE.Group(), a = 16771264, o = this._wallHeight, s = new THREE.MeshStandardMaterial({
				color: 4473941,
				emissive: 0,
				emissiveIntensity: 0,
				roughness: .3,
				metalness: .1,
				transparent: !0,
				opacity: .9
			}), c = this._smm ||= new THREE.MeshStandardMaterial({
				color: 2763320,
				roughness: .6,
				metalness: .4
			}), l = new THREE.MeshBasicMaterial({
				color: a,
				transparent: !0,
				opacity: 0,
				side: THREE.DoubleSide,
				depthWrite: !1
			}), u = null;
			if (e === "ceiling") {
				i.add(new THREE.Mesh(r.cB, c));
				let e = new THREE.Mesh(r.cD, s);
				e.rotation.x = Math.PI, e.position.y = -.02, i.add(e);
				let a = new THREE.CylinderGeometry(.05, 1.2, o - .3, 12, 1, !0);
				u = new THREE.Mesh(a, l), u.position.y = -(o - .3) / 2, i.add(u), i.position.set(t, o - .02, n);
			} else if (e === "table") {
				let e = new THREE.Mesh(r.tB, c);
				e.position.y = .01, i.add(e);
				let a = new THREE.Mesh(r.tS, c);
				a.position.y = .16, i.add(a);
				let o = new THREE.Mesh(r.tSh, new THREE.MeshStandardMaterial({
					color: 5588019,
					roughness: .8,
					transparent: !0,
					opacity: .6,
					side: THREE.DoubleSide
				}));
				o.position.y = .35, i.add(o);
				let d = new THREE.Mesh(r.tBl, s);
				d.position.y = .32, i.add(d);
				let f = new THREE.CylinderGeometry(.03, .35, .5, 10, 1, !0);
				u = new THREE.Mesh(f, l.clone()), u.position.y = .02, i.add(u), i.position.set(t, .4, n);
			} else if (e === "pendant") {
				let e = new THREE.Mesh(r.pW, c);
				e.position.y = .3, i.add(e);
				let a = new THREE.Mesh(r.pC, c);
				a.position.y = .6, i.add(a), i.add(new THREE.Mesh(r.pG, s));
				let d = new THREE.CylinderGeometry(.04, 1, o - .9, 12, 1, !0);
				u = new THREE.Mesh(d, l.clone()), u.position.y = -(o - .9) / 2, i.add(u), i.position.set(t, o - .02, n);
			} else if (e === "led_strip") {
				i.add(new THREE.Mesh(r.lS, s));
				let e = new THREE.Mesh(r.lG, l.clone());
				e.position.set(0, -.15, -.01), i.add(e), u = e, i.position.set(t, o - .15, n);
			}
			let d = new THREE.PointLight(a, 0, e === "led_strip" ? 3 : 5);
			d.castShadow = !1, e === "ceiling" ? d.position.set(t, o - .15, n) : e === "table" ? d.position.set(t, .75, n) : e === "pendant" ? d.position.set(t, o - .65, n) : d.position.set(t, o - .2, n);
			let f = null;
			if (e === "ceiling" || e === "pendant") {
				let r = e === "ceiling" ? o - .1 : o - .65;
				f = new THREE.SpotLight(a, 0, o, Math.PI / 4, .5, 1.5), f.position.set(t, r, n), f.target.position.set(t, 0, n), f.castShadow = !1, this._scene.add(f), this._scene.add(f.target);
			}
			let p = e === "table" ? r.gS : e === "led_strip" ? r.gM : r.gL, m = new THREE.Mesh(p, new THREE.MeshBasicMaterial({
				color: a,
				transparent: !0,
				opacity: 0,
				depthWrite: !1
			}));
			return m.rotation.x = -Math.PI / 2, m.position.set(t, .005, n), this._scene.add(m), this._scene.add(i), this._scene.add(d), {
				group: i,
				bulbMat: s,
				coneMesh: u,
				pointLight: d,
				spotLight: f,
				glowCircle: m,
				type: e,
				_isOn: !1,
				_coneBaseOpacity: 0,
				_glowBaseOpacity: 0,
				_bulbBaseIntensity: 0
			};
		}
		_buildSceneContent() {
			let e = this._wallHeight, t = g();
			this._ambientLight = new window.THREE.AmbientLight(3158096, .25), this._scene.add(this._ambientLight), this._hemiLight = new window.THREE.HemisphereLight(4482730, 1118498, .15), this._scene.add(this._hemiLight);
			let n = new window.THREE.DirectionalLight(16774374, .35);
			this._dirLight = n, n.position.set(10, 18, 12), n.castShadow = !0, n.shadow.mapSize.set(512, 512), n.shadow.camera.left = -15, n.shadow.camera.right = 15, n.shadow.camera.top = 15, n.shadow.camera.bottom = -15, n.shadow.bias = -.001, this._scene.add(n);
			let r = new window.THREE.Mesh(t.gP, new THREE.MeshStandardMaterial({
				color: 1387024,
				roughness: .95
			}));
			r.rotation.x = -Math.PI / 2, r.position.y = -.02, r.receiveShadow = !0, this._scene.add(r), this._buildSkyDome();
			let a = Infinity, o = -Infinity, s = Infinity, c = -Infinity;
			this._rooms.forEach((e) => {
				let t = e.position;
				a = Math.min(a, t.x), o = Math.max(o, t.x + t.w), s = Math.min(s, t.z), c = Math.max(c, t.z + t.d);
			}), this._rooms.length || (a = 0, o = 10, s = 0, c = 5.5), this._cx = (a + o) / 2, this._cz = (s + c) / 2, this._orbitTarget && (this._orbitTarget.x = this._cx, this._orbitTarget.z = this._cz);
			let l = new THREE.MeshStandardMaterial({
				color: 2763326,
				transparent: !0,
				opacity: .3,
				side: THREE.DoubleSide
			});
			if ([...this._rooms].sort((e, t) => (e.z_order || 0) - (t.z_order || 0)).forEach((n, r) => {
				let i = n.position, a = new THREE.Color(n.color), o = n.walls || {}, s = r * .001, c = new THREE.MeshStandardMaterial({
					color: a,
					emissive: new THREE.Color(0),
					emissiveIntensity: 0,
					roughness: .6,
					metalness: .08,
					transparent: !0,
					opacity: .75
				});
				this._roomFloorMats[n.id] = c;
				let u = new THREE.Mesh(new THREE.BoxGeometry(i.w - .06, .06, i.d - .06), c);
				u.position.set(i.x + i.w / 2, .03 + s, i.z + i.d / 2), u.receiveShadow = !0, u.userData = {
					roomId: n.id,
					isRoom: !0
				}, u.renderOrder = r, this._scene.add(u), this._roomMeshes.push(u);
				let d = new THREE.MeshBasicMaterial({
					color: a,
					transparent: !0,
					opacity: 0
				}), f = new THREE.Mesh(new THREE.PlaneGeometry(i.w + .4, i.d + .4), d);
				f.rotation.x = -Math.PI / 2, f.position.set(i.x + i.w / 2, .002 + s, i.z + i.d / 2), f.renderOrder = r, this._scene.add(f), this._roomGlowMeshes[n.id] = f;
				let p = new THREE.PointLight(a.getHex(), 0, 6);
				p.position.set(i.x + i.w / 2, e - .4, i.z + i.d / 2), p.castShadow = !1, this._scene.add(p), this._roomPointLights[n.id] = p;
				let m = new THREE.LineBasicMaterial({
					color: a,
					transparent: !0,
					opacity: .5
				});
				this._scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(i.x + .02, .07 + s, i.z + .02),
					new THREE.Vector3(i.x + i.w - .02, .07 + s, i.z + .02),
					new THREE.Vector3(i.x + i.w - .02, .07 + s, i.z + i.d - .02),
					new THREE.Vector3(i.x + .02, .07 + s, i.z + i.d - .02),
					new THREE.Vector3(i.x + .02, .07 + s, i.z + .02)
				]), m)), [
					{
						d: "north",
						px: i.x + i.w / 2,
						pz: i.z,
						sx: i.w,
						sz: o.north?.thickness || .08
					},
					{
						d: "south",
						px: i.x + i.w / 2,
						pz: i.z + i.d,
						sx: i.w,
						sz: o.south?.thickness || .08
					},
					{
						d: "west",
						px: i.x,
						pz: i.z + i.d / 2,
						sx: o.west?.thickness || .08,
						sz: i.d
					},
					{
						d: "east",
						px: i.x + i.w,
						pz: i.z + i.d / 2,
						sx: o.east?.thickness || .08,
						sz: i.d
					}
				].forEach((n) => {
					let r = o[n.d] || {
						enabled: !0,
						height: e,
						thickness: .08
					};
					if (!r.enabled) return;
					let i = r.height || e, a = new THREE.Mesh(t.uB, l);
					a.scale.set(n.sx, i, n.sz), a.position.set(n.px, i / 2, n.pz), a.receiveShadow = !0, this._wallGroup.add(a);
				});
				let h = new THREE.LineBasicMaterial({
					color: a,
					transparent: !0,
					opacity: .2
				});
				this._wallGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([
					new THREE.Vector3(i.x, e, i.z),
					new THREE.Vector3(i.x + i.w, e, i.z),
					new THREE.Vector3(i.x + i.w, e, i.z + i.d),
					new THREE.Vector3(i.x, e, i.z + i.d),
					new THREE.Vector3(i.x, e, i.z)
				]), h)), (n.entities.lights || []).forEach((e, t) => {
					let r = e.entity, a = e.type || "ceiling", o = Math.ceil(Math.sqrt(n.entities.lights.length)), s = Math.ceil(n.entities.lights.length / o), c = t % o, l = Math.floor(t / o), u = i.x + i.w * (c + 1) / (o + 1), d = i.z + i.d * (l + 1) / (s + 1);
					e.offset_x != null && (u += e.offset_x), e.offset_z != null && (d += e.offset_z), this._lightFixtures[r] = this._buildLightFixture(a, u, d);
				});
			}), this._rooms.length > 0) {
				let n = new THREE.MeshStandardMaterial({
					color: 3816016,
					transparent: !0,
					opacity: .45,
					roughness: .8
				}), r = o - a, i = c - s;
				[
					[
						this._cx,
						s,
						r,
						.14
					],
					[
						this._cx,
						c,
						r,
						.14
					],
					[
						a,
						this._cz,
						.14,
						i
					],
					[
						o,
						this._cz,
						.14,
						i
					]
				].forEach(([r, i, a, o]) => {
					let s = new THREE.Mesh(t.uB, n);
					s.scale.set(a, e + .3, o), s.position.set(r, (e + .3) / 2, i), s.receiveShadow = !0, this._wallGroup.add(s);
				});
			}
			let u = new THREE.MeshStandardMaterial({
				color: 4868702,
				transparent: !0,
				opacity: .4,
				roughness: .8,
				side: THREE.DoubleSide
			});
			this._cwalls.forEach((n, r) => {
				let i = n.height || e, a = new THREE.Mesh(t.uB, u);
				a.scale.set(n.w || 2, i, n.thickness || .1), a.position.set(n.x || 0, i / 2, n.z || 0), n.rotation && (a.rotation.y = n.rotation * Math.PI / 180), a.receiveShadow = !0, a.userData = {
					isCustomWall: !0,
					cwIdx: r
				}, this._wallGroup.add(a), this._cwMeshes.push(a);
			}), this._furniture.forEach((e, n) => {
				let r = i[e.type];
				if (!r) return;
				let a = e.w || r.w, o = e.h || r.h, s = e.d || r.d, c = e.color ? new window.THREE.Color(e.color).getHex() : r.color, l = () => {
					let i = {
						color: c,
						roughness: .9
					};
					r.emissive && (i.emissive = r.emissive, i.emissiveIntensity = .1);
					let l = new window.THREE.Mesh(t.uB, new window.THREE.MeshStandardMaterial(i));
					l.scale.set(a, o, s), l.position.set(e.x, o / 2, e.z), e.rotation && (l.rotation.y = e.rotation * Math.PI / 180), l.castShadow = !0, l.receiveShadow = !0, l.userData = {
						isFurniture: !0,
						furnIdx: n
					}, this._scene.add(l), this._furnMeshes.push(l);
				};
				e.url && window.THREE.GLTFLoader !== void 0 ? new window.THREE.GLTFLoader().load(e.url, (t) => {
					let r = t.scene, i = new window.THREE.Box3().setFromObject(r), c = new window.THREE.Vector3();
					i.getSize(c);
					let l = Math.min(a / c.x, Math.min(o / c.y, s / c.z));
					r.scale.setScalar(l);
					let u = new window.THREE.Vector3();
					i.getCenter(u), r.position.sub(u.multiplyScalar(l)), r.position.y += o / 2;
					let d = new window.THREE.Group();
					d.add(r), d.position.set(e.x, 0, e.z), e.rotation && (d.rotation.y = e.rotation * Math.PI / 180), d.userData = {
						isFurniture: !0,
						furnIdx: n
					}, r.traverse((e) => {
						e.isMesh && (e.castShadow = !0, e.receiveShadow = !0);
					}), this._scene.add(d), this._furnMeshes.push(d);
				}, void 0, () => l()) : l();
			}), this._buildOutdoor(a, o, s, c);
		}
		_buildSkyDome() {
			let e = window.THREE, t = new e.SphereGeometry(80, 32, 16), n = t.attributes.position.count, r = new Float32Array(n * 3);
			t.setAttribute("color", new e.BufferAttribute(r, 3)), this._skyDomeMat = new e.MeshBasicMaterial({
				vertexColors: !0,
				side: e.BackSide,
				depthWrite: !1,
				fog: !1
			}), this._skyDomeMesh = new e.Mesh(t, this._skyDomeMat), this._skyDomeMesh.renderOrder = -100, this._scene.add(this._skyDomeMesh);
			let i = new e.SphereGeometry(1.5, 14, 10);
			this._sunMat = new e.MeshBasicMaterial({
				color: 16775850,
				fog: !1
			}), this._sunMesh = new e.Mesh(i, this._sunMat), this._sunMesh.visible = !1, this._scene.add(this._sunMesh);
			let a = new e.SphereGeometry(2.5, 12, 8);
			this._coronaMat = new e.MeshBasicMaterial({
				color: 16769120,
				transparent: !0,
				opacity: .2,
				fog: !1,
				depthWrite: !1
			}), this._coronaMesh = new e.Mesh(a, this._coronaMat), this._coronaMesh.visible = !1, this._scene.add(this._coronaMesh);
			let o = new e.SphereGeometry(1, 12, 8);
			this._moonMat = new e.MeshBasicMaterial({
				color: 14544639,
				fog: !1
			}), this._moonMesh = new e.Mesh(o, this._moonMat), this._moonMesh.visible = !1, this._scene.add(this._moonMesh);
			let s = new Float32Array(280 * 3);
			for (let e = 0; e < 280; e++) {
				let t = Math.random() * Math.PI * 2, n = Math.random() * Math.PI * .48;
				s[e * 3] = 72 * Math.sin(n) * Math.cos(t), s[e * 3 + 1] = 72 * Math.cos(n), s[e * 3 + 2] = 72 * Math.sin(n) * Math.sin(t);
			}
			let c = new e.BufferGeometry();
			c.setAttribute("position", new e.BufferAttribute(s, 3)), this._starsMesh = new e.Points(c, new e.PointsMaterial({
				color: 16777215,
				size: .35,
				sizeAttenuation: !0,
				fog: !1
			})), this._starsMesh.visible = !1, this._scene.add(this._starsMesh), this._cloudMeshes = [], [
				{
					x: -22,
					y: 16,
					z: -28,
					count: 6
				},
				{
					x: 28,
					y: 20,
					z: -26,
					count: 5
				},
				{
					x: -8,
					y: 18,
					z: -38,
					count: 7
				},
				{
					x: 18,
					y: 14,
					z: -32,
					count: 5
				},
				{
					x: -32,
					y: 17,
					z: -18,
					count: 4
				}
			].forEach((t) => {
				let n = new e.Group(), r = new e.MeshStandardMaterial({
					color: 16777215,
					roughness: 1,
					fog: !1
				});
				for (let i = 0; i < t.count; i++) {
					let t = 1.4 + Math.random() * 1.8, i = new e.Mesh(new e.SphereGeometry(t, 8, 6), r);
					i.position.set((Math.random() - .5) * 6, (Math.random() - .5) * 1.6, (Math.random() - .5) * 3.5), n.add(i);
				}
				n.position.set(t.x, t.y, t.z), n.visible = !1, this._scene.add(n), this._cloudMeshes.push(n);
			});
		}
		_updateSkyDome(e, t, n, r, i, a) {
			if (!this._skyDomeMesh) return;
			let o = window.THREE, s = this._skyDomeMesh.geometry.attributes.position, c = this._skyDomeMesh.geometry.attributes.color, l = new o.Color(t), u;
			u = e ? new o.Color(526354) : a ? new o.Color(8029328) : i ? new o.Color(12303291) : new o.Color(t).lerp(new o.Color(15267071), .45);
			for (let e = 0; e < s.count; e++) {
				let t = s.getY(e), n = Math.max(0, Math.min(1, (t + 10) / 90)), r = new o.Color().lerpColors(u, l, n * n);
				c.setXYZ(e, r.r, r.g, r.b);
			}
			c.needsUpdate = !0;
			let d = (n ?? 45) * Math.PI / 180, f = 68 * Math.cos(d) * .6, p = 68 * Math.sin(d), m = -68 * Math.cos(d) * .8, h = !e && (n ?? 45) > -3;
			this._sunMesh.position.set(f, p, m), this._sunMesh.visible = h, this._coronaMesh.position.set(f, p, m), this._coronaMesh.visible = h, n < 15 && !e ? (this._sunMat.color.setHex(16750899), this._coronaMat.color.setHex(16737792), this._coronaMat.opacity = .3) : (this._sunMat.color.setHex(16775850), this._coronaMat.color.setHex(16769120), this._coronaMat.opacity = .2), this._moonMesh.position.set(-68 * .55, 68 * .55, -68 * .6), this._moonMesh.visible = e, this._starsMesh.visible = e;
			let g = !e && !i && !a, _ = r ? 11186363 : 16777215;
			this._cloudMeshes.forEach((e) => {
				e.visible = g, e.children.forEach((e) => e.material.color.setHex(_));
			});
		}
		_buildOutdoor(e, t, n, r) {
			let i = window.THREE, a = (e + t) / 2, o = (n + r) / 2, s = t - e, c = r - n, l = [
				{
					x: a - s * .5 - 4,
					z: o,
					w: 8,
					d: c + 10
				},
				{
					x: a + s * .5 - 4,
					z: o,
					w: 8,
					d: c + 10
				},
				{
					x: a,
					z: n - 5,
					w: s + 14,
					d: 8
				},
				{
					x: a,
					z: r + 5,
					w: s + 14,
					d: 8
				}
			], u = [
				1981714,
				1520912,
				2245653,
				1718802
			];
			l.forEach((e, t) => {
				let n = new i.Mesh(new i.PlaneGeometry(e.w, e.d), new i.MeshStandardMaterial({
					color: u[t % u.length],
					roughness: .95
				}));
				n.rotation.x = -Math.PI / 2, n.position.set(e.x, -.01, e.z), n.receiveShadow = !0, this._scene.add(n);
			});
			let d = e + s * .25, f = r + 4.5, p = 5.5, m = .22, h = new i.MeshStandardMaterial({
				color: 4861460,
				roughness: .95
			});
			[
				[
					d,
					f - 4 / 2,
					p + .3,
					.18
				],
				[
					d,
					f + 4 / 2,
					p + .3,
					.18
				],
				[
					d - p / 2,
					f,
					.18,
					4
				],
				[
					d + p / 2,
					f,
					.18,
					4
				]
			].forEach(([e, t, n, r]) => {
				let a = new i.Mesh(new i.BoxGeometry(n, .3, r), h);
				a.position.set(e, .15, t), a.castShadow = !0, a.receiveShadow = !0, this._scene.add(a);
			});
			let g = new i.Mesh(new i.BoxGeometry(p - .06, .12, 3.94), new i.MeshStandardMaterial({
				color: 2495752,
				roughness: 1
			}));
			g.position.set(d, m - .06, f), g.receiveShadow = !0, this._scene.add(g), [
				2890254,
				1970182,
				3350032
			].forEach((e, t) => {
				let n = new i.Mesh(new i.PlaneGeometry(.9 + t * .4, .7 + t * .3), new i.MeshStandardMaterial({
					color: e,
					roughness: 1
				}));
				n.rotation.x = -Math.PI / 2, n.position.set(d + (t - 1) * 1.2, m + .001, f + (t % 2 ? .4 : -.4)), this._scene.add(n);
			});
			let _ = new i.MeshStandardMaterial({
				color: 1710618,
				roughness: .8
			});
			for (let e = 0; e < 4; e++) {
				let t = f - 4 / 2 + .55 + 3.1 / 3 * e, n = new i.Mesh(new i.CylinderGeometry(.018, .018, p - .3, 6), _);
				n.rotation.z = Math.PI / 2, n.position.set(d, m + .03, t), this._scene.add(n);
			}
			let v = [
				{
					stemH: .55,
					stemR: .035,
					leafCol: 2783770,
					leafR: .12,
					fruitCol: 13378048,
					fruitR: .07,
					fruitCount: 3
				},
				{
					stemH: .22,
					stemR: .028,
					leafCol: 4114500,
					leafR: .17,
					fruitCol: null
				},
				{
					stemH: .38,
					stemR: .03,
					leafCol: 3178522,
					leafR: .11,
					fruitCol: 14509568,
					fruitR: .055,
					fruitCount: 2
				},
				{
					stemH: .05,
					stemR: .06,
					leafCol: 5622852,
					leafR: .22,
					flat: !0,
					fruitCol: null
				}
			], y = new i.MeshStandardMaterial({
				color: 3042080,
				roughness: .9
			});
			for (let e = 0; e < 4; e++) {
				let t = v[e % v.length];
				for (let n = 0; n < 5; n++) {
					let r = d - p / 2 + .6 + n * ((p - 1.1) / 4), a = f - 4 / 2 + .55 + 3.1 / 3 * e, o = (n * 7 + e * 3) % 5 * .04, s = t.stemH + o, c = m, l = new i.Mesh(new i.CylinderGeometry(t.stemR * .7, t.stemR, s, 6), y);
					l.position.set(r, c + s / 2, a), l.castShadow = !0, this._scene.add(l);
					let u = new i.MeshStandardMaterial({
						color: t.leafCol,
						roughness: .8
					});
					if (t.flat) {
						let e = new i.Mesh(new i.SphereGeometry(t.leafR, 8, 5), u);
						e.scale.y = .3, e.position.set(r, c + s + .04, a), e.castShadow = !0, this._scene.add(e);
					} else if (t.fruitCol === null) for (let e = 0; e < 3; e++) {
						let n = r + (e - 1) * t.leafR * .7, o = c + s + t.leafR * (.5 + e % 2 * .3), l = new i.Mesh(new i.SphereGeometry(t.leafR * (.75 + e * .1), 7, 5), u);
						l.position.set(n, o, a), l.castShadow = !0, this._scene.add(l);
					}
					else {
						let e = new i.Mesh(new i.SphereGeometry(t.leafR, 7, 5), u);
						e.position.set(r, c + s + t.leafR * .65, a), e.castShadow = !0, this._scene.add(e);
						let n = new i.MeshStandardMaterial({
							color: t.fruitCol,
							roughness: .5,
							metalness: .05
						}), o = t.fruitCount || 2;
						for (let e = 0; e < o; e++) {
							let l = e / o * Math.PI * 2, u = r + Math.cos(l) * t.leafR * .7, d = a + Math.sin(l) * t.leafR * .7, f = new i.Mesh(new i.SphereGeometry(t.fruitR, 8, 6), n);
							f.position.set(u, c + s * .75, d), f.castShadow = !0, this._scene.add(f);
						}
					}
				}
			}
			let b = new i.MeshStandardMaterial({
				color: 8947832,
				roughness: .95
			});
			for (let e = 0; e < 8; e++) {
				let t = d - p / 2 + .35 + p / 7 * e, n = new i.Mesh(new i.CylinderGeometry(.12 + e % 3 * .03, .14, .06 + e % 2 * .02, 7), b);
				n.position.set(t, .03, f - 4 / 2 - .35), n.rotation.y = e * .7, n.receiveShadow = !0, this._scene.add(n);
			}
			let x = new i.MeshStandardMaterial({
				color: 2263108,
				roughness: .6,
				metalness: .2
			}), S = new i.Mesh(new i.CylinderGeometry(.14, .12, .32, 10), x), C = d - p / 2 - .5, w = f + 4 / 2 - .4;
			S.position.set(C, .16, w), S.castShadow = !0, this._scene.add(S);
			let T = new i.Mesh(new i.CylinderGeometry(.025, .04, .28, 6), x);
			T.rotation.z = -Math.PI / 5, T.position.set(C + .18, .27, w), this._scene.add(T);
			let E = new i.MeshStandardMaterial({
				color: 1730099,
				roughness: .7
			}), D = new i.Mesh(new i.CylinderGeometry(.015, .015, .22, 6), E);
			D.rotation.z = Math.PI / 5, D.position.set(C - .14, .26, w), this._scene.add(D);
			let O = new i.Mesh(new i.CylinderGeometry(.015, .015, .22, 6), E);
			O.rotation.z = -Math.PI / 5, O.position.set(C - .14, .28, w), this._scene.add(O);
			let k = new i.MeshStandardMaterial({
				color: 5913114,
				roughness: .9
			}), A = new i.Mesh(new i.CylinderGeometry(.03, .03, .8, 6), k);
			A.position.set(d + p / 2 - .3, .4, f - 4 / 2 - .1), this._scene.add(A);
			let j = new i.Mesh(new i.BoxGeometry(.5, .22, .04), new i.MeshStandardMaterial({
				color: 8017200,
				roughness: .9
			}));
			j.position.set(d + p / 2 - .3, .72, f - 4 / 2 - .1), this._scene.add(j);
			let M = t + .8, N = o, P = 6.5, F = 2.7, I = new i.MeshStandardMaterial({
				color: 3816002,
				roughness: .9
			}), L = new i.Mesh(new i.PlaneGeometry(P, 8), I);
			L.rotation.x = -Math.PI / 2, L.position.set(M + P / 2, 0, N), L.receiveShadow = !0, this._scene.add(L);
			let R = new i.MeshStandardMaterial({
				color: 4144978,
				transparent: !0,
				opacity: .55,
				roughness: .85
			}), z = new i.MeshStandardMaterial({
				color: 3026494,
				roughness: .9
			}), B = new i.MeshStandardMaterial({
				color: 4539727,
				roughness: .85
			}), V = new i.Mesh(new i.PlaneGeometry(P, 6), B);
			V.rotation.x = -Math.PI / 2, V.position.set(M + P / 2, .003, N), V.receiveShadow = !0, this._scene.add(V);
			let H = new i.Mesh(new i.BoxGeometry(P, F, .14), R);
			H.position.set(M + P / 2, F / 2, N - 6 / 2), H.castShadow = !0, H.receiveShadow = !0, this._scene.add(H);
			let U = new i.Mesh(new i.BoxGeometry(.14, F, 6), R);
			U.position.set(M, F / 2, N), U.castShadow = !0, U.receiveShadow = !0, this._scene.add(U);
			let W = new i.Mesh(new i.BoxGeometry(.14, F, 6), R);
			W.position.set(M + P, F / 2, N), W.castShadow = !0, W.receiveShadow = !0, this._scene.add(W);
			let G = new i.Mesh(new i.BoxGeometry(P + .28, .16, 6.28), z);
			G.position.set(M + P / 2, F + .08, N), G.castShadow = !0, G.receiveShadow = !0, this._scene.add(G);
			let K = new i.MeshStandardMaterial({
				color: 2763324,
				roughness: .9
			});
			[M + .07, M + P - .07].forEach((e) => {
				let t = new i.Mesh(new i.BoxGeometry(.14, F, .14), K);
				t.position.set(e, F / 2, N + 6 / 2), this._scene.add(t);
			});
			let q = new i.Mesh(new i.BoxGeometry(P, .16, .14), K);
			q.position.set(M + P / 2, F - .08, N + 6 / 2), this._scene.add(q);
			let J = [{
				color: "#1e4fa0",
				x: M + 1.6,
				z: N
			}, {
				color: "#a02020",
				x: M + 4.8,
				z: N
			}], Y = this._cars && this._cars.length > 0 ? this._cars : J, X = new i.CylinderGeometry(.27, .27, .2, 12), Z = new i.MeshStandardMaterial({
				color: 1710618,
				roughness: .9
			}), Q = new i.MeshStandardMaterial({
				color: 11579576,
				metalness: .6,
				roughness: .4
			}), $ = (e) => {
				let t = e.x ?? M + 1.6, n = e.z ?? N, r = new i.Color(e.color ?? "#1e4fa0").getHex(), a = new i.MeshStandardMaterial({
					color: r,
					roughness: .35,
					metalness: .45
				}), o = new i.Group(), s = new i.Mesh(new i.BoxGeometry(3.7, .6, 1.55), a);
				s.position.set(0, .32, 0), s.castShadow = !0, s.receiveShadow = !0, o.add(s);
				let c = new i.Mesh(new i.BoxGeometry(2.1, .52, 1.42), a);
				c.position.set(-.2, .86, 0), c.castShadow = !0, o.add(c);
				let l = new i.MeshStandardMaterial({
					color: 4491434,
					transparent: !0,
					opacity: .35,
					metalness: .1
				}), u = new i.Mesh(new i.BoxGeometry(.05, .44, 1.3), l);
				u.position.set(.85, .84, 0), o.add(u);
				let d = new i.Mesh(new i.BoxGeometry(.05, .4, 1.3), l);
				d.position.set(-1.25, .84, 0), o.add(d), [
					[-1.45, -.72],
					[-1.45, .72],
					[1.45, -.72],
					[1.45, .72]
				].forEach(([e, t]) => {
					let n = new i.Mesh(X, Z);
					n.rotation.z = Math.PI / 2, n.position.set(e, .27, t), n.castShadow = !0, o.add(n);
					let r = new i.Mesh(new i.CylinderGeometry(.15, .15, .22, 10), Q);
					r.rotation.z = Math.PI / 2, r.position.set(e, .27, t), o.add(r);
				});
				let f = new i.MeshStandardMaterial({
					color: 16777164,
					emissive: 16777164,
					emissiveIntensity: .3
				}), p = new i.MeshStandardMaterial({
					color: 16720384,
					emissive: 16720384,
					emissiveIntensity: .25
				});
				[[-.5], [.5]].forEach(([e]) => {
					let t = new i.Mesh(new i.BoxGeometry(.08, .1, .2), f);
					t.position.set(1.86, .38, e), o.add(t);
					let n = new i.Mesh(new i.BoxGeometry(.08, .1, .2), p);
					n.position.set(-1.86, .38, e), o.add(n);
				}), o.position.set(t, 0, n), e.rotation && (o.rotation.y = e.rotation * Math.PI / 180), this._scene.add(o);
			};
			Y.forEach((e) => {
				let t = e.x ?? M + 1.6, n = e.z ?? N;
				e.url && window.THREE.GLTFLoader !== void 0 ? new window.THREE.GLTFLoader().load(e.url, (r) => {
					let a = r.scene, o = new i.Box3().setFromObject(a), s = new i.Vector3();
					o.getSize(s);
					let c = Math.min(3.7 / s.x, 1.5 / s.y, 1.8 / s.z);
					a.scale.setScalar(c);
					let l = new i.Vector3();
					o.getCenter(l), a.position.sub(l.multiplyScalar(c)), a.position.y += s.y * c / 2;
					let u = new i.Group();
					u.add(a), u.position.set(t, 0, n), e.rotation && (u.rotation.y = e.rotation * Math.PI / 180), a.traverse((e) => {
						e.isMesh && (e.castShadow = !0, e.receiveShadow = !0);
					}), this._scene.add(u);
				}, void 0, () => $(e)) : $(e);
			});
			let ee = new i.MeshStandardMaterial({
				color: 4861458,
				roughness: .95
			}), te = new i.MeshStandardMaterial({
				color: 1924120,
				roughness: .9
			});
			[
				[e - 2.5, n - 2],
				[e - 2.5, r + 2],
				[t + 1, n - 2.5],
				[d - p / 2 - 1.5, f],
				[a - 3, r + 8]
			].forEach(([e, t]) => {
				let n = 1.4 + Math.abs((e + t) % 1) * .6, r = new i.Mesh(new i.CylinderGeometry(.12, .16, n, 8), ee);
				r.position.set(e, n / 2, t), r.castShadow = !0, this._scene.add(r);
				let a = .7 + Math.abs(e * t % .5) * .4, o = new i.Mesh(new i.SphereGeometry(a, 8, 6), te);
				o.position.set(e, n + a * .65, t), o.castShadow = !0, this._scene.add(o);
			});
		}
		_setupControls(e) {
			let t = new THREE.Raycaster(), n = new THREE.Vector2();
			e.addEventListener("pointerdown", (e) => {
				this._isDragging = !0, this._prevMouse = this._clickStart = {
					x: e.clientX,
					y: e.clientY
				}, this.shadowRoot.getElementById("wrap").classList.add("dragging");
			}), e.addEventListener("pointermove", (e) => {
				this._isDragging && (this._theta -= (e.clientX - this._prevMouse.x) * .004, this._phi = Math.max(.15, Math.min(1.5, this._phi + (e.clientY - this._prevMouse.y) * .004)), this._prevMouse = {
					x: e.clientX,
					y: e.clientY
				}, this._updateCam(), this._labelsDirty = !0);
			}), e.addEventListener("pointerup", () => {
				this._isDragging = !1, this.shadowRoot.getElementById("wrap").classList.remove("dragging");
			}), e.addEventListener("wheel", (e) => {
				e.preventDefault(), this._radius = Math.max(5, Math.min(30, this._radius + e.deltaY * .008)), this._updateCam(), this._labelsDirty = !0;
			}, { passive: !1 });
			let r = 0;
			e.addEventListener("touchstart", (e) => {
				if (e.touches.length === 2) {
					let t = e.touches[0].clientX - e.touches[1].clientX, n = e.touches[0].clientY - e.touches[1].clientY;
					r = Math.sqrt(t * t + n * n);
				}
			}, { passive: !0 }), e.addEventListener("touchmove", (e) => {
				if (e.touches.length === 2) {
					let t = e.touches[0].clientX - e.touches[1].clientX, n = e.touches[0].clientY - e.touches[1].clientY, i = Math.sqrt(t * t + n * n);
					this._radius = Math.max(5, Math.min(30, this._radius + (r - i) * .04)), r = i, this._updateCam(), this._labelsDirty = !0;
				}
			}, { passive: !0 }), e.addEventListener("click", (r) => {
				if (Math.abs(r.clientX - this._clickStart.x) > 8 || Math.abs(r.clientY - this._clickStart.y) > 8) return;
				let i = e.getBoundingClientRect();
				if (n.x = (r.clientX - i.left) / i.width * 2 - 1, n.y = -((r.clientY - i.top) / i.height) * 2 + 1, t.setFromCamera(n, this._camera), this._editMode) {
					let e = t.intersectObjects([
						...this._roomMeshes,
						...this._furnMeshes,
						...this._cwMeshes
					]);
					if (e.length > 0) {
						let t = e[0].object;
						t.userData.isRoom ? this._openEditRoom(t.userData.roomId) : t.userData.isFurniture ? this._openEditFurniture(t.userData.furnIdx) : t.userData.isCustomWall && this._openEditCW(t.userData.cwIdx);
					} else this._closePanel();
				} else {
					let e = t.intersectObjects(this._roomMeshes);
					e.length > 0 ? this._openPanel(e[0].object.userData.roomId) : this._closePanel();
				}
			});
		}
		_updateCam() {
			if (!this._camera || !this._orbitTarget) return;
			let e = this._orbitTarget;
			this._camera.position.set(e.x + this._radius * Math.sin(this._phi) * Math.cos(this._theta), e.y + this._radius * Math.cos(this._phi), e.z + this._radius * Math.sin(this._phi) * Math.sin(this._theta)), this._camera.lookAt(e);
		}
		_animate() {
			this._animId = requestAnimationFrame(() => this._animate());
			let e = performance.now() * .001;
			for (let t in this._lightFixtures) {
				let n = this._lightFixtures[t];
				if (!n._isOn) continue;
				let r = .85 + Math.sin(e * 2 + t.length) * .15;
				n.coneMesh && (n.coneMesh.material.opacity = n._coneBaseOpacity * r), n.glowCircle && (n.glowCircle.material.opacity = n._glowBaseOpacity * r), n.bulbMat && (n.bulbMat.emissiveIntensity = n._bulbBaseIntensity * r);
			}
			let t = performance.now();
			(this._labelsDirty || t - this._lastLabelUpdate > 100) && (this._updateLabels(), this._lastLabelUpdate = t, this._labelsDirty = !1), this._renderer.render(this._scene, this._camera);
		}
		_updateLabels() {
			let e = this.shadowRoot.getElementById("lbls"), t = this.shadowRoot.getElementById("c");
			if (!e || !t || !this._camera) return;
			let n = t.getBoundingClientRect(), r = "";
			this._rooms.forEach((e) => {
				let t = e.position, i = new THREE.Vector3(t.x + t.w / 2, this._wallHeight + .4, t.z + t.d / 2).clone().project(this._camera);
				if (i.z > 1) return;
				let a = (i.x * .5 + .5) * n.width, o = (-i.y * .5 + .5) * n.height, s = this._getRoomLitCount(e.id);
				r += `<div class="lbl" style="left:${a}px;top:${o}px;color:${e.color}">${e.name}${s > 0 ? " · " + s + "💡" : ""}</div>`;
			}), e.innerHTML = r;
		}
		_getOverlappingRooms(e) {
			let t = this._rooms.find((t) => t.id === e);
			if (!t) return [];
			let n = t.position, r = [];
			return this._rooms.forEach((t) => {
				if (t.id === e) return;
				let i = t.position;
				n.x < i.x + i.w && n.x + n.w > i.x && n.z < i.z + i.d && n.z + n.d > i.z && r.push(t);
			}), r;
		}
		_moveZOrder(e, t) {
			let n = this._rooms.find((t) => t.id === e);
			if (!n) return;
			let r = this._getOverlappingRooms(e);
			if (!r.length) return;
			let i = [n, ...r].sort((e, t) => (e.z_order || 0) - (t.z_order || 0)), a = i.findIndex((t) => t.id === e);
			if (t === "up" && a < i.length - 1) {
				let e = i[a + 1], t = n.z_order;
				n.z_order = e.z_order, e.z_order = t, n.z_order === e.z_order && n.z_order++;
			} else if (t === "down" && a > 0) {
				let e = i[a - 1], t = n.z_order;
				n.z_order = e.z_order, e.z_order = t, n.z_order === e.z_order && n.z_order--;
			}
			this._rebuildScene();
		}
		_sl(e, t, n, r, i, a, o, s = "") {
			return `<div class="esl"><label>${e}</label><input type="range" min="${r}" max="${i}" step="${a}" value="${n}" data-prop="${t}" data-target="${o}" ${s}><span class="vl">${a < .05 ? Number(n).toFixed(2) : t === "rotation" ? Number(n).toFixed(0) : Number(n).toFixed(1)}</span></div>`;
		}
		_openEditRoom(e) {
			let t = this._rooms.find((t) => t.id === e);
			if (!t) return;
			this._selectedRoomId = e, this._selectedEdit = {
				type: "room",
				id: e
			}, this.shadowRoot.getElementById("pTitle").textContent = "✏️ " + t.name;
			let n = this.shadowRoot.getElementById("pBody"), r = t.position, s = "<div class=\"sec\">Nome stanza</div>";
			s += `<input class="einp" type="text" value="${t.name}" data-act="rename-room" data-rid="${e}" placeholder="Nome stanza"/>`, s += `<div style="font-size:9px;color:rgba(255,255,255,.2);margin:2px 0">ID: ${t.id}</div>`, s += "<div class=\"sec\">Colore</div><div class=\"color-row\">", o.forEach((n, r) => {
				s += `<div class="color-swatch${n === t.color ? " sel" : ""}" style="background:${n}" data-act="set-color" data-ci="${r}" data-rid="${e}"></div>`;
			}), s += "</div>";
			let l = this._getOverlappingRooms(e);
			l.length > 0 && (s += "<div class=\"overlap-info\"><div class=\"oi-title\">⚠️ Sovrapposizioni</div>", l.forEach((e) => {
				s += `<div class="overlap-room"><div class="or-dot" style="background:${e.color}"></div><span class="or-name">${e.name}</span><span class="zord-badge">z:${e.z_order || 0}</span></div>`;
			}), s += `<div style="margin-top:6px;font-size:10px;color:rgba(255,255,255,.4)">Ordine stanza:</div><div class="zord-controls"><button class="abtn zord" data-act="zord-down" data-rid="${e}">\u2193 Sotto</button><span class="zord-badge">z:${t.z_order || 0}</span><button class="abtn zord" data-act="zord-up" data-rid="${e}">\u2191 Sopra</button></div></div>`), s += "<div class=\"sec\">Luci (tipo modello 3D)</div>";
			let u = t.entities.lights || [];
			u.length ? u.forEach((n, r) => {
				s += `<div class="light-card"><div class="lc-hdr"><div class="lc-dot" style="background:${t.color}"></div><span class="lc-name">${n.entity}</span><span class="lc-type">${c[n.type] || n.type}</span></div><div class="lt-sel">`, Object.keys(c).forEach((t) => {
					s += `<button class="lt-btn${n.type === t ? " sel" : ""}" data-lt-entity="${r}" data-lt-type="${t}" data-lt-rid="${e}">${c[t]}</button>`;
				}), s += "</div></div>";
			}) : s += "<div style=\"font-size:10px;color:rgba(255,255,255,.25);padding:4px 0\">Nessuna luce</div>", s += "<div class=\"sec\">Posizione e dimensioni</div>", s += this._sl("X", "x", r.x, 0, 15, .1, "room", `data-rid="${e}"`) + this._sl("Z", "z", r.z, 0, 15, .1, "room", `data-rid="${e}"`) + this._sl("W", "w", r.w, .5, 10, .1, "room", `data-rid="${e}"`) + this._sl("D", "d", r.d, .5, 10, .1, "room", `data-rid="${e}"`), s += "<div class=\"sec\">Muri</div>", [
				"north",
				"south",
				"east",
				"west"
			].forEach((n) => {
				let r = t.walls[n] || {
					enabled: !0,
					height: this._wallHeight,
					thickness: .08
				};
				s += `<div class="wc"><div class="wh"><span>${a[n]}</span><button class="wt ${r.enabled ? "on" : "off"}" data-wa="wt" data-wd="${n}" data-wr="${e}"></button></div>${r.enabled ? this._sl("H", "height", r.height, .3, 3, .1, "wall", `data-wd="${n}" data-rid="${e}"`) + this._sl("T", "thickness", r.thickness, .02, .3, .01, "wall", `data-wd="${n}" data-rid="${e}"`) : ""}</div>`;
			}), s += "<div class=\"sec\">Aggiungi</div><div style=\"display:flex;gap:4px;flex-wrap:wrap;\">", s += "<button class=\"abtn add\" data-act=\"add-cw\">+ Muro</button>", Object.keys(i).forEach((e) => {
				s += `<button class="abtn add" data-act="add-furn" data-ft="${e}" style="font-size:9px;">${e}</button>`;
			}), s += "</div>", s += `<div class="sec">Zona pericolosa</div><button class="abtn del" data-act="del-room" data-rid="${e}" style="width:100%;justify-content:center;padding:6px">\ud83d\uddd1\ufe0f Elimina "${t.name}"</button>`, s += this._yb(), n.innerHTML = s, this.shadowRoot.getElementById("panel").style.display = "block", this._wireEdit(n);
		}
		_openNewRoomPanel() {
			this._selectedEdit = { type: "new-room" }, this.shadowRoot.getElementById("pTitle").textContent = "🏠 Nuova stanza";
			let e = this.shadowRoot.getElementById("pBody"), t = this._rooms.length % o.length, n = "<div class=\"sec\">Nome</div><input class=\"einp\" type=\"text\" id=\"newRoomName\" placeholder=\"es. Cameretta\" value=\"\"/><div class=\"sec\">ID (opzionale)</div><input class=\"einp\" type=\"text\" id=\"newRoomId\" placeholder=\"auto-generato\"/><div class=\"sec\">Colore</div><div class=\"color-row\" id=\"newRoomColors\">";
			o.forEach((e, r) => {
				n += `<div class="color-swatch${r === t ? " sel" : ""}" style="background:${e}" data-nci="${r}"></div>`;
			}), n += "</div><div class=\"sec\">Dimensioni iniziali</div>", n += this._sl("W", "nw", 3, .5, 10, .1, "none") + this._sl("D", "nd", 3, .5, 10, .1, "none"), n += "<button class=\"sv\" data-act=\"create-room\">🏠 Crea stanza</button>", e.innerHTML = n, this.shadowRoot.getElementById("panel").style.display = "block", e.querySelectorAll("[data-nci]").forEach((t) => {
				t.addEventListener("click", () => {
					e.querySelectorAll("[data-nci]").forEach((e) => e.classList.remove("sel")), t.classList.add("sel");
				});
			}), e.querySelectorAll("input[type=range]").forEach((e) => {
				e.addEventListener("input", () => {
					let t = parseFloat(e.step);
					e.nextElementSibling.textContent = t < .05 ? parseFloat(e.value).toFixed(2) : parseFloat(e.value).toFixed(1);
				});
			}), e.querySelector("[data-act=\"create-room\"]").addEventListener("click", () => {
				let t = e.querySelector("#newRoomName").value.trim() || "Stanza " + (this._rooms.length + 1), n = e.querySelector("#newRoomId").value.trim().toLowerCase().replace(/[^a-z0-9_]/g, "");
				for (n ||= t.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "room_" + this._roomIdCounter; this._rooms.find((e) => e.id === n);) n += "_" + ++this._roomIdCounter;
				let r = e.querySelector("[data-nci].sel"), i = r ? parseInt(r.dataset.nci) : 0, a = parseFloat(e.querySelector("[data-prop=\"nw\"]").value) || 3, c = parseFloat(e.querySelector("[data-prop=\"nd\"]").value) || 3, l = this._rooms.reduce((e, t) => Math.max(e, t.z_order || 0), 0);
				this._rooms.push({
					id: n,
					name: t,
					position: {
						x: this._cx - a / 2,
						z: this._cz - c / 2,
						w: a,
						d: c
					},
					color: o[i],
					emissive: s[i],
					z_order: l + 1,
					walls: {
						north: {
							enabled: !0,
							height: this._wallHeight,
							thickness: .08
						},
						south: {
							enabled: !0,
							height: this._wallHeight,
							thickness: .08
						},
						east: {
							enabled: !0,
							height: this._wallHeight,
							thickness: .08
						},
						west: {
							enabled: !0,
							height: this._wallHeight,
							thickness: .08
						}
					},
					entities: {
						lights: [],
						sensors: [],
						climate: [],
						covers: [],
						media: [],
						vacuums: [],
						doors: []
					}
				}), this._roomIdCounter++, this._rebuildScene(), this._openEditRoom(n), this._toast("Stanza creata!");
			});
		}
		_openEditFurniture(e) {
			let t = this._furniture[e];
			if (!t) return;
			let n = i[t.type] || {
				w: 1,
				h: 1,
				d: 1
			};
			this._selectedEdit = {
				type: "furn",
				idx: e
			}, this.shadowRoot.getElementById("pTitle").textContent = "✏️ " + t.type;
			let r = this.shadowRoot.getElementById("pBody"), a = "<div class=\"sec\">Posizione</div>" + this._sl("X", "x", t.x, 0, 15, .1, "furn", `data-fi="${e}"`) + this._sl("Z", "z", t.z, 0, 15, .1, "furn", `data-fi="${e}"`);
			a += `<div class="sec">Modello 3D (.glb)</div><input class="einp" type="text" placeholder="es. /local/mio_modello.glb" value="${t.url || ""}" data-prop="url" data-target="furn" data-fi="${e}" /><div class="sec">Dimensioni (Inviluppo)</div>` + this._sl("W", "w", t.w || n.w, .1, 5, .1, "furn", `data-fi="${e}"`) + this._sl("H", "h", t.h || n.h, .05, 3, .05, "furn", `data-fi="${e}"`) + this._sl("D", "d", t.d || n.d, .1, 5, .1, "furn", `data-fi="${e}"`), a += "<div class=\"sec\">Rotazione</div>" + this._sl("°", "rotation", t.rotation || 0, 0, 360, 5, "furn", `data-fi="${e}"`), a += `<div class="sec">Azioni</div><button class="abtn del" data-act="del-furn" data-fi="${e}">\ud83d\uddd1\ufe0f Elimina</button>`, a += this._yb(), r.innerHTML = a, this.shadowRoot.getElementById("panel").style.display = "block", this._wireEdit(r);
		}
		_openEditCW(e) {
			let t = this._cwalls[e];
			if (!t) return;
			this._selectedEdit = {
				type: "cw",
				idx: e
			}, this.shadowRoot.getElementById("pTitle").textContent = "✏️ Muro #" + (e + 1);
			let n = this.shadowRoot.getElementById("pBody"), r = "<div class=\"sec\">Posizione</div>" + this._sl("X", "x", t.x || 0, 0, 15, .1, "cw", `data-ci="${e}"`) + this._sl("Z", "z", t.z || 0, 0, 15, .1, "cw", `data-ci="${e}"`);
			r += "<div class=\"sec\">Dimensioni</div>" + this._sl("W", "w", t.w || 2, .1, 10, .1, "cw", `data-ci="${e}"`) + this._sl("H", "height", t.height || this._wallHeight, .3, 3, .1, "cw", `data-ci="${e}"`) + this._sl("T", "thickness", t.thickness || .1, .02, .3, .01, "cw", `data-ci="${e}"`), r += "<div class=\"sec\">Rotazione</div>" + this._sl("°", "rotation", t.rotation || 0, 0, 360, 5, "cw", `data-ci="${e}"`), r += `<div class="sec">Azioni</div><button class="abtn del" data-act="del-cw" data-ci="${e}">\ud83d\uddd1\ufe0f Elimina muro</button>`, r += this._yb(), n.innerHTML = r, this.shadowRoot.getElementById("panel").style.display = "block", this._wireEdit(n);
		}
		_wireEdit(e) {
			e.querySelectorAll("input.einp[data-target]").forEach((e) => {
				e.addEventListener("change", () => {
					if (e.dataset.target === "furn") {
						let t = this._furniture[parseInt(e.dataset.fi)];
						t && (t[e.dataset.prop] = e.value.trim());
					}
					this._rebuildScene();
					let t = this.shadowRoot.querySelector(".yb");
					t && (t.textContent = this._generateYAML());
				});
			}), e.querySelectorAll("input[type=range]").forEach((e) => {
				e.addEventListener("input", () => {
					let t = parseFloat(e.value), n = parseFloat(e.step);
					e.nextElementSibling.textContent = n < .05 ? t.toFixed(2) : e.dataset.prop === "rotation" ? t.toFixed(0) : t.toFixed(1);
					let r = e.dataset.target;
					if (r === "room") {
						let n = this._rooms.find((t) => t.id === e.dataset.rid);
						n && (n.position[e.dataset.prop] = t);
					} else if (r === "wall") {
						let n = this._rooms.find((t) => t.id === e.dataset.rid);
						n && n.walls[e.dataset.wd] && (n.walls[e.dataset.wd][e.dataset.prop] = t);
					} else if (r === "furn") {
						let n = this._furniture[parseInt(e.dataset.fi)];
						n && (n[e.dataset.prop] = t);
					} else if (r === "cw") {
						let n = this._cwalls[parseInt(e.dataset.ci)];
						n && (n[e.dataset.prop] = t);
					}
					this._rebuildScene();
					let i = this.shadowRoot.querySelector(".yb");
					i && (i.textContent = this._generateYAML());
				});
			}), e.querySelectorAll("[data-wa=\"wt\"]").forEach((e) => {
				e.addEventListener("click", () => {
					let t = this._rooms.find((t) => t.id === e.dataset.wr);
					t && t.walls[e.dataset.wd] && (t.walls[e.dataset.wd].enabled = !t.walls[e.dataset.wd].enabled, this._rebuildScene(), this._openEditRoom(e.dataset.wr));
				});
			}), e.querySelectorAll("[data-act=\"rename-room\"]").forEach((e) => {
				e.addEventListener("change", () => {
					let t = this._rooms.find((t) => t.id === e.dataset.rid);
					t && (t.name = e.value.trim() || t.name, this._rebuildScene(), this._toast("Rinominata: " + t.name));
				});
			}), e.querySelectorAll("[data-act=\"set-color\"]").forEach((t) => {
				t.addEventListener("click", () => {
					let n = this._rooms.find((e) => e.id === t.dataset.rid), r = parseInt(t.dataset.ci);
					if (n) {
						n.color = o[r], n.emissive = s[r], e.querySelectorAll("[data-act=\"set-color\"]").forEach((e) => e.classList.remove("sel")), t.classList.add("sel"), this._rebuildScene();
						let i = this.shadowRoot.querySelector(".yb");
						i && (i.textContent = this._generateYAML());
					}
				});
			}), e.querySelectorAll("[data-act=\"zord-up\"]").forEach((e) => {
				e.addEventListener("click", () => {
					this._moveZOrder(e.dataset.rid, "up"), this._openEditRoom(e.dataset.rid);
				});
			}), e.querySelectorAll("[data-act=\"zord-down\"]").forEach((e) => {
				e.addEventListener("click", () => {
					this._moveZOrder(e.dataset.rid, "down"), this._openEditRoom(e.dataset.rid);
				});
			}), e.querySelectorAll(".lt-btn").forEach((e) => {
				e.addEventListener("click", () => {
					let t = e.dataset.ltRid, n = parseInt(e.dataset.ltEntity), r = e.dataset.ltType, i = this._rooms.find((e) => e.id === t);
					if (i && i.entities.lights[n]) {
						i.entities.lights[n].type = r;
						let t = e.closest(".light-card");
						t && (t.querySelectorAll(".lt-btn").forEach((e) => e.classList.remove("sel")), e.classList.add("sel"), t.querySelector(".lc-type").textContent = c[r]), this._rebuildScene();
						let a = this.shadowRoot.querySelector(".yb");
						a && (a.textContent = this._generateYAML()), this._toast(c[r]);
					}
				});
			}), e.querySelectorAll("[data-act]").forEach((e) => {
				let t = e.dataset.act;
				[
					"rename-room",
					"set-color",
					"zord-up",
					"zord-down",
					"create-room"
				].includes(t) || e.addEventListener("click", () => {
					if (t === "del-furn") this._furniture.splice(parseInt(e.dataset.fi), 1), this._rebuildScene(), this._closePanel(), this._toast("Eliminato");
					else if (t === "del-cw") this._cwalls.splice(parseInt(e.dataset.ci), 1), this._rebuildScene(), this._closePanel(), this._toast("Muro eliminato");
					else if (t === "del-room") {
						let t = e.dataset.rid, n = this._rooms.find((e) => e.id === t);
						n && confirm(`Eliminare "${n.name}"?`) && (this._rooms = this._rooms.filter((e) => e.id !== t), this._rebuildScene(), this._closePanel(), this._toast("Stanza eliminata!"));
					} else if (t === "add-cw") this._cwalls.push({
						x: this._cx,
						z: this._cz,
						w: 2,
						height: this._wallHeight,
						thickness: .1,
						rotation: 0
					}), this._rebuildScene(), this._openEditCW(this._cwalls.length - 1), this._toast("Muro aggiunto");
					else if (t === "add-furn") {
						let t = e.dataset.ft, n = i[t];
						this._furniture.push({
							type: t,
							x: this._cx,
							z: this._cz,
							w: n.w,
							h: n.h,
							d: n.d
						}), this._rebuildScene(), this._openEditFurniture(this._furniture.length - 1), this._toast("Aggiunto");
					} else t === "save" && this._saveConfig();
				});
			});
			let t = this.shadowRoot.querySelector(".cb");
			t && t.addEventListener("click", () => {
				navigator.clipboard?.writeText(this._generateYAML()).then(() => this._toast("YAML copiato!")).catch(() => this._toast("Seleziona e copia"));
			});
			let n = this.shadowRoot.querySelector(".sv");
			n && !n.dataset.act && n.addEventListener("click", () => this._saveConfig());
		}
		_yb() {
			return `<button class="sv" data-act="save">\ud83d\udcbe Salva</button><div class="sec">YAML</div><div class="yb">${this._generateYAML()}</div><button class="cb">\ud83d\udccb Copia YAML</button>`;
		}
		_saveConfig() {
			let e = {
				...this._config,
				rooms: JSON.parse(JSON.stringify(this._rooms)),
				furniture: JSON.parse(JSON.stringify(this._furniture))
			};
			this._cwalls.length ? e.custom_walls = JSON.parse(JSON.stringify(this._cwalls)) : delete e.custom_walls, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: e },
				bubbles: !0,
				composed: !0
			})), this._config = e, this._toast("Salvato!");
		}
		_generateYAML() {
			let e = `type: custom:floorplan-3d-card\ntitle: ${this._config?.title || "Casa"}\nheight: ${this._cardHeight}\nwall_height: ${this._wallHeight}\n`;
			return this._config?.sun_entity && (e += `sun_entity: ${this._config.sun_entity}\n`), this._config?.weather_entity && (e += `weather_entity: ${this._config.weather_entity}\n`), e += "rooms:\n", this._rooms.forEach((t) => {
				let n = t.position;
				e += `  - id: ${t.id}\n    name: ${t.name}\n    position:\n      x: ${n.x}\n      z: ${n.z}\n      w: ${n.w}\n      d: ${n.d}\n    color: "${t.color}"\n    emissive: "${t.emissive}"\n`, t.z_order != null && (e += `    z_order: ${t.z_order}\n`), e += "    walls:\n", [
					"north",
					"south",
					"east",
					"west"
				].forEach((n) => {
					let r = t.walls[n];
					e += `      ${n}:\n        enabled: ${r.enabled}\n        height: ${r.height}\n        thickness: ${r.thickness}\n`;
				}), e += "    entities:\n      lights:\n";
				let r = t.entities.lights || [];
				r.length ? r.forEach((t) => {
					e += `        - entity: ${t.entity}\n          type: ${t.type || "ceiling"}\n`;
				}) : e += "        []\n", e += "      sensors:\n", (t.entities.sensors || []).forEach((t) => e += `        - entity: ${t.entity}\n          icon: ${t.icon}\n          label: ${t.label}\n          unit: "${t.unit}"\n`), (t.entities.sensors || []).length || (e += "        []\n"), [
					"climate",
					"covers",
					"media",
					"vacuums",
					"doors"
				].forEach((n) => {
					let r = t.entities[n] || [];
					r.length ? (e += `      ${n}:\n`, r.forEach((t) => e += `        - ${t}\n`)) : e += `      ${n}: []\n`;
				});
			}), this._cwalls.length && (e += "\ncustom_walls:\n", this._cwalls.forEach((t) => {
				e += `  - x: ${t.x}\n    z: ${t.z}\n    w: ${t.w || 2}\n    height: ${t.height || this._wallHeight}\n    thickness: ${t.thickness || .1}\n    rotation: ${t.rotation || 0}\n`;
			})), e += "\nfurniture:\n", this._furniture.forEach((t) => {
				e += `  - type: ${t.type}\n    x: ${t.x}\n    z: ${t.z}\n`, t.w && (e += `    w: ${t.w}\n`), t.h && (e += `    h: ${t.h}\n`), t.d && (e += `    d: ${t.d}\n`), t.rotation && (e += `    rotation: ${t.rotation}\n`), t.url && (e += `    url: "${t.url}"\n`);
			}), e += "\nstats:\n", this._statSensors.forEach((t) => e += `  - entity: ${t.entity}\n    label: ${t.label}\n`), e;
		}
		_s(e) {
			return this._hass?.states?.[e] || null;
		}
		_sv(e) {
			return this._s(e)?.state || "unavailable";
		}
		_fn(e) {
			return this._s(e)?.attributes?.friendly_name || e.split(".").pop().replace(/_/g, " ");
		}
		_getLightEntityId(e) {
			return typeof e == "string" ? e : e.entity;
		}
		_getRoomLightLevel(e) {
			let t = this._rooms.find((t) => t.id === e);
			if (!t) return 0;
			let n = 0, r = 0;
			return (t.entities.lights || []).forEach((e) => {
				let t = this._s(e.entity);
				this._isEntityActive(t) && (n += t.attributes?.brightness == null ? 1 : t.attributes.brightness / 255, r++);
			}), r > 0 ? n / r : 0;
		}
		_getRoomLitCount(e) {
			let t = this._rooms.find((t) => t.id === e);
			return t ? (t.entities.lights || []).filter((e) => this._isEntityActive(this._s(e.entity))).length : 0;
		}
		_isEntityActive(e) {
			if (!e || e.state === "unavailable" || e.state === "unknown") return !1;
			let t = e.entity_id.split(".")[0], n = e.state;
			switch (t) {
				case "light":
				case "switch":
				case "input_boolean": return n === "on";
				case "climate": return n !== "off";
				case "media_player": return [
					"playing",
					"paused",
					"buffering",
					"on"
				].includes(n);
				case "cover": return n === "open" || n === "opening";
				case "vacuum": return ["cleaning", "returning"].includes(n);
				case "binary_sensor": return n === "on";
				default: return n === "on" || n === "true" || n === "active" || n === "open";
			}
		}
		_updateAtmosphere() {
			if (!this._scene || !this._hass || !this._config) return;
			let e = this._config.sun_entity || (this._hass.states?.["sun.sun"] ? "sun.sun" : null), t = this._config.weather_entity, n = !1, r = 45, i = "sunny";
			if (e) {
				let t = this._hass.states?.[e];
				n = t?.state === "below_horizon", r = t?.attributes?.elevation ?? (n ? -10 : 45);
			}
			t && (i = this._sv(t));
			let a = !n && r >= -6 && r < 10, o = a ? Math.max(0, (r + 6) / 16) : n ? 0 : 1, s = 657935, c = .02, l = 4482730, u = 1118498, d = 3158096, f = 0, p = !1, m = !1, h = !1;
			if (n) (i.includes("rain") || i.includes("storm") || i.includes("lightning") || i.includes("fog")) && (s = 328968, c = .04, p = !0);
			else {
				let e = i.includes("lightning");
				p = i.includes("rain") || i.includes("pour") || i.includes("storm") || e, m = i.includes("cloud") || i.includes("partly"), h = i.includes("fog");
				let t = i.includes("snow") || i.includes("sleet") || i.includes("hail"), n = i.includes("wind");
				if (p || e ? (s = 6710903, c = .04, l = 8952234, u = 4473941, d = 5263456, f = e ? .05 : .1) : h ? (s = 10066329, c = .08, l = 11184810, u = 6710886, d = 6316128, f = .05) : t ? (s = 11189196, c = .035, l = 14544639, u = 8952234, d = 8423576, f = .15) : m ? (s = 8952234, c = .025, l = 11189196, u = 5592422, d = 7368832, f = .2) : n ? (s = 8956620, c = .015, l = 12307677, u = 4473941, d = 7372960, f = .4) : (s = 8900331, c = .01, l = 16777215, u = 4473924, d = 9474208, f = .5), a) {
					let e = (e) => e >> 16 & 255, t = (e) => e >> 8 & 255, n = (e) => e & 255, r = (e, t, n) => Math.round(e + (t - e) * n), i = (i, a, o) => r(e(i), e(a), o) << 16 | r(t(i), t(a), o) << 8 | r(n(i), n(a), o);
					s = i(1707776, s, o), d = i(1050632, d, o), l = i(2232576, l, o), f *= o, c *= .5 + .5 * o;
				}
			}
			this._renderer && this._renderer.setClearColor(n ? 5 : s, 0), this._scene.fog && (this._scene.fog.color.setHex(s), this._scene.fog.density = c), this._ambientLight && this._ambientLight.color.setHex(d), this._hemiLight && (this._hemiLight.color.setHex(l), this._hemiLight.groundColor.setHex(u)), this._dirLight && (this._dirLight.intensity = f), this._updateSkyDome(n, s, r, m, h, p);
		}
		_onHassUpdate(e) {
			if (!this._hass || !e) return;
			let t = this._config?.sun_entity || "sun.sun", n = this._config?.weather_entity, r = this._hass.states?.[t]?.state !== e.states?.[t]?.state || this._hass.states?.[t]?.attributes?.elevation !== e.states?.[t]?.attributes?.elevation, i = n && (this._hass.states?.[n]?.state !== e.states?.[n]?.state || this._hass.states?.[n]?.attributes?.temperature !== e.states?.[n]?.attributes?.temperature);
			(r || i) && this._updateAtmosphere(), i && this._updateStats();
			let a = /* @__PURE__ */ new Set(), o = !1;
			for (let t in this._entityRoomMap) {
				let n = this._hass.states?.[t], r = e.states?.[t];
				(n?.state !== r?.state || n?.attributes?.brightness !== r?.attributes?.brightness || n?.attributes?.rgb_color?.join() !== r?.attributes?.rgb_color?.join()) && a.add(this._entityRoomMap[t]);
			}
			for (let t of this._statSensors) this._hass.states?.[t.entity]?.state !== e.states?.[t.entity]?.state && (o = !0);
			a.forEach((e) => {
				this._updateRoomVisual(e), this._labelsDirty = !0;
			}), o && this._updateStats(), this._selectedRoomId && a.has(this._selectedRoomId) && !this._editMode && this._openPanel(this._selectedRoomId);
		}
		_updateRoomVisual(e) {
			let t = this._rooms.find((t) => t.id === e);
			if (!t) return;
			let n = this._getRoomLightLevel(e), r = this._roomFloorMats[e], i = this._roomGlowMeshes[e], a = this._roomPointLights[e];
			r && (r.emissive = n > 0 ? new THREE.Color(t.emissive || t.color) : new THREE.Color(0), r.emissiveIntensity = this._selectedRoomId === e ? .35 : n * .25), i && (i.material.opacity = n * .1), a && (a.intensity = n * .4), (t.entities.lights || []).forEach((e) => {
				let t = e.entity, n = this._lightFixtures[t];
				if (!n) return;
				let r = this._s(t), i = this._isEntityActive(r), a = r?.attributes?.brightness == null ? i ? 1 : 0 : r.attributes.brightness / 255, o = r?.attributes?.rgb_color, s = o ? new THREE.Color(o[0] / 255, o[1] / 255, o[2] / 255) : new THREE.Color(16771264);
				if (n._isOn = i, i) {
					if (n.bulbMat.emissive.copy(s), n.bulbMat.emissiveIntensity = .8 * a, n._bulbBaseIntensity = .8 * a, n.bulbMat.color.copy(s).multiplyScalar(.3).add(new THREE.Color(4473941).multiplyScalar(.7)), n.pointLight.color.copy(s), n.pointLight.intensity = a * (n.type === "table" ? 1.5 : n.type === "led_strip" ? 1 : 2.5), n.spotLight && (n.spotLight.color.copy(s), n.spotLight.intensity = a * 2), n.coneMesh) {
						n.coneMesh.material.color.copy(s);
						let e = n.type === "ceiling" ? .06 * a : n.type === "pendant" ? .07 * a : n.type === "table" ? .04 * a : .12 * a;
						n.coneMesh.material.opacity = e, n._coneBaseOpacity = e;
					}
					if (n.glowCircle) {
						n.glowCircle.material.color.copy(s);
						let e = n.type === "table" ? .08 * a : .15 * a;
						n.glowCircle.material.opacity = e, n._glowBaseOpacity = e;
					}
				} else n.bulbMat.emissive.set(0), n.bulbMat.emissiveIntensity = 0, n.bulbMat.color.set(4473941), n._bulbBaseIntensity = 0, n.pointLight.intensity = 0, n.spotLight && (n.spotLight.intensity = 0), n.coneMesh && (n.coneMesh.material.opacity = 0, n._coneBaseOpacity = 0), n.glowCircle && (n.glowCircle.material.opacity = 0, n._glowBaseOpacity = 0);
			});
		}
		_updateAllVisuals() {
			this._rooms.forEach((e) => this._updateRoomVisual(e.id));
		}
		_weatherLabel(e) {
			return {
				sunny: "☀️ Soleggiato",
				"clear-night": "🌙 Sereno",
				partlycloudy: "⛅ Parz. nuvoloso",
				cloudy: "☁️ Nuvoloso",
				fog: "🌫️ Nebbia",
				rainy: "🌧️ Pioggia",
				pouring: "🌧️ Acquazzone",
				lightning: "⛈️ Temporale",
				"lightning-rainy": "⛈️ Temporale",
				snowy: "❄️ Neve",
				"snowy-rainy": "🌨️ Nevischio",
				hail: "🌨️ Grandine",
				windy: "💨 Vento",
				"windy-variant": "💨 Vento",
				exceptional: "⚠️ Condizioni eccezionali"
			}[e] || e;
		}
		_updateStats() {
			let e = this.shadowRoot.getElementById("stats");
			if (!e || !this._hass) return;
			let t = "", n = this._config?.weather_entity;
			if (n) {
				let e = this._hass.states?.[n];
				if (e && e.state !== "unavailable") {
					let n = e.attributes?.temperature, r = e.attributes?.temperature_unit ?? "°C", i = this._weatherLabel(e.state), a = n == null ? "" : ` <strong>${Math.round(n)}${r}</strong>`;
					t += `<div class="pill">${i}${a}</div>`;
				}
			}
			t += this._statSensors.map((e) => {
				let t = this._sv(e.entity), n = e.unit ?? this._hass?.states?.[e.entity]?.attributes?.unit_of_measurement ?? "";
				return t === "unavailable" ? "" : `<div class="pill">${e.label} <strong>${t}${n}</strong></div>`;
			}).join(""), e.innerHTML = t;
		}
		_openPanel(e) {
			let t = this._rooms.find((t) => t.id === e);
			if (!t || !this._hass) return;
			this._selectedRoomId = e, this.shadowRoot.getElementById("pTitle").textContent = t.name;
			let n = this.shadowRoot.getElementById("pBody"), r = t.entities, i = "";
			r.lights?.length && (i += "<div class=\"sec\">Luci</div>", r.lights.forEach((e) => {
				let n = e.entity, r = e.type || "ceiling", a = this._s(n), o = this._isEntityActive(a), s = a?.attributes?.brightness, u = s == null ? o ? 100 : 0 : Math.round(s / 255 * 100), d = l[r] || "mdi:lightbulb";
				i += `<div class="row"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="${o ? d : "mdi:lightbulb-off-outline"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(n)} <span style="opacity:.4;font-size:9px">\u00b7 ${c[r] || r}</span></div><div class="eval ${o ? "" : "off"}">${o ? u + "%" : "Off"}</div>${o ? `<input type="range" class="bri" min="1" max="100" value="${u}" style="background:linear-gradient(90deg,${t.color} ${u}%,rgba(255,255,255,.1) ${u}%)" data-entity="${n}" data-a="bri"/>` : ""}</div><button class="tog ${o ? "on" : "off"}" data-entity="${n}" data-a="tog-light"></button></div>`;
			})), r.climate?.length && (i += "<div class=\"sec\">Clima</div>", r.climate.forEach((e) => {
				let n = this._s(e);
				if (!n || n.state === "unavailable") return;
				let r = !this._isEntityActive(n), a = n.attributes?.current_temperature, o = n.attributes?.temperature;
				i += `<div class="row"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="mdi:snowflake"></ha-icon></div><div class="info"><div class="ename">${this._fn(e)}</div><div class="eval ${r ? "off" : ""}">${r ? "Off" : n.state}${a == null ? "" : " · " + a + "°C"}${o == null ? "" : " → " + o + "°C"}</div></div><button class="tog ${r ? "off" : "on"}" data-entity="${e}" data-a="tog-climate"></button></div>`;
			})), r.sensors?.length && (i += "<div class=\"sec\">Sensori</div>", r.sensors.forEach((e) => {
				let n = this._sv(e.entity);
				n !== "unavailable" && (i += `<div class="row"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="${e.icon || "mdi:eye"}"></ha-icon></div><div class="info"><div class="ename">${e.label}</div><div class="eval">${n}${e.unit || ""}</div></div></div>`);
			})), r.doors?.length && (i += "<div class=\"sec\">Porte</div>", r.doors.forEach((e) => {
				let n = this._s(e);
				if (!n || n.state === "unavailable") return;
				let r = this._isEntityActive(n);
				i += `<div class="row"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="mdi:${r ? "door-open" : "door-closed-lock"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(e)}</div><div class="eval">${r ? "Aperta" : "Chiusa"}</div></div></div>`;
			})), r.covers?.length && (i += "<div class=\"sec\">Tende</div>", r.covers.forEach((e) => {
				let n = this._s(e);
				!n || n.state === "unavailable" || (i += `<div class="row" style="flex-wrap:wrap"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="mdi:blinds"></ha-icon></div><div class="info"><div class="ename">${this._fn(e)}</div><div class="eval">${n.state}</div></div><div style="width:100%;padding-left:38px;margin-top:4px;display:flex;gap:4px"><button class="abtn" data-entity="${e}" data-a="cover-open">Apri</button><button class="abtn" data-entity="${e}" data-a="cover-close">Chiudi</button><button class="abtn" data-entity="${e}" data-a="cover-stop">Stop</button></div></div>`);
			})), r.vacuums?.length && (i += "<div class=\"sec\">Robot</div>", r.vacuums.forEach((e) => {
				let n = this._s(e);
				n && (i += `<div class="row" style="flex-wrap:wrap"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="mdi:robot-vacuum"></ha-icon></div><div class="info"><div class="ename">${this._fn(e)}</div><div class="eval">${n.state}</div></div><div style="width:100%;padding-left:38px;margin-top:4px;display:flex;gap:4px"><button class="abtn" data-entity="${e}" data-a="vac-start">Start</button><button class="abtn" data-entity="${e}" data-a="vac-dock">Dock</button><button class="abtn" data-entity="${e}" data-a="vac-pause">Pausa</button></div></div>`);
			})), r.media?.length && (i += "<div class=\"sec\">Media</div>", r.media.forEach((e) => {
				let n = this._s(e);
				if (!n || n.state === "unavailable") return;
				let r = !this._isEntityActive(n), a = n.attributes?.media_title, o = n.attributes?.media_artist;
				i += `<div class="row"><div class="ico" style="background:${t.color}22;color:${t.color}"><ha-icon icon="mdi:${n.attributes?.device_class === "tv" ? "television" : "speaker"}"></ha-icon></div><div class="info"><div class="ename">${this._fn(e)}</div><div class="eval ${r ? "off" : ""}">${n.state}</div>${a ? `<div class="eextra">${o ? o + " – " : ""}${a}</div>` : ""}</div><button class="tog ${r ? "off" : "on"}" data-entity="${e}" data-a="tog-gen"></button></div>`;
			})), r.lights?.length && (i += "<div class=\"sec\">Azioni rapide</div>", i += `<div style="display:flex;gap:4px"><button class="abtn" data-room="${e}" data-a="all-off">Tutto off</button><button class="abtn" data-room="${e}" data-a="all-on">Tutto on</button></div>`), n.innerHTML = i, this.shadowRoot.getElementById("panel").style.display = "block", n.onclick = (e) => this._handleClick(e), n.oninput = (e) => this._handleInput(e, t), this._updateAllVisuals();
		}
		_closePanel() {
			this._selectedRoomId = null, this._selectedEdit = null, this.shadowRoot.getElementById("panel").style.display = "none", this._updateAllVisuals();
		}
		async _call(e, t, n) {
			try {
				this._toast(`${e}.${t}`), await this._hass.callService(e, t, n);
			} catch (e) {
				this._toast("Errore: " + e.message);
			}
		}
		_handleClick(e) {
			let t = e.target.closest("[data-a]");
			if (!t) return;
			let n = t.dataset.a, r = t.dataset.entity, i = t.dataset.room;
			switch (n) {
				case "tog-light":
					this._call("light", this._isEntityActive(this._s(r)) ? "turn_off" : "turn_on", { entity_id: r });
					break;
				case "tog-climate":
					this._call("climate", this._isEntityActive(this._s(r)) ? "turn_off" : "turn_on", { entity_id: r });
					break;
				case "tog-gen": {
					let e = r.split(".")[0];
					this._call(e, this._isEntityActive(this._s(r)) ? "turn_off" : "turn_on", { entity_id: r });
					break;
				}
				case "cover-open":
					this._call("cover", "open_cover", { entity_id: r });
					break;
				case "cover-close":
					this._call("cover", "close_cover", { entity_id: r });
					break;
				case "cover-stop":
					this._call("cover", "stop_cover", { entity_id: r });
					break;
				case "vac-start":
					this._call("vacuum", "start", { entity_id: r });
					break;
				case "vac-dock":
					this._call("vacuum", "return_to_base", { entity_id: r });
					break;
				case "vac-pause":
					this._call("vacuum", "pause", { entity_id: r });
					break;
				case "all-off":
					this._rooms.find((e) => e.id === i)?.entities.lights?.forEach((e) => this._call("light", "turn_off", { entity_id: e.entity }));
					break;
				case "all-on":
					this._rooms.find((e) => e.id === i)?.entities.lights?.forEach((e) => this._call("light", "turn_on", { entity_id: e.entity }));
					break;
			}
		}
		_handleInput(e, t) {
			let n = e.target.closest("[data-a=\"bri\"]");
			if (!n) return;
			let r = n.dataset.entity, i = parseInt(n.value);
			n.style.background = `linear-gradient(90deg,${t.color} ${i}%,rgba(255,255,255,.1) ${i}%)`, clearTimeout(this._briT), this._briT = setTimeout(() => this._call("light", "turn_on", {
				entity_id: r,
				brightness: Math.round(i / 100 * 255)
			}), 200);
		}
		_toast(e) {
			let t = this.shadowRoot.getElementById("toast");
			t && (t.textContent = e, t.classList.add("show"), clearTimeout(this._toastT), this._toastT = setTimeout(() => t.classList.remove("show"), 1500));
		}
		disconnectedCallback() {
			this._animId && cancelAnimationFrame(this._animId), this._atmosphereInterval && clearInterval(this._atmosphereInterval);
		}
	};
})), x, S, C = e((() => {
	x = [
		{
			name: "title",
			label: "Titolo Scheda",
			selector: { text: {} }
		},
		{
			name: "height",
			label: "Altezza Card (px)",
			selector: { number: {
				min: 200,
				max: 1e3,
				step: 10,
				mode: "box"
			} }
		},
		{
			name: "wall_height",
			label: "Altezza default dei Muri (m)",
			selector: { number: {
				min: 1,
				max: 4,
				step: .1,
				mode: "box"
			} }
		},
		{
			name: "sun_entity",
			label: "Entità Sole (giorno/notte)",
			selector: { entity: { domain: "sun" } }
		},
		{
			name: "weather_entity",
			label: "Entità Meteo (atmosfera)",
			selector: { entity: { domain: "weather" } }
		}
	], S = class extends HTMLElement {
		setConfig(e) {
			this._config = {
				sun_entity: void 0,
				weather_entity: void 0,
				...e
			}, this._yamlEditor && (this._yamlEditor.defaultValue = this._config), this._haForm && (this._haForm.data = this._config), this._render();
		}
		set hass(e) {
			this._hass = e, this._haForm && (this._haForm.hass = e), this._yamlEditor && (this._yamlEditor.hass = e);
		}
		connectedCallback() {
			this.shadowRoot || (this.attachShadow({ mode: "open" }), this._render());
		}
		_render() {
			!this.shadowRoot || !this._config || (this._initialized ? (this._haForm && this._haForm.data !== this._config && (this._haForm.data = this._config), this._yamlEditor && this._yamlEditor.defaultValue !== this._config && (this._yamlEditor.defaultValue = this._config)) : (this._initialized = !0, this.shadowRoot.innerHTML = "\n        <style>\n          .form-container { margin-bottom: 24px; display: block; }\n          .alert { background: rgba(255,152,0,0.1); border-left: 4px solid #ff9800; padding: 12px; margin-bottom: 24px; font-size: 14px; color: var(--primary-text-color); }\n          .yaml-container { display: block; }\n          .yaml-container p { margin-bottom: 8px; font-weight: bold; color: var(--primary-text-color); }\n        </style>\n        <div class=\"alert\">\n          <strong>✨ Suggerimento per l'editor 3D:</strong> Chiudi questa finestra cliccando su \"Salva\" nell'interfaccia Lovelace, poi usa il pulsante <strong>\"✏️ Edit\"</strong> che vedi sopra al rettangolo 3D della plancia! Modificando spostamenti, luci e colori da lì, il file YAML della plancia si aggiornerà in automatico.\n        </div>\n        <div class=\"form-container\">\n          <ha-form></ha-form>\n        </div>\n        <div class=\"yaml-container\">\n          <p>Configurazione YAML (generata automaticamente dall'editor 3D interno):</p>\n          <ha-yaml-editor></ha-yaml-editor>\n        </div>\n      ", this._haForm = this.shadowRoot.querySelector("ha-form"), this._haForm.hass = this._hass, this._haForm.data = this._config, this._haForm.schema = x, this._haForm.computeLabel = (e) => e.label || e.name, this._haForm.addEventListener("value-changed", (e) => this._formChanged(e)), this._yamlEditor = this.shadowRoot.querySelector("ha-yaml-editor"), this._yamlEditor.hass = this._hass, this._yamlEditor.defaultValue = this._config, this._yamlEditor.addEventListener("value-changed", (e) => this._yamlChanged(e))));
		}
		_formChanged(e) {
			if (e.stopPropagation(), !this._config) return;
			let t = {
				...this._config,
				...e.detail.value
			};
			this._dispatchConfig(t);
		}
		_yamlChanged(e) {
			e.stopPropagation(), !(!this._config || !e.detail.isValid) && this._dispatchConfig(e.detail.value);
		}
		_dispatchConfig(e) {
			this._config = e, this.dispatchEvent(new CustomEvent("config-changed", {
				detail: { config: e },
				bubbles: !0,
				composed: !0
			}));
		}
	};
})), w = /* @__PURE__ */ t((() => {
	b(), C(), customElements.get("floorplan-3d-card") || customElements.define("floorplan-3d-card", y), customElements.get("floorplan-3d-card-editor") || customElements.define("floorplan-3d-card-editor", S), window.customCards = window.customCards || [], window.customCards.push({
		type: "floorplan-3d-card",
		name: "3D Floor Plan",
		preview: !0,
		description: "3D floor plan with light fixtures, optimized performance"
	});
}));
//#endregion
export default w();
