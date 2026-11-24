/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//因为skd包比较小，不在分sdk包
// const loadTask = wx.loadSubpackage({
//     name: 'sdk', // name 可以填 name 或者 root
//     success: function(res) {
//         // 分包加载成功后通过 success 回调
//         console.log("subpackageSuccess");
//     },
//     fail: function(res) {
//         // 分包加载失败通过 fail 回调
//         console.log("fail");
//     }
// }); 

//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.ani.js")
loadLib("libs/laya.html.js")
loadLib("libs/laya.ui.js")
loadLib("libs/domparserinone.js")
loadLib("libs/jszip.js")
loadLib("libs/crypto-js.js")
loadLib("libs/bytebuffer.js")
loadLib("libs/md5.js")
loadLib("libs/promise.js")
loadLib("libs/querystring.js")
loadLib("libs/zlib.min.js")
loadLib("libs/TweenMax.js")
//loadLib("libs/min/greensock.min.js")//这个有no accass问题
loadLib("libs/fairygui.js")
loadLib("libs/h5sdk/7RoadWXgame.js",function(){
  var Road = require('libs/h5sdk/7RoadWXgame.js');
  console.log("微信接入sdk库");
	window.Road_7 = Road;
	window.Wx7ktx = true;
	
	const updateManager = wx.getUpdateManager();
	updateManager.onCheckForUpdate(function (res) {
	  // 请求完新版本信息的回调
	  console.log(res.hasUpdate)
	});

	updateManager.onUpdateReady(function () {
	  wx.showModal({
		title: '更新提示',
		content: '新版本已经准备好，是否重启应用？',
		success: function (res) {
		  if (res.confirm) {
			// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			updateManager.applyUpdate()
		  }
		}
	  })
	});
	
	updateManager.onUpdateFailed(function () {
		// 新版本下载失败
	});
})
//-----libs-end-------


// 封装一个异步函数，用于加载分包
function loadSubpackage(name) {
  return new Promise((resolve, reject) => {
    wx.loadSubpackage({
      name: name,
      success: res => resolve(res),
      fail: err => reject(err)
    });
  });
}

// 在异步函数中按顺序加载多个分包
async function loadSubpackages() {
  try {
	await loadSubpackage('protobuf');
    console.log('protobuf 分包加载成功');
    await loadSubpackage('js');
    console.log('js 分包加载成功');
    
    // ... 继续加载其他分包 ...
    
    console.log('所有分包加载完成');
    
    // 在这里可以执行其他操作，例如启动游戏主逻辑
    // ...
    
  } catch (err) {
    console.error('分包加载失败', err);
  }
}
// 调用异步函数加载分包
loadSubpackages();

