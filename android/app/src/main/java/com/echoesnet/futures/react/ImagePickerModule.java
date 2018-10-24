package com.echoesnet.futures.react;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;

import com.echoesnet.futures.MainWithUpdateActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.Map;

import me.iwf.photopicker.PhotoPicker;

/**
 * Created by liuyang on 15/01/2018.
 */

public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final String ORIENTATION_PORTRAIT_KEY = "PORTRAIT";
  private static final String ORIENTATION_LANDSCAPE_KEY = "LANDSCAPE";
  private Activity mActivity = null;

  public ImagePickerModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "ImagePickerAnd";
  }


  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(ORIENTATION_PORTRAIT_KEY, ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    constants.put(ORIENTATION_LANDSCAPE_KEY, ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    return constants;
  }


  @ReactMethod
  public void openSelectDialog(ReadableMap config, Callback successCallback, Callback cancelCallback) {
    if(mActivity instanceof MainWithUpdateActivity){
      ((MainWithUpdateActivity)mActivity).setImagePickerCallback(successCallback,cancelCallback);
    }

    int photoCount = 1;
    if(null!=config && config.hasKey("photoCount")){
      photoCount = config.getInt("photoCount");
    }

    PhotoPicker.builder()
      .setPhotoCount(photoCount)
      .setShowCamera(false)
      .setShowGif(false)
      .setPreviewEnabled(false)
      .start(mActivity, PhotoPicker.REQUEST_CODE);
  }

//  @ReactMethod
//  public void canUseCamera(Callback intCallback) {
//    intCallback.invoke(mActivity.getRequestedOrientation());
//  }
}
