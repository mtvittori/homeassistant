export const THREE_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
export const GLTF_CDN =
  "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js";
export const FURN_CAT = {
  bed: { w: 1.6, h: 0.35, d: 2, color: 0x333344 },
  sofa: { w: 2, h: 0.4, d: 0.8, color: 0x333344 },
  desk: { w: 1.6, h: 0.04, d: 0.6, color: 0x333344 },
  table: { w: 1.2, h: 0.75, d: 0.8, color: 0x333344 },
  tv: { w: 1.4, h: 0.8, d: 0.05, color: 0x111118, emissive: 0x111122 },
  wardrobe: { w: 1.8, h: 2, d: 0.5, color: 0x2a2a38 },
  chair: { w: 0.5, h: 0.45, d: 0.5, color: 0x333344 },
  bath: { w: 0.7, h: 0.55, d: 1.6, color: 0xdddde8 },
  shower: { w: 0.9, h: 0.05, d: 0.9, color: 0xbbbbcc },
  kitchen_counter: { w: 2.5, h: 0.9, d: 0.6, color: 0x3a3a48 },
  fridge: { w: 0.7, h: 1.8, d: 0.7, color: 0xcccccc },
  washing: { w: 0.6, h: 0.85, d: 0.6, color: 0xdddddd },
};
export const WL = {
  north: "Nord \u2191",
  south: "Sud \u2193",
  east: "Est \u2192",
  west: "Ovest \u2190",
};
export const ROOM_COLORS = [
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
  "#FAD4A5",
];
export const ROOM_EMISSIVES = [
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
  "#DD9955",
];
export const LIGHT_TYPES = {
  ceiling: "Plafoniera",
  table: "Lampada mobile",
  pendant: "Lampadario",
  led_strip: "Striscia LED",
};
export const LIGHT_ICONS = {
  ceiling: "mdi:ceiling-light",
  table: "mdi:lamp",
  pendant: "mdi:chandelier",
  led_strip: "mdi:led-strip-variant",
};
export const DEF_ROOMS = [
  {
    id: "camera",
    name: "Camera da letto",
    position: { x: 0, z: 0, w: 3.2, d: 3.5 },
    color: "#5DCAA5",
    emissive: "#1D9E75",
    walls: {
      north: { enabled: true, height: 2.4, thickness: 0.08 },
      south: { enabled: true, height: 2.4, thickness: 0.08 },
      east: { enabled: true, height: 2.4, thickness: 0.08 },
      west: { enabled: true, height: 2.4, thickness: 0.08 },
    },
    entities: {
      lights: [
        { entity: "light.camera", type: "ceiling" },
        { entity: "light.comodino_mamo", type: "table" },
      ],
      sensors: [
        {
          entity: "sensor.sensore_camera_temperature",
          icon: "mdi:thermometer",
          label: "Temperatura",
          unit: "\u00b0C",
        },
        {
          entity: "sensor.sensore_camera_humidity",
          icon: "mdi:water-percent",
          label: "Umidit\u00e0",
          unit: "%",
        },
        {
          entity: "sensor.sensore_camera_pm2_5",
          icon: "mdi:blur",
          label: "PM2.5",
          unit: " \u03bcg/m\u00b3",
        },
      ],
      climate: [],
      covers: [],
      media: [],
      vacuums: [],
      doors: [],
    },
  },
  {
    id: "studio",
    name: "Studio",
    position: { x: 3.2, z: 0, w: 3.3, d: 3.5 },
    color: "#AFA9EC",
    emissive: "#7F77DD",
    walls: {
      north: { enabled: true, height: 2.4, thickness: 0.08 },
      south: { enabled: true, height: 2.4, thickness: 0.08 },
      east: { enabled: true, height: 2.4, thickness: 0.08 },
      west: { enabled: true, height: 2.4, thickness: 0.08 },
    },
    entities: {
      lights: [{ entity: "light.studio", type: "ceiling" }],
      sensors: [],
      climate: ["climate.condizionatore_studio_air_conditioner"],
      covers: ["cover.tenda_studio"],
      media: ["media_player.poddino"],
      vacuums: [],
      doors: [],
    },
  },
  {
    id: "soggiorno",
    name: "Soggiorno",
    position: { x: 6.5, z: 0, w: 3.5, d: 5.5 },
    color: "#85B7EB",
    emissive: "#378ADD",
    walls: {
      north: { enabled: true, height: 2.4, thickness: 0.08 },
      south: { enabled: true, height: 2.4, thickness: 0.08 },
      east: { enabled: true, height: 2.4, thickness: 0.08 },
      west: { enabled: true, height: 2.4, thickness: 0.08 },
    },
    entities: {
      lights: [
        { entity: "light.cucina", type: "ceiling" },
        { entity: "light.lizzie", type: "table" },
        { entity: "light.luce_salone", type: "pendant" },
        { entity: "light.linda", type: "led_strip" },
      ],
      sensors: [
        {
          entity: "sensor.condizionatore_salone_indoor_temperature",
          icon: "mdi:thermometer",
          label: "Temp interna",
          unit: "\u00b0C",
        },
        {
          entity: "sensor.condizionatore_salone_outdoor_temperature",
          icon: "mdi:thermometer",
          label: "Temp esterna",
          unit: "\u00b0C",
        },
      ],
      climate: [
        "climate.condizionatore_salone_air_conditioner",
        "climate.castform",
      ],
      covers: [],
      media: ["media_player.the_frame", "media_player.linda_2"],
      vacuums: ["vacuum.eufymia"],
      doors: [
        "binary_sensor.abomasnow_door",
        "binary_sensor.sensore_balcone_door",
      ],
    },
  },
  {
    id: "bagno",
    name: "Bagno",
    position: { x: 0, z: 3.5, w: 2.5, d: 2 },
    color: "#F0997B",
    emissive: "#D85A30",
    walls: {
      north: { enabled: true, height: 2.4, thickness: 0.08 },
      south: { enabled: true, height: 2.4, thickness: 0.08 },
      east: { enabled: true, height: 2.4, thickness: 0.08 },
      west: { enabled: true, height: 2.4, thickness: 0.08 },
    },
    entities: {
      lights: [
        { entity: "light.bagno", type: "ceiling" },
        { entity: "light.bagno2", type: "led_strip" },
      ],
      sensors: [],
      climate: [],
      covers: [],
      media: [],
      vacuums: [],
      doors: [],
    },
  },
  {
    id: "cucina",
    name: "Cucina",
    position: { x: 2.5, z: 3.5, w: 4, d: 2 },
    color: "#FAC775",
    emissive: "#BA7517",
    walls: {
      north: { enabled: true, height: 2.4, thickness: 0.08 },
      south: { enabled: true, height: 2.4, thickness: 0.08 },
      east: { enabled: false, height: 2.4, thickness: 0.08 },
      west: { enabled: true, height: 2.4, thickness: 0.08 },
    },
    entities: {
      lights: [],
      sensors: [],
      climate: [],
      covers: [],
      media: [],
      vacuums: [],
      doors: ["binary_sensor.sensore_porta_door"],
    },
  },
];
export const DEF_CW = [];
export const DEF_FURN = [
  { type: "bed", x: 1.6, z: 1.2 },
  { type: "desk", x: 4.85, z: 1.5 },
  { type: "sofa", x: 8.25, z: 3.5 },
  { type: "tv", x: 8.25, z: 0.12 },
];
export const DEF_STATS = [
  {
    entity: "sensor.condizionatore_salone_air_temperature_outdoor",
    label: "Ext",
  },
  {
    entity: "sensor.condizionatore_salone_indoor_temperature",
    label: "Salone",
  },
  {
    entity: "sensor.condizionatore_studio_indoor_temperature",
    label: "Studio",
  },
  { entity: "sensor.sensore_camera_temperature", label: "Camera" },
];
