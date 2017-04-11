
.. _checkbox:

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

RadioButton is a subclass of :ref:`button`.

Responding to Click Event
==========================

You can respond to click event in two ways.

The followings show how you can respond when taps a checkbox which is defined in the above XML.

**Setting Callback Using Lambda Expression**

::

   chkButton->setOnClick([](View*){
      CheckBox* checkbox = (CheckBox*) v;
      if (checkbox->isChecked()) {
         UI::alert("This button is checked!");
      }
   });

**Setting CallBack Using Member Function**

::

   chkButton->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onClickButton, this));

XML Attributes
==================

**checked**

If true, sets the state of this button to checked