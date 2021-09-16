package com.passlog;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle saveInstanceState) {
    setTheme(R.style.AppTheme);
    SplashScreen.show(this, R.style.RNSplashScreenTheme);

    super.onCreate(saveInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "passlog";
  }
}
