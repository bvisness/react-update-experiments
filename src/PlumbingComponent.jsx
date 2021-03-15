import React, { useRef } from 'react';

export function PlumbingComponent({
	children,
}) {
	const numRenders = useRef(0);
	const numRendersEl = useRef(null);

	numRenders.current += 1;
	if (numRendersEl.current) {
		numRendersEl.current.innerText = numRenders.current;
	}
	
	return <div className="component">
		<h2>Intermediate Plumbing</h2>

		<div>Renders: <span ref={ numRendersEl }>1</span></div>

		<div className="children">
			{ children }
		</div>
	</div>
}
