package com.example.group_work;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.location.LocationClient;

public class SlideActivity extends AppCompatActivity {
    //声明控件
    private ImageView mIvHead;
    private SlideMenu slideMenu;
    private Button mBtn_main_1;
    private Button mBtn_main_2;
    private TextView locationInfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide);

        //找到控件
        mIvHead = findViewById(R.id.iv_head);
        slideMenu = findViewById(R.id.slideMenu);
        mBtn_main_1 = findViewById(R.id.btn_main_1);
        mBtn_main_2 = findViewById(R.id.btn_main_2);
        locationInfo = findViewById(R.id.locationInfo);

        //实现侧滑
        mIvHead.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                slideMenu.switchMenu();
            }
        });

        //实现直接跳转
        mBtn_main_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=null;
                intent =new Intent(SlideActivity.this,SubmitActivity.class);
                startActivity(intent);
            }
        });

        //实现直接跳转
        mBtn_main_2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent=null;
                intent =new Intent(SlideActivity.this,MapActivity.class);
                startActivity(intent);
            }
        });

    }
}