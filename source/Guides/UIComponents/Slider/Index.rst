
======================
Slider
======================

A control used to select a single value or selecting a range of values from a continuous range of values.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <slider width="10%sw"
            height="3%sw"
            max="100"
            value="20"
            thumb="@drawable/imgThumb"
            pressedThumb="@drawable/imgPressedThumb"
            hoverThumb="@drawable/imgHoverThumb"
            thumbWidth="1.5%sw"
            thumbHeight="1.5%sw"
            track="@drawable/imgTrack"
            progress="@drawable/imgProgress"
            padding="1%sw"/>
      </layout>
   </sapp>

Selecting Range
=================

Slider supports select range mode. You can specify the dual attribute.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <slider width="10%sw"
            height="3%sw"
            max="100"
            value="20"
            thumb="@drawable/imgThumb"
            pressedThumb="@drawable/imgPressedThumb"
            hoverThumb="@drawable/imgHoverThumb"
            thumbWidth="1.5%sw"
            thumbHeight="1.5%sw"
            track="@drawable/imgTrack"
            progress="@drawable/imgProgress"
            progress2="@drawable/imgProgress2"
            padding="1%sw"
            dual="true"/>
      </layout>
   </sapp>

Responding to to User Interactions
===================================

You can respond on changing the value in two ways.
   
**Setting Callback using Lambda Expression**

::

   slider->setOnChange([](Slider* slider, float value){

   });

   slider->setOnChangeSecondary([](Slider* slider, float value){

   });

**Setting CallBack using member function**

::

   slider->setOnChange(SLIB_FUNCTION_WEAKREF(MyScreen, onChangeValue, this));
   slider->setOnChangeSecondary(SLIB_FUNCTION_WEAKREF(MyScreen, onChangeSecondaryValue, this));

XML attributes
==================

**thumb**

Specifies the thumb image. May be a drawable.

**pressedThumb**

Specifies the pressed thumb image. May be a drawable.

**hoverThumb**

Specifies the hover thumb image. May be a drawable.

**thumbWidth**

Specifies the width of the thumb.

**thumbHeight**

Specifies the height of the thumb.

See more details at ProgressBar's :ref:`progress-attribute`