//俯视图
function fly() {
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.093221, 24.630356, 12600)
    })
}
//默认视图
function fly1() {
    viewer.camera.flyTo({
        destination: new Cesium.Cartesian3(-2739278.6269749175, 5129358.380675672, 2618128.923649655),
        orientation: {
            heading: 6.219728345464976,
            pitch: -0.21697651057209244,
            roll: 0.0001896574497015635,
        },
    });
}

function xmut(){
        viewer.scene.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(118.0823,24.6262, 1000)
        })
}

function xmdx(){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.1135,24.4309, 1000)
    })
}

function jmdx(){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.101299,24.58847 , 1000)
    })
}

function xmgxy(){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.071976,24.619679,1000)
    })
}  

function hqdx(){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(118.071976,24.619679,1000)
    })
}