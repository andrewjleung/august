type Tone = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type NoteName =
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
type Note = { name: NoteName; octave: number };

const NOTE_TO_TONE: Record<NoteName, Tone> = {
	A: 1,
	"A#": 2,
	Bb: 2,
	B: 3,
	C: 4,
	"C#": 5,
	Db: 5,
	D: 6,
	"D#": 7,
	Eb: 7,
	E: 8,
	F: 9,
	"F#": 10,
	Gb: 10,
	G: 11,
	"G#": 11,
	Ab: 12,
};

type Guitar = {
	strings: Note;
	numFrets: number;
	capo?: number;
};

type Mute = {
	type: "mute";
	string: number;
};

type Finger = {
	type: "finger";
	string: number;
	fret: number;
	variation: boolean;
	finger?: 1 | 2 | 3 | 4;
};

type Barre = {
	type: "barre";
	start: Finger;
	end: Finger;
};

type Fingering = Mute | Finger | Barre;

type Chord = {
	fingerings: Fingering[];
};

function ChordChart({
	guitar,
	chord,
}: {
	guitar: Guitar;
	chord: Chord;
}) {
	return (
		<>
			<div className="relative">
				<div className="flex flex-col w-fit m-12">
					{Array(guitar.numFrets)
						.fill(null)
						.map((_, i) => {
							return (
								<>
									<div key={`fret-finger-${i}`} className="flex flex-row gap-8">
										{guitar.strings.map((string, stringPosition) => {
											const fret = i + 1;

											return (
												<div
													key={`string-${stringPosition}-fret-${fret}`}
													className="bg-black w-1 h-16"
												/>
											);
										})}
									</div>
									<div
										key={`fret-${i}`}
										className="w-full h-1 bg-neutral-500"
									/>
								</>
							);
						})}
				</div>
			</div>
		</>
	);
}

const GUITAR: Guitar = {
	strings: [
		{ note: "E", octave: 2 },
		{ note: "A", octave: 2 },
		{ note: "D", octave: 3 },
		{ note: "G", octave: 3 },
		{ note: "B", octave: 3 },
		{ note: "E", octave: 4 },
	],
	numFrets: 22,
};

const E_CHORD: Chord = {
	fingerings: [
		{ type: "finger", string: 1, fret: 2, variation: false, finger: 2 },
		{ type: "finger", string: 2, fret: 2, variation: false, finger: 3 },
		{ type: "finger", string: 3, fret: 1, variation: false, finger: 1 },
	],
};

export default function Home() {
	return (
		<div>
			<main>
				<ChordChart guitar={GUITAR} chord={E_CHORD} />
			</main>
		</div>
	);
}
