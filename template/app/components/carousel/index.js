/**
 * 轮播图组件
 */
import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Platform,
	StyleSheet,
} from 'react-native';
import CarouselStyles from './styles';

const defaultPagination = (props) => {
	const { styles, current, vertical, count, dotStyle, dotActiveStyle } = props;
	const positionStyle = vertical ? 'paginationY' : 'paginationX';
	const flexDirection = vertical ? 'column' : 'row';
	const arr = [];
	for (let i = 0; i < count; i++) {
		arr.push(
			<View
				key={`dot-${i}`}
				style={[
					styles.pointStyle,
					styles.spaceStyle,
					dotStyle,
					i === current && styles.pointActiveStyle,
					i === current && dotActiveStyle,
				]}
			/>,
		);
	}
	return (
		<View style={[styles.pagination, styles[positionStyle]]}>
			<View style={{ flexDirection }}>{arr}</View>
		</View>
	);
};

export default class Carousel extends Component {
	static defaultProps = {
		bounces: true,
		infinite: false,
		dots: true,
		autoplay: false,
		autoplayInterval: 3000,
		selectedIndex: 0,
		// vertical 目前只实现 pagination，内容 vertical 由于自动高度拿不到，暂时无法实现
		vertical: false,
		styles: CarouselStyles,
		pagination: defaultPagination,
		dotStyle: {},
		dotActiveStyle: {},
	};

	scrollviewRef;
	autoplayTimer;
	androidScrollEndTimer;
	scrollEndTimter;

	constructor(props) {
		super(props);
		const { children, selectedIndex } = this.props;
		const count = children ? children.length || 1 : 0;
		const index = count > 1 ? Math.min(selectedIndex, count - 1) : 0;
		this.state = {
			width: 0,
			isScrolling: false,
			autoplayEnd: false,
			loopJump: false,
			selectedIndex: index,
			offset: { x: 0, y: 0 },
		};
	}

	componentDidMount() {
		this.autoplay();
	}

	componentWillUnmount() {
		clearTimeout(this.autoplayTimer);
		clearTimeout(this.androidScrollEndTimer);
		clearTimeout(this.scrollEndTimter);
	}

	loopJump = () => {
		// iOS 通过 contentOffet 可以平滑过度，不需要做处理
		if (this.state.loopJump && Platform.OS === 'android') {
			const index = this.state.selectedIndex + (this.props.infinite ? 1 : 0);
			setTimeout(() => {
				const x = this.state.width * index;
				this.scrollviewRef.scrollTo({ x, y: 0 }, false);
			}, 10);
		}
	}

	autoplay = () => {
	    const { children, autoplay, infinite, autoplayInterval } = this.props;
	    const { isScrolling, autoplayEnd, selectedIndex } = this.state;
	    const count = children ? children.length || 1 : 0;
	    if (!Array.isArray(children) || !autoplay || isScrolling || autoplayEnd) {
	        return;
	    }

	    clearTimeout(this.autoplayTimer);

	    this.autoplayTimer = setTimeout(() => {
	        if (!infinite && (selectedIndex === count - 1)) {
	            // !infinite && last one, autoplay end
	            return this.setState({ autoplayEnd: true });
	        }
	        this.scrollNextPage();
	    }, autoplayInterval);
	}

	onScrollBegin = (e) => {
	    this.setState({
	        isScrolling: true,
	    }, () => {
	        if (this.props.onScrollBeginDrag) {
	            this.props.onScrollBeginDrag(e, this.state, this);
	        }
	    });
	}

	onScrollEnd = (e) => {
	    this.setState({ isScrolling: false });
	    // android incompatible
	    if (!e.nativeEvent.contentOffset) {
	        const position = e.nativeEvent.position;
	        e.nativeEvent.contentOffset = {
	            x: position * this.state.width,
	        };
	    }

	    this.updateIndex(e.nativeEvent.contentOffset);

	    this.scrollEndTimter = setTimeout(() => {
	        this.autoplay();
	        this.loopJump();
	        if (this.props.onMomentumScrollEnd) {
	            this.props.onMomentumScrollEnd(e, this.state, this);
	        }
	    });
	}

	onScrollEndDrag = (e) => {
	    const { offset, selectedIndex } = this.state;
	    const previousOffset = offset.x;
	    const newOffset = e.nativeEvent.x;
	    const count = this.props.children ? this.props.children.length || 1 : 0;

	    if (previousOffset === newOffset && (selectedIndex === 0 || selectedIndex === count - 1)) {
	        this.setState({
	            isScrolling: false,
	        });
	    }
	}

