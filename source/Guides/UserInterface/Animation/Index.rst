
======================
Animation
======================

Animations provide fluid visual transitions between different states of your user interface. Animations are used extensively to reposition views, change their size and hide them. 

Animations are performed using View objects. Views support a basic set of animations that cover many common tasks.

Basic View Animations
----------------------

**Transformation**

With transformation, you can scale, rotate, or translate the view. Transformations are always performed in 2D space.

::
   
   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setHeight(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustWidth);
   addChild(image);

   image->startTransformAnimationTo(Transform2::getScalingMatrix(2, 2), Transform2::getScalingMatrix(1, 1), 0.5);

**Translation**

Translates a view to its parent view's coordinate system.

::

   view->startTranslateAnimationTo(Vector2(500, 500), 0.5);

**Scale**

You can easily scale a View.

::
   
   view->startScaleAnimationTo(2, 0.5);

**Rotate**

You can specify the point to use for the center of the rotation, where (0, 0) is the center point. 
If not specified, (0, 0) is the default rotation point.

::

   image->startRotateAnimationTo(SLIB_PI_DUAL * 0.25, 0.5);

**Frame**

You can change the view's size and position.

::

   view->startFrameAnimationTo(Rectangle(200, 300, 500, 100), 0.5);

**Alpha**

You can gradually change the transparency of the view.

::

   view->startAlphaAnimationTo(0.1, 0.5);

**BackgroundColor**

You can change the view's background color;

::

   view->startBackgroundColorBackgroundTo(Color4f(0.3, 1, 0.5, 0.5, 1), 0.5);

Using Animation Object
------------------------

An animation object lets you manage the animation in detail.

::

   Ref<Animation> animation = view->createTranslateAnimationTo(Vector2(300, 300), 3);
   animation->setRepeatCount(5);
   animation->start();

Animation Options
------------------

You can specify several options for animation in the params of startAnimation method.

::

   view->startAlphaAnimationTo(0.3, 0.5, [](){
       UI::alert("Animation completed");
   }, AnimationCurve::EaseOut, AnimationFlags::Repeat | AnimationFlags::AutoReverse);

**Repeating**

Use setRepeatForever, setRepeatCount, setAutoReverse methods to set the number of times the animation repeats and whether the animation runs in reverse at the end of each complete cycle.

::

   Ref<Animation> animation1 = view->createAnimation(2);
   animation1->setRepeatCount(5); // Repeats animation1 for 5 times.
   animation1->setAutoReverse(); // animation1 runs in reverse at the end of each complete cycle.
   ...

   Ref<Animation> animation2 = view->createAnimation(2);
   animation2->setRepeatForever(); // Repeats animation2 forever.
   ...

**Curve**

Specifies the supported animation curves.

::

   Ref<Animation> animation = view->createAnimation(2);
   animation->setAnimationCurve(AnimationCurve::Bounce);
   ...
   
Managing Multiple Animations
-----------------------------

You can manage multiple animations using an animation object.

::

   Ref<Animation> animation = createAnimation(0.5);
   animation->setRepeatForever(true);

   view1->setTranslateAnimation(animation, Vector2(300, 300));
   view2->setScaleAnimation(animation, 2);
   view3->setFrameAnimation(animation, Rectangle(200, 300, 500, 100));

   animation->setOnStop([](){
       UI::alert("Animation completed");
   });

   animation->start();

Linking Animations
-------------------

You can link several animations in series.

::

   Ref<Animation> animation1 = createAnimation(0.5);
   ...

   Ref<Animation> animation2 = createAnimation(1);
   ...

   Ref<Animation> animation3 = createAnimation(1.5);
   ...

   animation1->linkAnimation(animation2);
   animation2->linkAnimation(animation3);

   animation1->start();