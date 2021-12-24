![](https://upload-images.jianshu.io/upload_images/2675631-4169eebe07747a83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 简介

自从前两天成功的给自己的**福斯I6X**遥控器加装**多协议高频头**后，突然的突发奇想**“既然发射器制作成功了，那这样是不是也可以自己做一个接收机呢？”**

于是上网查阅了资料，发现有不少方案。可我手上有的可以用的材料就只有**nRF24L01**与**arduino mini**,可惜没找到对应的教程。

既然没教程，那有没有其他办法呢？看到边上改装好的遥控器后，想到了。既然**多协议高频头**里面所能够控制的无人机协议有源码，那么是不是接收端也有开源的代码呢？

上网再次一搜索，不出所料的，有好多，这里随便列举几个：
- https://github.com/execuc/v202-receiver
- https://github.com/donquixote2u/v202_sbus
- https://github.com/Suxsem/symaxrx
- https://github.com/gergespenst/bayang_rx
- https://github.com/AlexGhiti/CX10_arduino_receiver

我这里选择了第一个**v202-receiver**项目进行改写实现。

### 实验

#### 1.根据说明将原件连接后接入电脑

接线参考

|arudino 引脚	|nRF24|
|-|-| 
|D13|	SCK |
|D12|	MISO|
|D11|	MOSI  |
|D8	|  CE|
|D7|	CS|

### 2.对频接收实验

打开源码并上传

上传完成后**打开串口监视器**

![](https://upload-images.jianshu.io/upload_images/2675631-58536eef5f32ee5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 
默认会显示一个**Start**,这时拿出遥控器，将俯仰杆往前，打开遥控器进行对频

对频成功后，会出现提示，并输出不同通道的对应的16进制值

![](https://upload-images.jianshu.io/upload_images/2675631-9432f455f4951888.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

摆动遥控杆，看看变化

![](https://upload-images.jianshu.io/upload_images/2675631-8122773208eba455.gif?imageMogr2/auto-orient/strip)

### 3.尝试输出PPM信号

上一步我们成功的接收到了遥控数据，那现在来试着将数据输出为PPM

同样，我上网搜索了**arduino**的PPM相关库，最后选择了**[PPMEncoder](https://github.com/schinken/PPMEncoder)**库来生成PPM

在源码中引入**PPMEncoder**，定义输出引脚
```C
.....
#include "PPMEncoder.h"
//我这里定义引脚10
#define OUTPUT_PIN 10
.....
```

在**setup**函数中进行初始化(默认初始化通道数为8通道)
```C
void setup() {
  ....
  //初始化引脚
  ppmEncoder.begin(OUTPUT_PIN);
  //初始化各通道对应值，值与顺序可以自行调整
  ppmEncoder.setChannelPercent(2,  0);
  ppmEncoder.setChannelPercent(3,  24);
  ppmEncoder.setChannelPercent(1,  24);
  ppmEncoder.setChannelPercent(0, 24);
  ppmEncoder.setChannelPercent(4,  0);
  ppmEncoder.setChannelPercent(5,  0);
  ppmEncoder.setChannelPercent(6,  0);
  ppmEncoder.setChannelPercent(7,  0);
}
```

在**loop**下的`case BOUND_NEW_VALUES:`处，通过**ppmEncoder.setChannelPercent**设置通道与对应值

处理遥杆的值很简单，只要将对应的值转成输出的值就好了

![](https://upload-images.jianshu.io/upload_images/2675631-77068984583df5dd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

剩下的4个通道我们需要计算

我在之前那**nrf24_multipro**高频头项目里的**V2x2.ino**文件找到了剩余通道的定义

```c
enum {
  // flags going to byte 14  
  V2x2_FLAG_CAMERA = 0x01, // also automatic Missile Launcher and Hoist in one direction
  V2x2_FLAG_VIDEO  = 0x02, // also Sprayer, Bubbler, Missile Launcher(1), and Hoist in the other dir.
  V2x2_FLAG_FLIP   = 0x04,
  V2x2_FLAG_UNK9   = 0x08,
  V2x2_FLAG_LED    = 0x10,
  V2x2_FLAG_UNK10  = 0x20,
  V2x2_FLAG_BIND   = 0xC0,
  V2x2_FLAG_HEADLESS  = 0x0200,
  V2x2_FLAG_MAG_CAL_X = 0x0800, 
  V2x2_FLAG_MAG_CAL_Y = 0x2000
};

```

其实这些值对应到接收机代码，其实处理的就是**rxValues.flags**的值

这里处理方式就比较简单粗暴了

我直接将**rxValues.flags**的值，从最大值开始判断，然后减去

由于剩下的是4通道，所以

![](https://upload-images.jianshu.io/upload_images/2675631-6024aa50bbeda482.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

代码中的**delay(2);**我实际是删除了

上传代码，接上飞控

需要先设置飞控的接收机类型


![](https://upload-images.jianshu.io/upload_images/2675631-1b82aa6f3fd7f93e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/2675631-e0ccfda87b296958.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后遥控器对频测试

![](https://upload-images.jianshu.io/upload_images/2675631-fb6d3b1d4c0da7c4.gif?imageMogr2/auto-orient/strip)

### 4.真机测试

焊接
![](https://upload-images.jianshu.io/upload_images/2675631-c61a6059cdf6aa85.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

将自制接收机接上小四轴
![](https://upload-images.jianshu.io/upload_images/2675631-cb22a1be8799243d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

第一次测试没能飞起来，主要是因为电机转动瞬间，arduino就掉电重启了。

于是我随手拿来一个电容给接上了

![](https://upload-images.jianshu.io/upload_images/2675631-3afb8ca3abed9eae.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

对频

![](https://upload-images.jianshu.io/upload_images/2675631-a0df7e7ecc2eb5a6.gif?imageMogr2/auto-orient/strip)

解锁
![](https://upload-images.jianshu.io/upload_images/2675631-059b2986958ee6b6.gif?imageMogr2/auto-orient/strip)

(σﾟ∀ﾟ)σ..:*☆起飞啦

![](https://upload-images.jianshu.io/upload_images/2675631-bbeaa13a0e1c619e.gif?imageMogr2/auto-orient/strip)

![](https://upload-images.jianshu.io/upload_images/2675631-f03821f01f620f09.gif?imageMogr2/auto-orient/strip)

### 总结
这个自制的接收机的遥控范围没有做测试，不过还有很多需要优化的地方，比如体积对于小四轴来说有点大，还有就是失去遥控信号后的一些逻辑处理需要优化的。这里的话就提供一个思路来给大家参考。


> 相关文章：
> - [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)
> - [fs-i6x(福斯)遥控加装nRF24L01多协议RC发射机(高频头)](https://www.jianshu.com/p/d6d009f6a112)
> - [用Arduino制作MWC(MultiWii)小四轴参考教程](https://www.jianshu.com/p/e7e344cb7844)
> - [用MD7105+Arduino制作福斯(FlySky)PPM接收机](https://www.jianshu.com/p/a931c99b2b98)
