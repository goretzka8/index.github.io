//首页数字改变
function fetchdata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText)
            sum = 0;
            for (var i = 0; i < data.length; i++) {
                var user = data[i]
                if (user.Address== "武汉") sum++
            }
            document.getElementById("number-1").innerHTML = (data.length+6);
            document.getElementById("number-2").innerHTML = sum+6;
            document.getElementById("a-1").innerHTML = data[0].name;
            document.getElementById("a-2").innerHTML = data[1].name;
            document.getElementById("a-3").innerHTML = data[2].name;
            document.getElementById("a-4").innerHTML = data[3].name;
            document.getElementById("a-5").innerHTML = data[4].name;
            document.getElementById("a-6").innerHTML = data[5].name;
            document.getElementById("a-7").innerHTML = data[6].name;
        }
    }
    xhr.send();
   
}
fetchdata();
setInterval(fetchdata, 20000);
