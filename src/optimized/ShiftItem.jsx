import React from 'react';

import { Shift } from '../common/models';

export function ShiftItem(props) {
	const {
		shift,
		shiftDispatch,
		users,
	} = props;

	function moveByHours(hours) {
		const newStart = shift.start.clone().add(hours, 'hours');
		const newEnd = shift.end.clone().add(hours, 'hours');
		shiftDispatch({
			type: 'replace',
			originalShift: shift,
			newShift: new Shift(shift.userId, shift.position, newStart, newEnd),
		});
	}

	function assignTo(userId) {
		shiftDispatch({
			type: 'replace',
			originalShift: shift,
			newShift: new Shift(userId, shift.position, shift.start, shift.end),
		});
	}

	return <div className="shift-item">
		{ shift.start.format('ha') }-{ shift.end.format('ha') } / { shift.position }
		<div>
			<button onClick={ () => moveByHours(-1) }>-</button>
			<button onClick={ () => moveByHours(1) }>+</button>
		</div>
		<div>
			<select onChange={ e => assignTo(parseInt(e.target.value, 10)) } defaultValue={ shift.userId }>
				{ users.map(user =>
					<option key={ user.id } value={ user.id }>{ user.name }</option>
				)}
			</select>
		</div>
	</div>;
}
