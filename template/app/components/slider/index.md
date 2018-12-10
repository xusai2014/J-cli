# Slider 滑动输入条

在一定区间内滑动选择值。

## 代码示例

```jsx
import { Slider } from 'sxp-rnc';

class Comps extends Component {
    state = {
        sliderValue: 100
    }

    sliderChange = value => {
        this.setState({
            sliderValue: value
       	});
    }

    render() {
        <View>
            <Slider
                value={this.state.sliderValue}
                minValue={100}
                maxValue={500}
                onChange={this.sliderChange}
            />
        </View>
    }
}

```

## 属性说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| style | 滑动条容器样式 | Object | 0 |
| value | 设置当前的值 | number | 0 |
| minValue | 滑动条最小值 | number | true |
| maxValue | 滑动条最大值 | number | true |
| step | 步长，取值必须大于 0，并且可被 (maxValue - minValue) 整除。 | number | 1 |
| onChange | Slider值改变时触发，改变后的值作为参数 | Function | true |
| onTouchStart | 滑动开始时触发 | Function | true |
| onTouchEnd | 滑动结束时触发 | Function | true |