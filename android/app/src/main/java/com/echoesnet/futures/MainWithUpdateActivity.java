package com.echoesnet.futures;

import android.annotation.TargetApi;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import com.echoesnet.futures.react.EchoesnetReactPackage;
import com.echoesnet.futures.react.ScreenCtrlModule;
import com.echoesnet.futures.utils.PermissionCheck;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Callback;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.shell.MainReactPackage;

import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lwansbrough.RCTCamera.RCTCameraPackage;

import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;
import com.pingplusplus.react.PingppPackage;

import java.io.File;
import java.util.ArrayList;

import me.iwf.photopicker.PhotoPicker;

public class MainWithUpdateActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler, ReactInstanceHolder, PermissionAwareActivity {
  private ReactRootView mReactRootView;
  private ReactInstanceManager mReactInstanceManager;

  private Button btnScreenCtrl;

  private static int OVERLAY_PERMISSION_REQ_CODE = 999;

  private int mPermission = PermissionCheck.has_PERMISSION_NULL;
  private String bundleFilePath = "";

  private Callback imagePickerSuccessCallback;
  private Callback imagePickerCancelCallback;
  @Nullable
  private PermissionListener mPermissionListener;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    WebView.setWebContentsDebuggingEnabled(true);
    mReactRootView = new ReactRootView(this);

//    setContentView(R.layout.layout_main);
//    mReactRootView = (ReactRootView) findViewById(R.id.rrvContent);
//
//    btnScreenCtrl = (Button) findViewById(R.id.btnScreenCtrl);
//    btnScreenCtrl.setText("PORTRAIT");
//    btnScreenCtrl.setOnClickListener(new View.OnClickListener() {
//      @Override
//      public void onClick(View v) {
//        if("LANDSCAPE".equals(btnScreenCtrl.getText())){
//          btnScreenCtrl.setText("PORTRAIT");
//          //设置Activity竖屏显示
//          setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
//        }else {
//          btnScreenCtrl.setText("LANDSCAPE");
//          //设置Activity横屏显示
//          setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
//        }
//      }
//    });


    // 采用code push 没必要管理bundle了
    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
//        .setBundleAssetName("index.android.bundle")
      .setJSMainModulePath("index")
      .addPackage(new MainReactPackage())
      .addPackage(new RNDeviceInfo())
      .addPackage(new RCTCameraPackage())
      .addPackage(new EchoesnetReactPackage(this))
      .addPackage(new PingppPackage())
      .addPackage(new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)))
      .addPackage(new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)))
      .addPackage(new AppCenterReactNativePackage(getApplication()))
      .addPackage(new CodePush("6_2nS7oH57QtRh-un7ZGKBNqCxKXSkBk1gJIf", this, BuildConfig.DEBUG))
      .setJSBundleFile(CodePush.getJSBundleFile())
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();
    mReactRootView.startReactApplication(mReactInstanceManager, "futures", null);
    CodePush.setReactInstanceHolder(this);

    setContentView(mReactRootView);

// ------------------------------------------------
    // 准备自己管理bundle
//    String mSdRootPath = Environment.getExternalStorageDirectory().getPath();
//    Log.i("dev-liu|", mSdRootPath);
//    bundleFilePath = mSdRootPath + File.separator + "echoesnet/futures/index.android.bundle";
//    File f = new File(bundleFilePath);
//    if (!f.exists()) {
//      Log.i("dev-liu|", bundleFilePath + " can't find file");
//      doVocationalWork("");
//    } else {
//      mPermission = PermissionCheck.getStorage(this, mPermission);
//      if (mPermission == (PermissionCheck.has_PERMISSION_STORAGE)) {
//        doVocationalWork(bundleFilePath);
//      }
//    }
// ------------------------------------------------


    // 调试用的遮罩菜单权限
