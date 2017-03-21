:template: sitemap.html

.. slib_basic_application:

======================
Application
======================

Mobile Application
====================

Every mobile app has exactly one instance of MobileApp. When an app is launched, 
MobileApp::main() function is called; among its other tasks, this function creates 
a singletone MobileApp object.

Here is an example of how you can create an app.

::
   
   //ExampleApp.h
   #include <slib.h>

   class ExampleApp : public MobileApp
   {
      SLIB_DECLARE_APPLICATION(ExampleApp)
   public:
      ExampleApp();
      
      // override
      void onStart();

      // override
      void onResume();

      // override
      void onPause();
   };

::

   //ExampleApp.cpp
   #include "ExampleApp.h"
   #include "MainPage.h"

   SLIB_DEFINE_APPLICATION(ExampleApp, MobileApp)

   void ExampleApp::onStart()
   {
      setStartupPage(MainPage::getInstance());
   }

::

   //main.cpp (Android)
   #include <jni.h>
   #include <ExampleApp.h>
   #include <slib/core/platform_android.h>

   JNIEXPORT jint JNI_OnLoad(JavaVM* jvm, void* reserved)
   {
      Android::initialize(jvm);
      ExampleApp::main();
      return JNI_VERSION_1_4;
   }

::

   //main.mm (iOS)
   #include <ExampleApp.h>

   int main(int argc, char * argv[])
   {
      ExampleApp::main();
      return 0;
   }

Mobile Game
====================

Every mobile game has exactly one instance of MobileGame. When a game is launched, 
MobileGame::main() function is called; among its other tasks, this function creates 
a singletone MobileApp object.

All UI components are rendered from OpenGL ES

Here is an example of how you can create a mobile game.

::
   
   //ExampleGame.h
   #include <slib.h>

   class ExampleGame : public MobileGame
   {
      SLIB_DECLARE_APPLICATION(ExampleGame)
   public:
      ExampleGame();
      
      // override
      void onStart();

      // override
      void onResume();

      // override
      void onPause();
   };

::

   //ExampleGame.cpp
   #include "ExampleGame.h"
   #include "MainPage.h"

   SLIB_DEFINE_APPLICATION(ExampleGame, MobileGame)

   void ExampleGame::onStart()
   {
      setStartupPage(MainPage::getInstance());
   }

::

   //main.cpp (Android)
   #include <jni.h>
   #include <ExampleGame.h>
   #include <slib/core/platform_android.h>

   JNIEXPORT jint JNI_OnLoad(JavaVM* jvm, void* reserved)
   {
      Android::initialize(jvm);
      ExampleGame::main();
      return JNI_VERSION_1_4;
   }

::

   //main.mm (iOS)
   #include <ExampleGame.h>

   int main(int argc, char * argv[])
   {
      ExampleGame::main();
      return 0;
   }

Desktop Application
====================

Every desktop app has exactly one instance of UIApp. When an app is launched, 
the UIApp::main() function is called; among its other tasks, this function creates 
a singletone UIApp object.

::
   
   //ExampleDesktopApp.h
   #include <slib.h>

   class ExampleDesktopApp : public UIApp
   {
      SLIB_DECLARE_APPLICATION(ExampleDesktopApp)
   public:
      ExampleDesktopApp();

   protected:
      // override
      void onStart();

      // override
      void onExit();

   };

::
   
   //ExampleDesktopApp.cpp
   #include "ExampleDesktopApp.h"
   #include "MainWindow.h"

   SLIB_DEFINE_APPLICATION(ExampleDesktopApp, UIApp)

   ExampleDesktopApp::ExampleDesktopApp()
   {
   }

   void ExampleDesktopApp::onStart()
   {
      Ref<MainWindow> mainWindow = new MainWindow;
      mainWindow->create();
      setMainWindow(mainWindow);
      setMenu(menu::MainMenu::get()->root);
   }

::

   //main.mm (mac OS)
   #include <ExampleDesktopApp.h>

   int main(int argc, char * argv[])
   {
      ExampleDesktopApp::main();
      return 0;
   }

::

   //main.cpp (Win32)
   #include <ExampleDesktopApp.h>

   int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInst, LPSTR lpCmdLine, int nCmdShow)
   {
      ExampleDesktopApp::main(lpCmdLine);
      return 0;
   }

WebService Application
=======================

Every web service app has exactly one instance of WebService. When an app is launched, the WebService::main() function 
is called; among its other tasks, this function creates a singletone WebService object.

::

   //MyServiceApp.h
   #include <slib.h>
   class MyWebServiceAppConfiguration
   {
   public:
      sl_uint32 http_port;
      String db_host;
      String db_user;
      String db_password;
      String db_name;
	
   public:
      MyWebServiceAppConfiguration();
   };

   class MyWebServiceApp : public WebService
   {
      SLIB_DECLARE_APPLICATION(MyWebServiceApp)
	
   public:
      MyWebServiceApp();

   public:
      // override
      String getServiceName();
	
      // override
      sl_bool onStartService();
	
      // override
      void onStopService();
   };

::

   //MyWebServiceApp.cpp
   #include "MyWebServiceApp.h"
   #include "MyWebServiceDB.h"
   #include "MyWebServiceUserApi.h"

   MyWebServiceAppConfiguration::MyWebServiceAppConfiguration()
   {
      http_port = 8080;
      db_host = "localhost";
      db_user = "root";
      db_password = "root";
      db_name = "my_service_app_db";
   }

   SLIB_DEFINE_APPLICATION(MyWebServiceApp, WebService)

   MyWebServiceApp::MyWebServiceApp()
   {
   }

   String MyWebServiceApp::getServiceName()
   {
      return "MyWebServiceApp";
   }

   bool MyWebServiceApp::onStartService()
   {
      MyWebServiceAppConfiguration dbConfig;

      setHttpPort(dbConfig.http_port);
	
      SWEB_REGISTER_MODULE(User)

      if (!(MyWebServiceDatabase::getInstance()->init(dbConfig))) {
         return false;
      }

      return true;
   }

   void MyWebServiceApp::onStopService()
   {
   }

::

   //main.mm (mac OS)
   #include <MyWebServiceApp.h>

   int main(int argc, char * argv[])
   {
      MyWebServiceApp::main();
      return 0;
   }

::

   //main.cpp (Win32)
   #include <MyWebServiceApp.h>

   int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInst, LPSTR lpCmdLine, int nCmdShow)
   {
      MyWebServiceApp::main(lpCmdLine);
      return 0;
   }