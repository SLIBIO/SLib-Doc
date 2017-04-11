
======================
RadioButton
======================

A RadioButton is a two-states button that can be either checked or unchecked. RadioButtons allow the user to select one options from a set. 
RadioButtons are mutually exclusive, so you must group them together using the group attribute. By grouping them together, the app ensures that only one RadioButton can be selected at a time.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <linear width="wrap"
            height="wrap">
               <radio group="group1"
                  width="wrap"
                  height="wrap"
                  text="RadioButton 1"/>
              <radio group="group1"
                  width="wrap"
                  height="wrap"
                  text="RadioButton 2"/>
              <radio group="group1"
                  width="wrap"
                  height="wrap"
                  selected="true"
                  text="RadioButton 3"/>
         </linear>
            
      </layout>
   </sapp>


To create an ImageView programmatically, you can use code like the following:

::
   
   Ref<RadioGroup> group = new RadioGroup;
   Ref<RadioButton> radio1 = new RadioButton;
   radio1->setSizeWrapping();
   radio1->setPosition(100, 100);
   radio1->setRadioGroup(group);
   Ref<RadioButton> radio2 = new RadioButton;
   radio2->setSizeWrapping();
   radio2->setPosition(100, 150);
   radio2->setRadioGroup(group);
   Ref<RadioButton> radio3 = new RadioButton;
   radio3->setSizeWrapping();
   radio3->setPosition(100, 200);
   radio3->setRadioGroup(group);

   addChild(radio1);
   addChild(radio2);
   addChild(radio3);

RadioButton is a sub class of :ref:`checkbox` that can be either checked or unchecked.

Responding to Click Event
==========================

You can respond to click event in two ways.

The followings show how you can respond when taps a checkbox which is defined in the above XML.

**Setting Callback Using Lambda Expression**

::

   radioButton->setOnClick([](View*){
      
   });

**Setting CallBack Using Member Function**

::

   radioButton->setOnClick(SLIB_FUNCTION_WEAKREF(MyScreen, onClickRadioButton, this));

XML Attributes
=================

**group**

By grouping them together, the app ensures that only one RadioButton can be selected at a time. May be a string.