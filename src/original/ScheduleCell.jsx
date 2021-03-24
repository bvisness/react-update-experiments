import React from 'react';

import { ShiftItem } from './ShiftItem';

export function ScheduleCell(props) {
	const {
		shifts,
		replaceShift,
		users,
	} = props;

	// pretend that rendering is expensive
	const startMs = Date.now();
	while (Date.now() - startMs < 2) {}

	return <div className="schedule-cell">
		{ shifts.map(shift => 
			<ShiftItem
				key={ shift.start.format('HH:mm') }
				shift={ shift }
				replaceShift={ replaceShift }
				users={ users }
			/>
		) }
	</div>;
}
