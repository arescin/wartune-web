var zoneStr = localStorage.getItem("7Road_undefined-SITE_ZONE");
console.log("siteId===>",zoneStr);
if(!zoneStr){
    loadLib("gameindex.js?timestamp=" + new Date().getTime());
}else{
    var oldarea = JSON.parse(zoneStr);
    if(oldarea !=null && [1,2,13,3].indexOf(oldarea.area) != -1){
        if(oldarea.localCDN != "" && oldarea.localCDN != null && oldarea.localCDN != "undefined"){
            if(oldarea.localCDN == "forbidden"){
                loadLib("gameindex.js?timestamp=" + new Date().getTime());
            }else{
                loadLib(oldarea.localCDN + "/gameindex.js?timestamp=" + new Date().getTime());
            }
        }else{
            localStorage.removeItem("7Road_undefined-SITE_ZONE");
            loadLib("gameindex.js?timestamp=" + new Date().getTime());
        }
    }else{
        loadLib("gameindex.js?timestamp=" + new Date().getTime());
    }
}