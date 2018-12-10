# Carousel 轮播图

## 实例

```jsx
import { Carousel } from 'sxp-rnc';

<Carousel
    autoplay={true}
    infinite={true}
    autoplayInterval={5000}
>
    <View style={{backgroundColor: 'powderblue', height: 100}}>
        <Text>1</Text>
    </View>
    <View style={{backgroundColor: 'skyblue', height: 100}}>
        <Text>2</Text>
    </View>
    <View style={{backgroundColor: 'steelblue', height: 100}}>
        <Text>3</Text>
    </View>
</Carousel>
```

## 属性说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| selectedIndex |  手动设置当前显示的索引  |  number  |  0  |
| dots | 是否显示面板指示点 | Boolean   | true |
| autoplay | 是否自动切换 | Boolean   | false |
| autoplayInterval | 自动切换的时间间隔 | Number | 3000 |
| infinite | 是否循环播放 | Boolean   | false |
| afterChange  | 切换面板后的回调函数 | (current: number): void  | - |
| dotStyle  | 指示点样式 | Object | - |
| dotActiveStyle  | 当前激活的指示点样式 | Object | - |
