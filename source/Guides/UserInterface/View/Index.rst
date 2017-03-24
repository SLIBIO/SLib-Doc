
======
View
======

The View class defines an area on the screen and the interfaces for managing the content in that area.

At runtime, a view object handles the rendering of any content in its area and also handles any interactions with that content. The View class itself provides 
basic behavior for filling its rectangular area with a background color. More sophisticated content can be presented by subclassing View and implementing the 
necessary drawing and event-handling code yourself. For example, a LabelView object draws a text string and a ImageView object draws an image.

Because view objects are the main way your application interacts with the user, they have a number of responsibilities. Here are just a few:

- Drawing and animation

- Layout and child management

- Event handling

Views can embed other views and create sophisticated visual hierarchies. This creates a parent-child relationship between the view being embedded and the parent view 
doing the embedding. Normally, a child's visible area is not clipped to the bounds of its superview, but you can use the clipping property to alter that behavior.

In Slib.io, the view can be attached to the native view widgets: Button, Edit, Web … (in iOS, Android, macOS, Win32, Tizen), or can be implemented by its own rendering system (OpenGL, Bitmap, GDI+, Core Graphics, Android Canvas, Cairo …).
It improves Slib.io’s scalability and the views can also be used for games without any changes. 

Creating a View
================

To create a view programmatically, you can use code like the following:

::

  Ref<View> v = new View;
  v->setFrame(UIRect(0, 0, 100, 100));
  v->setBackgroundColor(Color::Red);

To add a child to another view, you use the addChild() method. The addChild() method places the specified view on top of other siblings. You can also change the position 
of already added childs using the bringToFront() method.

The View Drawing Cycle
=======================

View drawing occurs on an as-needed basis. When a view is first shown, or when all or port of it becomes visible due to layout changes, the app asks the view 
to draw its contents. For views that contain custom content, the app calls the view's onDraw() method. Your implementation of this method is responsible for drawing 
the view's content into the current graphics context, which is set up by the app automatically prior to calling this method.

When the actual content of your view changes, it is your responsibility to notify the app that your view needs to be redrawn. You do this by calling your view's 
invalidate() method of the view. This method lets the system know that it should update the view during the next drawing cycle. Because it waits until the next drawing 
cycle to update the view, you can call this method on multiple views to update them at the same time.

Threading Considerations
=========================

Manipulations to your application's user interface can occur on any threads. Thus, you can call the moethods of the View class from code running in any thread of 
your application.

XML attributes
==================

**width**

Specifies the width of the view. This is a required attribute for any view. Its value may be a dimension (such as "5%sw") for a constant width or one of the special constants.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**height**

Specifies the basic height of the view. This is a required attribute for any view. Its value may be a dimension for a constant height or one of the special constants.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**alignLeft**

May be a boolean value, such as "true" or "false". In this case, If true, makes the left edge of this view match the left edge of the parent.

May be a reference to another view. In this case, makes the left edge of this view match the left edge of the given anchor view name.

**alignRight**

May be a boolean value, such as "true" or "false". In this case, If true, makes the right edge of this view match the right edge of the parent.

May be a reference to another view. In this case, makes the right edge of this view match the right edge of the given anochor view name.

**alignTop**

May be a boolean value, such as "true" or "false". In this case, If true, makes the top edge of this view match the top edge of the parent.

May be a reference to another view. In this case, makes the top edge of this view match the top edge of the given anchor view name.

**alignBottom**

May be a boolean value, such as "true" or "false". In this case, If true, makes the bottom edge of this view match the top edge of the parent.

May be a reference to another view. In this case, makes the bottom edge of this view match the bottom edge of the given anochor view name.

**alignCenter**

If true, centers this child horizontally and vertically within its parent.

May be a boolean value, such as "true" or "false".

**toLeftOf**

Positions the right edge of this view to the left of the given anchor view name.

**toRightOf**

Positions the left edge of this view to the right of the given anchor view name.

**above**

Positions the bottom edge of this view to the top of the given anchor view name.

**below**

Positions the top edge of this view to the bottom of the given anchor view name.

**left**

Sets the left edge of the view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**top**

Sets the top edge of the view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**minWidth**

It is used to set the minimum width of a view. This prevents the value of the width from becoming smaller than minWidth. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**maxWidth**

It is used to set the maximum width of a view. This prevents the value of the width from becoming larger than maxWidth. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**minHeight**

It is used to set the minimum height of a view. This prevents the value of the height from becoming smaller than minHeight. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**maxHeight**

