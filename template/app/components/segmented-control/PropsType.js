import PropTypes from 'prop-types';

export default {
	tintColor: PropTypes.string,
	disabled: PropTypes.bool,
	selectedIndex: PropTypes.number,
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func,
	onValueChange: PropTypes.func,
};