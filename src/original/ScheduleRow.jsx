import React from 'react';
import moment from 'moment';

import { ScheduleCell } from './ScheduleCell';

export function ScheduleRow(props) {
	const {
		user,
		shifts,
		startDate,
		replaceShift,
		users,
	} = props;

	function dayKey(date) {
		return moment(date).format('YYYY-MM-DD');
	}

	const shiftsByDay = {};
	for (const shift of shifts) {
		const key = dayKey(shift.start);
		if (!shiftsByDay[key]) {
			shiftsByDay[key] = [];
		}
		shiftsByDay[key].push(shift);
	}

	const cells = [];
	for (let i = 0; i < 7; i++) {
		const dayStart = startDate.clone().add(i, 'days');
		const key = dayKey(dayStart);

		cells.push(<ScheduleCell
			key={ key }
			shifts={ shiftsByDay[key] || [] }
			replaceShift={ replaceShift }
			users={ users }
		/>);
	}

	let totalHours = 0;
	for (const shift of shifts) {
		totalHours += shift.end.diff(shift.start, 'hours');
	}

	return <div className="schedule-row">
		<div className="user-info">
			<div>{ user.name }</div>
			<div>{ totalHours } hours</div>
		</div>
		{ cells }
	</div>;
}
