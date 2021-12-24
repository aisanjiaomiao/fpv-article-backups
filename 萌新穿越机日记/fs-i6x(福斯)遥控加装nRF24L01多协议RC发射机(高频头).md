![](https://upload-images.jianshu.io/upload_images/2675631-05a964acaa4aea12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



> (￣_￣)无意间在网上发现了一个开源项目[nrf24-multipro](https://github.com/goebish/nrf24_multipro),看描述好像是能够控制很多玩具四轴，我手头上刚好有一架支持控制的**H36**玩具四轴，于是出于好奇，自己动手试了一下。这里把制作过程分享给感兴趣的小伙伴们参考。理论上只要遥控支持PPM输出的都是可以进行改装的。

### 准备材料

![](https://upload-images.jianshu.io/upload_images/2675631-b2b82de600f8382c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


材料参考
| 名称                | 数量 |
| ------------------- | ---- |
| arduino pro mini | x1   |
|  nrf24l01         | x1   |
| 转3.3v模块    | x1   |
| 其他      |    |

### 接线


| arudino 引脚 | 接线        |
| ------- | ----------- |
| D2      | 接遥控器的PPM 输入    |
| D3      | nRF24  MOSI |
| D4      | nRF24  SCK  |
| D5      | nRF24  CE   |
| A0      | nRF24  MISO |
| A1      | nRF24  CS   |

### 焊接

![](https://upload-images.jianshu.io/upload_images/2675631-1770db7abae1b604.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 上传代码

从**https://github.com/goebish/nrf24_multipro**下载代码。

进入项目目录打开**nRF24_multipro.ino**文件

不同的遥控器可能需要调节通道顺序，我的配置是这样的

![](https://upload-images.jianshu.io/upload_images/2675631-347c5b90afa9b29f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

开发板选择 **pro mini** 然后接上电脑就可以上传了

![](https://upload-images.jianshu.io/upload_images/2675631-697fb575c8e7d617.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 接入遥控器

先将发射机用胶带打包一下

![](https://upload-images.jianshu.io/upload_images/2675631-ce9bb3f536d3b25e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](https://upload-images.jianshu.io/upload_images/2675631-f6285941dbd308e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(ΘェΘ)记得一定要压缩体积，不然遥控器塞不下了

我分别从遥控器开关处接正极，遥控后盖处接负极和PPM

![](https://upload-images.jianshu.io/upload_images/2675631-bafa19e6071c7b9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在遥控器头部，我加了个小开关，控制发射机的打开关闭

主要我不清楚加发射器会不会对玩模拟器造成影响，但是肯定是对电池耗电造成影响，所以我就加了

![](https://upload-images.jianshu.io/upload_images/2675631-daac60cc03a78a99.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 测试

由于我的遥控是左手控制油门和方向，右手控制俯仰和侧翼的，这里我简称两个杆为油门杆，侧翼杆或俯仰杆吧


#### 协议切换参考

选择好协议，将遥控杆打到对应位置后，再开机进行对频

> 这里是部分，可能会增加跟多协议，详情大家前往https://github.com/goebish/nrf24_multipro进行查看

- 油门杆右下 + 侧翼杆右下 = EAchine E010, NiHui NH-010, JJRC H36 mini  
- 油门杆右下 + 侧翼杆右前 = FQ-777-124 Pocket Drone  
- 油门杆右下 +侧翼杆左前 = CX-10 older red PCB/CX11/CX205/CX30, JXD389/391/393, SH6057/6043/6044/6046/6047, FY326Q7, WLToys v252 Pro/v343, XinXun X28/X30/X33/X39/X40   
- 油门杆右下 + 侧翼杆左下 = WLToys V930/931/939/966/977/988  
- 油门杆右下 + 俯仰杆向后= HiSky RXs, HFP80, HCP80/100, FBL70/80/90/100, FF120, HMX120, WLToys v933/944/955  
- 油门杆右下 + 俯仰杆向前 = Syma X5C (older model), X2 ...  
- 油门杆右下 + 侧翼杆右 = MJX X600  
- 油门杆右下 + 侧翼杆左 = EAchine H8 mini 3D, JJRC H20/H22   
- 俯仰杆向后 + 侧翼杆左 = Syma X5C-1/X11/X11C/X12  
- 俯仰杆向后 + 侧翼杆右 = Attop YD-822/YD-829/YD-829C ...  
- 俯仰杆向前 + 侧翼杆右 = EAchine H8(C) mini, BayangToys X6/X7/X9, JJRC JJ850, Floureon H101, BWhoop B03 ...  
- 俯仰杆向前 + 侧翼杆左 = EAchine H7  
- 俯仰杆向前 = WLToys V202/252/272, JXD 385/388, JJRC H6C, Yizhan Tarantula X6 ...  
- 俯仰杆向后 = EAchine CG023/CG031/3D X4  
- 侧翼杆左 = Cheerson CX-10 green pcb  
- 侧翼杆右 = Cheerson CX-10 blue pcb & some newer red pcb, CX-10A, CX-10C, CX11, CX12, Floureon FX10, JJRC DHD D1  

我选择**JJRC H36 mini**的对频方式来测试一下

![](https://upload-images.jianshu.io/upload_images/2675631-f949d17aa29ecefe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![](https://upload-images.jianshu.io/upload_images/2675631-c17e0069f8e369fd.gif?imageMogr2/auto-orient/strip)

![](https://upload-images.jianshu.io/upload_images/2675631-c357099a0826a353.gif?imageMogr2/auto-orient/strip)

### 哈哈！成功啦！ヾ(^Д^*)/

> 相关文章：
> - [使用STM32F103C8T6开发板来做一架空心杯小四轴穿越机](https://www.jianshu.com/p/e5c6d30dec51)
> - [自己试着动手用nRF24L01和arduino做一个PPM接收机](https://www.jianshu.com/p/b05e97164eb1)
> - [用Arduino制作MWC(MultiWii)小四轴参考教程](https://www.jianshu.com/p/e7e344cb7844)
> - [用MD7105+Arduino制作福斯(FlySky)PPM接收机](https://www.jianshu.com/p/a931c99b2b98)
