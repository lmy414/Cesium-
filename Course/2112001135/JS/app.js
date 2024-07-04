Cesium.Ion.defaultAccessToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MGJiYjdjYy1hOGI2LTQ4NzctYjlmOS05NjE1Mjc1ZTQ1MWEiLCJpZCI6MjI0MDcxLCJpYXQiOjE3MTkxOTQ0NDZ9.-IBkyZnizFzST_FmBn-gXtWqXS9S5zEWX9917ut3Q4s"

const viewer = new Cesium.Viewer('cesiumContainer', {
    //隐藏默认地图控件
    homeButton:false,
    sceneModePicker:false,
    baseLayerPicker:false,
    navigationHelpButton:false,
    animation:false,
    timeline:false,
    fullscreenButton:false,
    vrButton:false,
    infoBox:true,
    geocoder:false,//是否显示地名查找控件  如果设置为true，则无法查询
    //请求三维地形服务
    terrain: Cesium.Terrain.fromWorldTerrain({
        requestWaterMask: true,//水体渲染
        requestVertexNormals: true,//光照

    }),
});
viewer._cesiumWidget._creditContainer.style.display = "none";//隐藏版权信息

viewer.imageryLayers.get(0).show = false;//删除底图

//默认加载高德地图数据
tdtLayer = new Cesium.UrlTemplateImageryProvider({
    url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    minimumLevel: 3,
    maximumLevel: 18
})
viewer.imageryLayers.addImageryProvider(tdtLayer);//添加图层到视图

// 鹰眼地图初始化
let hawkEyeMap = new HawkEyeMap(viewer);
hawkEyeMap._init();

viewer.extend(Cesium.viewerCesiumNavigationMixin);

//初始化相机位置
viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(-2739278.6269749175, 5129358.380675672, 2618128.923649655),
    orientation: {
        heading: 6.219728345464976,
        pitch: -0.21697651057209244,
        roll: 0.0001896574497015635,
    },
});
var longitude_show = document.getElementById('longitude_show');
var latitude_show = document.getElementById('latitude_show');
var altitude_show = document.getElementById('altitude_show');
var canvas = viewer.scene.canvas;
//具体事件的实现
var ellipsoid = viewer.scene.globe.ellipsoid;
var handler = new Cesium.ScreenSpaceEventHandler(canvas);
handler.setInputAction(function (movement) {
    //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
    var cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
    if (cartesian) {
        //将笛卡尔三维坐标转为地图坐标（弧度）
        var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
        //将地图坐标（弧度）转为十进制的度数
        var lat_String = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
        var log_String = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
        var alti_String = (viewer.camera.positionCartographic.height / 1000).toFixed(2);
        longitude_show.innerHTML = log_String;
        latitude_show.innerHTML = lat_String;
        altitude_show.innerHTML = alti_String;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

viewer._cesiumWidget._creditContainer.style.display = "none";
var scene = viewer.scene;
var loadedModels = [];
var tempPoints = [];
var tempEntities = [];
var tempPinEntities = [];
var tempPinLon, tempPinLat;
var handler = null;