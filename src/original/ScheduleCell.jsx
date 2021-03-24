import React from 'react';

import { ShiftItem } from './ShiftItem';

export function ScheduleCell(props) {
	const {
		shifts,
		replaceShift,
		users,
	} = props;
	
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
