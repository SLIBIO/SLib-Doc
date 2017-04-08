.. include:: ../Includes.txt

.. slib_introduction:

======================
Introduction
======================

Build Native Mobile and Desktop apps using C++.
================================================

SLib is the fastest way to develop the cross-platform development Win32,
mac OS, iOS, Android, and Linux with C++.

.. code-block:: cpp

   //app.h
   #include <slib.h>

   class ExampleApp : public MobileApp
   {
      SLIB_DECLARE_APPLICATION(ExampleApp)
   public:
      ExampleApp();

      void onStart();
      void onResume();
      void onPause();
   };

.. code-block:: cpp

   //app.cpp
   #include "app.h"
   #include "MainPage.h"

   SLIB_DEFINE_APPLICATION(ExampleApp, MobileApp)

   void ExampleApp::onStart()
   {
      setStartupPage(MainPage::getInstance());
   }

.. note:: What is SDev tool?

   SDev tool is a UI editor based on SLib.

   Once you have made the xml layout, you can build this to cpp with SDev.

.. code-block:: cpp

   //MainPage.h
   #include <slib.h>
   #include "../res/resources.h"
   class MainPage : public MainScreen //The MainScreen was built from XML with SDev tool.
   {
      SLIB_DECLARE_SINGLETON(MainPage)

   public:
      MainPage();

   public:
      void onOpen();
   };

.. code-block:: cpp

   //MainPage.cpp
   #include "MainPage.h"
   SLIB_DEFINE_SINGLETON(MainPage)

   void MainPage::onOpen()
   {
      alert("If you like C++ or Objective-C, you will like SLib");
   }

Automatic Reference Counting in C++
====================================

In C++ objects are allocated off the heap via new and freed via delete.
The most innovative technology is the implementation of Automatic Reference Counting in C++.

.. code-block:: cpp

   class Node : public Referable
   {
   public:
      List<Ref<Node>> children;
      WeakRef<Node> parent;

      void addChild(Node* node)
      {
         node->parent = this;
         children.add(node);
      }
   };


   void build_tree()
   {
      Ref<Node> root = new Node;
      Ref<Node> node1 = new Node;
      root->addChild(node1.get());
      Ref<Node> node1_1 = new Node;
      node1->addChild(node1_1.get());
      Ref<Node> node1_2 = new Node;
      node1->addChild(node1_2.get());
      Ref<Node> node2 = new Node;
      root->addChild(node2.get());
   }

Write once and Run Anywhere
============================

SLib provides all the functionality that can be found in native mobile and desktop development SDKs.

Users build their apps once and can run it anywhere (Windows/Mac OS/Linux/iOS/Android/Tizen).

.. code-block:: cpp

   class NotificationExampleApp : public MobileApp
   {
       ...
   }

   void NotificationExampleApp::onStart()
   {
      PushNotification::setTokenRefreshCallback([](String deviceToken){
         Log("DEVICE_TOKEN", deviceToken);
      });

      PushNotification::setNotificationReceivedCallback([](PushNotificationMessage& message){
         String name = message.data["special_data"]["email"].getString();
         int age = message.data["special_data"]["age"].getInt32();
         Log("TITLE", message.title);
         Log("BODY", message.body);
         Log("NAME", name);
         Log("AGE", age);
      });
   }

Build UIs Easily
======================

You can build UIs easily with XML.

.. code-block:: xml

   //styles.xml
   <sapp version='1'>
      <layout-style
         name='btn_normal'
         background='@drawable/ui_button_back'
         width='10%sw'
         height='10%sw'
         borderWidth='0'
         instance='false'
      />
   </sapp>

.. code-block:: xml

   //HomePage.xml
   <sapp version='1'>
      <layout
         type='page'
         background='blue'
         name='HomePage'
      >
         <group width='fill' height='wrap' backgroundColor="#e849004e" alignBottom="true">
            <linear name="footerButtons" orientation='horizontal' width='wrap' height='wrap' centerHorizontal='true'>
               <button
                  name='btnFreePlay'
                  styles='btn_normal'
                  background='@drawable/ui_button_play'
                  marginTop="3%sw"
                  marginBottom="3%sw"
                  marginLeft="5.71%sw"
                  marginRight="5.71%sw"
               />
               ...
            </linear>
         </group>
      </layout>
   </sapp>

The following is how the above xml looks.

.. figure:: /Images/layout_sample_1.png

Use Native Code When You Need To
==================================

It is easy to build part of your app using native code directly.

.. code-block:: cpp

   //NativeSample.h
   #include <slib.h>

   class NativeSample
   {
   public:
      static int sum(int a, int b);
   };

.. code-block:: cpp

   //NativeSample.java
   package com.example;

   public class NativeSample {
      public static int sum(int a, int b) {
         return a + b;
      }
   }

.. code-block:: cpp

   //NativeSample_Android.cpp
   #include "NativeSample.h"
   #include <slib/core/java.h>

   SLIB_JNI_BEGIN_CLASS(Android_NativeSample, "com/example/NativeSample")
      SLIB_JNI_STATIC_METHOD(sum, "sum", "(II)I");
   SLIB_JNI_END_CLASS

   int NativeSample::sum(int a, int b)
   {
      return ret = Android_NativeSample::sum.callInt(nullptr, a, b);
   }

::

   //NativeSample_iOS.mm
   #include "NativeSample.h"
   int NativeSample::sum(int a, int b)
   {
      return a + b;
   }
