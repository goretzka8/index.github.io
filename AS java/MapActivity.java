package com.example.group_work;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.location.BDAbstractLocationListener;
import com.baidu.location.BDLocation;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.SDKInitializer;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.BitmapDescriptor;
import com.baidu.mapapi.map.BitmapDescriptorFactory;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.Marker;
import com.baidu.mapapi.map.MarkerOptions;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.model.LatLng;
import com.mysql.jdbc.Statement;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MapActivity extends AppCompatActivity {
    public static int conn_on = 0;//用于判断连接是否成功
    private MapView mMapView=null;
    private RadioGroup mapType;
    private RadioButton normalBtn;
    private RadioButton sitelliteBtn;
    private CheckBox trafficEnable;
    private CheckBox heatMapEnable;
    BaiduMap mBaiduMap = null;
    private LocationClient mLocationClient;
    boolean isFirstLocate = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_map);

        SDKInitializer.initialize(getApplicationContext());
        setContentView(R.layout.activity_map);

        mMapView = (MapView) findViewById(R.id.bmapView);
        mapType = findViewById(R.id.id_rp_mapType);
        normalBtn = findViewById(R.id.id_btn_normal);
        sitelliteBtn = findViewById(R.id.id_btn_satellite);
        trafficEnable = findViewById(R.id.id_cb_trafficEnable);
        heatMapEnable = findViewById(R.id.id_cb_heatMapEnable);
        initEvent();
        mBaiduMap = mMapView.getMap();
        mBaiduMap.setMyLocationEnabled(true);

        LocationClient.setAgreePrivacy(true);
        try {
            mLocationClient = new LocationClient(getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }
        mLocationClient.registerLocationListener(new MyLocationListener());

        final TextView conn = (TextView) findViewById(R.id.conn);//取得网络提示框的对象
        conn.setBackgroundColor(Color.RED);//默认设成红色

        final Handler handler = new Handler(new Handler.Callback() {
            @Override
            public boolean handleMessage(Message message) {
                switch (conn_on)//根据返回值判断网络连接是否成功
                {
                    case 1:
                        conn.setText("网络连接成功");
                        conn.setBackgroundColor(Color.GREEN);
                        break;
                    case 2:
                        conn.setText("网络连接失败");
                        break;
                }
                return false;
            }
        });
        new Thread(new Runnable() {
            @Override
            public void run() {
                Message msg = new Message();
                try {
                    connect.getConnection2("group");//执行连接测试
                    if(conn_on == 1){
                        Connection conn_map = connect.getConnection2("group");
                        queryDatabaseAndAddMarkers(conn_map);
                    }
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                handler.sendMessage(msg);//跳转到handler1
            }
        }).start();

        List<String> permissionList = new ArrayList<String>();
        if (ContextCompat.checkSelfPermission(MapActivity.this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(android.Manifest.permission.ACCESS_FINE_LOCATION);
        }
        if (ContextCompat.checkSelfPermission(MapActivity.this, android.Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(android.Manifest.permission.READ_PHONE_STATE);
        }
        if (ContextCompat.checkSelfPermission(MapActivity.this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }
        if (!permissionList.isEmpty()){
            String[] permissions = permissionList.toArray(new String[permissionList.size()]);
            ActivityCompat.requestPermissions(MapActivity.this,permissions,1);
        }else {
            requestLocation();
        }
    }

    private void initEvent(){
        mapType.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                if (i==normalBtn.getId()){
                   mBaiduMap.setMapType(BaiduMap.MAP_TYPE_NORMAL);
                }else if (i==sitelliteBtn.getId()){
                    mBaiduMap.setMapType(BaiduMap.MAP_TYPE_SATELLITE);
                }
            }
        });

        trafficEnable.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mBaiduMap.setTrafficEnabled(b);
            }
        });

        heatMapEnable.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mBaiduMap.setBaiduHeatMapEnabled(b);
            }
        });

    }

    protected void onDestroy(){
        super.onDestroy();
        mMapView.onDestroy();
        mBaiduMap.setMyLocationEnabled(false);
        mLocationClient.stop();
    }

    protected void onPause(){
        super.onPause();
        mMapView.onPause();
    }

    protected void onResume(){
        super.onResume();
        mMapView.onResume();
    }

    private class MyLocationListener extends BDAbstractLocationListener {
        @Override
        public void onReceiveLocation(BDLocation bdLocation) {
            navigateTo(bdLocation);
        }
    }

    private void navigateTo(BDLocation bdLocation){
        if (isFirstLocate){
            LatLng ll =new LatLng(bdLocation.getLatitude(),bdLocation.getLongitude());
            MapStatusUpdate updata = MapStatusUpdateFactory.newLatLng(ll);
            mBaiduMap.animateMapStatus(updata);
            updata = MapStatusUpdateFactory.zoomTo(16f);
            mBaiduMap.animateMapStatus(updata);
            isFirstLocate = false;
        }
        MyLocationData.Builder locationBuilder = new MyLocationData.Builder();
        locationBuilder.longitude(bdLocation.getLongitude());
        locationBuilder.latitude(bdLocation.getLatitude());
        MyLocationData locationData = locationBuilder.build();
        mBaiduMap.setMyLocationData(locationData);

    }


    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode){
            case 1:
                if (grantResults.length>0){
                    for (int result:grantResults){
                        if (result != PackageManager.PERMISSION_GRANTED){
                            Toast.makeText(this,"必须同意所有的权限才能使用本程序",Toast.LENGTH_SHORT).show();
                            finish();
                            return;
                        }
                    }
                    requestLocation();
                }else {
                    Toast.makeText(this,"发生未知错误",Toast.LENGTH_SHORT).show();
                    finish();
                }
                break;
        }
    }

    private void requestLocation(){
        initLocation();
        mLocationClient.start();
    }
    private void initLocation(){
        LocationClientOption option = new LocationClientOption();
        option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy);
