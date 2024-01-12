package com.example.group_work;

import com.baidu.mapapi.model.LatLng;
import com.baidu.platform.comapi.basestruct.Point;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class connect {
    public static Connection getConnection(String dbName) throws SQLException {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver"); //加载驱动
            String ip = "115.29.205.84";
            conn =(Connection) DriverManager.getConnection(
                    "jdbc:mysql://115.29.205.84:3306/group",
                    "test123", "f5TBwpsxEyFPNjFe");
            MainActivity.conn_on=1;//用于向主函数传参，判断连接是否成功
        }catch (SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
            MainActivity.conn_on=2;//用于向主函数传参，判断连接是否成功
        }
        return conn;//返回Connection型变量conn用于后续连接
    }

    public static Connection getConnection2(String dbName) throws SQLException {
        Connection conn = null;
        try {
            Class.forName("com.mysql.jdbc.Driver"); //加载驱动
            String ip = "115.29.205.84";
            conn =(Connection) DriverManager.getConnection(
                    "jdbc:mysql://115.29.205.84:3306/group",
                    "test123", "f5TBwpsxEyFPNjFe");
            MapActivity.conn_on=1;//用于向主函数传参，判断连接是否成功
        }catch (SQLException | ClassNotFoundException ex) {
            ex.printStackTrace();
            MapActivity.conn_on=2;//用于向主函数传参，判断连接是否成功
        }
        return conn;//返回Connection型变量conn用于后续连接
    }


    public static int insertIntoData(final String username, final String password) throws SQLException {//增加数据
        Connection  conn = null;
        conn = getConnection("group");
        //使用DriverManager获取数据库连接
        Statement stmt = conn.createStatement();
        //使用Connection来创建一个Statment对象
        String sql = "insert INTO test123 (username,password)VALUES('"+username+"','"+password+"')";//把用户名和密码插入到数据库中
        return stmt.executeUpdate(sql);
        //执行DML语句，返回受影响的记录条数
    }
    public static String querycol(final String id) throws SQLException {//读取某一行
        //加载数据库驱动
        String a;
        Connection  conn = null;
        conn = getConnection("group");
        //使用DriverManager获取数据库连接
        Statement  stmt = conn.createStatement();
        //使用Connection来创建一个Statment对象
        ResultSet rs =stmt.executeQuery(
                "select password from test123 where username='"+id+"'");//从数据库中查询用户名对应的密码并返回
        rs.first();
        a=rs.getString(1);
        rs.close();
        return a;
        //把查询结果输出来
    }

    public static String find(final String id) throws SQLException {//读取某一行
        //加载数据库驱动
        String a;
        Connection  conn = null;
        conn = getConnection("group");
        //使用DriverManager获取数据库连接
        Statement  stmt = conn.createStatement();
        //使用Connection来创建一个Statment对象
        ResultSet rs =stmt.executeQuery(
                "select username from test123 where username='"+id+"'");//从数据库中查询用户名对应的密码并返回
        rs.first();
        a=rs.getString(1);
        rs.close();
        return a;
        //把查询结果输出来
    }
    public static int insertIntoData2(final String name,final String sex,final String age,final String lat, final String lng,final String height,final int device,final String Address) throws SQLException {//增加数据
        Connection  conn = null;
        conn = getConnection("group");
        //使用DriverManager获取数据库连接
        Statement stmt = conn.createStatement();
        //使用Connection来创建一个Statment对象
        String sql = "insert INTO JW_copy1 (name,sex,age,lat,lng,height,device,Address)VALUES('"+name+"','"+sex+"','"+age+"','"+lat+"','"+lng+"','"+height+"','"+device+"','"+Address+"')";//把用户名和密码插入到数据库中
        return stmt.executeUpdate(sql);
        //执行DML语句，返回受影响的记录条数
    }


    public static int insertIntoData3(final String name,final String sex,final String age,final String lat, final String lng,final String height,final int device,final String Address) throws SQLException {//增加数据
        Connection  conn = null;
        conn = getConnection("group");
        //使用DriverManager获取数据库连接
        Statement stmt = conn.createStatement();
        //使用Connection来创建一个Statment对象
        String sql = "insert INTO JW (name,sex,age,lat,lng,height,device,Address)VALUES('"+name+"','"+sex+"','"+age+"','"+lat+"','"+lng+"','"+height+"','"+device+"','"+Address+"')";//把用户名和密码插入到数据库中
        return stmt.executeUpdate(sql);
        //执行DML语句，返回受影响的记录条数
    }

    private static byte[] convertImageToBytes(String imagePath) throws IOException {
        File file = new File(imagePath);
        try (FileInputStream fis = new FileInputStream(file);
             ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
            byte[] buf = new byte[4096];
            int bytesRead;
            while ((bytesRead = fis.read(buf)) != -1) {
                bos.write(buf, 0, bytesRead);
            }
            return bos.toByteArray();
        }
    }

    public static void insertImage(String imagePath) throws SQLException {
        // 设置数据库连接信息
//        Connection  conn = null;
//        conn = getConnection("group");
        String url = "jdbc:mysql://115.29.205.84:3306/group";
        String username = "test123";
        String password = "f5TBwpsxEyFPNjFe";

        // SQL 插入语句
        String sql = "insert INTO image_test (image_data) VALUES (?)";

        // 将图片转换为字节数组
        byte[] imageBytes = new byte[0];
        try {
            imageBytes = connect.convertImageToBytes(imagePath);
        } catch (IOException e) {
            e.printStackTrace();
//            return;
        }

        try (Connection conn = DriverManager.getConnection(url, username, password);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            // 设置参数
            stmt.setBytes(1, imageBytes);

            // 执行插入语句
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

}