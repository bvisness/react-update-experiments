import React from 'react';

import { ShiftItem } from './ShiftItem';

export function ScheduleCell(props) {
	const {
		shifts,
		shiftDispatch,
		users,
	} = props;

	const startMs = Date.now();
	while (Date.now() - startMs < 2) {}

	return <div className="schedule-cell">
		{ shifts.map(shift => 
			<ShiftItem
				key={ shift.start.format('HH:mm') }
				shift={ shift }
				shiftDispatch={ shiftDispatch }
				users={ users }
			/>
		) }
	</div>;
}
