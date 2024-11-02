import { ChordChart } from "@/components/chord-chart";
import {
	A_CHORD,
	C_CHORD,
	D_CHORD,
	E_CHORD,
	G_CHORD,
} from "@/lib/chords/major";
import { ChordShape, type Guitar } from "@/types";

const STANDARD_TUNING_GUITAR: Guitar = {
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

const CHORD = D_CHORD;

export default function Home() {
	return (
		<div>
			<main>
				<div className="p-12">
					<ChordChart
						guitar={STANDARD_TUNING_GUITAR}
						chordShape={CHORD.toObj()}
					/>
				</div>
			</main>
		</div>
	);
}
