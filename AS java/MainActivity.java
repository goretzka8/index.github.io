package com.example.group_work;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    //声明控件
    private Button mBtnLogin;
    private EditText mEtUser;
    private EditText mEtPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //找到控件
        mBtnLogin = findViewById(R.id.btn_login);
        mEtUser = findViewById(R.id.et_1);
        mEtPassword = findViewById(R.id.et_2);

//        //实现直接跳转
//        mBtnLogin.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                Intent intent=null;
//                intent =new Intent(MainActivity.this,SlideActivity.class);
//                startActivity(intent);
//            }
//        });
        //匹配对应的用户名和密码才能进行登陆
        mBtnLogin.setOnClickListener(this::onclick);

    }

    private void onclick(View v){
        //需要获取输入的用户名和密码
        String username = mEtUser.getText().toString();
        String password = mEtPassword.getText().toString();
        //弹出的内容设置
        String ok= "登陆成功";
        String fail = "密码或者用户名有误，请重新登陆！";
        Intent intent = null;

        //假设正确的账号和密码是group,123456
        if(username.equals("group")&&password.equals("123456")){
            //toast
            Toast.makeText(getApplicationContext(),ok,Toast.LENGTH_SHORT).show();

            intent = new Intent(MainActivity.this, SlideActivity.class);
            startActivity(intent);
        }else {
            //不正确,弹出登陆失败
            //toast居中显示
            Toast toastCenter = Toast.makeText(getApplicationContext(),fail,Toast.LENGTH_SHORT);
            toastCenter.setGravity(Gravity.CENTER,0,0);
            toastCenter.show();
        }

    }

}