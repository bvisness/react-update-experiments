import moment from 'moment';

export class User {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

export class Shift {
	constructor(userId, position, start, end) {
		this.userId = userId;
		this.position = position;
		this.start = moment(start);
		this.end = moment(end);
	}
}
