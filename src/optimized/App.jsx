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

function makeDefaultShiftState() {
	const shiftsByUser = Object.fromEntries(users.map(user => [user.id, []]));

	for (const shift of defaultShifts) {
		shiftsByUser[shift.userId].push(shift);
	}

	return {
		shifts: defaultShifts,
		shiftsByUser: shiftsByUser,
	}
}

function shiftReducer(shiftState, action) {
	switch (action.type) {
		case 'replace': {
			const {
				shifts,
				shiftsByUser,
			} = shiftState;
			const {
				originalShift,
				newShift,
			} = action;

			const newShifts = shifts.filter(shift => shift !== originalShift);
			newShifts.push(newShift);

			const newShiftsByUser = { ...shiftsByUser };
			newShiftsByUser[originalShift.userId] = newShiftsByUser[originalShift.userId].filter(shift => shift !== originalShift);
			newShiftsByUser[newShift.userId] = [...newShiftsByUser[newShift.userId], newShift];

			return {
				shifts: newShifts,
				shiftsByUser: newShiftsByUser,
			};
		}
		default:
			throw new Error();
	}
}

export function App() {
	const [shiftState, shiftDispatch] = useReducer(shiftReducer, makeDefaultShiftState());
	const [sillyValue, setSillyValue] = useState('');

	const rows = [];
	for (const user of users) {
		const shifts = shiftState.shiftsByUser[user.id];
		rows.push(<ScheduleRow
			key={ user.id }
			user={ user }
			shifts={ shifts }
			startDate={ startDate }
			shiftDispatch={ shiftDispatch }
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
