import { isEqual } from 'lodash';

export function deepEqual(a, b) {
	const startMs = Date.now();
	while (Date.now() - startMs < 2) {}

	return isEqual(a, b);
}