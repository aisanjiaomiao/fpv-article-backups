### 前言
前几天发了一篇关于 [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51) 的文章。

在很早之前写过 [简易蓝牙迷你四轴无人机制作教程资料参考](https://www.jianshu.com/p/67c8efa1a906) 。

其实当时的用Arduino制作MWC小四轴算是失败的。因为很多软件上的一些配置与硬件上的整体配合，并不是我当时看的一些教程说的那样简单。当然，也因为当时的我想的太简单了，所以失败了。

就在我成功使用STM32F103C8T6成功完成了一架小四轴之后，我再次尝试用Arduino制作MWC小四轴。

### 材料准备

参考
|材料|	数量|
|-|-|
|Arduino Pro mini|	1|
|GY 521|1|
|8520 空心杯|4|
|机架(我是用Q100机架)|1|
|与机架尺寸适配的正反桨(我使用65MM桨叶)|4|
| SI 2302 （N-MOS管） | 	4  |
| 10kΩ电阻（贴片） | 	4  |
|1S 25C航模锂电|1|
|电池接线头|1|
|>1uf 的电解电容|1|
|5V 升压模块|1|
|PPM 接收机|1|
|航模遥控器|1|
|其他辅助材料||

### 接线参考
![](https://upload-images.jianshu.io/upload_images/2675631-c0bdef81a9063346.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

空心杯驱动部分可以参考**[使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)**

### 焊接

![](https://upload-images.jianshu.io/upload_images/2675631-f7a241237c21e6a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-2bd5ae4ecaf9b372.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 程序烧录与调试

我把我修改过配置的程序上传了
- 链接: https://pan.baidu.com/s/1MbMpcpynK2euzsCFDuBXkQ 提取码: mrpe 

程序烧录这块主要是要注意的配置有
|配置|说明|
|-|-|
|\#define QUADX         |   //四轴X模式|
|\#define MINCOMMAND  1008 |//初始化电机，未解锁时的ESC|
|\#define GY_521 |  //选择的传感器|
|\#define FORCE_GYRO_ORIENTATION(X, Y, Z) {imu.gyroADC[ROLL] =Y; imu.gyroADC[PITCH] = -X; imu.gyroADC[YAW] = -Z;}|强制陀螺仪的方向，这个需要根据实际情况进行修改，一定要修改正确，否则没法控制飞行方向|
|\#define SERIAL_SUM_PPM         ROLL,PITCH,THROTTLE,YAW,AUX1,AUX2,AUX3,AUX4,8,9,10,11 //用于Robe/Hitec/Futaba|根据自己的接收机，以及遥控器进行的通道映射设置|

修改完配置后，一定需要先卸桨，然后打开**MultiWiiConf**进行调试与配置，摆动飞行器观察方向是否一致，连接遥控器，查看通道映射是否正确。


### 组装试飞

![](https://upload-images.jianshu.io/upload_images/2675631-4ccc4ed29d2f7ed2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-a35af75381a0b900.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/2675631-9bfe95b6659e8b2b.gif?imageMogr2/auto-orient/strip)


![](https://upload-images.jianshu.io/upload_images/2675631-a8ba72cfdf20c644.gif?imageMogr2/auto-orient/strip)

![](https://upload-images.jianshu.io/upload_images/2675631-bab241a375294a76.gif?imageMogr2/auto-orient/strip)

### 一些坑
#### 电池
![](https://upload-images.jianshu.io/upload_images/2675631-7b01dfb3a4e76ea0.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
电池的话需要选择航模专用的电池，我之前的话不懂，一直用普通mp4拆下来的电池，结果根本都带不动，电机一转，Arduino就断电重启了。电池不是容量越大越好，这需要跟机子整体重量进行配合。容量大，电池重，可能飞行时的幅度变动太大，机子会晃动，会造成失控的可能。

#### 5v 升压

![](https://upload-images.jianshu.io/upload_images/2675631-608d5f77f756673d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5V 升压不一定需要，这根据电机的情况进行配合。我这使用的是8520电机，之前制作的时候使用的720电机。一开始没加5V 升压模块，在使用8520电机时发现，只要一加大油门，Arduino就断电重启了。使用Arduino我是接5v供电，电机是直接电池取电的。

#### 电容
加电容一部分也是一个心理安慰吧，个人感觉上是需要加的。实际上可以不需要。


#### 电机
![](https://upload-images.jianshu.io/upload_images/2675631-92b5c48ac73cec88.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在选购电机的时候，需要注意一下电机的驱动电压。我所使用的8520电机有两个驱动电压版本，一个是3.7V的，一个是7.4V的。文章中使用的是3.7V的版本。

#### 桨叶
桨叶一定要注意尺寸。一个是轴距，一个是孔距。轴距太大，可能桨叶会碰撞，太小可能动力不足。孔距太小，插不进电机上，太大又没法固定。

> 相关文章：
> - [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)
> - [fs-i6x(福斯)遥控加装nRF24L01多协议RC发射机(高频头)](https://www.jianshu.com/p/d6d009f6a112)
> - [简易蓝牙迷你四轴无人机制作教程资料参考](https://www.jianshu.com/p/67c8efa1a906)
> - [自己试着动手用nRF24L01和arduino做一个PPM接收机](https://www.jianshu.com/p/b05e97164eb1)
> - [用MD7105+Arduino制作福斯(FlySky)PPM接收机](https://www.jianshu.com/p/a931c99b2b98)


