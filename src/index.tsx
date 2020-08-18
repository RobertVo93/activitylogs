import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from "./App";
import { Footer } from './components/Footer/Footer';
import * as persistStore from './redux/store';
import LoadingSpinner from './share-components/Spinner/LoadingSpinner';
import GlobalAlert from './components/Common/Alert/GlobalAlert';

ReactDOM.render(
	<Provider store={persistStore.default().store}>
		<PersistGate loading={null} persistor={persistStore.default().persistor}>
			<LoadingSpinner />
			<App />
			<Footer />
			<GlobalAlert />
		</PersistGate>
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();