# event 事件监听

事件监听高阶组件。可与组件生命周期绑定，组件被卸载时会自动删除组件内所有监听事件；     

## 代码实例

```jsx
import { event } from 'sxp-rnc';

@event()
class Comps extends Component {
    ...
    componentDidMount() {
        this.props.event.on('myevent', params => {
            ...
        });
    }
    ...
}
```

## 方法说明

### event.on(eventName: String, callback: Function): eventHandle;

组件销毁时会自动删除监听事件。如果需要提前删除监听事件，也可以手动删除；

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| eventName | 事件名称 | String | - | - |
| callback | 事件回调 | Function | - | - |
| eventHandle.remove | 删除监听事件 | Function | - | - |

### event.emit(eventName: String, params: any);

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| eventName | 事件名称 | String | - | - |
| params | 参数 | any | - | - |
