import React, { Component } from 'react';

export default class BaseComponent extends Component {
	static setTypeProps(options) {
		this.typeProps = options;
	};

	static getTypeProps() {
		return this.typeProps || {};
	}
}