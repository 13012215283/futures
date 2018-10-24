package com.echoesnet.futures.utils;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;

/**
 * Created by liuyang on 2016/11/10.
 */

public class PermissionCheck {
    public static final int has_PERMISSION_NULL             = 0;

    public static final int has_PERMISSION_CAMERA           = 1;
    public static final int has_PERMISSION_AUDIO            = 1<<1;
    public static final int has_PERMISSION_STORAGE          = 1<<2;
    public static final int has_PERMISSION_READ_PHONE_STATE = 1<<3;
    public static final int has_PERMISSION_STORAGE2         = 1<<4;
    public static final int has_PERMISSION_STORAGE3         = 1<<5;


    public interface iPermissionChecked {
        void callback();
    }

    public static int getCamera(Activity act, int permissions){
        if (ContextCompat.checkSelfPermission(act, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.shouldShowRequestPermissionRationale(act, Manifest.permission.CAMERA);
            ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.CAMERA}, has_PERMISSION_CAMERA);
        }else{
            permissions = permissions|has_PERMISSION_CAMERA;
        }

        return permissions;
    }

    public static int getCamera(Activity act, int permissions, iPermissionChecked callback){
        int res = getCamera(act,permissions);
        if(callback != null){
            callback.callback();
        }
        return permissions;
    }

    public static int getAudio(Activity act, int permissions){
        if (ContextCompat.checkSelfPermission(act, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.shouldShowRequestPermissionRationale(act, Manifest.permission.RECORD_AUDIO);
            ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.RECORD_AUDIO}, has_PERMISSION_AUDIO);
        }else{
            permissions = permissions|has_PERMISSION_AUDIO;
        }

        return permissions;
    }

    public static int getStorage(Activity act, int permissions){
        if (ContextCompat.checkSelfPermission(act, Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.shouldShowRequestPermissionRationale(act, Manifest.permission.WRITE_EXTERNAL_STORAGE);
            ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, has_PERMISSION_STORAGE);
        }else{
            permissions = permissions|has_PERMISSION_STORAGE;
        }

        return permissions;
    }


    public static int getReadPhoneState(Activity act, int permissions){
        if (ContextCompat.checkSelfPermission(act, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.shouldShowRequestPermissionRationale(act, Manifest.permission.READ_PHONE_STATE);
            ActivityCompat.requestPermissions(act, new String[]{Manifest.permission.READ_PHONE_STATE}, has_PERMISSION_READ_PHONE_STATE);
        }else{
            permissions = permissions|has_PERMISSION_READ_PHONE_STATE;
        }

        return permissions;
    }
}
