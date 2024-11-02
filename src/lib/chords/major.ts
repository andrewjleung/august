import { ChordShape } from "@/types";

export const E_CHORD: ChordShape = new ChordShape({
	fingerings: [
		{ type: "open" },
		{ type: "finger", fret: 2, finger: 2 },
		{ type: "finger", fret: 2, finger: 3 },
		{ type: "finger", fret: 1, finger: 1 },
		{ type: "open" },
		{ type: "open" },
	],
});

export const A_CHORD: ChordShape = new ChordShape({
	fingerings: [
		{ type: "mute" },
		{ type: "open" },
		{ type: "finger", fret: 2, finger: 1 },
		{ type: "finger", fret: 2, finger: 2 },
		{ type: "finger", fret: 2, finger: 3 },
		{ type: "open" },
	],
});

export const D_CHORD: ChordShape = new ChordShape({
	fingerings: [
		{ type: "mute" },
		{ type: "mute" },
		{ type: "open" },
		{ type: "finger", fret: 2, finger: 1 },
		{ type: "finger", fret: 3, finger: 3 },
		{ type: "finger", fret: 2, finger: 2 },
	],
});

export const C_CHORD: ChordShape = new ChordShape({
	fingerings: [
		{ type: "open" },
		{ type: "finger", fret: 3, finger: 3 },
		{ type: "finger", fret: 2, finger: 2 },
		{ type: "open" },
		{ type: "finger", fret: 1, finger: 1 },
		{ type: "open" },
	],
});

export const G_CHORD: ChordShape = new ChordShape({
	fingerings: [
		{ type: "finger", fret: 3, finger: 2 },
		{ type: "finger", fret: 2, finger: 1 },
		{ type: "open" },
		{ type: "open" },
		{ type: "open" },
		{ type: "finger", fret: 3, finger: 3 },
	],
});
