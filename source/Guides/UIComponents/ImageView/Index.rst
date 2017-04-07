
======================
ImageView
======================

A view that displays a single image in your interface. ImageView let you draw any image that can be specified using a Image object.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <image name="imgCharacter1"
            width="10%sw"
            height="10%sh"
            src="@drawable/character1"/>
            
      </layout>
   </sapp>


To create an ImageView programmatically, you can use code like the following:

::

   Ref<ImageView> imageView = new ImageView;
   imageView->setSource(drawable::character1::get());
   imageView->setHeight(300);
   imageView->setAspectRatioMode(AspectRatioMode::AdjustWidth);
   imageView->setPosition(100, 100);
   addChild(imageView);

Loading Images
===============

To load image from somewhere on your drawable use:

::

  imageView->setSource(drawable::character1::get());

To load image from file on your drive use:

::

   Ref<Image> image = Image::loadFromfile(filePath);
   imageView->setSource(image);


XML Attributes
=================

**gravity**

Specifies the gravity of this ImageView. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the image of this ImageView in the center of this ImageView in both the vertical and horizontal axis, not changing its size.
left           Push the image of this ImageView to the left of this ImageView, not changing its size.
right          Push the image of this ImageView to the right of this ImageView, not changing its size.
middle         Place the image of this ImageView in the middle of this ImageView, not changing its size.
top            Push the image of this ImageView to the top of this ImageView, not changing its size.
bottom         Push the image of this ImageView to the bottom of this ImageView, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**scale**

This property used to determine how an ImageView lays out its image. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
none           
cover          Scale the image to be as large as possible so that the ImageView area is completely covered by the image.
contain        Scale the image to the largest size such that both its width and its height can fit inside the content area. 
stretch        Scale the image to fit the size of this ImageView by changing the aspect ratio of the content if necessary.         
============== =================================================================================================================================

**src**

Specifies the drawable. May be a drawable.