/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("libs/laya-14c709d9c8.core.js")
loadLib("libs/laya-1de38b3a2c.ani.js")
loadLib("libs/laya-8219f988c2.html.js")
loadLib("libs/laya-827ec8926e.ui.js")
loadLib("libs/domparserinone-1d0d7b1cdf.js")
loadLib("libs/jszip-be1865fe81.js")
loadLib("libs/crypto-js-f716a02969.js")
loadLib("libs/bytebuffer-c301aa56dc.js")
loadLib("libs/md5-94fad89030.js")
loadLib("libs/promise-b1555fca92.js")
loadLib("libs/querystring-00c8c27f87.js")
loadLib("libs/zlib-ce2bf40cbe.min.js")
loadLib("libs/TweenMax-3fb6831dcd.js")
loadLib("libs/fairygui-16a29a91c6.js")
//-----libs-end-------

var releaseLibs = ["libs/min/release/protobuf-library-022e3876bb.min.js", "libs/min/release/protobuf-bundles-85ef1dfc9b.min.js", "js/bundle_release-ad60bfe795.js"];
var betaLibs = ["libs/min/beta/protobuf-library-022e3876bb.min.js", "libs/min/beta/protobuf-bundles-85ef1dfc9b.min.js", "js/bundle_beta.js"];
var VersionList = {
    release: { jsVersion: releaseLibs },
    beta: { jsVersion: betaLibs }
}

var curVersionType = localStorage.getItem("versionType");

if (!VersionList[curVersionType]) {
    curVersionType = "release";
}

var curJsVersion = VersionList[curVersionType].jsVersion;
var curReVersion = VersionList[curVersionType].reVersion;

for (let lib of curJsVersion) {
    loadLib(lib);
}

function checkNeedReload(versionType) {
    if (versionType == curVersionType) return false;
    if (!VersionList[versionType]) return false;
    if (VersionList[versionType].reVersion != curReVersion) return true;
    let jsLibs = VersionList[versionType].jsVersion;
    for (let lb of jsLibs) {
        if (curJsVersion.indexOf(lb) < 0) {
            return true
        }
    }
    return false;
}

function gotoVersionAndReload(versionType, siteData) {
    localStorage.setItem("versionType", versionType);
    localStorage.setItem("siteData", siteData);
    localStorage.setItem("isSwitchSite", "true");
    window.location.reload();
}
