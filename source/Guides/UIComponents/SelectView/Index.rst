
======================
SelectView
======================

SelectView can be used to display the multiple options to the user in which only one item can be selected.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <select width="10%sw"
            height="3%sw">
            <item value="item1"
               title="London"/>
            <item value="item2"
               title="Paris"/>
            <item value="item3"
               title="Dubai"/>
         </select>
      </layout>
   </sapp>

To create a Label programmatically, you can use code like the following:

::

   Ref<SelectView> selectView = new SelectView;
   selectView->setWidth(200);
   selectView->setHeight(50);
   selectView->setValues({"item1", "item2", "item3"});
   selectView->setTitles({"London", "Paris", "Dubai"});
   addChild(selectView);

The <itme> tags inside the <select> element define the available options in the list.

Responding to to User Interactions
===================================

You can respond to select item in two ways.
   
**Setting Callback using Lambda Expression**

::

   selectView->setOnSelectItem([](SelectView* view, int index){
      String value = view->getItemTitle(index);
      Console::println("You have selected: %s", value);
   });

**Setting CallBack using member function**

::

   selectView->setOnSelectItem(SLIB_FUNCTION_WEAKREF(MyScreen, onSelectItem, this));

XML attributes
==================

**iconWidth**

Specifies the width of the icon. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**iconHeight**

Specifies the height of the icon. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**leftIcon**

Specifies the left icon of this SelectView. May be a drawable.

**rightIcon**

Specifies the right icon of this SelectView. May be a drawable.

**textColor**

Specifies the text color of this SelectView. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

Options(Items) for SelectView
==============================

The <item> tag defines an option in a select list.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <select width="10%sw"
            height="3%sw">
            <item value="item1"
               title="London"/>
            <item value="item2"
               title="Paris"
               selected="true"/>
            <item value="item3"
               title="Dubai"/>
         </select>
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