import React, { useContext, useEffect, useRef, useState } from 'react';

import { AppContext } from './AppContext';

export function HookComponent({
	parentCounter,
	incrementParentCounter,
}) {
	const [counter, setCounter] = useState(0);
	const { counter: contextCounter } = useContext(AppContext);

	const numRenders = useRef(0);
	const numRendersEl = useRef(null);

	const numEffects = useRef(0);
	const numEffectsEl = useRef(null);

	numRenders.current += 1;
	if (numRendersEl.current) {
		numRendersEl.current.innerText = numRenders.current;
	}

	useEffect(() => {
		numEffects.current += 1;
		if (numEffectsEl.current) {
			numEffectsEl.current.innerText = numEffects.current;
		}
	});

	return <div className="component">
		<h2>Child Hook Component</h2>

		<button onClick={ () => setCounter(counter => counter + 1) }>Increment Counter</button>
		<button onClick={ () => setCounter(counter => counter) }>No-op setState</button>
		<button onClick={ () => incrementParentCounter() }>Increment Parent Counter</button>
		<div>Context value: { contextCounter }</div>
		<div>Parent prop value: { parentCounter }</div>
		<div>Self state value: { counter }</div>
		<div>Renders: <span ref={ numRendersEl }>1</span></div>
		<div>Effects: <span ref={ numEffectsEl }>1</span></div>
	</div>;
}