	updateIndex = (offset) => {
	    let state = this.state;
	    let selectedIndex = state.selectedIndex;
	    let diff = offset.x - state.offset.x;
	    let step = state.width;
	    let loopJump = false;
	    let count = this.props.children ? this.props.children.length || 1 : 0;

	    // Do nothing if offset no change.
	    if (!diff) {
	        return;
	    }

	    selectedIndex = parseInt(selectedIndex + Math.round(diff / step), 10);

	    if (this.props.infinite) {
	        if (selectedIndex <= -1) {
	            selectedIndex = count - 1;
	            offset.x = step * count;
	            loopJump = true;
	        } else if (selectedIndex >= count) {
	            selectedIndex = 0;
	            offset.x = step;
	            loopJump = true;
	        }
	    }

	    this.setState({
	        selectedIndex,
	        offset,
	        loopJump,
	    });

	    const { afterChange } = this.props;
	    if (afterChange) {
	        afterChange(selectedIndex);
	    }
	}
	scrollNextPage = () => {
	    const { children, infinite } = this.props;
	    const count = children ? children.length || 1 : 0;
	    if (this.state.isScrolling || count < 2) {
	        return;
	    }

	    let state = this.state;
	    let diff = (infinite ? 1 : 0) + this.state.selectedIndex + 1;
	    let x = diff * state.width;
	    let y = 0;

	    this.scrollviewRef.scrollTo({ x, y });

	    this.setState({
	        isScrolling: true,
	        autoplayEnd: false,
	    });

	    // trigger onScrollEnd manually in android
	    if (Platform.OS === 'android') {
	        this.androidScrollEndTimer = setTimeout(() => {
	            this.onScrollEnd({
	                nativeEvent: {
	                    position: diff,
	                },
	            });
	        }, 0);
	    }
	}

	renderContent = (pages) => {
		const others = {
			onScrollBeginDrag: this.onScrollBegin,
			onMomentumScrollEnd: this.onScrollEnd,
			onScrollEndDrag: this.onScrollEndDrag,
		};
		return (
			<ScrollView
				ref={el => this.scrollviewRef = el}
				{...this.props}
				horizontal={!this.props.vertical}
				pagingEnabled
				bounces={!!this.props.bounces}
				scrollEventThrottle={100}
				removeClippedSubviews={false}
				automaticallyAdjustContentInsets={false}
				directionalLockEnabled
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={this.props.style}
				contentOffset={this.state.offset}
				{...others}
			>
				{pages}
			</ScrollView>
		);
	}

	renderDots = (index) => {
		const { children, vertical, styles, pagination, dotStyle, dotActiveStyle } = this.props;
		const count = children ? children.length || 1 : 0;
		return pagination ? pagination({
			styles,
			vertical,
			current: index,
			count,
			dotStyle,
			dotActiveStyle,
		}) : null;
	}

	onLayout = (e) => {
		// for horizontal, get width, scollTo
		const props = this.props;
		const count = props.children ? props.children.length || 1 : 0;
		const selectedIndex = count > 1 ? Math.min(props.selectedIndex, count - 1) : 0;
		const width = e.nativeEvent.layout.width;
		const offsetX = width * (selectedIndex + (props.infinite ? 1 : 0));
		this.setState({
			width,
			offset: { x: offsetX, y: 0 },
		}, () => {
			if (Platform.OS === 'android') {
				this.scrollviewRef.scrollTo({ y: 0, x: offsetX }, false);
			}
		});
	}

	render() {
		let state = this.state;
		let { dots, infinite, children } = this.props;
		let pages: any = [];

		if (!children) {
			return (
				<Text style={{ backgroundColor: 'white' }}>
					You are supposed to add children inside Carousel
				</Text>
			);
		}

		const pageStyle = { width: state.width };
		const count = children ? children.length || 1 : 0;
		// For make infinite at least count > 1
		if (count > 1) {
			pages = Object.keys(children);
			if (infinite) {
				pages.unshift(count - 1 + '');
				pages.push('0');
			}
			pages = pages.map((page, i) => {
				return (<View style={pageStyle} key={i}>{children[page]}</View>);
			});
		} else {
			pages = (<View style={pageStyle}>{children}</View>);
		}

		return (
			<View onLayout={this.onLayout}>
				{this.renderContent(pages)}
				{dots && this.renderDots(this.state.selectedIndex)}
			</View>
		);
	}
}
