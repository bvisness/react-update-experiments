import React from 'react';

import { deepEqual } from '../deepEqual';
import { ShiftItem } from './ShiftItem';

export class ScheduleCell extends React.Component {
	render() {
		const {
			shifts,
			replaceShift,
			users,
		} = this.props;

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
}
