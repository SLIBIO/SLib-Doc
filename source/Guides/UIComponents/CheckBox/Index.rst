
======================
CheckBox
======================

A checkbox is a specific type of button that permists the user to make a binary choice. A example usage of a checkbox inside your app would be the following:

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <check name="chkButton"
            width="wrap"
            height="wrap"
            text="@string/button_text"
            checked="true"/>

      </layout>
   </sapp>

Responding to Click Event
==========================

You can respond to click event in three ways.

The followings show how you can respond when taps a checkbox which is defined in the above XML.


**Setting Listener**

::

   //MyScreen.h
   #include <slib.h>
   class MyScreen: public ui::MyPage, public IViewListener
   {
      ...

   public:
      void onTouchEvent(View* v, UIEvent ev);

      ...
   }

   //MyScreen.cpp
   #include "MyScreen.h"

   ...
   chkButton->setEventListener(this);
   ...
   
**Setting Lambda Expression**

::

   chkButton->setOnClick([](View*){
      CheckBox* checkbox = (CheckBox*) v;
      if (checkbox->isChecked()) {
         UI::alert("This button is checked!");
      }
   });

**Setting CallBack**

::

   chkButton->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onClickButton, this));

XML Attributes
==================

**checked**

If true, sets the state of this button to checked