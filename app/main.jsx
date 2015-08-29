'use strict';
import './stylesheets/main.css';
import React from 'react';
import App from './components/App.jsx';

function main(){
  React.render(<App />, document.getElementById('app'));
}

main();
