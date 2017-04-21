
======================
WebView
======================

A view that displays web pages.


Loading a URL to WebView
===============================

You can load external webpage inside WebView in two ways.

You can specify the url in XML as the following:

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <web name="webView"
            width="fill"
            height="fill"
            url="http://www.slib.io"/>

      </layout>
   </sapp>

You can set the url in code as the following:

::

   webView->loadURL("http://www.slib.io");

Loading Local HTML to WebView
==============================

You can load the local html inside WebView in two ways.

Setting the local html in XML:

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">

         <web name="webView"
            width="fill"
            height="fill"
            html="@string/myHTML"/>

      </layout>

      <string name="myHTML"><![CDATA[
            <div style="color:#0000FF">
               <h3>This is a heading</h3>
               <p>This is a paragraph.</p>
            </div>
         ]]></string>
   </sapp>

Setting the local html in code:

::

   webView->loadHTML(string::myHTML, "http://localhost/myPage");

XML Attributes
==================

**url**

Specifies the url of a webpage. May be a string.

**html**

Specifies the local HTML. May be a string.

See more details at View's :ref:`view-attribute`