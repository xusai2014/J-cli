# ActionSheet 动作面板

从底部弹出动作选择窗口。

### 代码示例

```jsx
import { ActionSheet } from 'sxp-rnc';

ActionSheet.show({
    title: '标题',
    message: '测试一下选项',
    options: ['保存', '删除', '取消'],
    cancelButtonIndex: 2,
    destructiveButtonIndex: 1
}, index => {

});
```

### 方法说明

#### static show(options: Object, callback: Function)

打开动作面板，`options`对象必须包含以下的一个或者多个：

- options (array of strings) - 按钮标题列表 (required)
- cancelButtonIndex (int) - 按钮列表中取消按钮的索引位置
- destructiveButtonIndex (int) - 按钮列表中破坏性按钮（一般为删除）的索引位置
- title (string) - 顶部标题
- message (string) - 顶部标题下的简要消息

`callback`选择后的回调，返回选择的索引。