
======================
LabelView
======================

A view that displays read-only text.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <label name="lblName"
            width="wrap"
            height="wrap"
            text="Hello World!"
            textColor="red"
            fontSize="1%sw"
            alignCenter="true"/>
            
      </layout>
   </sapp>


To create a Label programmatically, you can use code like the following:

::

   Ref<LabelView> label = new LabelView;
   label->setFontAttributes(12);
   label->setTextColor(Color::Red);
   label->setText("Hello World!");
   label->setSizeWrapping();
   addChild(label);

XML attributes
=================

**gravity**

Specifies the gravity of this LabelView. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the text of this LabelView in the center of this LabelView in both the vertical and horizontal axis, not changing its size.
left           Push the text of this LabelView to the left of this LabelView, not changing its size.
right          Push the text of this LabelView to the right of this LabelView, not changing its size.
middle         Place the text of this LabelView in the middle of this LabelView, not changing its size.
top            Push the text of this LabelView to the top of this LabelView, not changing its size.
bottom         Push the text of this LabelView to the bottom of this LabelView, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**text**

Sets the text of this LabelView. May be a string value, such as "@string/text" or "Hello World!"

**textColor**

Specifies the color of the text. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**multiLine**

Specifies what happens when a line is too long for the label's size. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
single         Shows text in single line.
multiple       Break text only at CR/LF
word-wrap      Break words only at allowed break points.
break-word     Allows unbreakable words to be broken.
============== =================================================================================================================================