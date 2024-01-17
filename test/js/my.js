//统计图改变
//设备类型
var currentSelectedId = "id1";
var currentSelectedId1 = "id1";
var currentSelectedId2 = "id1-5";// 初始选择的 ID
function fetchdata() {
    (function () {
        var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".line1 .chart"));
        // 2. 指定配置和数据
        var data5 = [0, 350, 610, 793, 664];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                var sum = 0;
                data5=[0,0,0,0,0]
                for (var i = 0; i < data.length; i++) {
                    var user = data[i]
                    if (user.device == 1) data5[0]++
                    else if (user.device== 2) data5[1]++
                    else if (user.device == 3) data5[2]++
                    else if (user.device == 4) data5[3]++
                    else data5[4]++
                    sum=data5[0]+data5[1]+data5[2]+data5[3]+data5[4]+6;
                }
                data5[0]=data5[0]+1;data5[1]=data5[1]+5;
                var option = {
                    grid: {
                        top: "10%",
                        left: "22%",
                        bottom: "10%"
                        // containLabel: true
                    },
                    toolbox: {
                        feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                    },
                    // 不显示x轴的相关信息
                    xAxis: {
                        show: false

                    },
                    yAxis: [
                        {
                            type: "category",
                            inverse: true,
                            data: ["设备1", "设备2", "设备3", "设备4", "设备5"],
                            // 不显示y轴的线
                            axisLine: {
                                show: false
                            },
                            // 不显示刻度
                            axisTick: {
                                show: false
                            },
                            // 把刻度标签里面的文字颜色设置为白色
                            axisLabel: {
                                color: "#fff"
                            }
                        },
                        {
                            data: data5,
                            inverse: true,
                            // 不显示y轴的线
                            axisLine: {
                                show: false
                            },
                            // 不显示刻度
                            axisTick: {
                                show: false
                            },
                            // 把刻度标签里面的文字颜色设置为白色
                            axisLabel: {
                                color: "#fff"
                            }
                        }
                    ],
                    series: [
                        {
                            name: "条",
                            type: "bar",
                            data: [parseInt(100 * (data5[0]) / sum), parseInt(100 * (data5[1])/ sum), parseInt(100 * data5[2] / sum), parseInt(100 * data5[3] / sum), parseInt(100 * data5[4] / sum), parseInt(100 * data5[5] / sum)],
                            yAxisIndex: 0,
                            // 修改第一组柱子的圆角
                            itemStyle: {
                                barBorderRadius: 20,
                                // 此时的color 可以修改柱子的颜色
                                color: function (params) {
                                    // params 传进来的是柱子对象
                                    // console.log(params);
                                    // dataIndex 是当前柱子的索引号
                                    return myColor[params.dataIndex];
                                }
                            },
                            // 柱子之间的距离
                            barCategoryGap: 50,
                            //柱子的宽度
                            barWidth: 10,
                            // 显示柱子内的文字
                            label: {
                                show: true,
                                position: "inside",
                                // {c} 会自动的解析为 数据  data里面的数据
                                formatter: "{c}%"
                            }
                        },
                        {
                            name: "框",
                            type: "bar",
                            barCategoryGap: 50,
                            barWidth: 15,
                            yAxisIndex: 1,
                            data: [100, 100, 100, 100, 100],
                            itemStyle: {
                                color: "none",
                                borderColor: "#00c1de",
                                borderWidth: 3,
                                barBorderRadius: 15
                            }
                        }
                    ]
                };

                // 3. 把配置给实例对象
                myChart.setOption(option);
                    myChart.on('click', function () {
        showFullscreenChart();
    });
        function showFullscreenChart() {
        document.getElementById('fullscreenPopup').style.display = 'block';
        var fullscreenChart = echarts.init(document.getElementById('fullscreenChart'));
        var fullscreenOption = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart.setOption(fullscreenOption);

        window.addEventListener("resize", function () {
            fullscreenChart.resize();
        });
    }

         }
        }
        xhr.send()
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();

    //地区分布
    (function () {
        // 1. 实例化对象
        var myChart = echarts.init(document.querySelector(".pie1  .chart"));
        // 2. 指定配置项和数据
        var data6 =
            [0, 0, 0, 0, 0, 0];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                for (var i = 0; i < data.length; i++) {
                    var user = data[i]
                    if (user.Address == "武汉") data6[0]++
                    else if (user.Address == "成都") data6[1]++
                    else if (user.Address == "荆州") data6[2]++
                    else if (user.Address == "上海") data6[3]++
                    else if (user.Address == "北京") data6[4]++
                    else data6[5]++
                    
                }
                document.getElementById("h-1").innerHTML = "wuhan----------------"
                document.getElementById("h-1").innerHTML += data6[0]+6;
                document.getElementById("h-2").innerHTML = "chengdu--------------"
                document.getElementById("h-2").innerHTML += data6[1];
                document.getElementById("h-3").innerHTML = "jinzhou---------------"
                document.getElementById("h-3").innerHTML += data6[2];
                document.getElementById("h-4").innerHTML = "shanghai-------------"
                document.getElementById("h-4").innerHTML += data6[3];
                document.getElementById("h-5").innerHTML = "beijing------------------"
                document.getElementById("h-5").innerHTML += data6[4];
                 document.getElementById("h-6").innerHTML = "lasa------------------"
                document.getElementById("h-6").innerHTML += data6[5];
                var option = {
                    legend: {
                        top: "90%",
                        itemWidth: 10,
                        itemHeight: 10,
                        textStyle: {
                            color: "rgba(255,255,255,.5)",
                            fontSize: "12"
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    // 注意颜色写的位置
                    color: [
                        "#006cff",
                        "#60cda0",
                        "#ed8884",
                        "#ff9f7f",
                        "#0096ff",
                        "#9fe6b8",
                        "#32c5e9",
                        "#1d9dff"
                    ],
                    toolbox: {
                        feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                    },
                    series: [
                        {
                            name: "地区分布",
                            type: "pie",
                            // 如果radius是百分比则必须加引号
                            radius: ["10%", "70%"],
                            center: ["50%", "42%"],
                            roseType: "radius",
                            data: [
                                { value: data6[0]+6, name: "武汉" },
                                { value: data6[1], name: "成都" },
                                { value: data6[2], name: "荆州" },
                                { value: data6[3], name: "上海" },
                                { value: data6[4], name: "北京" },
                                { value: data6[5], name: "拉萨" },
                            ],
                            // 修饰饼形图文字相关的样式 label对象
                            label: {
                                fontSize: 10
                            },
                            // 修饰引导线样式
                            labelLine: {
                                // 连接到图形的线长度
                                length: 10,
                                // 连接到文字的线长度
                                length2: 10
                            },
                            animationType: 'scale', // 缩放动画
                            animationEasing: 'elasticOut', // 缓动效果
                            animationDelay: function (idx) {
                                return idx * 200; // 延迟时间
                            }


                        }

                    ]
                };

                // 3. 配置项和数据给我们的实例化对象
                myChart.setOption(option);
           myChart.on('click', function () {
        showFullscreenChart2();
    });
        function showFullscreenChart2() {
        document.getElementById('fullscreenPopup2').style.display = 'block';
        var fullscreenChart2 = echarts.init(document.getElementById('fullscreenChart2'));
        var fullscreenOption2 = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart2.setOption(fullscreenOption2);

        window.addEventListener("resize", function () {
            fullscreenChart2.resize();
        });
    }
            }
        }
        xhr.send()
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();
    //折线图
    (function () {
        // 初始化图表
        var myChart = echarts.init(document.querySelector(".line2 .chart"));
        var data2 = [];
         var initialYAxisMax = 30.5220;  // 初始最大值
    var initialYAxisMin = 30.5202;
        // 加载初始数据
        loadData(currentSelectedId);
        // 为下拉框选项添加事件监听器
        document.getElementById("c-1").addEventListener("click", function () {
            updateData("id1");
        });

        document.getElementById("c-2").addEventListener("click", function () {
            updateData("id2");
        });

        document.getElementById("c-3").addEventListener("click", function () {
            updateData("id3");
        });

        document.getElementById("c-4").addEventListener("click", function () {
            updateData("id4");
        });

        document.getElementById("c-5").addEventListener("click", function () {
            updateData("id5");
        });
        
         document.getElementById("c-6").addEventListener("click", function () {
            updateData("id6");
        });
        function updateData(selectedId) {
            // 只有当用户选择了新的 ID 时才更新数据
            if (selectedId !== currentSelectedId) {
                loadData(selectedId);
                console.log(selectedId)
                currentSelectedId = selectedId;
            }
        }
        // 根据选定的选项加载数据
        function loadData(selectedId) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://115.29.205.84:8888/api/data2', true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                                    var userData = JSON.parse(xhr.responseText)
                const extractedData = {};
for(let i=0;i<6;i++){
    const userId = "id" + (i + 1); 
  extractedData[userId] = {
                lat: {},
                lng: {}
}
}
var j1=1;
var j2=1;
var j3=1;
var j4=1;
var j5=1;
var j6=1;
for(index=userData.length-1;index>=0;index--){
    user=userData[index];
    console.log(user);
    console.log(index)
    if(user.name=='xfgh1'&&j1<=6){
         
         extractedData['id1']["lat"]["lat" + (7-j1)]=user.lat;;
         extractedData['id1']["lng"]["lng" +(7-j1)]=user.lng;
  j1++;}
    else if(user.name=='xfgh2'&&j2<=6){
         extractedData['id2']["lat"]["lat" + (7-j2)]=user.lat;
         extractedData['id2']["lng"]["lng" +(7-j2)]=user.lng;
  j2++;
    }
     else if(user.name=='xfgh3'&&j3<=6){
         extractedData['id3']["lat"]["lat" + (7-j3)]=user.lat;
         extractedData['id3']["lng"]["lng" +(7-j3)]=user.lng;
  j3++;
    }
     else if(user.name=='xfgh4'&&j4<=6){
         extractedData['id4']["lat"]["lat" + (7-j4)]=user.lat;
         extractedData['id4']["lng"]["lng" +(7-j4)]=user.lng;
  j4++;
    }
     else if(user.name=='xfgh5'&&j5<=6){
         extractedData['id5']["lat"]["lat" + (7-j5)]=user.lat;
         extractedData['id5']["lng"]["lng" +(7-j5)]=user.lng;
  j5++;
    }
     else if(user.name=='xfgh6'&&j6<=6){
         extractedData['id6']["lat"]["lat" + (7-j6)]=user.lat;
         extractedData['id6']["lng"]["lng" +(7-j6)]=user.lng;
  j6++;
    }
}
                    data2 = Object.values(extractedData[selectedId].lat);
                    for(let j=0;j<6;j++){
                        
                    data2[j]=Number(data2[j]).toFixed(8);  
                    // 2. 指定配置和数据
                    }
              var currentOption = myChart.getOption();

            // 检查 yAxis 是否存在
            if (currentOption && currentOption.yAxis && currentOption.yAxis.length > 0) {
                // 只在第一次加载数据时设置y轴范围
                if (currentOption.yAxis[0].max === undefined) {
                    myChart.setOption({
                        yAxis: [{
                            max: Math.max.apply(null, data2) + 0.0005,
                            min: Math.min.apply(null, data2) - 0.0005,
                        }]
                    });
                }
            }
            
                   var option = {
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                lineStyle: {
                                    color: "#4c9bfd"
                                }
                            }
                        },
                        legend: {
                            top: "0%",
                            textStyle: {
                                color: "rgba(255,255,255,.5)",
                                fontSize: "12"
                            }
                        },
                        toolbox: {
                            feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                        },
                        grid: {
                            left: "0",
                            top: "30",
                            right: '15%',
                            bottom: '9%',
                            containLabel: true
                        },

                        xAxis: [
                            {
                                name: '时间/s',
                                nameTextStyle: {
                                    color: "#02a6b5", // 设置字体颜色
                                    fontSize: 12, // 设置字体大小
                                    fontWeight: "bold" // 设置字体粗细
                                    // 其他字体样式设置
                                },
                                type: "category",
                                boundaryGap: false,
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.7)",
                                        fontSize: 12
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "#012f4a"
                                    }
                                },

                                data: [
                                    "0",
                                    "20",
                                    "40",
                                    "60",
                                    "80",
                                    "100",
                                ]
                            },
                            {
                                axisPointer: { show: false },
                                axisLine: { show: false },
                                position: "bottom",
                                offset: 20
                            }
                        ],

                        yAxis: [
                            {
                                name: '纬度',
                                min: initialYAxisMin,  // 初始最小值
                            max: initialYAxisMax,  // 初始最大值
                                nameTextStyle: {
                                    color: "#02a6b5", // 设置字体颜色
                                    fontSize: 12, // 设置字体大小
                                    fontWeight: "bold" // 设置字体粗细
                                    // 其他字体样式设置
                                },
                                type: "value",
                                axisTick: { show: false },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: 12
                                    }
                                    
                                },

                                splitLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)"
                                    }
                                },
                           // 设置坐标轴刻度的最大间隔
                        //   min:30,
                        //   max:31
                                // min: Math.min.apply(null, data2) - 0.0005,
                                // // 设置y轴刻度的最大值
                                // max: Math.max.apply(null, data2) + 0.0005,
                            }
                        ],
                        series: [
                            {
                                name: "纬度变化",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        width: 2
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)"
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)"
                                                }
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12
                                    }
                                },
                                data: data2
                            },

                        ]
                    };


                    // 3. 把配置和数据给实例对象
                    myChart.setOption(option);
                               myChart.on('click', function () {
        showFullscreenChart1();
    });
        function showFullscreenChart1() {
        document.getElementById('fullscreenPopup1').style.display = 'block';
        var fullscreenChart1 = echarts.init(document.getElementById('fullscreenChart1'));
        var fullscreenOption1 = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart1.setOption(fullscreenOption1);

        window.addEventListener("resize", function () {
            fullscreenChart1.resize();
        });
    }
                }
            };

            xhr.send();
        }
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();

    (function () {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.querySelector(".line .chart"));
        var data1 = [];
        var initialYAxisMax = 114.4450;  // 初始最大值
    var initialYAxisMin = 114.4290;  // 初始最小值
        loadData1(currentSelectedId1);
        // 为下拉框选项添加事件监听器
        document.getElementById("b-1").addEventListener("click", function () {
            updateData1("id1");
        });

        document.getElementById("b-2").addEventListener("click", function () {
            updateData1("id2");
        });

        document.getElementById("b-3").addEventListener("click", function () {
            updateData1("id3");
        });

        document.getElementById("b-4").addEventListener("click", function () {
            updateData1("id4");
        });

        document.getElementById("b-5").addEventListener("click", function () {
            updateData1("id5");
        });
         document.getElementById("b-6").addEventListener("click", function () {
            updateData1("id6");
        });
        function updateData1(selectedId) {
            // 只有当用户选择了新的 ID 时才更新数据
            if (selectedId !== currentSelectedId1) {
                loadData1(selectedId);
                currentSelectedId1 = selectedId;
            }
        }
        // 根据选定的选项加载数据
        function loadData1(selectedId) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://115.29.205.84:8888/api/data2', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  var userData = JSON.parse(xhr.responseText)
                const extractedData = {};
for(let i=0;i<6;i++){
    const userId = "id" + (i + 1); 
  extractedData[userId] = {
                lat: {},
                lng: {}
}
}
var j1=1;
var j2=1;
var j3=1;
var j4=1;
var j5=1;
var j6=1;
for(index=userData.length-1;index>=0;index--){
    user=userData[index];
    if(user.name=='xfgh1'&&j1<=6){
        extractedData['id1']["lat"]["lat" + (7-j1)]=user.lat;
        extractedData['id1']["lng"]["lng" + (7-j1)]=user.lng;
  j1++;
    }
    else if(user.name=='xfgh2'&&j2<=6){
         extractedData['id2']["lat"]["lat" + (7-j2)]=user.lat;
         extractedData['id2']["lng"]["lng" +(7-j2)]=user.lng;
  j2++;
    }
     else if(user.name=='xfgh3'&&j3<=6){
         extractedData['id3']["lat"]["lat" + (7-j3)]=user.lat;
         extractedData['id3']["lng"]["lng" +(7-j3)]=user.lng;
  j3++;
    }
     else if(user.name=='xfgh4'&&j4<=6){
         extractedData['id4']["lat"]["lat" + (7-j4)]=user.lat;
         extractedData['id4']["lng"]["lng" +(7-j4)]=user.lng;
  j4++;
    }
     else if(user.name=='xfgh5'&&j5<=6){
         extractedData['id5']["lat"]["lat" + (7-j5)]=user.lat;
         extractedData['id5']["lng"]["lng" +(7-j5)]=user.lng;
  j5++;
    }
     else if(user.name=='xfgh6'&&j6<=6){
         extractedData['id6']["lat"]["lat" + (7-j6)]=user.lat;
         extractedData['id6']["lng"]["lng" +(7-j6)]=user.lng;
  j6++;
    }
}
                    data1 = Object.values(extractedData[selectedId].lng);
                    for(let j=0;j<6;j++)
                    data1[j]=Number(data1[j]).toFixed(4);  
            //         var currentOption = myChart.getOption();
            //         if (currentOption && currentOption.yAxis && currentOption.yAxis.length > 0) {
            //     // 只在第一次加载数据时设置y轴范围
            //     if (currentOption.yAxis[0].max === undefined) {
            //         myChart.setOption({
            //             yAxis: [{
            //                 max: Math.max.apply(null, data1) + 0.0005,
            //                 min: Math.min.apply(null, data1) - 0.0005,
            //             }]
            //         });
            //     }
            // }
                    var option = {
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                lineStyle: {
                                    color: "#dddc6b"
                                }
                            }
                        },
                        legend: {
                            top: "0%",
                            textStyle: {
                                color: "rgba(255,255,255,.5)",
                                fontSize: "12"
                            }
                        },
                        toolbox: {
                            feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                        },
                        grid: {
                            left: "0",
                            top: "30",
                            right: '15%',
                            bottom: '9%',
                            containLabel: true
                        },

                        xAxis: [
                            {
                                name: '时间/s',
                                nameTextStyle: {
                                    color: "#02a6b5", // 设置字体颜色
                                    fontSize: 12, // 设置字体大小
                                    fontWeight: "bold" // 设置字体粗细
                                    // 其他字体样式设置
                                },
                                type: "category",
                                boundaryGap: false,
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: 12
                                    }
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.2)"
                                    }
                                },

                                data: [
                                    "0",
                                    "20",
                                    "40",
                                    "60",
                                    "80",
                                    "100",
                                ]
                            },
                            {
                                axisPointer: { show: false },
                                axisLine: { show: false },
                                position: "bottom",
                                offset: 20
                            }
                        ],

                        yAxis: [
                            {
                                name: '经度',
                                min: initialYAxisMin,  // 初始最小值
                            max: initialYAxisMax,  // 初始最大值
                                nameTextStyle: {
                                    color: "#02a6b5", // 设置字体颜色
                                    fontSize: 12, // 设置字体大小
                                    fontWeight: "bold" // 设置字体粗细
                                    // 其他字体样式设置
                                },
                                type: "value",
                                axisTick: { show: false },
                                axisLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)"
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        color: "rgba(255,255,255,.6)",
                                        fontSize: 12
                                    }
                                },

                                splitLine: {
                                    lineStyle: {
                                        color: "rgba(255,255,255,.1)"
                                    }
                                },
                                // min: Math.min.apply(null, data1) - 0.0005,
                                // // 设置y轴刻度的最大值
                                // max: Math.max.apply(null, data1) + 0.0005,
                            }
                        ],
                        series: [
                            {
                                name: "经度变化",
                                type: "line",
                                smooth: true,
                                symbol: "circle",
                                symbolSize: 5,
                                showSymbol: false,
                                lineStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        width: 2
                                    }
                                },
                                areaStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(
                                            0,
                                            0,
                                            0,
                                            1,
                                            [
                                                {
                                                    offset: 0,
                                                    color: "rgba(1, 132, 213, 0.4)"
                                                },
                                                {
                                                    offset: 0.8,
                                                    color: "rgba(1, 132, 213, 0.1)"
                                                }
                                            ],
                                            false
                                        ),
                                        shadowColor: "rgba(0, 0, 0, 0.1)"
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: "#0184d5",
                                        borderColor: "rgba(221, 220, 107, .1)",
                                        borderWidth: 12
                                    }
                                },
                                data: data1
                            },

                        ]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                    myChart.on('click', function () {
        showFullscreenChart3();
    });
        function showFullscreenChart3() {
        document.getElementById('fullscreenPopup3').style.display = 'block';
        var fullscreenChart3 = echarts.init(document.getElementById('fullscreenChart3'));
        var fullscreenOption3 = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart3.setOption(fullscreenOption3);

        window.addEventListener("resize", function () {
            fullscreenChart3.resize();
        });
    }
                }
            };

            xhr.send();
        }
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();
    (function () {
        var myChart = echarts.init(document.querySelector(".bar .chart"));
        var data4 =
            [0, 0, 0, 0, 0, 0];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText)
                for (var i = 0; i < data.length; i++) {
                    var user = data[i]
                    if (user.age < 20) data4[0]++
                    else if (user.age >= 20 && user.age < 30) data4[1]++
                    else if (user.age >= 30 && user.age < 40) data4[2]++
                    else if (user.age >= 40 && user.age < 50) data4[3]++
                    else if (user.age >= 50 && user.age < 60) data4[4]++
                    else data4[5]++
                }
                data4[0]=data4[0]+1;data4[1]=data4[1]+5;
                var option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        // 触发方式
                        trigger: 'axis'
                    },
                    color: ["#00f2f1", "#ed3f35"],
                    // 图例组件

                    toolbox: {
                        feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                    },
                    grid: {
                        top: "20%",
                        left: "0",
                        right: "15%",
                        bottom: "8%",
                        show: true,
                        borderColor: "#012f4a",
                        containLabel: true
                    },

                    xAxis: {
                        name: '年龄段',
                        nameTextStyle: {
                            color: "#02a6b5", // 设置字体颜色
                            fontSize: 12, // 设置字体大小
                            fontWeight: "bold" // 设置字体粗细
                            // 其他字体样式设置
                        },
                        type: 'category',
                        data: ['20以下', '20-30', '30-40', '40-50', '50-60', '60以上'],
                        axisLabel: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "12"
                        },
                        axisLine: {
                            show: false
                        }
                    },
                    yAxis: {
                        name: '总人数',
                        nameTextStyle: {
                            color: "#02a6b5", // 设置字体颜色
                            fontSize: 12, // 设置字体大小
                            fontWeight: "bold" // 设置字体粗细
                            // 其他字体样式设置
                        },
                        type: 'value',
                        axisLabel: {
                            color: "rgba(255,255,255,.6)",
                            fontSize: "12"
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)",
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: "rgba(255,255,255,.1)"
                            }
                        }
                    },
                    series: [
                        {
                            name: '年龄段',
                            data: data4,
                            type: 'bar',
                            barWidth: "35%",
                            itemStyle: {
                                // 修改柱子圆角
                                barBorderRadius: 5
                            }
                        }
                    ]
                };
                myChart.setOption(option);
                    myChart.on('click', function () {
        showFullscreenChart4();
    });
        function showFullscreenChart4() {
        document.getElementById('fullscreenPopup4').style.display = 'block';
        var fullscreenChart4 = echarts.init(document.getElementById('fullscreenChart4'));
        var fullscreenOption4 = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart4.setOption(fullscreenOption4);

        window.addEventListener("resize", function () {
            fullscreenChart4.resize();
        });
    }
            }
        }
        xhr.send()
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();

    (function () {
        var myChart = echarts.init(document.querySelector(".line3 .chart"));
        var data3 = [];
        loadData2(currentSelectedId2);
        // 为下拉框选项添加事件监听器
        document.getElementById("d-1").addEventListener("click", function () {
            updateData2("id1-5");
        });

        document.getElementById("d-2").addEventListener("click", function () {
            updateData2("id6-10");
        });

        document.getElementById("d-3").addEventListener("click", function () {
            updateData2("id11-15");
        });

        document.getElementById("d-4").addEventListener("click", function () {
            updateData2("id16-20");
        });

        document.getElementById("d-5").addEventListener("click", function () {
            updateData2("id21-25");
        });
        function updateData2(selectedId) {
            // 只有当用户选择了新的 ID 时才更新数据
            if (selectedId !== currentSelectedId2) {
                loadData2(selectedId);
                currentSelectedId2 = selectedId;
            }
        }
        // 根据选定的选项加载数据
        function loadData2(selectedId) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://115.29.205.84:8888/api/data1', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonData = JSON.parse(xhr.responseText);
                   
                    if(selectedId=='id1-5')
                    {
                        for(let i=0;i<5;i++)
                        data3[i]=jsonData[i].height
                        
                    }
                    else if(selectedId=='id6-10')
                    {
                        for(let i=0;i<5;i++)
                        data3[i]=jsonData[i+5].height
                        
                    }
                    else if(selectedId=='id11-15')
                    {
                        for(let i=0;i<5;i++)
                        data3[i]=jsonData[i+10].height
                        
                    }
                    else if(selectedId=='id16-20')
                    {
                        for(let i=0;i<5;i++)
                        data3[i]=jsonData[i+15].height
                    }
                    else
                    {
                        for(let i=0;i<5;i++)
                        data3[i]=jsonData[i+20].height
                    }
                    var option = {
                        title: {
                            text: ''
                        },
                        tooltip: {
                            // 触发方式
                            trigger: 'axis'
                        },
                        color: "#F8B448",
                        // 图例组件

                        toolbox: {
                            feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        dataView: { readOnly: false },
                        saveAsImage: {}
                    }
                        },
                        grid: {
                            top: "20%",
                            left: "0",
                            right: "15%",
                            bottom: "8%",
                            show: true,
                            borderColor: "#012f4a",
                            containLabel: true
                        },

                        xAxis: {
                            name: 'id范围',
                            nameTextStyle: {
                                color: "#02a6b5", // 设置字体颜色
                                fontSize: 12, // 设置字体大小
                                fontWeight: "bold" // 设置字体粗细
                                // 其他字体样式设置
                            },
                            type: 'category',
                            data: ['1', '2', '3', '4', '5'],
                            axisLabel: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: "12"
                            },
                            axisLine: {
                                show: false
                            }
                        },
                        yAxis: {
                            name: '高度',
                            nameTextStyle: {
                                color: "#02a6b5", // 设置字体颜色
                                fontSize: 12, // 设置字体大小
                                fontWeight: "bold" // 设置字体粗细
                                // 其他字体样式设置
                            },
                            type: 'value',
                            axisLabel: {
                                color: "rgba(255,255,255,.6)",
                                fontSize: "12"
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)",
                                },
                            },
                            splitLine: {
                                lineStyle: {
                                    color: "rgba(255,255,255,.1)"
                                }
                            }
                        },
                        series: [
                            {
                                name: '设备高度',
                                data: data3,
                                type: 'bar',
                                barWidth: "35%",
                                itemStyle: {
                                    // 修改柱子圆角
                                    barBorderRadius: 6
                                }
                            }
                        ]
                    };
                    myChart.setOption(option);
                    myChart.on('click', function () {
        showFullscreenChart5();
    });
        function showFullscreenChart5() {
        document.getElementById('fullscreenPopup5').style.display = 'block';
        var fullscreenChart5 = echarts.init(document.getElementById('fullscreenChart5'));
        var fullscreenOption5 = JSON.parse(JSON.stringify(option));
        // 修改全屏图表的配置（如果需要的话）

        fullscreenChart5.setOption(fullscreenOption5);

        window.addEventListener("resize", function () {
            fullscreenChart5.resize();
        });
    }
                }
            };

            xhr.send();
        }
        window.addEventListener("resize", function() {
    myChart.resize();
  });
    })();
}
fetchdata();
setInterval(fetchdata, 20000);