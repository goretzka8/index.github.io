package com.example.group_work;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class SlideActivity extends AppCompatActivity {
    //声明控件
    private ImageView mIvHead;
    private SlideMenu slideMenu;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide);

        //找到控件
        mIvHead = findViewById(R.id.iv_head);
        slideMenu = findViewById(R.id.slideMenu);

        //实现侧滑
        mIvHead.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                slideMenu.switchMenu();
            }
        });

    }
}