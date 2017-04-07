
======================
URLRequest
======================

You can use UrlRequest to create asynchronous/synchronous requests on the web and get the result when the request is completed.

Usage
============

::

    Ref<UrlRequest> send(const UrlRequestParam& param);

Parameters
============

UrlRequestParam contain many fields showing as below.

url
---------
url string to call

method
---------
The HTTP method to use. Object type is HttpMethod and it should be one of GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE

parameters
--------------
Data to sent in the request

requestHeaders
--------------
Custom headers to add to the request. Default headers will be overwritten with the new values.

additionalRequestHeaders
------------------------
Custom headers to add to the request. Call doesn't overwritten default header values.

requestBody
-------------
Data to sent in the request. This parameter object is memory type.

downloadFilePath
-------------------
If set, the result of the UrlRequest will be written to this path instead of in memory

listener
------------
Callback functions object
This listener object have onComplete, onResponse, onReceiveContent, onDownloadContent, onUploadBody callback functions.

onComplete
---------------
Callback function to call when the request has sent successfully,

onReceiveContent
------------------
Callback function to call when the result has been fetched,

dispatcher
----------------
dispatcher instance.


Other Usage
============
Besides you can use UrlRequest using separate parameters instead of UrlRequestParam.

.. code-block:: cpp

    Ref<UrlRequest> send(url, onComplete);
    Ref<UrlRequest> send(url, onComplete, dispatcher);
    Ref<UrlRequest> send(url, params, onComplete);
    Ref<UrlRequest> send(url, params, onComplete, dispatcher);
    Ref<UrlRequest> send(method, url, onComplete);
    Ref<UrlRequest> send(method, url, onComplete, dispatcher);
    Ref<UrlRequest> send(method, url, params, body, onComplete);
    Ref<UrlRequest> send(method, url, params, body, onComplete, dispatcher);
    Ref<UrlRequest> sendJson(method, url, params, json, onComplete);
    Ref<UrlRequest> sendJson(method, url, params, json, onComplete, dispatcher);
    Ref<UrlRequest> post(url, body, onComplete);
    Ref<UrlRequest> post(url, body, onComplete, dispatcher);
    Ref<UrlRequest> post(url, params, body, onComplete);
    Ref<UrlRequest> post(url, params, body, onComplete, dispatcher);
    Ref<UrlRequest> postJson(url, json, onComplete);
    Ref<UrlRequest> postJson(url, json, onComplete, dispatcher);
    Ref<UrlRequest> postJson(url, params, json, onComplete);
    Ref<UrlRequest> postJson(url, params, json, onComplete, dispatcher);
    Ref<UrlRequest> sendSynchronous(url);
    Ref<UrlRequest> sendSynchronous(url, params);
    Ref<UrlRequest> sendSynchronous(method, url);
    Ref<UrlRequest> sendSynchronous(method, url, params, body);
    Ref<UrlRequest> sendJsonSynchronous(method, url, params, json);
    Ref<UrlRequest> postSynchronous(url, body);
    Ref<UrlRequest> postSynchronous(url, params, body);
    Ref<UrlRequest> postJsonSynchronous(url, json);
    Ref<UrlRequest> postJsonSynchronous(url, params, json);

Example
============

.. code-block:: cpp

    UrlRequestParam rp;
    Map<String, String> headerParams;
    headerParams.put("Authorization", "Test");
    headerParams.put("Content-Type", "application/json");
    VariantMap params;
    params.put("field1", "test1");
    params.put("field1", "test2");
    rp.url = "http://test.server.com/api";
    rp.method = HttpMethod::POST;
    rp.requestHeaders = getHeaderParam();
    rp.requestBody = Json(params).toJsonString().toMemory();
    rp.onComplete = [this, callback](UrlRequest * request) {
        if (!(request->isError())) {
            // request sent successfully
        } else {
            // error occurs
        }
    };
    UrlRequest::send(rp);
