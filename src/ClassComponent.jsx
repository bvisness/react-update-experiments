import React from 'react';

import { AppContext } from './AppContext';
import { shallowEqual } from './shallowEqual';

export class ClassComponent extends React.Component {
	state = {
		pure: false,
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

		if (!this.state.pure) {
			return true;
		}

		return (
			!shallowEqual(this.props, prevProps)
			|| !shallowEqual(this.state, prevState)
		);
	}

	render() {
		this.numRenders += 1;
		if (this.numRendersEl.current) {
			this.numRendersEl.current.innerText = this.numRenders;
		}

		return <div className="component">
			<h2>Child Class Component</h2>

			<div>
				<input type="checkbox" value={ this.state.pure } onChange={ () => this.setState(({ pure }) => ({ pure: !pure })) } />
				<span>Pure?</span>
			</div>

			<button onClick={ () => this.setState(({ counter }) => ({ counter: counter + 1 })) }>Increment Counter</button>
			<button onClick={ () => this.forceUpdate() }>Force Update</button>
			<button onClick={ () => this.setState(state => state) }>No-op setState</button>
			<button onClick={ () => this.props.incrementParentCounter() }>Increment Parent Counter</button>
			<AppContext.Consumer>{ ({ counter }) =>
				<div>Context value: { counter }</div>
			}</AppContext.Consumer>
			<div>Parent prop value: { this.props.parentCounter }</div>
			<div>Self state value: { this.state.counter }</div>
			<div>shouldComponentUpdate's: <span ref={ this.numShouldUpdatesEl }>0</span></div>
			<div>Renders: <span ref={ this.numRendersEl }>1</span></div>
		</div>
	}
}