# View 基础布局组件

View 组件的封装，提供了一些易用的api；

## 代码示例

```jsx
import { View } from 'sx-rnc';

...
render() {
    <View flex useSafeArea>
    </View>
}
...
```


## 属性说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| useSafeArea | 是否适配iphoneX | Boolean | false |
| flex | 是否占满容器，{flex: 1} 样式 | Boolean | false |
| row | 内容是否横向排列 | Boolean | false |
| wrap | 是否换行 | Boolean | false |
| style | 样式 | Object | - |
| onPress\| onLongPress \| onPressIn \| onPressOut | 点击事件 | Function | - |
