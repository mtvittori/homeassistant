import { FloorPlan3DCard } from "./card.js";
import { FloorPlan3DCardEditor } from "./editor.js";

customElements.define("floorplan-3d-card", FloorPlan3DCard);
customElements.define("floorplan-3d-card-editor", FloorPlan3DCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "floorplan-3d-card",
  name: "3D Floor Plan",
  preview: true,
  description: "3D floor plan with light fixtures, optimized performance",
});
