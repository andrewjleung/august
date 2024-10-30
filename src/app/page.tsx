"use client";

import useCounter from "@/hooks/use-counter";
import clsx from "clsx";
import { match } from "ts-pattern";

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
	strings: Note[];
	numFrets: number;
	capo?: number;
};

type Mute = {
	type: "mute";
};

type Finger = {
	type: "finger";
	finger?: 1 | 2 | 3 | 4;
	fret: 1 | 2 | 3 | 4 | 5 | 6;
};

type Barre = {
	type: "barre";
	finger: Finger;
};

type Open = {
	type: "open";
};

type Fingering = Mute | Finger | Barre | Open;

type Chord = {
	fingerings: Fingering[];
};

function Position({ children }: { children?: React.ReactNode }) {
	return (
		<div className="h-16 flex flex-col items-center w-1">
			<div className="w-1 h-full bg-black flex-initial" />
			{children}
			<div className="w-1 h-full bg-black flex-initial" />
		</div>
	);
}

function Fret({ className }: { className?: string }) {
	return <div className={clsx("h-1 bg-black", className)} />;
}

function Fingering({
	string,
	position,
	fingering,
}: { string: Note; position: number; fingering: Fingering }) {
	return match(fingering)
		.with({ type: "open" }, () => null)
		.with({ type: "mute" }, () => null)
		.with({ type: "finger" }, (f) => {
			if (position !== f.fret) {
				return null;
			}

			return (
				<div className="w-8 h-8 rounded-full text-xl font-semibold bg-black text-white flex-none flex items-center justify-center">
					{f.finger === undefined ? null : <span>{f.finger}</span>}
				</div>
			);
		})
		.with({ type: "barre" }, (f) => {
			if (position !== f.finger.fret) {
				return null;
			}

			return (
				<div className="w-8 h-8 rounded-full text-xl font-semibold bg-black text-white flex-none flex items-center justify-center">
					{f.finger.finger === undefined ? null : (
						<span>{f.finger.finger}</span>
					)}
				</div>
			);
		})
		.exhaustive();
}

function GuitarString({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col items-start">{children}</div>;
}

function StringLabel({ fingering }: { fingering: Fingering }) {
	return (
		<div className="h-10">
			{match(fingering)
				.with({ type: "mute" }, () => (
					<span className="text-xl font-semibold">x</span>
				))
				.otherwise(() => null)}
		</div>
	);
}

function ChordChart({
	guitar,
	chord,
}: {
	guitar: Guitar;
	chord: Chord;
}) {
	const count = useCounter();

	return (
		<div>
			<span>{"E Major in the E form"}</span>
			<div className="flex flex-row w-fit">
				{guitar.strings.map((_, i) => {
					const string = guitar.strings[i];
					const fingering = chord.fingerings[i];
					const isLastString = i === guitar.strings.length - 1;
					const fretWidth = isLastString ? "w-1" : "w-12";

					return (
						<div
							className="flex flex-col items-start"
							key={`chord-${count}-string-${i}`}
						>
							<GuitarString>
								<StringLabel fingering={fingering} />
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={1}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={2}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={3}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={4}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={5}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
								<Position>
									<Fingering
										string={string}
										position={6}
										fingering={fingering}
									/>
								</Position>
								<Fret className={fretWidth} />
							</GuitarString>
						</div>
					);
				})}
			</div>
		</div>
	);
}

const GUITAR: Guitar = {
	strings: [
		{ name: "E", octave: 2 },
		{ name: "A", octave: 2 },
		{ name: "D", octave: 3 },
		{ name: "G", octave: 3 },
		{ name: "B", octave: 3 },
		{ name: "E", octave: 4 },
	],
	numFrets: 22,
};

const E_CHORD: Chord = {
	fingerings: [
		{ type: "open" },
		{ type: "finger", fret: 2, finger: 2 },
		{ type: "finger", fret: 2, finger: 3 },
		{ type: "finger", fret: 1, finger: 1 },
		{ type: "open" },
		{ type: "open" },
	],
};

export default function Home() {
	return (
		<div>
			<main>
				<div className="p-12">
					<ChordChart guitar={GUITAR} chord={E_CHORD} />
				</div>
			</main>
		</div>
	);
}