It is used to set the maximum height of a view. This prevents the value of the height from becoming larger than maxHeight. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**aspectRatio**

It is not necessary to specify width/height if you specify aspectRatio, then the second one to be calculated automatically from the aspectRatio.

**marginLeft**

Specifies extra space on the left side of this view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**marginTop**

Specifies extra space on the top of this view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**marginRight**

Specifies extra space on the right of this view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**marginBottom**

Specifies extra space on the bottom of this view. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**paddingLeft**

Specifies the padding of the left edge. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**paddingTop**

Specifies the padding of the top edge. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**paddingRight**

Specifies the padding of the right edge. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**paddingBottom**

Specifies the padding of the bottom edge. Its value may be a dimension for a constant.

May be a dimension value, which is a floating point number. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**visibility**

Controls the initial visibility of the view.

Must be one of the following constant values.

   ============== =====================================================================================================
   Constant       Description
   ============== =====================================================================================================
   gone           Completely hidden, as if the view had not been added.
   hidden         Not displayed, but taken into account during layout.
   visible        Visible on screen.
   ============== =====================================================================================================

**enabled**

If false, ignores all UI events on this view.

May be a boolean value, such as "true" or "false"

**clipping**

It lets you specify a rectangle to clip an absolutely positioned view.

May be a boolean value, such as "true" or "false"

**drawing**

If true, custom drawing is enabled.

May be a boolean value, such as "true" or "false"

**background**

A drawable to use as the background. The values that can be set, are: colors and images.

**pressedBackground**

A drawable to use when press the view. The values that can be set, are: colors and images.

**hoverBackground**

A drawable to use when you mouse over the view. The values that can be set, are: colors and images.

**backgroundScale**

Options for scaling the bounds of an image to the bounds of this view.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   cover          Scale the background image to be as large as possible so that the background area is completely covered by the background image.
   contain        Scale the background image to the largest size such that both its width and its height can fit inside the content area. 
   stretch        Scale the background image to fit the size of this view by changing the aspect ratio of the content if necessary.
   ============== =================================================================================================================================

**backgroundAlign**

Sets the starting position of the background image.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   center         Place the background image in the center of this view in both the vertical and horizontal axis, not changing its size.
   left           Push the background image to the left of this view, not changing its size.
   right          Push the background image to the right of this view, not changing its size.
   middle         Place the background image in the middle of this view, not changing its size.
   top            Push the background image to the top of this view, not changing its size.
   bottom         Push the background image to the bottom of this view, not changing its size.
   top|center     You can combine multiple values of the above constants.
   ============== =================================================================================================================================

**backgroundColor**

A color to use as the background color. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**border**

If true, shows the border on this view.

May be a boolean value, such as "true" or "false"

**borderWidth**

Sets the width of the border.

Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**borderColor**

Sets the color of the border.

The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**borderStyle**

Sets the style of the border.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   solid          Specifies a solid border.
   dot            Represents a border style that consists of a dotted line.
   dash           Represents a border style that consists of a series of dashed lines.
   dashDot        Represents a border style that consists of a dash, followed by a dot.
   dashDotDot     Represents a border style that consists of a dash, followed by two dots.
   ============== =================================================================================================================================

**boundShape**

Sets the shape of the bound.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   rectangle      Specifies a rectangle bound.
   ellipse        Specifies an ellipse bound.
   roundRect      Specifies a round rectangle bound.
   ============== =================================================================================================================================

**fontFamily**

Font family for the text.

**fontSize**

Size of the text. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**fontBold**

If true, the text font will be bold.

May be a boolean value, such as "true" or "false"

**fontItalic**

If true, the text font will be italic.

May be a boolean value, such as "true" or "false"

**fontUnderline**

If true, defines a line below the text.

May be a boolean value, such as "true" or "false"

**alpha**

alpha property of the view, as a value between 0 (completely transparent) and 1 (completely opaque)

May bea a floating point value.

**scrolling**

Defines the scroll direction of the view.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   horizontal     The view scrolls content horizontally.
   vertical       The view scrolls content vertically.
   both           The view scrolls content both horizontally and vertically.
   ============== =================================================================================================================================

**scrollBars**

Defines the scroll bar of the view.

Must be one of the following constant values.

   ============== =================================================================================================================================
   Constant       Description
   ============== =================================================================================================================================
   horizontal     Shows only horizontal scroll bar.
   vertical       Shows only vertical scroll bar.
   both           Shows both horizontal and vertical bar.
   ============== =================================================================================================================================

**paging**

If true, the view will support the paging mode.

Must be one of the following constant values.