//可选，设置定位模式，默认高精度
//LocationMode.Hight_Accuracy：高精度；
//LocationMode. Battery_Saving：低功耗；
//LocationMode. Device_Sensors：仅使用设备；
//LocationMode.Fuzzy_Locating, 模糊定位模式；v9.2.8版本开始支持，可以降低API的调用频率，但同时也会降低定位精度；

        option.setCoorType("bd09ll");
//可选，设置返回经纬度坐标类型，默认gcj02
//gcj02：国测局坐标；
//bd09ll：百度经纬度坐标；
//bd09：百度墨卡托坐标；
//海外地区定位，无需设置坐标类型，统一返回wgs84类型坐标

//        option.setFirstLocType(FirstLocTypefirstLocType);
//可选，首次定位时可以选择定位的返回是准确性优先还是速度优先，默认为速度优先
//可以搭配setOnceLocation(Boolean isOnceLocation)单次定位接口使用，当设置为单次定位时，setFirstLocType接口中设置的类型即为单次定位使用的类型
//FirstLocType.SPEED_IN_FIRST_LOC:速度优先，首次定位时会降低定位准确性，提升定位速度；
//FirstLocType.ACCUARACY_IN_FIRST_LOC:准确性优先，首次定位时会降低速度，提升定位准确性；

        option.setScanSpan(1000);
//可选，设置发起定位请求的间隔，int类型，单位ms
//如果设置为0，则代表单次定位，即仅定位一次，默认为0
//如果设置非0，需设置1000ms以上才有效

        option.setOpenGnss(true);
//可选，设置是否使用卫星定位，默认false
//使用高精度和仅用设备两种定位模式的，参数必须设置为true

        option.setLocationNotify(true);
//可选，设置是否当卫星定位有效时按照1S/1次频率输出卫星定位结果，默认false

        option.setIgnoreKillProcess(false);
//可选，定位SDK内部是一个service，并放到了独立进程。
//设置是否在stop的时候杀死这个进程，默认（建议）不杀死，即setIgnoreKillProcess(true)

        option.SetIgnoreCacheException(false);
//可选，设置是否收集Crash信息，默认收集，即参数为false

        option.setWifiCacheTimeOut(5*60*1000);
//可选，V7.2版本新增能力
//如果设置了该接口，首次启动定位时，会先判断当前Wi-Fi是否超出有效期，若超出有效期，会先重新扫描Wi-Fi，然后定位

        option.setEnableSimulateGnss(false);
//可选，设置是否需要过滤卫星定位仿真结果，默认需要，即参数为false

        option.setNeedNewVersionRgc(true);
//可选，设置是否需要最新版本的地址信息。默认需要，即参数为true

        option.setIsNeedAddress(true);

        mLocationClient.setLocOption(option);
//mLocationClient为第二步初始化过的LocationClient对象
//需将配置好的LocationClientOption对象，通过setLocOption方法传递给LocationClient对象使用
//更多LocationClientOption的配置，请参照类参考中LocationClientOption类的详细说明
    }

    private void queryDatabaseAndAddMarkers(Connection conn) {
        Statement stmt = null;
        ResultSet rs = null;

        try {
            // 执行SQL查询语句
            stmt = (Statement) conn.createStatement();
            String sql = "SELECT lat, lng FROM JW";
            rs = stmt.executeQuery(sql);

            // 创建地图标记点
            while (rs.next()) {
                double latitude = rs.getDouble("lat");
                double longitude = rs.getDouble("lng");

                // 在地图上添加标记点
                LatLng latLng = new LatLng(latitude, longitude);
                MarkerOptions markerOptions = new MarkerOptions().position(latLng);
                BitmapDescriptor bitmap = BitmapDescriptorFactory.fromResource(R.drawable.mark);

                int width = bitmap.getBitmap().getWidth();
                int height = bitmap.getBitmap().getHeight();

                float scale = 0.05f;//设置缩放比例
                int targetWidth = (int)(width*scale);
                int targetHeight = (int)(height*scale);

                //创建缩小尺寸的 Bitmap 对象
                Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap.getBitmap(),targetWidth,targetHeight,false);
                BitmapDescriptor scaledBitmapDescriptor = BitmapDescriptorFactory.fromBitmap(scaledBitmap);

                MarkerOptions option = new MarkerOptions();
                option.position(latLng).icon(scaledBitmapDescriptor);
                mBaiduMap.addOverlay(option);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭结果集和语句对象（不关闭连接对象）
            try {
                if (rs != null) {
                    rs.close();
                }
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
