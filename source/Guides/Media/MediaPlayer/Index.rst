
======================
Media Player
======================

MediaPlayer can be used to playback audio/video files.

MediaPlayerParam
======================

* url/filePath/assetFileName
    Media file url path for play

* flagVideo
    Video type status of a media file

* onReadyToPlay/listener
    Callback on MediaPlayer ready to start playing

* flagAutoRepeat
    Repeat status of playing media file

* flagAutoStart
    Auto start playing status, if this value set as FALSE, **resume** function must be called to play media file

Functions
======================

* create/openUrl/openFile/openAsset
    Initialize MediaPlayer with specific a media file.

* pause/resume/release
    Pause/Resume/Release MediaPlayer

* renderVideo(MediaPlayerRenderVideoParam&)
    Retrieve current playing video frame from media player.

Example
======================