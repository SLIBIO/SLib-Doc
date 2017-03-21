
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


Animations
============

Threading Considerations
=========================

Manipulations to your application's user interface can occur on any threads. Thus, you can call the moethods of the View class from code running in any thread of 
your application.

XML attributes
==================