//    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && BuildConfig.DEBUG) {
//      if (!Settings.canDrawOverlays(this)) {
//        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
//          Uri.parse("package:" + getPackageName()));
//        startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE);
//      }
//    }
  }

  private void doVocationalWork(String localBundle) {
    if (TextUtils.isEmpty(localBundle)) {
      Log.i("dev-liu|", "use dev-env, maybe work at 'Running Metro Bundler on port 8081.'");
      mReactInstanceManager = ReactInstanceManager.builder()
        .setApplication(getApplication())
//        .setBundleAssetName("index.android.bundle")
//        .setJSMainModulePath("index")
        .addPackage(new MainReactPackage())
        .addPackage(new RNDeviceInfo())
        .addPackage(new RCTCameraPackage())
        .addPackage(new EchoesnetReactPackage(this))
        .addPackage(new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)))
        .addPackage(new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)))
        .addPackage(new AppCenterReactNativePackage(getApplication()))
        .addPackage(new CodePush("6_2nS7oH57QtRh-un7ZGKBNqCxKXSkBk1gJIf", this, BuildConfig.DEBUG))
        .setJSBundleFile(CodePush.getJSBundleFile())
        .setUseDeveloperSupport(BuildConfig.DEBUG)
        .setInitialLifecycleState(LifecycleState.RESUMED)
        .build();
    } else {
      Log.i("dev-liu|", "use local Bundler file: "+localBundle);
      mReactInstanceManager = ReactInstanceManager.builder()
        .setApplication(getApplication())
//        .setJSBundleFile(localBundle)
//        .setJSMainModulePath("index")
        .addPackage(new MainReactPackage())
        .addPackage(new RNDeviceInfo())
        .addPackage(new RCTCameraPackage())
        .addPackage(new EchoesnetReactPackage(this))
        .addPackage(new AppCenterReactNativeCrashesPackage(getApplication(), getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)))
        .addPackage(new AppCenterReactNativeAnalyticsPackage(getApplication(), getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)))
        .addPackage(new AppCenterReactNativePackage(getApplication()))
        .addPackage(new CodePush("6_2nS7oH57QtRh-un7ZGKBNqCxKXSkBk1gJIf", this, BuildConfig.DEBUG))
        .setJSBundleFile(CodePush.getJSBundleFile())
        .setUseDeveloperSupport(BuildConfig.DEBUG)
        .setInitialLifecycleState(LifecycleState.RESUMED)
        .build();
    }
    mReactRootView.startReactApplication(mReactInstanceManager, "futures", null);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (mPermissionListener != null && mPermissionListener.onRequestPermissionsResult(requestCode, permissions, grantResults)) {
      mPermissionListener = null;
    }
    if (0 == grantResults.length) {
      return;
    } else {
      if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        mPermission = mPermission | requestCode;
        if (mPermission == (PermissionCheck.has_PERMISSION_STORAGE)) {
//          doVocationalWork(bundleFilePath);
        }
      } else {

      }
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        if (!Settings.canDrawOverlays(this)) {
          // SYSTEM_ALERT_WINDOW permission not granted...
        }
      }
    }


    if (resultCode == RESULT_OK && requestCode == PhotoPicker.REQUEST_CODE) {
      if (data != null) {
        ArrayList<String> photos = data.getStringArrayListExtra(PhotoPicker.KEY_SELECTED_PHOTOS);
        Log.i("dev-liu|", photos.toString());
        if (null!=imagePickerSuccessCallback){
          imagePickerSuccessCallback.invoke(photos.toArray());
        }
      }else{
        if (null!=imagePickerCancelCallback){
          imagePickerCancelCallback.invoke();
        }
      }
    }

    if (resultCode == 0 && requestCode == PhotoPicker.REQUEST_CODE) {
      if (null!=imagePickerCancelCallback){
        imagePickerCancelCallback.invoke();
      }
    }
  }

  @Override
  public void invokeDefaultOnBackPressed() {
    super.onBackPressed();
  }

  //传递一些Activity的生命周期事件到ReactInstanceManager，这是的JavaScript代码可以控制当前用户按下返回按钮的时候作何处理（譬如控制导航切换等等）。如果JavaScript端不处理相应的事件，你的invokeDefaultOnBackPressed方法会被调用。默认情况，这会直接结束你的Activity。
  @Override
  protected void onPause() {
    super.onPause();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostPause(this);
    }
  }

  @Override
  protected void onResume() {
    super.onResume();

    if (mReactInstanceManager != null) {
      mReactInstanceManager.onHostResume(this, this);
    }
  }

  @Override
  public void onBackPressed() {
    if (mReactInstanceManager != null) {
      mReactInstanceManager.onBackPressed();
    } else {
      super.onBackPressed();
    }
  }

  //我们需要改动一下开发者菜单。默认情况下，任何开发者菜单都可以通过摇晃或者设备类触发，不过这对模拟器不是很有用。所以我们让它在按下Menu键的时候可以显示
  @Override
  public boolean onKeyUp(int keyCode, KeyEvent event) {
    if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
      mReactInstanceManager.showDevOptionsDialog();
      return true;
    }
    return super.onKeyUp(keyCode, event);
  }






  //
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);

    // if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
    //   Toast.makeText(MainWithUpdateActivity.this, "竖屏模式", Toast.LENGTH_SHORT).show();
    // } else {
    //   Toast.makeText(MainWithUpdateActivity.this, "横屏模式", Toast.LENGTH_SHORT).show();
    // }

  }

  public void setImagePickerCallback(Callback successCallback, Callback cancelCallback) {
    imagePickerSuccessCallback = successCallback;
    imagePickerCancelCallback = cancelCallback;
  }

  @Override
  public ReactInstanceManager getReactInstanceManager() {
    return mReactInstanceManager;
  }


  @Override
  @TargetApi(Build.VERSION_CODES.M)
  public void requestPermissions(String[] permissions, int requestCode, PermissionListener listener) {
    mPermissionListener = listener;
    requestPermissions(permissions, requestCode);
  }
}
