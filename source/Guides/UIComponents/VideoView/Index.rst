
======================
VideoView
======================

This view displays videos from various sources(such as assets or content providers).

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <video width="fill"
            height="fill"
            src="asset://my_video.mp4"
            repeat="false"/>
      </layout>
   </sapp>


XML attributes
==================

**src**

Specifies the source of the video. It sould be assets file or URL of the video such as "asset://my_video.mp4" and "http:// your url here"

**repeat**

If true, it will play the video repeatedly. May be a boolean value, such as "true" or "false".