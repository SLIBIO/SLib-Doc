
======================
Camera
======================

Functions
======================

* create(CameraParam &)
    Initialize recording video device with specific parameters

* start
    Start recording video

* stop
    Stop recording video

* getCamerasList
    Retrieve list camera devices of current device

* takePhoto(filePath: optional, onComplete)
    Take photo from camera. Callback onComplete function will pass captured Image Object

Recording video from camera
======================

CameraParam
--------------------

* deviceId
    Camera device id which will be used on recording video. should be one of "FRONT" or "BACK" value

* preferedFrameWidth/preferedFrameHeight
    Recording video width/height

* preferedFrameFormat
    Output format type of recording video and it should be one of RGB color formats or YUVA color formats.

VideoCaptureFrame/VideoFrame
-----------------------------

* image
    Bitmap image of a video frame

* rotation
    Rotation value of bitmap image
* flip
    Flip value of bitmap image

Example
--------------------

You should use CameraView directly for preview camera device

* Recording video from camera

    .. code-block:: cpp

        // Recording Video
        class CameraCallback public IVideoCaptureListener {
            void onCaptureVideoFrame(VideoCapture* capture, VideoCaptureFrame* frame) {
                // process video frame data
            }
        }
        CameraParam param;
        param.preferedFrameWidth = param.preferedFrameHeight = 512;
        param.preferedFrameFormat = BitmapFormat::RGBA;
        param.listener = (WeakRef<CameraCallback>)(this);
        Ref<Camera> m_camera = Camera::create(param);

* Rendering video

    You should use CameraView directly or using VideoView and pass video frame data into VideoView to render preview frame.

    .. code-block:: cpp

        // Rendering video frame into VideoView
        void onCaptureVideoFrame(VideoCapture* capture, VideoFrame* frame) {
            m_videoView->updateCurrentFrame(frame);
        }

* Take photo from camera

    .. code-block:: cpp

        Camera::takePhoto([this](TakePhoto* photo){
            Image image = photo->getImage(250, 250);
        });