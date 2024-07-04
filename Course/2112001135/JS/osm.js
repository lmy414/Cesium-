let is_OSM_build = false;//判断是否加载了osm建筑
async function ModelOn() {

    if (is_OSM_build === false) {
        tileset = viewer.scene.primitives.add(
            await Cesium.Cesium3DTileset.fromIonAssetId(96188),
        );
        viewer.scene.primitives.add(tileset);
    }
    is_OSM_build = true;
}
// 移除osm建筑
function ModelOff() {
    viewer.scene.primitives.remove(tileset);
    is_OSM_build = false;
}