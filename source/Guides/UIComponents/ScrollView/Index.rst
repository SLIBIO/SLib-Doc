
======================
ScrollView
======================

ScrollView contains layouts and enables them to scroll.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <scroll width="fill"
            height="90%sh"
            scrolling="vertical"
            scrollBars="none">
            <linear width="fill"
               height="wrap">
               <view width="fill"
                   height="150%sh"
                   background="#00ff00"/>
            </linear>
         </scroll>
      </layout>
   </sapp>


To create a PickerView programmatically, you can use code like the following:

::

   Ref<ScrollView> scrollView = new ScrollView;
   scrollView->setWidth(UI::getScreenWidth());
   scrollView->setHeight(UI::getScreenHeight());
   scrollView->setPosition(0, 0);

   Ref<View> contentView = new View;
   contentView->setWidth(UI::getScreenWidth());
   contentView->setHeight(UI::getScreenHeight() * 1.5);
   contentView->setBackgroundColor(Color::Green);

   scrollView->setContentView(contentView);
   addChild(scrollView);

ScrollView is a sub class of :ref:`view`

Scrolling Using Paging Mode
============================

ScrollView supports a paging mode. This mode is used when displaying sequential content. You can specify the paging mode using the paging attribute.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <scroll width="fill"
            height="fill"
            scrolling="horizontal"
            scrollBars="none"
            paging='true'>
            <linear width="wrap"
               height="fill">
               <view name="page1"
                   width="wrap"
                   height="fill"
                   background="#ff0000"/>
               
               <view name="page2"
                   width="wrap"
                   height="fill"
                   background="#00ff00"/>

               <view name="page3"
                   width="wrap"
                   height="fill"
                   background="#0000ff"/>
            </linear>
         </scroll>
      </layout>
   </sapp>

XML attributes
==================

You can check the attributes at View's :ref:`view-attribute`