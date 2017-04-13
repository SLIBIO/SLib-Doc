
.. _button:

======================
Button
======================

Button is a view that executes your custom code in response to user interactions.

.. code:: xml

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <button name="iconButton"
            width="wrap"
            height="wrap"
            background="@drawable/button_background"
            text="@string/button_text"
            icon="@drawable/button_icon"
            iconWidth="3%sw"
            iconHeight="3%sw"/>

      </layout>
   </sapp>

Responding to Click Event
==========================

You can respond to click event in three ways.

The followings show how you can respond when taps a button which is defined in the above XML.


**Setting Listener**

.. code:: cpp

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
   iconButton->setEventListener(this);
   ...
   
**Setting Lambda Expression**

.. code:: cpp

   iconButton->setOnClick([](View*){
      UI::alert("Hello World!");
   });

**Setting CallBack**

.. code:: cpp

   iconButton->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onClickButton, this));

.. _button-attribute:

XML Attributes
==================

**text**

Specifies the text of this button. May be a string value, such as "@string/button_text" or "Hello World!"

**multiLine**

If true, this button supports multi-line text. May be a boolean value, such as "true" or "false".

**default**

If true, this button will be the default button. May be a boolean value, such as "true" or "false".

**textColor**

A color for the text of this button. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**icon**

Specifies the icon on this button. May be a drawable.

**iconWidth**

Specifies the width of the icon. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**iconHeight**

Specifies the height of the icon. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

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

**iconAlign**

Sets the starting position of the icon. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the icon in the center of this button in both the vertical and horizontal axis, not changing its size.
left           Push the icon to the left of this button, not changing its size.
right          Push the icon to the right of this button, not changing its size.
middle         Place the icon in the middle of this button, not changing its size.
top            Push the icon to the top of this button, not changing its size.
bottom         Push the icon to the bottom of this button, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**textAlign**

Sets the starting position of the text. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the text in the center of this button in both the vertical and horizontal axis, not changing its size.
left           Push the text to the left of this button, not changing its size.
right          Push the text to the right of this button, not changing its size.
middle         Place the text in the middle of this button, not changing its size.
top            Push the text to the top of this button, not changing its size.
bottom         Push the text to the bottom of this button, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**textBeforeIcon**

If true, the text will be before the icon. May be a boolean value, such as "true" or "false".

**orientation**

Specifies the orientation of this button. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
horizontal     The button places content horizontally.
vertical       The button places content vertically.
============== =================================================================================================================================

**iconMarginLeft**

Specifies extra space on the left of the icon. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**iconMarginTop**

Specifies extra space on the top of the icon. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**iconMarginRight**

Specifies extra space on the right of the icon. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**iconMarginBottom**

Specifies extra space on the bottom of the icon. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**textMarginLeft**

Specifies extra space on the left of the text. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**textMarginTop**

Specifies extra space on the top of the text. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**textMarginRight**

Specifies extra space on the right of the text. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**textMarginBottom**

Specifies extra space on the bottom of the text. May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**defaultColorFilter**

If false, disables the color filter. May be a boolean value, such as "true" or "false".
