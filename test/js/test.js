function fetchdata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            for(let i=0;i<6;i++){
            data.push(process[i])}
function searchDrones(query) {
    query = query.toLowerCase();
    return data.filter(function (drone) {console.log(drone)
        // 检查查询是否与无人机名称或位置匹配
        return (
            drone.name.toLowerCase().includes(query) ||
            (drone.lat + ',' + drone.lng).includes(query)
        );
    });
}

// 搜索按钮的事件监听器
document.getElementById('searchBtn').addEventListener('click', function () {
    var searchTerm = document.getElementById('searchInput').value;
    var searchResults = searchDrones(searchTerm);

    // 根据需要显示搜索结果，例如，更新地图标记或在列表中显示
    console.log('搜索结果:', searchResults);
    alert('搜索结果:\n' + JSON.stringify(searchResults, null, 2));
});// 全局定义标记数组，用于存储所有标记点
 }

    }
    xhr.send();
}
fetchdata();
setInterval(fetchdata, 200000);