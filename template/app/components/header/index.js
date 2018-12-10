import React, { Component, isValidElement, SafeAreaView } from 'react';
import {
	View,
	StatusBar,
	Platform,
	StyleSheet,
	TouchableOpacity,
	Animated,
	Easing,
	BackHandler,
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import { deviceWidth } from '../../utils/ScreenUtil';
import * as theme from '../../config/theme.conf';
import { Text } from '../../components';
// import { addListener } from '../../redux';
import { colorRgb } from '../../utils/colorUtil';
import headerThemeMap from './header-theme.json';

/* 状态栏的高度 */
let STATUSBAR_HEIGHT = 20;

/**
 * 页面header 公用组件类
 */
class Header extends Component {
	static defaultProps = {
		title: '',
		headerTintColor: '#333',
		headerStyle: {},
	}

	componentDidMount() {
		const { onBack } = this.props;
		this._screenOptions = this.props.screenOptions;

		if (Platform.OS === 'android' && this.props.onBack) {
			BackHandler.addEventListener('headerBack', this.goBack);
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'android' && this.props.onBack) {
			BackHandler.removeEventListener('headerBack', this.goBack);
		}
	}

	_headerOptions = {
		opacity: 1,
		absolute: false,
		isBack: true,
	}

	/**
	 * 返回方法
	 * @return {void}
	 */
	goBack = () => {
		const { onBack } = this.props;
		if(onBack) {
			onBack(this.props.navigation);
		} else {
			this.props.navigation.dispatch(NavigationActions.back());
		}
		return true;
	}

	/**
	 * 返回按钮
	 * @return {Node}
	 */
	backButton = () => {
		const { backButtonColor = '#fff' } = this._screenOptions;

		return (
			<TouchableOpacity onPress={this.goBack} style={styles.backButton}>
				<Text>返回</Text>
			</TouchableOpacity>
		);
	}

	render() {
		let { screenOptions, scene } = this.props;

		console.log('screenOptions===》：', screenOptions);

		if(scene.isActive) {
			const { _headerOptions = {} } = screenOptions;
			this._screenOptions = {
				...screenOptions,
				...(headerThemeMap[_headerOptions.headerTheme] || {}),
			}
		}

		let {
			title,
			leftButton,
			rightButton,
			headerTintColor,
			headerStyle,
			headerStyle: {
				backgroundColor,
			},
			_headerOptions = {},
		} = this._screenOptions;

		this._headerOptions = { ...this._headerOptions, ..._headerOptions };

		if(!leftButton && scene.index && this._headerOptions.isBack) {
			leftButton = this.backButton();
		}

		const _headerStyle = {
			position: 'relative',
			zIndex: 100000,
			width: deviceWidth,
			...headerStyle,
		}

		if(this._headerOptions.absolute) {
			_headerStyle.marginBottom = 0 - theme.HEADER_HEIGHT - STATUSBAR_HEIGHT;
		}

		return (
			<SafeAreaView style={_headerStyle}>
				<View style={[styles.headerBackground, {
					backgroundColor,
					opacity: this._headerOptions.opacity,
				}]}></View>
				<StatusBar
					backgroundColor="transparent"
					translucent={true}
					barStyle="light-content"
				/>
				<View style={ styles.headerBody }>
					<View style={ styles.headerLeft }>
						{ typeof leftButton === 'function' ? leftButton() : leftButton }
					</View>
					{
						isValidElement(title) ?
						title :
						<Text
							color={ headerTintColor }
							style={ styles.headerTitle }
							align="center"
						>
							{ title }
						</Text>
					}
					<View
						style={ styles.headerRight }
					>
						{ typeof rightButton === 'function' ? rightButton() : rightButton }
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

/**
 * navigationOptions 配置中生成header组件的函数
 * @param  {Object} options header配置参数
 * @return {function}       生成header组件的函数
 */
export default options => props => {
	const { navigation, router, scene } = props;

	const screenNavigation = {
		state: navigation.state.routes[navigation.state.index],
		dispatch: navigation.dispatch,
		addListener: () => {},
	};

	const screenOptions = router.getScreenOptions(screenNavigation, {});

	const {
		headerStyle: {
			backgroundColor,
		},
		themeType,
	} = screenOptions;

	const bgColor = colorRgb(backgroundColor);

	let barStyle = 'light-content';

	if(themeType === 'white' || bgColor === 'RGB(255,255,255)') {
		barStyle = 'dark-content';
	}

	StatusBar.setBarStyle(barStyle);

	return (
		<Header
			{...screenOptions}
			screenOptions={screenOptions}
			navigation={screenNavigation}
			scene={scene}
		/>
	);
}

const styles = StyleSheet.create({
	headerBody: {
		width: deviceWidth,
		height: theme.HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: STATUSBAR_HEIGHT,
		left: 0,
	},
	headerTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	headerLeft: {
		position: 'absolute',
		zIndex: 100,
		top: 0,
		left: 0,
		height: theme.HEADER_HEIGHT,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	headerRight: {
		position: 'absolute',
		zIndex: 100,
		top: 0,
		right: 10,
		height: theme.HEADER_HEIGHT,
		justifyContent: 'center',
	},
	headerBackground: {
		height: theme.HEADER_HEIGHT + STATUSBAR_HEIGHT,
	},
	backButton: {
		width: 42,
		height: theme.HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
	}
})