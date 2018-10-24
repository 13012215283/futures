package com.echoesnet.futures.react;

import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by liuyang on 15/01/2018.
 */

public class KeyboardModule extends ReactContextBaseJavaModule {

  private static final String SOFT_INPUT_ADJUST_PAN = "ADJUST_PAN";
  private static final String SOFT_INPUT_ADJUST_RESIZE = "ADJUST_RESIZE";
  private Activity mActivity = null;

  public KeyboardModule(ReactApplicationContext reactContext, Activity activity) {
    super(reactContext);
    mActivity = activity;
  }

  @Override
  public String getName() {
    return "Android_3C_Keyboard";
  }


  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(SOFT_INPUT_ADJUST_PAN, WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
    constants.put(SOFT_INPUT_ADJUST_RESIZE, WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
    return constants;
  }


  @ReactMethod
  public void show(final int type) {
    Log.i("KeyboardModule", ""+type);
    mActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        if (type == WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN) {
          mActivity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        } else {
          mActivity.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE);
        }

        InputMethodManager imm = (InputMethodManager) mActivity.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (imm != null) {
          imm.toggleSoftInput(InputMethodManager.SHOW_FORCED,0);
        }

        mActivity.setRequestedOrientation(type);
      }
    });
  }

  @ReactMethod
  public void dismiss(Callback intCallback) {
    mActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        InputMethodManager imm = (InputMethodManager) mActivity.getSystemService(Context.INPUT_METHOD_SERVICE);
        View view = mActivity.getCurrentFocus();
        if (imm != null & view != null) {
          imm.hideSoftInputFromWindow(view.getWindowToken(),0);
        }
      }
    });
    intCallback.invoke();
  }

  @ReactMethod
  public void render(Callback intCallback) {
    mActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
//        ViewGroup vg = (ViewGroup) mActivity.getWindow().getDecorView().getRootView();
//        vg.invalidate();
//        vg.setVisibility(View.INVISIBLE);
//        vg.setVisibility(View.VISIBLE);
//        vg.clearFocus();
//        vg.requestLayout();
        mActivity.recreate();
      }
    });
    intCallback.invoke();


  }
}
