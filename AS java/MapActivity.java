package com.example.group_work;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import com.baidu.mapapi.SDKInitializer;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapView;

public class MapActivity extends AppCompatActivity {
    private MapView mMapView=null;
    private RadioGroup mapType;
    private RadioButton normalBtn;
    private RadioButton sitelliteBtn;
    private CheckBox trafficEnable;
    private CheckBox heatMapEnable;

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
    }

    private void initEvent(){
        mapType.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup radioGroup, int i) {
                if (i==normalBtn.getId()){
                    mMapView.getMap().setMapType(BaiduMap.MAP_TYPE_NORMAL);
                }else if (i==sitelliteBtn.getId()){
                    mMapView.getMap().setMapType(BaiduMap.MAP_TYPE_SATELLITE);
                }
            }
        });

        trafficEnable.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mMapView.getMap().setTrafficEnabled(b);
            }
        });

        heatMapEnable.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean b) {
                mMapView.getMap().setBaiduHeatMapEnabled(b);
            }
        });

    }

    protected void onDestroy(){
        super.onDestroy();
        mMapView.onDestroy();
    }

    protected void onPause(){
        super.onPause();
        mMapView.onPause();
    }

    protected void onResume(){
        super.onResume();
        mMapView.onResume();
    }
}