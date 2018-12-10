import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import fetch from '../../sx-fetch';
import PropTypes from 'prop-types';

import { Text as _Text } from '../../components';
import { px } from '../../utils/ScreenUtil';
import * as theme from '../../config/theme.conf';
import {
  LOAD_NOW,
  LOAD_UP_MORE,
  METHOD_TYPE_ERROE,
  NO_MORE_DATA,
  NOT_FOUND_RELATED_DATA,
  QUERY_FAILED_DROP_DOWN_RELOAD,
} from '../../config/string.conf';

/**
 * 公用分页组件类
 *  - 内部自动处理下拉刷新、上啦加载等动作。
 */
@fetch.inject()
export default class PagingView extends Component {
  static propTypes = {
    renderItem: PropTypes.func.isRequired, /* 渲染行的方法 */
    ItemSeparatorComponent: PropTypes.func, /* 渲染行间隔的方法 */
    keyExtractor: PropTypes.func, /* 返回每行key的方法 */
    ListFooterComponent: PropTypes.func, /* 渲染列表底部的方法 */
    ListHeaderComponent: PropTypes.func, /* 渲染列表头部的方法 */
    listUrl: PropTypes.string.isRequired, /* 获取列表的url */
    fetchMethod: PropTypes.string, /* 获取列表的请求方式（默认为get） */
    fetchParams: PropTypes.object, /* 获取列表的请求参数 */
    parameterType: PropTypes.string, /* 获取列表的请求参数的类型 */
    pageSize: PropTypes.number, /* 每页行数（默认20条） */
    formatData: PropTypes.func, /* 返回列表数组的方法 */
    _ref: PropTypes.func, /* 获取组件实例 */
    auto: PropTypes.bool, /* 是否在加载时自动查询（默认自动） */
    emptyListFooterHint: PropTypes.string, /* 空列表尾布局提示语 */
    endListFooterHint: PropTypes.string, /* 列表数量 到底结束 尾布局提示语 */
    endListFooterOnPress: PropTypes.func, /* 列表尾布局提示语点击事件 */
    isbackTopIcon: PropTypes.bool, /* 列表数量 到底结束 尾布局是否有向上箭头 */
    renderListEmpty: PropTypes.func, /* 空列表布局 */
    enableOnEndReached: PropTypes.bool, /* 是否启用滑到底端0.05处自动加载更多 */
    enabledPullDownRefresh: PropTypes.bool, /* 是否开启下拉刷新 */
    refreshFinish: PropTypes.func, /* 刷新是否结束 */
    onPageListRefreshStart: PropTypes.func, /* 当刷新界面list之前调用 */
    endMode: PropTypes.string, /* 刷新 到达尾页 判断模式('default' / 'lastListNone') */
    onScrollStatusChange: PropTypes.func, /* 滑动状态['GO_TOP': 界面向顶端滑动, 'GO_BOTTOM': 界面向底端滑动, 'AT_TOP': 界面到达顶端]*/
  }
  lastLoadTime = '';
  tempOffsetY = 0; // 上一次滑动的临时偏移量
  isCalculationScrollDistance = false; // 是否计算滑动方向距离
  /**
   * 返回组件实例方法
   * @return {void}
   */
  returnRef = () => {
    const {
      _ref = () => {
      }
    } = this.props;
    _ref({
      // refresh: this.refresh,
      refresh: this.onRefresh,
      getState: () => this.state,
      loadMore: this._loadMore,
      setStateList: this.setStateList,
      goListTop: this.goListTop,
    });
  }
  /**
   * 滑动到列表顶端
   */
  goListTop = () => {
    this._listRef.scrollToOffset({ y: 0 })
  }
  /**
   * 从外部 设置本界面list数据源
   * @param outerList
   */
  setStateList = (outerList) => {
    this.setState({ list: outerList })
  }
  /**
   * 刷新列表
   * @return {void}
   */
  refresh = ({ url = this._fetchUrl, params = this._fetchParams } = {}) => {
    this._fetchUrl = url;
    this._fetchParams = params;
    this.setState({
      list: [],
      isEnd: false,
      pageNum: 1
    }, () => {
      this.getList(false);
    });
  }
  _loadMore = () => {
    this.getList(false);
  };
  /**
   * 获取列表
   * @return {void}
   */
  getList = (isRefresh = true) => {
    // console.log('pagingView getList')
    const {
      $fetch,
      fetchMethod = 'get',
      parameterType = 'body', // query
      endMode = 'default',
      pageSize = 20,
      formatData = ({ data }) => ({
        list: data.records,
        count: data.totleNum,
      }),
      fetchCatch = () => {
      },
      refreshFinish = () => {
      },
      onPageListRefreshStart = () => {
      },
    } = this.props;

    const { list, pageNum, refreshing, isEnd } = this.state;

    if ((refreshing || isEnd) && !isRefresh) return;

    const fetchPageNum = isRefresh ? 1 : pageNum;
    let fetchPromise;

    if (fetchMethod.toLowerCase() === 'get') {
      fetchPromise = $fetch.get(`${this._fetchUrl}?pageSize=${pageSize}&pageNum=${fetchPageNum}${this._fetchParams}`);
    } else if (fetchMethod.toLowerCase() === 'post') {
      if (parameterType === 'query') {
        fetchPromise = $fetch.post(`${this._fetchUrl}&pageSize=${pageSize}&pageNum=${fetchPageNum}`);
      } else {
        fetchPromise = $fetch.post(`${this._fetchUrl}`, {
          pageSize: `${pageSize}`,
          pageNum: `${fetchPageNum}`,
          ...this._fetchParams,
        });
      }

    } else {
      throw new Error(METHOD_TYPE_ERROE);
    }

    this.setState({ refreshing: true });
    fetchPromise.then(data => {

      if (!data.success) {
        this.setState({ isError: true, refreshing: false });
        refreshFinish();
        return;
      }
      const listData = formatData(data);
      const currentList = isRefresh ? listData.list : list.concat(listData.list);
      /* 判断是否查询到数据 */
      if (fetchPageNum === 1 && listData.list.length === 0) {
        onPageListRefreshStart()
        this.setState({
          isNotList: true,
          list: currentList,
        });
      } else {
        onPageListRefreshStart()
        this.setState({
          isNotList: false
        });
      }

      /* 如果有数据则添加到列表中 */
      if (listData.list.length) {
        onPageListRefreshStart()
        this.setState({
          list: currentList,
          pageNum: fetchPageNum + 1,
        });
      }
      if (endMode === 'default') {
        if (currentList.length >= listData.count) {
          this.setState({
            isEnd: true
          });
        }
      } else if (endMode === 'lastListNone') {
        if (fetchPageNum !== 1 && listData.list.length === 0) {
          this.setState({
            isEnd: true
          });
        }
      }
      onPageListRefreshStart()
      this.setState({
        count: listData.count,
        refreshing: false,
      });
      refreshFinish();
    }).catch(err => {
      this.setState({ isError: true, refreshing: false });
      fetchCatch(err);
      refreshFinish();
    }).finally(() => {
      // this.setState({refreshing: false});
    });
  }
  /**
   * 下拉刷新
   * @return {void}
   */
  onRefresh = () => {
    this.setState({
      isEnd: false,
    }, () => {
      this.getList();
    });
  }
  /**
   * 上拉加载
   * @return {void}
   */
  onEndReached = () => {
    if (new Date().getTime() - this.lastLoadTime > 700) {
      // console.log('两次刷新间隔 大于700毫秒, 可以刷新')
      this.lastLoadTime = new Date().getTime()
      let { enableOnEndReached = true } = this.props;
      if (enableOnEndReached) {
        this.getList(false);
      }
    } else {
      // console.log('两次刷新间隔时间太短啦，不建议刷新')
    }
  }
  /**
   * 渲染列表底部
   * @return {ReactComponent}
   */
  renderListFooter = () => {
    const { ListFooterComponent = this.defaultListFooter } = this.props;
    const { isEnd, refreshing } = this.state;
    return ListFooterComponent(isEnd, refreshing);
  }
  /**
   * 列表默认底部组件
   * @return {Node}
   */
  defaultListFooter = () => {
    return (
      <View style={styles.listFooterView}>
        {this.defaultListFooterContent()}
      </View>
    );
  }
  /**
   * 列表底部显示内容
   * @return {Node}
   */
  defaultListFooterContent = () => {
    const { isEnd, refreshing, isNotList, isError } = this.state;
    const {
      emptyListFooterHint = NOT_FOUND_RELATED_DATA,
      endListFooterHint = NO_MORE_DATA,
      isbackTopIcon = false,
      endListFooterOnPress = () => {
      },
    } = this.props;
    if (isNotList) {
      return (
        <_Text>{emptyListFooterHint}</_Text>
      );
    }
    if (isEnd) {
      if (isbackTopIcon === true) return [
        <View style={styles.listFooterLine} key={1}/>,
        <_Text type='gray' key={4}>&uarr;</_Text>,
        <_Text onPress={endListFooterOnPress} type='gray' key={2}>{endListFooterHint}</_Text>,
        <View style={styles.listFooterLine} key={3}/>,
      ]
      else return [
        <View style={styles.listFooterLine} key={1}/>,
        <_Text onPress={endListFooterOnPress} type='gray' key={2}>{endListFooterHint}</_Text>,
        <View style={styles.listFooterLine} key={3}/>,
      ];
    }
    if (refreshing) {
      return (
        <_Text>{LOAD_NOW}</_Text>
      );
    }
    if (isError) {
      return (
        <_Text>{QUERY_FAILED_DROP_DOWN_RELOAD}</_Text>
      );
    }
    return (
      <_Text>{LOAD_UP_MORE}</_Text>
    );
  }
  /**
   * 渲染列表头部
   */
  renderListHeader = () => {
    const { count } = this.state;
    const { ListHeaderComponent = () => <View></View> } = this.props;
    return ListHeaderComponent(this.state);
  }
  /**
   * 列表为空时显示的组件
   * @return {ReactComponent}
   */
  renderListEmpty = () => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>小随没有查到数据哦!</Text>
      </View>
    );
  }
  /** 当手动拖拽滑动开始时执行 */
  _handleOnScrollBeginDrag = () => {
    this.isCalculationScrollDistance = true;
  }
  /** 当手动拖拽滑动结束时执行 */
  _handleOnScrollEndDrag = () => {
    this.isCalculationScrollDistance = false;
  }
  _onViewScroll = (e) => {
    var offsetY = e.nativeEvent.contentOffset.y; // 滑动距离
    let {
      onScrollStatusChange = () => {
      }
    } = this.props;

    /* calculate scroll status start */
    if (this.isCalculationScrollDistance) {
      if (offsetY - this.tempOffsetY >= 0) {
        onScrollStatusChange('GO_BOTTOM');
      } else {
        onScrollStatusChange('GO_TOP');
      }
    }
    this.tempOffsetY = offsetY;
    if (offsetY <= 50) {
      onScrollStatusChange('AT_TOP')
    }
    /* calculate scroll status end */
  };

  constructor(props) {
    super(props);

    this._fetchUrl = props.listUrl;
    this._fetchParams = props.fetchParams;

    this.state = {
      list: [], /* 列表数据 */
      pageNum: 1, /* 当前页数 */
      count: 0, /* 总条数 */
      refreshing: false, /* 是否正在加载 */
      isEnd: false, /* 是否加载完 */
      isNotList: false, /* 是否未查询到数据 */
      isError: false, /* 是否查询失败 */
    }
  }

  componentDidMount() {
    const { auto = true } = this.props;
    if (auto) {
      this.getList();
    }
    this.returnRef();
  }

  render() {
    const { list, refreshing, isNotList } = this.state;

    const {
      renderItem,
      ItemSeparatorComponent,
      keyExtractor = (...arg) => arg[1].toString(),
      ListHeaderComponent,
      extraData = {},
      renderListEmpty = this.renderListEmpty,
      enabledPullDownRefresh = true,
    } = this.props;

    return (
      <FlatList
        data={list}
        renderItem={renderItem}
        onRefresh={this.onRefresh}
        removeClippedSubviews={true}
        refreshing={enabledPullDownRefresh ? refreshing : false}
        onEndReachedThreshold={0.05}
        onEndReached={this.onEndReached}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={keyExtractor}
        ListHeaderComponent={this.renderListHeader}
        ListFooterComponent={this.renderListFooter}
        ListEmptyComponent={isNotList ? renderListEmpty : <View/>}
        ref={ref => this._listRef = ref}
        extraData={extraData}
        onScroll={this._onViewScroll}
        onScrollBeginDrag={this._handleOnScrollBeginDrag}
        onScrollEndDrag={this._handleOnScrollEndDrag}
      />
    );
  }
}

export const ItemSeparator = props => {
  const {
    paddingLeft = px(40),
    backgroundColor = '#fff',
    borderColor = '#eee',
    height = 1,
  } = props;
  return (
    <View style={{ paddingLeft, backgroundColor }}>
      <View style={{ height: height, backgroundColor: borderColor }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  listFooterView: {
    height: px(120),
    justifyContent: 'center',
    alignItems: 'center'
  },
  listFooterLine: {
    backgroundColor: theme.PAGE_LINE_COLOR,
    height: 1,
    margin: px(40),
  }
})
