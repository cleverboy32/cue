# cue
实现类 vue 库

cue 库是自己刚仿照 vue 写的一个 mvvm 库。 

从 .cue 文件转成 html, 并加上数据改变驱动视图改变。 还只实现了大致初步原理， 后续会慢慢完善，有兴趣的亲可以一起来哦，现在加入你还能看的懂，后面多起来了，恕我直言，你就看不懂了。也请有经验的老前辈指点一二。

#### 目前实现进展：

- cue文件通过loader 解析出 template 和 options

- template 转成 ast 树

- options data 监听

- ast 树融合 options 监听后的数据转成 HTML

![image](./assets/img/mvvm.gif)  
