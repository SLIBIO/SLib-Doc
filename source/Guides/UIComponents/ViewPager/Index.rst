
======================
ViewPager
======================

ViewPager is a layout manager that allows you to implement gestural navigation. It allows the users to swipe left or right to see an entirely new screen.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <pager width="fill"
            height="fill"
            swipe="true">
            <item>
               <view name="firstPage"
                  width="100%sw"
                  height="100%sh"
                  backgroundColor="red"/>
            </item>
            <item>
               <import layout="SecondPage"
            </item>
            <item>
               <import layout="ThirdPage"
            </item>
         </pager>

      </layout>
   </sapp>

To create a ViewPager programmatically, you can use code like the following:

::

   Ref<ViewPager> pager = new ViewPager;
   Ref<FirstPage> firstPage = new FirstPage;
   pager->addPage(firstPage);
   Ref<SecondPage> secondPage = new SecondPage;
   pager->addPage(secondPage);
   Ref<ThirdPage> thirdPage = new ThirdPage;
   pager->addPage(thirdPage);
   addChild(pager);

Responding to User Interaction
===============================

You can set a callback that will be invoked whenever the page changes.

**Setting Callback Using Lambda Expression**

::

   pager->setOnPageAction([](ViewPager* pager, View* v, UIPageAction action){
      
   });

**Setting CallBack Using Member Function**

::

   pager->setOnPageAction(SLIB_FUNCTION_WEAKREF(MyScreen, onPageAction, this));

XML Attributes
==================

**swipe**

If true, this page allows the users to swipe left or right to see an entirely new screen.

See more details at View's :ref:`view-attribute`

Pages for ViewPager
====================

The <item> tag defines a page in this ViewPager.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <pager width="fill"
            height="fill"
            swipe="true">
            <item>
               <view name="firstPage"
                  width="100%sw"
                  height="100%sh"
                  backgroundColor="red"/>
            </item>
            <item>
               <import layout="SecondPage"
            </item>
            <item selected="true">
               <import layout="ThirdPage"
            </item>
         </pager>

      </layout>
   </sapp>

XML Attributes
---------------

**selected**

If true, this page should be pre-selected. May be a boolean value, such as "true" or "false".