
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

   ============== =====================================================================================================
   attribute      Description
   ============== =====================================================================================================
   px             Corresponds to actual pixels on the screen.
   sw             100%sw is equal to the screen width.
   sh             100%sh is equal to the screen height.
   smin           100%smin is equal to the smaller of the screen width and the screen height. 
   smax           100%smax is euqal to the greater of the screen width and the screen height.
   vw             100%vw is equal to the viewport width.
   vh             100%vh is equal to the viewport height.
   vmin           100%vmin is equal to the smaller of the viewport width and the viewport height.
   vmax           100%vmax is equal to the greater of the viewport width and the viewport height.
   sp             Scale-independent Pixels - It is scaled by the its containing page's value of 'sp'.
   fill           The view should be as big as its parent.
   wrap           The view should be only big enough to enclose its content.
   ============== =====================================================================================================


   **Example**

::

   <sapp version='1'>
      <layout type='page'
         sp='1%sw'
         name='MyPage'>
         <linear width='wrap'
            height='wrap'
            orientation='vertical'
            centerHorizontal='true'
            centerVertical='true'>
            <button name='button1'
               width='10sp'
               height='3sp'
               text='Tap me!'
               marginBottom='5%sh'/>
            <button name='button2'
               width='10sw'
               height='3sw'
               text="Tap me!"/>
            <button name='button3'
               width='12vw'
               height='5vmin'
               text="Tap me!"/>
          </linear>
      </layout>
   </sapp>