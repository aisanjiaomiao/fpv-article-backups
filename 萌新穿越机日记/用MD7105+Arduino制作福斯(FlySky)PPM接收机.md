
还记得前几天，在研究自己制作小四轴的接收机。后来写了**[自己试着动手用nRF24L01和arduino做一个PPM接收机](https://www.jianshu.com/p/b05e97164eb1)**

其实在我众多的参考资料中有一个关于制作制作福斯(FlySky)接收机讨论教程参考
- 地址：**https://www.rcgroups.com/forums/showthread.php?1921870-DIY-FlySky-TX-RX-module**

不过由于当时快递没到，所以没法实验，今天快递到了。于是尝试了一下，发现果然是可以使用的。于是这里简单的把制作过程分享一下。具体过程的话，大家可以进入上面发的地址进行查看。

首先主要准备一个**Arduino pro mini** 和一个 **MD7105 2.4G**模块

![MD7105](https://upload-images.jianshu.io/upload_images/2675631-bc7c98a5304827d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![MD7105 引脚](https://upload-images.jianshu.io/upload_images/2675631-a46afeb2d6531e74.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

引脚接线参考

|Arduino引脚|说明|
|-|-|
|A0 + GND |短接的话进行对码|
|VCC+ A3 |LDE 提示|
|  D6|MD7105 GIO1|
|  D5|MD7105 SDIO |
 | D4 |MD7105 SCK |
|   D2|MD7105 SCS|
| D10 |PPM 输出|
|D8+D3 |短接的话启用PPM|

> 根据需要添加 3.3V 稳压模块，我自己做的时候省略了

我将我使用的源码上传了，需要的小伙伴可以到下面链接进行下载：
- https://pan.baidu.com/s/1x1_pSTy9_aip4FqgJKAfEA 提取码: t3pg

焊好后大概是这样的

![](https://upload-images.jianshu.io/upload_images/2675631-c2f287dfd80cd9c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-de7391ad00a89330.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将它接在小四轴上

![](https://upload-images.jianshu.io/upload_images/2675631-b5df46faa6a314ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

使用的话是线用导线短接arduino上的**D8**和**D3**引脚，然后给小四轴通电，这时候LED亮

先将遥控器协议设置成1代协议，然后打开遥控器进入对码模式。

对码成功后LED熄灭，重新上电后就可以进行遥控了。

最后使用的感受上的话，总感觉有些反应延迟，不知道是因为太重了，还是PID没调好的缘故。

> 相关文章：
> - [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)
> - [fs-i6x(福斯)遥控加装nRF24L01多协议RC发射机(高频头)](https://www.jianshu.com/p/d6d009f6a112)
> - [简易蓝牙迷你四轴无人机制作教程资料参考](https://www.jianshu.com/p/67c8efa1a906)
> - [自己试着动手用nRF24L01和arduino做一个PPM接收机](https://www.jianshu.com/p/b05e97164eb1)
> - [用Arduino制作MWC(MultiWii)小四轴参考教程](https://www.jianshu.com/p/e7e344cb7844)
