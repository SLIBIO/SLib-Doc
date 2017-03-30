
======================
EditView
======================

A EditView is a control that displays editable text.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <edit name="myEdit"
            width="10%sw"
            height="3%sw"
            text="@string/button_text"
            hintText="Type a message here..."/>

      </layout>
   </sapp>

Responding to Key Event
==========================

You can respond to key event in three ways.

**Setting Listener**

::

   //MyScreen.h
   #include <slib.h>
   class MyScreen: public ui::MyPage, public IViewListener
   {
      ...

   public:
      void onKeyEvent(View* view, UIEvent* ev);

      ...
   }

   //MyScreen.cpp
   #include "MyScreen.h"

   ...
   myEdit->setEventListener(this);
   ...
   
**Setting Lambda Expression**

::

   myEdit->setOnKeyEvent([](View*, UIEvent* ev){
      UI::alert(String::format("You pressed: %d", ev->getKeycode()));
   });

**Setting CallBack**

::

   myEdit->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onKeyPressEvent, this));

XML attributes
==================

**text**

If true, sets the state of this button to checked

**gravity**

Specifies the gravity of this button. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the contents of this button in the center of this button in both the vertical and horizontal axis, not changing its size.
left           Push the contents of this button to the left of this button, not changing its size.
right          Push the contents of this button to the right of this button, not changing its size.
middle         Place the contents of this button in the middle of this button, not changing its size.
top            Push the contents of this button to the top of this button, not changing its size.
bottom         Push the contents of this button to the bottom of this button, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**hintText**

**readOnly**

**multiline**

**textColor**

**returnKey**

**keyboard**

**autoCap**