
======================
Audio
======================


AudioData
======================

* count
    Audio data size

* format
    Audio bit format information and should be one of Int8(Uint8/Int16/Uint16/Float)_Mono(Stereo/Stereo_NonInterleaved)

* data
    Audio sample data

* data1
    Audio sample additional data for non-interleaved formats

Recording Audio
======================

AudioRecorderParam
--------------------

* deviceId
    Audio device id which will be used on recording audio

* samplesPerSecond
    Samples per second(unit type: hz) of recording audio

* channelsCount
    Channel count of recording audio (Mono: 1 or stereo: 2)

* frameLengthInMilliseconds
    Frame buffer size of recording audio

* bufferLengthInMilliseconds
    Total buffer of recording audio.

* listener/onRecordAudio
    Callback on recording audio

Functions
--------------------

* create(AudioRecorderParam &)
    Initialize recording device with recording parameters

* start
    Start recording audio

* stop
    stop recording audio

* read(AudioData&)
    Read recording audio data in specific data format

Example
--------------------

.. code-block:: cpp

    class AudioSample {
        Ref<AudioRecorder> m_recorder;
        Ref<Thread> m_threadUdp;
        void onRecordAudio()
        {
            sl_uint32 n = 1000;
            Memory mem = Memory::create(n * 2);
            AudioData data;
            data.format = AudioFormat::Int16_Stereo;
            data.data = mem.getData();
            data.count = n;
            while (!Thread::isStoppingCurrent()) {
                if (m_recorder->read(data)) {
                }
            }
        }
    }
    AudioRecordSourceParam param;
    param.channelsCount = 2;
    param.samplesPerSecond = 8000;
    param.frameLengthInMilliseconds = 50;
    param.bufferLengthInMilliseconds = 1024;

    Ref<Event> ev = Event::create();
    param.event = ev;
    Ref<AudioRecorder> recorder = AudioRecorder::create(param);
    if (recorder.isNotNull()) {
        Ref<AudioSample> ret = new AudioSample();
        if (ret.isNotNull()) {
            ret->m_recorder = recorder;
            ret->m_thread = Thread::start(SLIB_FUNCTION_REF(UdpSample, onRecordAudio, ret));
            return ret;
        }
        recorder->release();
    }

Playing Audio
======================

AudioPlayerParam
-----------------------

* deviceId
    Audio device id which will be used on playing audio

AudioPlayerBuffer
-----------------------

AudioPlayerBuffer has loopQueue list object and will be used for storing, processing, playing audio.

* write
    Write audio data into buffer for playing

AudioPlayerBufferParam
-----------------------

Buffer additional information that will be played on audio player

* samplesPerSecond
    Samples per second(unit type: hz) of recording audio

* channelsCount
    Channel count of recording audio (Mono: 1 or stereo: 2)

* frameLengthInMilliseconds
    Frame buffer size of recording audio

* bufferLengthInMilliseconds
    Total buffer of recording audio.

* listener/onRequireAudioData
    Callback on requiring audio data, will be called once all buffer has been proceed.

Example
--------------------
.. code-block:: cpp

    AudioPlayerParam param;
    param.channelsCount = 2;
    param.samplesPerSecond = 8000;
    param.frameLengthInMilliseconds = 50;
    param.bufferLengthInMilliseconds = 1024;

    Ref<AudioPlayer> player = AudioPlayer::create(param);
    m_playerBuffer = player->createBuffer(audioParam);

    ....

    void playAudio(AudioData data)
    {
        m_playerBuffer->write(data);
    }