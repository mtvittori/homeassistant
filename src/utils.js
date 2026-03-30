export function normLights(a) {
  if (!a) return [];
  return a.map((l) =>
    typeof l === "string"
      ? { entity: l, type: "ceiling" }
      : l && l.entity
        ? {
            entity: l.entity,
            type: l.type || "ceiling",
            offset_x: l.offset_x,
            offset_z: l.offset_z,
          }
        : { entity: String(l), type: "ceiling" },
  );
}

let _gc = null;
export function GC() {
  if (_gc) return _gc;
  if (typeof window.THREE === "undefined") return {};
  const THREE = window.THREE;
  _gc = {
    cB: new THREE.CylinderGeometry(0.18, 0.18, 0.03, 12),
    cD: new THREE.SphereGeometry(0.15, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2),
    tB: new THREE.CylinderGeometry(0.06, 0.08, 0.02, 8),
    tS: new THREE.CylinderGeometry(0.015, 0.015, 0.28, 6),
    tSh: new THREE.CylinderGeometry(0.08, 0.12, 0.14, 10, 1, true),
    tBl: new THREE.SphereGeometry(0.035, 6, 6),
    pW: new THREE.CylinderGeometry(0.005, 0.005, 0.6, 4),
    pC: new THREE.CylinderGeometry(0.06, 0.06, 0.02, 8),
    pG: new THREE.SphereGeometry(0.12, 12, 8),
    lS: new THREE.BoxGeometry(0.8, 0.02, 0.02),
    lG: new THREE.PlaneGeometry(0.9, 0.3),
    gS: new THREE.CircleGeometry(0.4, 16),
    gM: new THREE.CircleGeometry(0.5, 16),
    gL: new THREE.CircleGeometry(0.8, 16),
    gP: new THREE.PlaneGeometry(50, 50),
    uB: new THREE.BoxGeometry(1, 1, 1),
  };
  return _gc;
}
