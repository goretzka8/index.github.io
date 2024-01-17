var polyline = null; // 全局变量用于存储绘制的轨迹
var startMarker = null; // 全局变量用于存储起点标记
var endMarker = null; // 全局变量用于存储终点标记
var text = null; // 全局变量用于存储绘制的文字标记

function fetchdata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://115.29.205.84:8888/api/data2', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            var userTracks = data.filter(function (item) {
                return item.name === "xfgh2";
            });
            for(let i=0;i<userTracks.length;i++){
            var bd09togcj02 = coordtransform.bd09togcj02(userTracks[i].lng,userTracks[i].lat);
            userTracks[i].lng=bd09togcj02[0];userTracks[i].lat=bd09togcj02[1];
        }
       
            var lineBtn = document.getElementById('line');
            lineBtn.addEventListener('click', function () {
                if (polyline) {
                    // 如果已经绘制了轨迹，则消除轨迹和文字标记
                    map.remove([polyline, startMarker, endMarker, text]);
                    polyline = null;
                    startMarker = null;
                    endMarker = null;
                    text = null;
                      document.getElementById('tip').innerHTML = 'xfgh1无人机状态' ;
                } else {
                    // 如果没有绘制轨迹，则绘制轨迹和文字标记
                    drawPolyline(userTracks);
                }
            });
        }
    }
    xhr.send();
}

function drawPolyline(data) {
    // 提取经纬度信息
    
    var path = data.map(function (item) {
        return [parseFloat(item.lng), parseFloat(item.lat)];
    });

    // 设置折线的路径
    AMap.plugin('AMap.GraspRoad', function () {
        var graspRoad = new AMap.GraspRoad();
        text = new AMap.Text({
            text: data[0].name,
            position: path[0], // 选取轨迹的起点
            offset: new AMap.Pixel(0, -20), // 设置文字标记的偏移量，使其显示在轨迹起点上方
            style: {
                'background-color': 'rgba(255, 255, 255, 0.8)',
                'border-width': '1px',
                'border-color': '#999',
                'text-align': 'center',
                'padding': '2px',
                'font-size': '10px',
            },
            zIndex: 100, // 标记的层级
        });

        startMarker = new AMap.Marker({
            map: map,
            position: path[0],
            icon: new AMap.Icon({
                size: new AMap.Size(30, 30),
                image: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
                imageSize: new AMap.Size(30, 30)
            }),
            zIndex: 90, // 标记的层级
        });

        endMarker = new AMap.Marker({
            map: map,
            position: path[path.length - 1],
            icon: new AMap.Icon({
                size: new AMap.Size(30, 30),
                image: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
                imageSize: new AMap.Size(30, 30)
            }),
            zIndex: 90, // 标记的层级
        });

        polyline = new AMap.Polyline({
            path: path,
            isOutline: true,
            outlineColor: '#ffeeff',
            borderWeight: 3,
            strokeColor: "#3366FF",
            strokeOpacity: 1,
            strokeWeight: 3,
            strokeStyle: "solid",
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50,
        });
 
        map.add([polyline, startMarker, endMarker, text]);
        map.setFitView();
        document.getElementById('tip').innerHTML ='xfgh1无人机历史轨迹：'+ '<br>xfgh1无人机起飞：' + path[0] + '<br>xfgh1无人机降落：' + path[path.length - 1];
    });
}

fetchdata();
setInterval(fetchdata, 200000);
