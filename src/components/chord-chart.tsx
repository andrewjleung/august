"use client";

import useCounter from "@/hooks/use-counter";
import {
	ChordShape,
	type ChordShapeObject,
	type Fingering,
	type Guitar,
	type NoteObject,
} from "@/types";
import { Chord, MajorChord, Note } from "@patrady/chord-js";
import clsx from "clsx";
import { match } from "ts-pattern";

export function Position({ children }: { children?: React.ReactNode }) {
	return (
		<div className="h-16 flex flex-col items-center w-1">
			<div className="w-1 h-full bg-black flex-initial" />
			{children}
			<div className="w-1 h-full bg-black flex-initial" />
		</div>
	);
}

export function Fret({ className }: { className?: string }) {
	return <div className={clsx("h-1 bg-black", className)} />;
}

export function Fingering({
	string,
	position,
	fingering,
}: { string: NoteObject; position: number; fingering: Fingering }) {
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

export function GuitarString({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col items-start">{children}</div>;
}

export function StringLabel({ fingering }: { fingering: Fingering }) {
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

export function ChordChart({
	guitar,
	chordShape,
}: {
	guitar: Guitar;
	chordShape: ChordShapeObject;
}) {
	const count = useCounter();
	const notes: string[] = new ChordShape(chordShape)
		.notes(guitar)
		.map((n) => n.name);

	const chord = Chord.for(notes.join(" "));
	const chordName = chord?.getName() || "Mystery chord!";
	const chordNameWithoutInversion = chordName.split("/")[0];

	return (
		<div>
			<span>{chordNameWithoutInversion}</span>
			<div className="flex flex-row w-fit">
				{guitar.strings.map((_, i) => {
					const string = guitar.strings[i];
					const fingering = chordShape.fingerings[i];
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
