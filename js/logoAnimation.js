'use strict';

var events = [
	{
		type: 'greensock',
		div: 'cmu_logo',
		time: 800,
		duration: 2000,
		left: 50,
		opacity: 1
	}
];

var config = {
	div: 'splashScreen',
	loop: true,
	events: events,
	interval: 1000,
};

module.exports = new window.Liquid.Events.Animator( config );
