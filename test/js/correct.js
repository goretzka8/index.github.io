//在地图中改变经纬度坐标

function fetchdata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            for (var index = 0; index < data.length - 1; index++) {
                var user = data[index];
                var newLatitude = user.lat;
                var newLongitude = user.lng;
                var height=user.height;
                var number=user.device;
                var title=user.name;
                var battery=user.battery_level;
var bd09togcj02 = coordtransform.bd09togcj02(newLongitude,newLatitude);

                // 更新第二个标记点的经纬
                 if (index < 5) {
                        markers[index].position =  bd09togcj02;
                        markers[index].height = height;
                        markers[index].number = number;
                        markers[index].title = title;
                        markers[index].battery= battery;
                    } else {
                        var newmarkers = {
                            position:  bd09togcj02,
                            title: title,
                            height: height,
                            number: number,
                            battery:battery
                        };
                        markers.push(newmarkers);
                    }
                
            }
            map.clearMap();
            var iconSize = new AMap.Size(35, 35);
            markers.forEach(function (marker) {
                // 创建新的地图标记
                var newMarker = new AMap.Marker({
                    map: map,
                    title:title,
                    height:height,
                    number:number,
                    battery:battery,
                      icon: new AMap.Icon({
        size: iconSize, // 设置图标大小
        image: "images/poi.png", // 图标的URL
        imageSize: iconSize // 设置图标图片大小
    }),
                    position: [marker.position[0], marker.position[1]],
                    offset: new AMap.Pixel(-13, -30),
                });
                var latitude = marker.position[0];
                var longitude = marker.position[1];
                var height1=marker.height;
                var number1=marker.number;
                var battery1=marker.battery
                // 创建信息窗体
                infoWindow = new AMap.InfoWindow({
                    content: '<div class="custom-info-window">' +
                        '<h3><img src="../images/user.png" alt="Info Image" class="info-image2" style="width:0.4rem;height:0.4rem;vertical-align: middle;margin-right: 0.1rem;">用户：' + marker.title +'</h3>' +
                        '<p><img src="../images/wurenji.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">型号：' + number1 + '<br><img src="../images/nav_9.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">经度：' + longitude + '<br><img src="../images/nav_9.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">纬度：' + latitude + '<br><img src="../images/nav_10.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">高度：'+ height1 +'<br><img src="../images/charge.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">电量：'+ battery1 +'</p>' +
                        '</div>',
                    offset: new AMap.Pixel(0, -30)
                });
var droneBtn = document.getElementById('droneposition');
var circleFence = null;  // 将 circleFence 定义在外部，以便在不同按钮点击事件之间共享

// 初始状态为范围未显示
var isFenceVisible = false;

droneBtn.addEventListener('click', function () {
    // 判断是否要显示或隐藏范围
    if (!isFenceVisible) {
        // 显示范围
        showFence();
    } else {
        // 隐藏范围
        hideFence();
    }
});

function showFence() {
    var fenceCenter = [108, 32];  // 围栏中心点坐标
    var fenceRadius = 1600000;  // 围栏半径，单位：米

    // 创建围栏对象
    circleFence = new AMap.Circle({
        center: fenceCenter,
        radius: fenceRadius,
        strokeColor: "#F33",  // 围栏边界颜色
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: 'transparent',  // 围栏填充颜色
        fillOpacity: 0.35,
        zIndex: 9999
    });

    // 在地图上显示围栏
    circleFence.setMap(map);

    // 更新状态为范围已显示
    isFenceVisible = true;

    // 执行越界检测和警告
    checkAndAlert();
}

function hideFence() {
    // 隐藏围栏
    if (circleFence) {
        circleFence.setMap(null);
    }

    // 更新状态为范围未显示
    isFenceVisible = false;
}

function checkAndAlert() {
    var isAlertShown = false;  // 添加一个标志用来表示警告窗口是否已经弹出过
    var droneArray = [];  // 保存越界无人机信息的数组

    markers.forEach(function (marker) {
        var droneLocation = marker.position;  // 无人机当前坐标

        if (!circleFence.contains(droneLocation)) {
            // 无人机越界，将信息保存到数组中
            console.log("无人机 " + marker.title + " 越界");
            droneArray.push(marker.title);
        }
    });

    if (droneArray.length > 0 && !isAlertShown) {
        // 如果有越界的无人机，并且警告窗口尚未弹出过
        // 使用 SweetAlert2 创建自定义样式的警告框
        Swal.fire({
            title: '越界警告',
            html: '无人机越界列表：<br>' + droneArray.join('<br>'),  // 使用换行展示越界无人机信息
            customClass: {
                popup: 'small-popup',
                title: 'small-font',
                htmlContainer: 'html-content',
                // 添加自定义类名
            },
            confirmButtonText: '知道了',
        });

        isAlertShown = true;  // 设置标志为已弹出
    }
}

                newMarker.on('mouseover', (function (infoWindow, marker) {

                    return function () {
                        // 在标记位置打开信息窗体
                        infoWindow.open(map, newMarker.getPosition());
                    };
                })(infoWindow, marker));

                newMarker.on('mouseout', (function (infoWindow, marker) {
                    return function () {
                        // 在标记位置打开信息窗体
                        infoWindow.close(map, newMarker.getPosition());
                    };
                })(infoWindow, marker));
            });


            // 更新完成后的提示
            document.getElementById('tips').innerHTML = '成功更新标记点的经纬度！';
        }

    }
    xhr.send();
}
fetchdata();
setInterval(fetchdata, 20000);
