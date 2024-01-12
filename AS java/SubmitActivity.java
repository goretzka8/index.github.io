package com.example.group_work;

import static androidx.constraintlayout.helper.widget.MotionEffect.TAG;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import android.Manifest;
import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.content.ContentUris;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.location.Geocoder;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.location.BDAbstractLocationListener;
import com.baidu.location.BDLocation;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.model.LatLng;
import com.baidu.mapapi.search.geocode.GeoCodeOption;
import com.baidu.mapapi.search.geocode.GeoCodeResult;
import com.baidu.mapapi.search.geocode.GeoCoder;
import com.baidu.mapapi.search.geocode.OnGetGeoCoderResultListener;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeOption;
import com.baidu.mapapi.search.geocode.ReverseGeoCodeResult;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

public class SubmitActivity extends AppCompatActivity {
    final int TAKE_PHOTO=1;
    ImageView iv_photo;
    Uri imageUri;
    private RadioGroup mRG1;
    private Button submit_all;
    private EditText name;
    private EditText lng;
    private EditText lat;
    private EditText height;
    private EditText age;
    private EditText sex;
    private RadioButton rb_1;
    private RadioButton rb_2;
    private RadioButton rb_3;
    private int myVariable = 1;//定义一个变量，用来修改设备
    private TextView etAdress;
    private Button mbtn_L2S;
    private Button mbtn_S2L;
    private Button mbtn_start;
    private Button mbtn_stop;
    private Timer timer;
    private LocationClient mLocationClient;
    private Double my_lat;
    private Double my_lng;
    private String file_path;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_submit);

        mRG1 = findViewById(R.id.rg_1);
        Button btn_1=findViewById(R.id.btn_takephoto);
        iv_photo=findViewById(R.id.img_photo);
        submit_all = findViewById(R.id.submit_all);
        name = findViewById(R.id.submit_et_4);
        sex = findViewById(R.id.submit_et_5);
        age = findViewById(R.id.submit_et_6);
        lng= findViewById(R.id.submit_et_1);
        lat = findViewById(R.id.submit_et_2);
        height = findViewById(R.id.submit_et_3);
        rb_1 = findViewById(R.id.rb_1);
        rb_2 = findViewById(R.id.rb_3);
        rb_3 = findViewById(R.id.rb_2);
        etAdress = findViewById(R.id.et_Address);
        mbtn_L2S = findViewById(R.id.btn_L2S);
        mbtn_S2L = findViewById(R.id.btn_S2L);
        etAdress.setText("武汉");

        mbtn_start = findViewById(R.id.btn_start);
        mbtn_stop = findViewById(R.id.btn_stop);

        LocationClient.setAgreePrivacy(true);
        try {
            mLocationClient = new LocationClient(getApplicationContext());
        } catch (Exception e) {
            e.printStackTrace();
        }
        mLocationClient.registerLocationListener(new MyLocationListener());

        List<String> permissionList = new ArrayList<String>();
        if (ContextCompat.checkSelfPermission(SubmitActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(Manifest.permission.ACCESS_FINE_LOCATION);
        }
        if (ContextCompat.checkSelfPermission(SubmitActivity.this, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(Manifest.permission.READ_PHONE_STATE);
        }
        if (ContextCompat.checkSelfPermission(SubmitActivity.this, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED ){
            permissionList.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }
        if (!permissionList.isEmpty()){
            String[] permissions = permissionList.toArray(new String[permissionList.size()]);
            ActivityCompat.requestPermissions(SubmitActivity.this,permissions,1);
        }else {
            requestLocation();
        }

        mbtn_start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                new Thread(new Runnable() {
//                    @Override
//                    public void run() {
//                        try {
//                            connect.insertIntoData2(name.getText().toString(), sex.getText().toString(), age.getText().toString(), my_lat.toString(),my_lng.toString(), height.getText().toString(), myVariable,etAdress.getText().toString());//调用插入数据库语句
//                            Toast.makeText(getApplicationContext(), "开始传输", Toast.LENGTH_SHORT).show();
//                        } catch (SQLException e) {
//                            e.printStackTrace();
//                        }
//                    }
//                }).start();
               Toast.makeText(getApplicationContext(), "开始传输", Toast.LENGTH_SHORT).show();
               startDataTransferTimer();
            }
        });

        mbtn_stop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                timer.cancel();
                Toast.makeText(getApplicationContext(), "停止传输", Toast.LENGTH_SHORT).show();
            }
        });   // 停止定时任务



        //地理信息编码器及监听器
        GeoCoder geoCoder = GeoCoder.newInstance();
        geoCoder.setOnGetGeoCodeResultListener(new OnGetGeoCoderResultListener() {
            @Override
            public void onGetGeoCodeResult(GeoCodeResult geoCodeResult) {
                LatLng pos =geoCodeResult.getLocation();
                if (pos!=null){
                    lng.setText(Double.toString(pos.longitude));
                    lat.setText(Double.toString(pos.latitude));
                    Toast.makeText(SubmitActivity.this,"坐标查询完成",Toast.LENGTH_SHORT).show();
                }else {
                    Toast.makeText(SubmitActivity.this,"坐标查询结果为null",Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onGetReverseGeoCodeResult(ReverseGeoCodeResult reverseGeoCodeResult) {
                etAdress.setText(reverseGeoCodeResult.getAddress());
            }
        });
        //查询地址的经纬度坐标
        mbtn_S2L.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                GeoCodeOption option = new GeoCodeOption();
                option.city("武汉");
                option.address(etAdress.getText().toString());
                geoCoder.geocode(option);
            }
        });
        //查询经纬度坐标点的地址信息
        mbtn_L2S.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double longitude = Double.parseDouble(lng.getText().toString());
                double latitude = Double.parseDouble(lat.getText().toString());
                ReverseGeoCodeOption option = new ReverseGeoCodeOption();
                option.location(new LatLng(latitude,longitude));
                geoCoder.reverseGeoCode(option);
            }
        });

        final EditText lng = (EditText) findViewById(R.id.submit_et_1);//取得输入框的对象
        final EditText lat = (EditText) findViewById(R.id.submit_et_2);
        final EditText height = (EditText) findViewById(R.id.submit_et_3);
        final EditText name= (EditText) findViewById(R.id.submit_et_4);
        final EditText sex= (EditText) findViewById(R.id.submit_et_5);
        final EditText age = (EditText) findViewById(R.id.submit_et_6);
        final EditText etAdress = (EditText) findViewById(R.id.et_Address);

        mRG1.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int checkedId) {
                RadioButton radioButton = radioGroup.findViewById(checkedId);
                Toast.makeText(SubmitActivity.this,radioButton.getText(),Toast.LENGTH_SHORT).show();
            }
        });

        btn_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                File output=new File(getExternalCacheDir(),"output_image.jpg");
                file_path = output.getPath();
                try {
                    if (output.exists()){
                        output.delete();
                    }
                    output.createNewFile();
                }catch (IOException e){
                    e.printStackTrace();
                }
                if (Build.VERSION.SDK_INT>=24){
                //图片的保存路径
                    imageUri= FileProvider.getUriForFile(SubmitActivity.this,"com.example.takephoto.fileprovider",output);
                }
                else { imageUri=Uri.fromFile(output);}
                //跳转界面到系统自带的拍照界面
                Intent intent=new Intent("android.media.action.IMAGE_CAPTURE");
                intent.putExtra(MediaStore.EXTRA_OUTPUT,imageUri);
                startActivityForResult(intent,TAKE_PHOTO);
            }
        });

        rb_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                myVariable = 1;
            }
        });

        rb_2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                myVariable = 2;
            }
        });

        rb_3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                myVariable = 3;
            }
        });

        submit_all.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Toast.makeText(getApplicationContext(), "提交成功", Toast.LENGTH_SHORT).show();
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            connect.insertIntoData3(name.getText().toString(),sex.getText().toString(),age.getText().toString(),lat.getText().toString(), lng.getText().toString(),height.getText().toString(),myVariable,etAdress.getText().toString());//调用插入数据库语句
                            connect.insertImage(file_path);
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        });
    }

    protected  void onActivityResult(int requestCode,int resultCode,Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode){
            case TAKE_PHOTO:
                if (resultCode==RESULT_OK){
                    // 使用try让程序运行在内报错
                    try {
                        //将图片保存
                        Bitmap bitmap= BitmapFactory.decodeStream(getContentResolver().openInputStream(imageUri));
                        iv_photo.setImageBitmap(bitmap);
                    }catch (FileNotFoundException e){
                        e.printStackTrace();
                    }
                }
                break;
            default:break;
        }
    }

    private void startDataTransferTimer() {
        // 创建定时任务
        timer = new Timer();
        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                // 执行数据传输操作
                try {
                    connect.insertIntoData2(name.getText().toString(), sex.getText().toString(), age.getText().toString(),my_lat.toString(),my_lng.toString(), height.getText().toString(), myVariable,etAdress.getText().toString());
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            }
        };

        // 每隔20s执行一次
        timer.schedule(task, 0, 1 * 20 * 1000);
    }

    private class MyLocationListener extends BDAbstractLocationListener {
        @Override
        public void onReceiveLocation(BDLocation bdLocation) {
            my_lat = bdLocation.getLatitude();
            my_lng = bdLocation.getLongitude();
            }
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
}
