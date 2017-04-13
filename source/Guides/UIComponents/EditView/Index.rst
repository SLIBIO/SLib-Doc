
======================
EditView
======================

A EditView is a control that displays editable text.

.. code:: xml

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

.. code:: cpp

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

.. code:: cpp

   myEdit->setOnKeyEvent([](View*, UIEvent* ev){
      UI::alert(String::format("You pressed: %d", ev->getKeycode()));
   });

**Setting CallBack**

.. code:: cpp

   myEdit->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onKeyPressEvent, this));

XML Attributes
==================

**text**

Sets the text of this EditView. May be a string value, such as "@string/text" or "Hello World!"

**gravity**

Specifies the gravity of this EditView. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the text of this EditView in the center of this EditView in both the vertical and horizontal axis, not changing its size.
left           Push the text of this EditView to the left of this EditView, not changing its size.
right          Push the text of this EditView to the right of this EditView, not changing its size.
middle         Place the text of this EditView in the middle of this EditView, not changing its size.
top            Push the text of this EditView to the top of this EditView, not changing its size.
bottom         Push the text of this EditView to the bottom of this EditView, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**hintText**

Specifies the text to be displayed when the text of this EditView is empty. May be a string value, such as "@string/button_text" or "Hello World!"

**hintTextColor**

Specifies the color of the hint text.

**readOnly**

If true, this EditView has not an input method. May be a boolean value, such as "true" or "false".

**multiLine**

Specifies what happens when a line is too long for the EditView's size. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
single         Shows text in single line.
multiple       Break text only at CR/LF
word-wrap      Break words only at allowed break points.
break-word     Allows unbreakable words to be broken.
============== =================================================================================================================================

**textColor**

Specifies the color of the text. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**returnKey**

Specifies the action of the return key. Must be one of the following constant values.

============== =================================================================================================================================
default        Specifies that the text of the return key is "return".
return         Specifies that the text of the return key is "return".
done           Specifies that the text of the return key is "Done".
search         Specifies that the text of the return key is "Search".
next           Specifies that the text of the return key is "Next".
continue       Specifies that the text of the return key is "Continue".
go             Specifies that the text of the return key is "Go".
send           Specifies that the text of the return key is "Send".
route          Specifies that the text of the return key is "Route".
emergency      Specifies that the text of the return key is "Emergency".
google         Specifies that the text of the return key is "Google".
yahoo          Specifies that the text of the return key is "Yahoo".
============== =================================================================================================================================

**keyboard**

Specifies the type of keyboard to display for this EditView. Must be one of the following constant values.

=========================      =================================================================================================================================
default                        Specifies the default keyboard for this EditView.
numpad                         Specifies a numeric keypad.
phone                          Specifies a keypad designed for inputing telephone numbers.
email                          Specifies a keyboard optimized for inputing email.
decimal                        Specifies a keyboard with numbers and decimal point.
alphabet                       Specifies a keyboard optimized for alphabetic entry.
url                            Specifies a keyboard optimized for URL entry.
web-search                     Specifies a keyboard optimized for web search and URL entry.
twitter                        Specifies a keyboard optimized for Twitter text.
numbers-and-punctuation        Specifies the numbers and punctuation keyboard.
name-phone                     Specifies a keyboard designed for inputing name or phone number.
ascii-numpad                   Specifies a number pad that outputs only ASCII digits.
=========================      =================================================================================================================================

**autoCap**

If true, this EditView should automatically capitalize what the user types. May be a boolean value, such as "true" or "false".
