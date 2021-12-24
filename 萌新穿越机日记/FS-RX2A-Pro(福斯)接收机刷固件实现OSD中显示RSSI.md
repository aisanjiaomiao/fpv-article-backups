
![](https://upload-images.jianshu.io/upload_images/2675631-fd4c3ff3fd5acd07.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 前几天在网上认识了一个玩穿越机的大佬。跟大佬聊天中，聊到了遥控器与接收机，然后就聊到了RSSI。其实我在OSD配置页面也看到过RSSI,设置过，不过一直是显示0，所以就没在意。大佬告诉我，福斯的接收机需要刷固件才能正确的显示RSSI数据，于是大佬给我分享了资料。由于我一直使用的是比较便宜的**FS-RX2A Pro**接收机，也是参考别的接收机版本刷固件的方式，经过了一番的摸索后，终于成功的刷入固件。这里就将过程分享给大家吧。

### 准备工作
首先我们需要准备的工具是**st-link仿真器**与**连接线**

![](https://upload-images.jianshu.io/upload_images/2675631-6447a37654b0dd53.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

需要安装**st-link仿真器**工具与接收机固件

固件下载地址:https://github.com/Cleric-K/FlySkyRxFirmwareRssiMod/tree/master/build

所使用的固件是**A8S_rssi_ch14.bin**与**A8S_rssi_ch8.bin**
我使用的是**A8S_rssi_ch14.bin**

> 当然啦为了下载方便，我将固件与工具已经放在网盘了：
**链接: https://pan.baidu.com/s/1Remz24NEXtPDjZ3O1vF6tg 提取码: tsmy**

### 烧录固件

接收机的接线的话，接收机的正负极直接接在仿真器的3.3V与GND就行
我是直接通过焊接接入的，而SWCLK与SWDIO部分稍微有点麻烦了，大家可以参考下面的图片

![](https://upload-images.jianshu.io/upload_images/2675631-6b348d8a79919673.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在实际的烧录过程中，我发现我手上有的接收机机PCB两款
区别在于一个是PCB板上有焊点，而另外一个没有
![左侧的有焊点，右侧的无焊点](https://upload-images.jianshu.io/upload_images/2675631-c840b47e5cec950c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

有焊点的烧录起来比较容易一些，只要先用电烙铁将裸露的焊点接上芯片
我使用的是刀头的电烙铁，焊接比较容易一些

![](https://upload-images.jianshu.io/upload_images/2675631-0674bb061c21d155.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

而触点部分，我使用的是两根从电阻上剪下的铁丝
![](https://upload-images.jianshu.io/upload_images/2675631-291a2b5c197863ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

烧录部分的话，首先是打开安装的**STM32 ST-LINK Utility**烧录工具
修改 Address  `0x08000000` 和 Size  `0x4000` 信号最大值为29
或 Size  `0x8000` 信号最大值为99
具体两个值的其他影响暂时不清楚，只是在网上看到有两种就全部试了一下
![](https://upload-images.jianshu.io/upload_images/2675631-a8a452394e9b4988.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

插上仿真器，进入设置Mode
![](https://upload-images.jianshu.io/upload_images/2675631-d9a243bb0fe069f6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-4fe5442642b367b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开需要刷入的固件

![](https://upload-images.jianshu.io/upload_images/2675631-e74447411e25a264.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


尝试连接，手动将触点连接

![](https://upload-images.jianshu.io/upload_images/2675631-8c83d63a14a70c46.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择菜单的**Program & Verify…**

![](https://upload-images.jianshu.io/upload_images/2675631-5d7297d2de1d8e7b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

打开失败会提示，说明没有连接成功，重复将接收机触点与仿真器进行连接
![](https://upload-images.jianshu.io/upload_images/2675631-7f46133d27ab3433.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

出现以下画面说明连接成功，这时候直接点击**Start**开始烧录。
![](https://upload-images.jianshu.io/upload_images/2675631-96df65a84c7d5de4.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

烧录成功后，控制台会出现以下提示
![](https://upload-images.jianshu.io/upload_images/2675631-ad8e640deedeb4c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 视频演示

https://www.bilibili.com/video/BV1hK4y1b7VT

### 测试
将接收机接入开发板，然后接入地面站，
在接收机调试页面我们可以看到通道**AUX10**默认值非常大，这就是我们的RSSI通道，只要设置映射就行了

![](https://upload-images.jianshu.io/upload_images/2675631-db7e1c40bf225773.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后在OSD界面开启RSSI
![](https://upload-images.jianshu.io/upload_images/2675631-6be657eaa9f37014.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

实际效果
![](https://upload-images.jianshu.io/upload_images/2675631-8b0c90f2979903a7.gif?imageMogr2/auto-orient/strip)


![](https://upload-images.jianshu.io/upload_images/2675631-0a685597f6d6be8c.gif?imageMogr2/auto-orient/strip)


> 参考资料:
> - [RSSI mod works also for FS-RX2A pro and FS-RX2A pro v1](https://www.rcgroups.com/forums/showthread.php?3093552-RSSI-Firmware-mod-for-FlySky-IA6B-and-X6B/page25#post44068183)
> - [FlySky – Turnigy ricevente con RSSI](http://ubhf.eu/flysky-turnigy-ricevente-rssi/)
> - [Flysky receivers RSSI mod – alternative firmware](http://www.multirotorguide.com/guide/flysky-receivers-rssi-mod-alternative-firmware/)
