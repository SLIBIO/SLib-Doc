
.. _slib_basic_resources:

======================
Resources
======================

Drawable
=========

Drawable resource is a general concept for a graphic that can be drawn to the screen and which you can retrieve such as drawable::<Image Name>::get() or 
apply to another XML resource with attributes such as drawable.

**EXAMPLE:**

 With an image saved at res/image/myimage.png, this layout XML applies the image to a View:

 ::

   <image
      width="wrap"
      height="wrap"
      src="@drawable/myimage"
   />


 The following application code retrieves the image as a Drawable:

 ::

   Ref<Drawable> drawable = drawable::myimage::get()

Layout Resource
================

A layout resource defines the architecture for the UI in a page or a component of a UI.

**SYNTAX:**

 ::

   <sapp version="1">
      <layout type=["view | page | window"]
              name="resource_name"
              width=["dimension" | "wrap" | "fill" | "*"]
              height=["dimension" | "wrap" | "fill" | "*"]
              [layout-specific attributes] >
         <linear orientation=["vertical" | "horizontal"]
                 width=["dimension" | "wrap" | "fill" | "*"]
                 height=["dimension" | "wrap" | "fill" | "*"]
                 [view-specific attributes] >
         </linear>
         <include src='layout_resource_name'/>
      </layout>

      <layout >
      </layout>

      <strings>
         <string name='string_resource_name'>string</string>
      </strings>
   </sapp>

**ELEMENTS:**

 :ts:`<layout>`
   A container for other view elements. There are several kinds of layouts: page, view, window.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   name           A unique resource name for the element, which you can use to obtain a reference to the layout.
   width          Dimension or keyword. The width for the layout, as a dimension value or a keyword("wrap" | "fill" | "*").
   height         Dimension or keyword. The height for the layout, as a dimension value or a keyword("wrap" | "fill" | "*").
   ============== =====================================================================================================

 :ts:`<view>`
   An individual UI component. Different kinds of view objects include linear, group, edit, text, password, textArea, label and button etc.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   name           A unique resource name for the element, which you can use to obtain a reference to the layout.
   width          Dimension or keyword. The width for the layout, as a dimension value or a keyword("wrap" | "fill" | "*").
   height         Dimension or keyword. The height for the layout, as a dimension value or a keyword("wrap" | "fill" | "*").
   ============== =====================================================================================================

 :ts:`<layout-include>`
   Defines elements which can be re-used in other layouts. 
   This is particularly useful when you plan to include this layout in another layout file using <include>.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   name           Resource name.
   ============== =====================================================================================================

 :ts:`<include>`
   Includes a layout-include into this layout.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   src            layout-include resource. Reference to a layout-include resource.
   ============== =====================================================================================================

 :ts:`<import>`
   Imports a layout as a new view into this layout.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   layout         Layout resource. Reference to a layout resource.
   name           Resource name.
   ============== =====================================================================================================

**EXAMPLE:**

 ::

   <sapp version="1">
      <layout type="page"
              name="ExamplePage"
              width="fill"
              height="fill"
         <linear orientation="vertical"
                 width="wrap"
                 height="wrap">
            <label name="label"
                   width="wrap"
                   height="wrap"
                   text="@string/txtHellow"/>
            <button name="button"
                   width="wrap"
                   height="wrap"
                   text="@string/btnHello"/>
         </linear>
      </layout>

      <strings>
         <string name='txtHello'>Hello, I am a Label</string>
         <string name='btnHello'>Hello, I am a Button</string>
      </strings>
   </sapp>

 This application name is myapp and you can load the above layout like so:

 ::

   #include "../res/resources.h"
   
   ...
   Ref<myapp::ui::ExamplePage> mypage = new myapp::ui::ExamplePage;
   mypage->label->setText("John");
   mypage->button->setOnClick([](){
      alert("My name is John");
   });
   ...


Styles
================

A style resource defines the format and look for a UI. A style can be applied to an individual view.

**SYNTAX:**

 ::

   <layout-style
      name='style_name'
      [view-specific attributes]
   />

**ELEMENTS:**

 :ts:`<layout-style>`
   Defines a single style.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   layout         Style name.
   ============== =====================================================================================================

**EXAMPLE:**

 XML file for the style:

 ::

   <sapp version='1'>'
      <layout-style
         name='style_label'
         background='blue'
         width='wrap'
         height='wrap'
         fontSize='5%sw'
         textColor="green"
      />
   </sapp>

 XML file that applies the sylte to a Label:

 ::

   <label
      styles="style_label"
      text="Hello, World!"/>

String
================

A string resource provides text strings for your application.

**SYNTAX:**

 ::

    <strings>
       <string name='string_name'>text_string</string>
    </strings>

**ELEMENTS:**

 :ts:`<strings>`
   This is a element containing several string elements.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   locale         Defines the language for this strings
   ============== =====================================================================================================

 :ts:`<string>`
   A string element.

   :aspect:`attributes:`

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   name           Name for this string.
   locale         Defines the language for this string.
   ============== =====================================================================================================

**EXAMPLE:**

 ::

   <strings>
      <string name='hello'>Hello!</string>
   </strings>

 This layout XML applies a string to a View:

 ::

   <label
      width="wrap"
      height="wrap"
      text="@string/hello"/>

 If you need to format your strings using String::format(String& szFormat) then you can do so by 
 putting your format arguments in the string resource.

 ::

   <string name="welcome_messages">Hello, %s! You have %d new messages.</string>

 You can format the string with arguments from your application like this:

 ::

   //This application name is myapp.
   String text = String::format(mayapp::string::welcome_messages::get(), userName, mailCount);

Dimension
==========

:ts:`px`

Corresponds to actual pixels on the screen.

::

   <button name="button"
      width="100px"
      height"20px"
      text="Hello World!"/>

:ts:`sw`

A sw is a unit based on the screen width.

::

   <button name="button"
      width="20%sw"
      height"5%sw"
      text="Hello World!"/>

:ts:`sh`

A sh is a unit based on the screen height.

::

   <button name="button"
      width="20%sw"
      height"5%sh"
      text="Hello World!"/>

:ts:`smin`

A smin is a unit based on the smaller of the screen width and the screen height.

::

   <button name="button"
      width="20%smin"
      height"5%smin"
      text="Hello World!"/>

:ts:`smax`

A smax is a unit based on the larger of the screen width and the screen height.

::

   <button name="button"
      width="20%smax"
      height"5%smax"
      text="Hello World!"/>

:ts:`vw`

A vw is a unit based on the width of the viewport.

::

   <button name="button"
      width="20%vw"
      height"5%vw"
      text="Hello World!"/>

:ts:`vh`

A vh is a unit based on the height of the viewport.

::

   <button name="button"
      width="20%vh"
      height"5%vh"
      text="Hello World!"/>

:ts:`vmin`

A vmin is a unit based on the smaller of the viewport width and the viewport height.

::

   <button name="button"
      width="20%vmin"
      height"5%vmin"
      text="Hello World!"/>

:ts:`vmax`

A vmax is a unit based on the larger of the viewport width and the viewport height.

::

   <button name="button"
      width="20%vmax"
      height"5%vmax"
      text="Hello World!"/>

:ts:`sp`

Scale-independent Pixels - It is scaled by the its containing page's value of 'sp'

::

   <sapp version='1'>
      <layout type='page'
         sp='1%sw'
         name='MyPage'>
         
         <button name="button"
            centerHorizontal="true"
            centerVertical="true"
            width="10sp"
            height="3sp"
            text="Tap me!"/>
      </layout>
   </sapp>