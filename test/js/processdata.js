function fetchdata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://115.29.205.84:8888/api/data2', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            var user1={};
            var user2={};
            var user3={};
            var user4={};
            var user5={};
            var user6={};
            var userTracks1 = data.filter(function (item) {
                return item.name === "xfgh1";
            });
            var userTracks2 = data.filter(function (item) {
                return item.name === "xfgh2";
            });
            var userTracks3 = data.filter(function (item) {
                return item.name === "xfgh3";
            });
            var userTracks4 = data.filter(function (item) {
                return item.name === "xfgh4";
            });
            var userTracks5 = data.filter(function (item) {
                return item.name === "xfgh5";
            });
            var userTracks6= data.filter(function (item) {
                return item.name === "xfgh6";
            });
            
 user1=userTracks1[userTracks1.length-1]
 user2=userTracks2[userTracks2.length-1]
 user3=userTracks3[userTracks3.length-1]
 user4=userTracks4[userTracks4.length-1]
 user5=userTracks5[userTracks5.length-1]
 user6=userTracks6[userTracks6.length-1]
 process.push(user1,user2,user3,user4,user5,user6)
                var newLatitude1 = user1.lat;
                var newLongitude1 = user1.lng;
                var height1=user1.height;
                var number1=user1.device;
                var title1=user1.name;
                var battery1=56;
             var bd09togcj021 = coordtransform.bd09togcj02(newLongitude1,newLatitude1);
            var newmarkers1={position:bd09togcj021  ,title:title1,height:height1,number:number1,battery:battery1};
            
       var newLatitude2 = user2.lat;
                var newLongitude2 = user2.lng;
                var height2=user2.height;
                var number2=user2.device;
                var title2=user2.name;
                 var battery2=45;
                var bd09togcj022 = coordtransform.bd09togcj02(newLongitude2,newLatitude2);
            var newmarkers2={position:bd09togcj022 ,title:title2,height:height2,number:number2,battery:battery2};
            
            var newLatitude3 = user3.lat;
                var newLongitude3 = user3.lng;
                var height3=user3.height;
                var number3=user3.device;
                var title3=user3.name;
                 var battery3=34;
                var bd09togcj023 = coordtransform.bd09togcj02(newLongitude3,newLatitude3);
            var newmarkers3={position:bd09togcj023  ,title:title3,height:height3,number:number3,battery:battery3};
            
            var newLatitude4 = user4.lat;
                var newLongitude4 = user4.lng;
                var height4=user4.height;
                var number4=user4.device;
                var title4=user4.name;
                var battery4=21;
                var bd09togcj024 = coordtransform.bd09togcj02(newLongitude4,newLatitude4);
            var newmarkers4={position:bd09togcj024 ,title:title4,height:height4,number:number4,battery:battery4};
            
            var newLatitude5 = user5.lat;
                var newLongitude5 = user5.lng;
                var height5=user5.height;
                var number5=user5.device;
                var title5=user5.name;
                var battery5=98;
                var bd09togcj025 = coordtransform.bd09togcj02(newLongitude5,newLatitude5);
            var newmarkers5={position:bd09togcj025  ,title:title5,height:height5,number:number5,battery:battery5};
            
            var newLatitude6 = user6.lat;
                var newLongitude6 = user6.lng;
                var height6=user6.height;
                var number6=user6.device;
                var title6=user6.name;
                var battery6=78;
                var bd09togcj026 = coordtransform.bd09togcj02(newLongitude6,newLatitude6);
            var newmarkers6={position:bd09togcj026 ,title:title6,height:height6,number:number6,battery:battery6};
            markers.push(newmarkers1);
            markers.push(newmarkers2);
            markers.push(newmarkers3);
            markers.push(newmarkers4);
            markers.push(newmarkers5);
            markers.push(newmarkers6);
             map.clearMap();
            var iconSize = new AMap.Size(35, 35);
            markers.forEach(function (marker) {
                // 创建新的地图标记
                var newMarker = new AMap.Marker({
                    map: map,
                    title:marker.title,
                    height:marker.height,
                    number:marker.number,
                    battery:marker.battery,
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
                var battery1=marker.battery;
                // 创建信息窗体
                infoWindow = new AMap.InfoWindow({
                    content: '<div class="custom-info-window">' +
                        '<h3><img src="../images/user.png" alt="Info Image" class="info-image2" style="width:0.4rem;height:0.4rem;vertical-align: middle;margin-right: 0.1rem;">用户：' + marker.title +'</h3>' +
                        '<p><img src="../images/wurenji.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">型号：' + number1 + '<br><img src="../images/nav_9.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">经度：' + longitude + '<br><img src="../images/nav_9.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">纬度：' + latitude + '<br><img src="../images/nav_10.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">高度：'+ height1 +'<br><img src="../images/charge.png" alt="Info Image" class="info-image2" style="width:0.3rem;height:0.3rem;vertical-align: middle;margin-right: 0.1rem;">电量：'+ battery1+'</p>' +
                        '</div>',
                    offset: new AMap.Pixel(0, -30)
                });
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
            })
        }
    }
    xhr.send();
}
fetchdata();
setInterval(fetchdata, 60000);