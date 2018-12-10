# TouchableOpacity 点击元素

用于包装相响应击事件的元素，建议代替react-native自带的TouchableOpacity组件，支持防连点；

## 代码示例

```jsx
import { TouchableOpacity } from 'sx-rnc';

<TouchableOpacity>
	<Text>点击</Text>
</TouchableOpacity>
```

## 属性说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| onPress | 事件函数 | Function | - | - |
| interval | 点击间隔事件（毫秒） | Number | - | 1500 |
| disabled | 是否禁用 | Boolean | - | false |
| activeOpacity | 点击时的透明度 | Number | - | 0.65 |