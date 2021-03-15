import React from 'react';

import { ClassComponent } from './ClassComponent';
import { HookComponent } from './HookComponent';
import { PlumbingComponent } from './PlumbingComponent';
import { shallowEqual } from './shallowEqual';

export class ParentComponent extends React.Component {
	state = {
		counter: 0,
	};

	numShouldUpdates = 0;
	numShouldUpdatesEl = React.createRef(null);

	numRenders = 0;
	numRendersEl = React.createRef(null);

	shouldComponentUpdate(prevProps, prevState) {
		this.numShouldUpdates += 1;
		if (this.numShouldUpdatesEl.current) {
			this.numShouldUpdatesEl.current.innerText = this.numShouldUpdates;
		}

		return !shallowEqual(this.state, prevState); // only update on state changes, never from parent
	}

	incrementCounter = () => {
		this.setState(({ counter }) => ({ counter: counter + 1}));
	}

	render() {
		this.numRenders += 1;
		if (this.numRendersEl.current) {
			this.numRendersEl.current.innerText = this.numRenders;
		}

		return <div className="component">
			<h2>Parent Class Component</h2>

			<button onClick={ () => this.incrementCounter() }>Increment Counter</button>
			<button onClick={ () => this.forceUpdate() }>Force Update</button>
			<div>Self state value: { this.state.counter }</div>
			<div>shouldComponentUpdate's: <span ref={ this.numShouldUpdatesEl }>0</span></div>
			<div>Renders: <span ref={ this.numRendersEl }>1</span></div>

			<div className="children">
				<PlumbingComponent>
					<HookComponent parentCounter={ this.state.counter } incrementParentCounter={ this.incrementCounter } />
					<ClassComponent parentCounter={ this.state.counter } incrementParentCounter={ this.incrementCounter } />
				</PlumbingComponent>
			</div>
		</div>;
	}
}
