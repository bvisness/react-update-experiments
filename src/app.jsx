import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './AppContext';
import { ParentComponent } from './ParentComponent';

function App() {
	const [counter, setCounter] = useState(0);

	return <AppContext.Provider value={{ counter: counter }}>
		<div>
			<button onClick={ () => setCounter(counter => counter + 1) }>Increment Context Counter</button>
		</div>
		<ParentComponent />
	</AppContext.Provider>;
}

ReactDOM.render(<App />, document.querySelector('#react-root'));
