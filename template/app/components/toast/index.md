# Toast 请提示

各种提示信息


## API

- 普通提示信息    
`Toast.info(content, duration, onClose, mask)`    

- 加载提示    
`Toast.loading(content, duration, onClose, mask)`    

- 成功提示    
`Toast.success(content, duration, onClose, mask)`    

- 错误提示    
`Toast.fail(content, duration, onClose, mask)`    

- 警告    
`Toast.warn(content, duration, onClose, mask)`    

- 自定义提示    
`Toast.custom(content, duration, onClose, mask)`    


### 参数说明

| **属性** | **说明** | **类型** | **可选值** | **默认值** |
| --- | --- | --- | --- | --- |
| content | 文字信息或元素（custom 为自定义窗口元素） | String \| Element | - | - |
| duration | 定时关闭时间（单位：秒） | Number | - | 3 |
| onClose | 关闭时的回调函数 | Function | - | - |
| mask | 是否有蒙曾，防止点透 | Boolean | - | true |

    
- 手动关闭提示    
`Toast.hide()`