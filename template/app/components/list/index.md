# List 列表

列表组件

## 代码示例

```jsx
import { List } from 'sxp-rnc';

const ListItem = List.Item;

class ListDemo extends Component {
	render() {
		<View>
			<List>
				<ListItem>item1</ListItem>
			</List>
		</View>
	}
}
```

## 属性说明

### List

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| renderHeader | 列表标题 | Element | - | null |

### List.Item

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| lineFill | 间隔线是否占满行 | Boolean | - | false |
| lineColor | 间隔线颜色 | String | - |  |
| showLine | 是否显示间隔线 | Boolean | - | true |
| extra | 行右显示的元素 | Element | - | - |
| arrow | 行右箭头类型 | String | `horizontal`：右 `up`：上 `down`：下 | - |
| arrowSize | 行右箭头大小 | Number | - | px(30) |
| arrowColor | 箭头颜色 | String | - | `#A9AEB6` |
| onPress | 点击事件函数 | Function | - | - |
| interval | 点击间隔 | Number | - | null |