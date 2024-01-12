package com.example.group_work;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.sql.SQLException;

public class MainActivity extends AppCompatActivity {

    public static int conn_on = 0;//用于判断连接是否成功
    public static String password_receive;//用于接收数据库查询的返回数据
    public static String username_receive;//用于判断数据库用户名是否已存在
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
        final EditText username = (EditText) findViewById(R.id.et_1);//取得输入框的对象
        final EditText password = (EditText) findViewById(R.id.et_2);
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

        new Thread(new Runnable() {
            @Override
            public void run() {
                Message msg = new Message();
                try {
                    connect.getConnection("group");//执行连接测试
                } catch (SQLException e) {
                    e.printStackTrace();
                }
                handler.sendMessage(msg);//跳转到handler1
            }
        }).start();

        final Handler handler3 = new Handler(new Handler.Callback() {
            @Override
            public boolean handleMessage(Message message) {
                String Username = mEtUser.getText().toString().trim();//username
                String Password = mEtPassword.getText().toString().trim();

                if (Username.equals("") || Password.equals("")) {
                    Toast.makeText(getApplicationContext(), "用户名密码不能为空", Toast.LENGTH_SHORT).show();
                } else {
//                    if ( username_receive.equals(username.getText().toString())) {
//                        Toast.makeText(getApplicationContext(), "用户名已存在", Toast.LENGTH_SHORT).show();
//                    } else {
                    Toast.makeText(getApplicationContext(), "注册成功", Toast.LENGTH_SHORT).show();
                    new Thread(new Runnable() {
                        @Override
                        public void run() {
                            try {
                                connect.insertIntoData(username.getText().toString(), password.getText().toString());//调用插入数据库语句
                            } catch (SQLException e) {
                                e.printStackTrace();
                            }
                        }
                    }).start();
                }
                return false;
            }
        });

        Button Register = findViewById(R.id.btn_register);
        Register.setOnClickListener(new View.OnClickListener() {//注册
            @Override
            public void onClick(View v) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Message msg = new Message();
                        try {
                            username_receive = connect.find(username.getText().toString());//调用查询语句，获得账号对应的密码
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        handler3.sendMessage(msg);//跳转到handler3
                    }
                }).start();
            }
        });

        final Handler handler2 = new Handler(new Handler.Callback() {
            @Override
            public boolean handleMessage(Message message) {
                Intent intent = null;
                String ok = "登陆成功";
                String fail = "密码或者用户名有误，请重新登陆！";
                String Username = mEtUser.getText().toString().trim();//username
                String Password = mEtPassword.getText().toString().trim();

                if (Username.equals("") || Password.equals("")) {
                    Toast.makeText(getApplicationContext(), "用户名密码不能为空", Toast.LENGTH_SHORT).show();
                } else {
                    if (password_receive.equals(password.getText().toString()))//判断输入密码与取得的密码是否相同
                    {
                        Toast.makeText(getApplicationContext(), ok, Toast.LENGTH_SHORT).show();
                        intent = new Intent(MainActivity.this, SlideActivity.class);
                        startActivity(intent);
                    } else {
                        Toast toastCenter = Toast.makeText(getApplicationContext(), fail, Toast.LENGTH_SHORT);

                        toastCenter.setGravity(Gravity.CENTER, 0, 0);
                        toastCenter.show();
                    }
                }
                return false;
            }
        });

        Button logon = findViewById(R.id.btn_login);
        logon.setOnClickListener(new View.OnClickListener() {//登录
            @Override
            public void onClick(View v) {
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        Message msg = new Message();
                        try {
                            password_receive = connect.querycol(username.getText().toString());//调用查询语句，获得账号对应的密码
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                        handler2.sendMessage(msg);//跳转到handler2
                    }
                }).start();
            }
        });

    }

    private void onclick(View view) {
    }
}