import { match } from "ts-pattern";

export type Tone = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type NoteName =
	| "A"
	| "A#"
	| "Bb"
	| "B"
	| "C"
	| "C#"
	| "Db"
	| "D"
	| "D#"
	| "Eb"
	| "E"
	| "F"
	| "F#"
	| "Gb"
	| "G"
	| "G#"
	| "Ab";

export type NoteObject = {
	name: NoteName;
	octave: number;
};

export class Note {
	public name: NoteName;
	public octave: number;

	constructor({ name, octave }: NoteObject) {
		this.name = name;
		this.octave = octave;
	}

	tone(): number {
		return this.octave * 12 + this.normalTone();
	}

	normalTone(): Tone {
		return NOTE_TO_TONE[this.name];
	}

	alt(): Note | null {
		const notes = TONE_TO_NOTES[this.normalTone()];
		const altName = notes.find((n) => n !== this.name);

		if (altName === undefined) return null;

		return new Note({ name: altName, octave: this.octave });
	}

	toString(): string {
		return `${this.name}${this.octave}`;
	}

	toObj(): NoteObject {
		return { name: this.name, octave: this.octave };
	}
}

export const NOTE_TO_TONE: Record<NoteName, Tone> = {
	C: 0,
	"C#": 1,
	Db: 1,
	D: 2,
	"D#": 3,
	Eb: 3,
	E: 4,
	F: 5,
	"F#": 6,
	Gb: 6,
	G: 7,
	"G#": 8,
	Ab: 8,
	A: 9,
	"A#": 10,
	Bb: 10,
	B: 11,
};

export const TONE_TO_NOTES: Record<Tone, NoteName[]> = {
	0: ["C"],
	1: ["C#", "Db"],
	2: ["D"],
	3: ["D#", "Eb"],
	4: ["E"],
	5: ["F"],
	6: ["F#", "Gb"],
	7: ["G"],
	8: ["G#", "Ab"],
	9: ["A"],
	10: ["A#", "Bb"],
	11: ["B"],
};

export function toneToNotes(tone: number): NoteName[] {
	const normalizedTone: Tone = (tone % 12) as Tone;
	return TONE_TO_NOTES[normalizedTone];
}

export type Guitar = {
	strings: NoteObject[];
	numFrets: number;
	capo?: number;
};

export type Mute = {
	type: "mute";
};

export type Finger = {
	type: "finger";
	finger?: 1 | 2 | 3 | 4;
	fret: 1 | 2 | 3 | 4 | 5 | 6;
};

export type Barre = {
	type: "barre";
	finger: Finger;
};

export type Open = {
	type: "open";
};

export type Fingering = Mute | Finger | Barre | Open;

function getNote(string: Note, fingering: Fingering): Note[] {
	return match(fingering)
		.with({ type: "open" }, () => [string])
		.with({ type: "barre" }, (b) => getNote(string, b.finger))
		.with({ type: "finger" }, (f) => {
			const stringTone = NOTE_TO_TONE[string.name] + string.octave * 12;
			const fingeredTone = stringTone + f.fret;
			const newOctave = Math.floor(fingeredTone / 12);
			const newNotes: NoteName[] = toneToNotes(fingeredTone);

			return newNotes.map(
				(note) => new Note({ name: note, octave: newOctave }),
			);
		})
		.otherwise(() => []);
}

function getNotes(guitar: Guitar, fingerings: Fingering[]): Note[] {
	const notes = new Set(
		guitar.strings.flatMap((string, i) => {
			const fingering = fingerings[i];
			return getNote(new Note(string), fingering);
		}),
	);

	return Array.from(notes);
}

export type ChordShapeObject = {
	fingerings: Fingering[];
};

export class ChordShape {
	public fingerings: Fingering[];

	constructor({ fingerings }: ChordShapeObject) {
		this.fingerings = fingerings;
	}

	notes(guitar: Guitar) {
		return getNotes(guitar, this.fingerings);
	}

	toObj(): ChordShapeObject {
		return { fingerings: this.fingerings };
	}
}
