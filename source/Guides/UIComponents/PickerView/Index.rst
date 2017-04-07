
======================
PickerView
======================

A view that uses a spinning-wheel to show one or more sets of values.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <picker width="10%sw"
            height="3%sw">
            <item value="item1"
               title="London"/>
            <item value="item2"
               title="Paris"/>
            <item value="item3"
               title="Dubai"/>
         </picker>
      </layout>
   </sapp>


To create a PickerView programmatically, you can use code like the following:

::

   Ref<PickerView> pickerView = new PickerView;
   pickerView->setWidth(200);
   pickerView->setHeight(50);
   pickerView->setValues({"item1", "item2", "item3"});
   pickerView->setTitles({"London", "Paris", "Dubai"});
   addChild(pickerView);

The <itme> tags inside the <picker> element define the available options in the list.

Responding to to User Interactions
===================================

You can respond to select item in two ways.
   
**Setting Callback using Lambda Expression**

::

   pickerView->setOnSelectItem([](PickerView* view, int index){
      String value = view->getItemTitle(index);
      Console::println("You have selected: %s", value);
   });

**Setting CallBack using member function**

::

   pickerView->setOnSelectItem(SLIB_FUNCTION_WEAKREF(MyScreen, onSelectItem, this));

XML attributes
==================

**textColor**

Specifies the text color of this PickerView. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

Options(Items) for PickerView
==============================

The <item> tag defines an option in a select list.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <picker width="10%sw"
            height="3%sw">
            <item value="item1"
               title="London"/>
            <item value="item2"
               title="Paris"
               selected="true"/>
            <item value="item3"
               title="Dubai"/>
         </picker>
      </layout>
   </sapp>

XML Attributes
---------------

**title**

Specifies a shorter title for an item. May be a string value, such as "@string/text" or "Hello World!"

**value**

Specifies the value for an item. May be a string value, such as "@string/text" or "Hello World!"

**selected**

If true, it should be pre-selected. May be a boolean value, such as "true" or "false".