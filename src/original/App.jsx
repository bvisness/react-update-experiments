import React, { useCallback, useMemo, useReducer, useState } from 'react';
import moment from 'moment';

import { Shift, User } from '../common/models';
import { ScheduleRow } from './ScheduleRow';

const startDate = moment('2021-02-28');

const users = [
	new User(1, 'Alice'),
	new User(2, 'Bob'),
	new User(3, 'Charlie'),
	new User(4, 'Doug'),
	new User(5, 'Edgar'),
	new User(6, 'Francis'),
	new User(7, 'Gerald'),
	new User(8, 'Henry'),
	new User(9, 'Ingrid'),
	new User(10, 'Jeffery'),
];

const defaultShifts = [
	new Shift(1, 'Server', '2021-03-01 16:00:00', '2021-03-01 23:00:00'),
	new Shift(1, 'Server', '2021-03-03 16:00:00', '2021-03-03 23:00:00'),
	new Shift(1, 'Server', '2021-03-05 16:00:00', '2021-03-05 23:00:00'),
	new Shift(2, 'Janitor', '2021-03-01 22:00:00', '2021-03-02 03:00:00'),
	new Shift(2, 'Janitor', '2021-03-03 22:00:00', '2021-03-04 03:00:00'),
	new Shift(2, 'Janitor', '2021-03-05 22:00:00', '2021-03-06 03:00:00'),
	new Shift(3, 'Server', '2021-03-02 10:00:00', '2021-03-02 17:00:00'),
	new Shift(3, 'Server', '2021-03-04 10:00:00', '2021-03-04 17:00:00'),
];

export function App() {
	const [shifts, setShifts] = useState(defaultShifts);
	const [sillyValue, setSillyValue] = useState('');

	function replaceShift(originalShift, newShift) {
		const newShifts = shifts.filter(shift => shift !== originalShift);
		newShifts.push(newShift);
		setShifts(newShifts);
	}

	const shiftsByUser = [];
	for (const shift of shifts) {
		if (!shiftsByUser[shift.userId]) {
			shiftsByUser[shift.userId] = [];
		}
		shiftsByUser[shift.userId].push(shift);
	}

	const rows = [];
	for (const user of users) {
		const shifts = shiftsByUser[user.id] || [];
		rows.push(<ScheduleRow
			key={ user.id }
			user={ user }
			shifts={ shifts }
			startDate={ startDate }
			replaceShift={ replaceShift }
			users={ users }
		/>);
	}

	return <div className="scheduler">
		<div className="extra">
			Unrelated parent state:
			<input value={ sillyValue } onChange={ e => setSillyValue(e.target.value) } />
		</div>
		{ rows }
	</div>;
}
