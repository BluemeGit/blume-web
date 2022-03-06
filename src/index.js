import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import GA4React from 'ga-4-react';

const ga4react = new GA4React('G-GZH7SZWVMK');

(async () => {
	try {
		await ga4react.initialize();
		
	} catch (error) {
		console.log('ga4 Error');
	}
  
  ga4react.pageview(window.location.pathname); // Record a pageview for the given page
  ReactDOM.render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
