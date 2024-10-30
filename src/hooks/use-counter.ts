import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const counterAtom = atom(0);

export default function useCounter() {
	const [count, setCount] = useAtom(counterAtom);

	useEffect(() => {
		setCount((count) => count + 1);
	}, [setCount]);

	return count;
}
