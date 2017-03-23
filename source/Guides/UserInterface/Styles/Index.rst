
======================
Styles
======================

A style is a collection of attributes that specify the look and format for 
a View. A style can specify attributes such as height, padding, font color, background color and much more. 
A style is defined in an XML resource that is separated from the XML that specifies the layout.

For example, by using a style, you can take this layout XML:

::

   <edit
      width="wrap"
      height="wrap"
      textColor="red"
      text="@string/hello"/>

And turn it into this:

::

   <layout-style name="styleForEdit"
      width="wrap"
      height="wrap"
      textColor="red"/>

::

   <edit
      styles='styleForEdit'
      text="@string/hello"/>

**SYNTAX:**

 ::

   <sapp version="1">
      <layout-style name="style_name"
              [layout-specific attributes] />

      <layout-style .../>
   </sapp>