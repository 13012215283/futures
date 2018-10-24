package com.echoesnet.futures.react;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liuyang on 15/01/2018.
 */

public class ScreenCtrlModule extends ReactContextBaseJavaModule {

  private static final String ORIENTATION_PORTRAIT_KEY = "PORTRAIT";
  private static final String ORIENTATION_LANDSCAPE_KEY = "LANDSCAPE";
  private Activity mActivity = null;

  public ScreenCtrlModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "ScreenCtrl";
  }


  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(ORIENTATION_PORTRAIT_KEY, ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    constants.put(ORIENTATION_LANDSCAPE_KEY, ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    return constants;
  }


  @ReactMethod
  public void rotateScreen(int type) {
//    Log.i("ScreenCtrlModule", ""+type);
    mActivity.setRequestedOrientation(type);
  }

  @ReactMethod
  public void getOrientation(Callback intCallback) {
    intCallback.invoke(mActivity.getRequestedOrientation());
  }
}
