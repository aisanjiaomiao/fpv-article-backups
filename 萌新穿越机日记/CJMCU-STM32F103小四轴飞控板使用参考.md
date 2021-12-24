### 前言
前几天在咸鱼上搞了一块小四轴PCB飞控板

![](https://upload-images.jianshu.io/upload_images/2675631-86771a1f58f2b232.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

进过一番研究后终于成功起飞了。

这里简单分享一下。

### 需要准备的材料

参考
|名称|数量|
|-|-|
|飞控板|x1|
|720空心杯|x4|
|桨叶|x4|
|电机固定胶圈|x4|
|接收机(我使用的是FS-RX2A Pro 接收机)|x1|
|电池与电池接线|x1|
|其他辅助材料|-|


### 接线说明

**PPM 接收机设置在 PA0**
**IBUS 接收机设置在 PA3**
> 注意:早期版本的[CleanFlight](https://github.com/cleanflight/cleanflight)不支持SPI接收机

由于我只剩下**8520空心杯**，所以用剪刀将孔搞大了
![](https://upload-images.jianshu.io/upload_images/2675631-2358394442f43fe6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

放入电机
![](https://upload-images.jianshu.io/upload_images/2675631-ba58a62be8ca2d4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

焊接
![](https://upload-images.jianshu.io/upload_images/2675631-1ed56e9fbcafd629.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-51037a5bfb7e0da3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-86768df685b25e56.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 程序与工具部分

> 我这里经过测试发现2.0版本前的[CleanFlight](https://github.com/cleanflight/cleanflight)可以很好的支持飞控。
> 我把我所使用的软件与固件放在网盘了：
>  - 链接: https://pan.baidu.com/s/1tveZe2EqBB3S5Teq5dAwUw 提取码: emmd 

#### 烧录程序，烧录需要将boot短接头去掉

![](https://upload-images.jianshu.io/upload_images/2675631-cf0572ed25a8ae5f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-cfc4486167d6fd2d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 烧录完成后连接，记得恢复boot短接

![Snipaste_2020-03-27_11-14-47.png](https://upload-images.jianshu.io/upload_images/2675631-6679c3d94d9f7ea8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 检查陀螺仪加速计方向

![](https://upload-images.jianshu.io/upload_images/2675631-2fc739cbef5c6244.gif?imageMogr2/auto-orient/strip)

#### 打开串口
![](https://upload-images.jianshu.io/upload_images/2675631-13ce2b55cda46ceb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 设置接收机
![](https://upload-images.jianshu.io/upload_images/2675631-b8b618ec456c2a96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 接收机测试
![](https://upload-images.jianshu.io/upload_images/2675631-0160139551dbdcfd.gif?imageMogr2/auto-orient/strip)

#### 设置辅助通道

![](https://upload-images.jianshu.io/upload_images/2675631-cdc1848d3b6a6d51.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 配置完成后就可以起飞了
![](https://upload-images.jianshu.io/upload_images/2675631-4c99f037efab88bb.gif?imageMogr2/auto-orient/strip)


![](https://upload-images.jianshu.io/upload_images/2675631-2a795b47f08512d2.gif?imageMogr2/auto-orient/strip)


![](https://upload-images.jianshu.io/upload_images/2675631-e1a45e19947505b8.gif?imageMogr2/auto-orient/strip)

飞行的话总体感觉挺稳的，就是有点动力不足，可能是玩暴力的无刷习惯了，感觉空心杯有点慢吧。也可能是因为我实际使用的不是720空心杯而是8520空心杯的缘故。不过还行吧。

**有小伙伴询问所需金额，这里我提供一下我的购买记录作为参考（注：不含运费）**
![](https://upload-images.jianshu.io/upload_images/2675631-45907ee57ad3098e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




> 参考资料:
> - [BUILD A FPV MICRO QUADCOPTER CJMCU- SMALLEST QUAD THAT RUNS CLEANFLIGHT!](https://oscarliang.com/build-fpv-micro-quadcopter-smallest-quad/)
> 相关文章：
> - [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)
> - [fs-i6x(福斯)遥控加装nRF24L01多协议RC发射机(高频头)](https://www.jianshu.com/p/d6d009f6a112)
> - [简易蓝牙迷你四轴无人机制作教程资料参考](https://www.jianshu.com/p/67c8efa1a906)
> - [自己试着动手用nRF24L01和arduino做一个PPM接收机](https://www.jianshu.com/p/b05e97164eb1)
> - [用MD7105+Arduino制作福斯(FlySky)PPM接收机](https://www.jianshu.com/p/a931c99b2b98)
> - [用Arduino制作MWC(MultiWii)小四轴参考教程](https://www.jianshu.com/p/e7e344cb7844) 
