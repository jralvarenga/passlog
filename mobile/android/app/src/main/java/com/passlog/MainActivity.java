package com.passlog;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle saveInstanceState) {
    setTheme(R.style.AppTheme);
    RNBootSplash.init(R.drawable.splash_bg, this);

    super.onCreate(saveInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "passlog";
  }
}
