//柱状图1
(function () {
    var myChart = echarts.init(document.querySelector(".bar .chart"));
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
        legend: {
            // series里面有了 name值则 legend里面的data可以删掉

        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true,
            borderColor: "#012f4a",
            containLabel: true
        },

        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
            axisLabel: {
                color: "rgba(255,255,255,.6)",
                fontSize: "12"
            },
            axisLine: {
                show: false
            }
        },
        yAxis: {
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
                name: '设备名称',
                data: [150, 230, 224, 218, 135, 147, 260],
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
    window.addEventListener("resize", function () {
        myChart.resize();
    })//图表大小自适应
})();

//地图
// (function () {
//     var myChart = echarts.init(document.querySelector(".map .chart"));
//     let option = {
//         tooltip: {
//             show: false
//         },
//         geo: {
//             map: this.province,
//             roam: false,
//             // zoom: 1.23,
//             label: {
//                 normal: {
//                     show: false,
//                     fontSize: "10",
//                     color: "rgba(0,0,0,0.7)"
//                 }
//             },
//             itemStyle: {
//                 normal: {
//                     areaColor: "#0d0059",
//                     borderColor: "#389dff",
//                     borderWidth: 1, //设置外层边框
//                     shadowBlur: 5,
//                     shadowOffsetY: 8,
//                     shadowOffsetX: 0,
//                     shadowColor: "#01012a"
//                 },
//                 emphasis: {
//                     areaColor: "#184cff",
//                     shadowOffsetX: 0,
//                     shadowOffsetY: 0,
//                     shadowBlur: 5,
//                     borderWidth: 0,
//                     shadowColor: "rgba(0, 0, 0, 0.5)"
//                 }
//             }
//         },
//         series: [
//             {
//                 type: "map",
//                 map: this.province,
//                 roam: false,
//                 showLegendSymbol: false, // 存在legend时显示
//                 label: {
//                     normal: {
//                         show: false
//                     },
//                     emphasis: {
//                         show: false,
//                         textStyle: {
//                             color: "#fff"
//                         }
//                     }
//                 },
//                 itemStyle: {
//                     normal: {
//                         areaColor: "#0d0059",
//                         borderColor: "#389dff",
//                         borderWidth: 0.5
//                     },
//                     emphasis: {
//                         areaColor: "#17008d",
//                         shadowOffsetX: 0,
//                         shadowOffsetY: 0,
//                         shadowBlur: 5,
//                         borderWidth: 0,
//                         shadowColor: "rgba(0, 0, 0, 0.5)"
//                     }
//                 }
//             }
//         ]
//     };
//     myChart.setOption(option);
// })();