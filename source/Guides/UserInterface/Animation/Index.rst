
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
   
   Ref<Animation> animation = createAnimation(1);
   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setHeight(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustWidth);
   addChild(image);
   image->setTransformAnimation(animation, Transform2::getScalingMatrix(2, 2), Transform2::getScalingMatrix(1, 1));
   animation->start();

**Translation**

Translates a view to its superview's coordinate system.

::

   Ref<Animation> animation = createAnimation(1);
   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setWidth(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustHeight);
   addChild(image);
   AnimationFrames<Vector2> frame(Vector2(0, 0), Vector2(0, 0));
   frame.addFrame(0.3, Vector2(-20, 0));
   frame.addFrame(0.6, Vector2(-20, -20));
   frame.addFrame(1, Vector2(-20, -40));
   image->setTranslateAnimation(animation, frame);
   animation->start();

**Scale**

You can easily scale a View using setScaleAnimation or startScaleAnimation method.

::
   
   Ref<Animation> animation = createAnimation(0.5);
   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setWidth(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustHeight);
   addChild(image);
   image->setScaleAnimation(animation, Vector2(1, 2));
   animation->start();

**Rotate**

The setRotateAnimation or startRotateAnimation method takes place in the X-Y plane. You can specify the point to use for the center of the rotation, where (0, 0) is the center point. 
If not specified, (0, 0) is the default rotation point.

::

   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setWidth(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustHeight);
   addChild(image);
   animation = image->createRotateAnimation(SLIB_PI_DUAL * 0.25, 5);
   animation->start();

**Frame**

Using the setFrameAnimation or startFrameAnimation method, you can change the view's size and position.

::

   Ref<Animation> animation = createAnimation(0.6);
   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setWidth(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustHeight);
   image->setPosition(300, 300);
   addChild(image);
   image->setFrameAnimation(animation, Rectangle(200, 300, 500, 100));
   animation->start();

**Alpha**

Using the setAlphaAnimation or startAlphaAnimation method, you can gradually change the transparency of the view.

::

   Ref<ImageView> image = new ImageView;
   image->setSource(drawable::ui_my_image::get());
   image->setWidth(200);
   image->setAspectRatioMode(AspectRatioMode::AdjustHeight);
   addChild(image);
   image->startAlphaAnimation(0.1, 5);

**BackgroundColor**

Using the setBackgroundColorAnimation or startBackgroundColorBackground method, you can change the view's background color;

::

   Ref<View> v = new View;
   v->setWidth(200);
   v->setHeight(200);
   v->setBackgroundColor(Color::Red);
   addChild(v);
   v->startBackgroundColorBackground(Color4f(0.3, 1, 0.5, 0.5, 1), 0.5);

Animation Options
------------------

**Repeating**

Use setRepeatForever, setRepeatCount, setAutoReverse methods to set the number of times the animation repeats and whether the animation runs in reverse at the end of each complete cycle.

::

   Ref<Animation> animation1 = createAnimation(2);
   animation1->setRepeatCount(5); // Repeats animation1 for 5 times.
   animation1->setAutoReverse(); // animation1 runs in reverse at the end of each complete cycle.
   ...

   Ref<Animation> animation2 = createAnimation(2);
   animation2->setRepeatForever(); // Repeats animation2 forever.
   ...

**Curve**

Specifies the supported animation curves.

::

   Ref<View> v = new View;
   v->setWidth(200);
   v->setHeight(200);
   v->setBackgroundColor(Color::Red);
   addChild(v);
   v->startBackgroundColorBackground(Color4f(0.3, 1, 0.5, 0.5, 1) , 5, [](){
       UI::alert("Animation completed");
   }, AnimationCurve::EaseOut);
   