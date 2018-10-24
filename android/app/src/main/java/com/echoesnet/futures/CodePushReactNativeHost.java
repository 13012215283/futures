package com.echoesnet.futures;

import android.app.Application;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.microsoft.codepush.react.ReactInstanceHolder;

import java.util.Arrays;
import java.util.List;

/**
 * Created by wxp on 2018/2/6.
 */

public class CodePushReactNativeHost extends ReactNativeHost implements ReactInstanceHolder {
  protected CodePushReactNativeHost(Application application) {
    super(application);
  }

  @Override
  public boolean getUseDeveloperSupport() {
    return BuildConfig.DEBUG;
  }

  @Override
  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNDeviceInfo()
    );
  }

  @Override
  protected String getJSMainModuleName() {
    return "index";
  }

  @Override
  protected String getJSBundleFile() {
    return CodePush.getJSBundleFile();
  }
}
