# Icon 图标

对 react-native-vector-icons 组件的封装；
在 [所有图标](https://oblador.github.io/react-native-vector-icons/) 中搜索需要的图标名称；

## 代码示例

```jsx
import { Icon } from 'sxp-rnc';

<Icon type="Ionicon" name="ios-add" size={30}/>
```

## 属性说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| type | 图标类型 | String | `Entypo` `EvilIcons` `Feather` `FontAwesome` `Foundation` `Ionicons` `MaterialCommunityIcons` `MaterialIcons` `SimpleLineIcons` `Octicons` `Zocial` | - |
| name | 图标名称 | String | - | - |
| style | 样式 | Object | - | - |
| size | 图标大小（等同于style中的fontSize属性） | Number | - | 30 |
| color | 图标颜色 | Number | - | #000 |
