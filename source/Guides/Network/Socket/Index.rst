
======================
Socket
======================
What's a socket?

Sockets are endpoints of a bi-directionnal communication channel.
Sockets can communicate within a process, between processes on the same machine or between different machines.
This class implements client socket and each socket could be endpoint for communication between two machines.

Socket Types
========================

These types are using initialize socket on both client and server. Below shows types of socket.

Tcp
---------
communicate using TCP protocol based on Internet family for IPv4

Udp
---------
communicate using UDP protocol based on Internet family for IPv4

Raw
---------
communicate using Packet-leveled structure based on Internet family for IPv4

TcpIPv6
---------
communicate using TCP protocol based on Internet family for IPv6

UdpIPv6
---------
communicate using UDP protocol based on Internet family for IPv6

RawIPv6
---------
communicate using Packet-leveled structure based on Internet family for IPv6

SocketAddress
========================

SocketAddress indicates client/server's IpAddress (based on IPv4 or IPv6) and port number

ip
----
Ip address should be set by string or IPAddress value directly.

port
-----
port number will be used on both client/server sockets

Functions
========================

openUdp/openTcp(openTcp_IPv6/openUdp_IPv6)
---------------------------------------------
create Udp/Tcp socket based on Ipv4(Ipv6) address

openRaw
------------------
create socket based on raw packet structure

close
---------
close socket connection.

bind(SocketAddress)
---------------------------
Binds the socket to a local address with specific port.

listen
------------------
Listen for connections from socket client.

accept(Ref<Socket>& socket, SocketAddress& address)
------------------------------------------------------
Accept a incoming client connection. Parameters include client socket and client socket information

connect/connectAndWait
---------------------------
Connect the socket to the address of the server

send/receive
------------------
Send and receive data using Tcp protocol

sendTo/receiveFrom
---------------------------
Send and receive data using Udp protocol

setOption/getOption
---------------------------
Set/Get current socket options.
You should set/get socket options using member functions which start with "setOption/getOption"

Usage
====================================

Udp socket server/client example
------------------------------------
.. code-block:: cpp

    // Server-side
    class UdpSample {
        Ref<Socket> m_socketUdp;
        Ref<Thread> m_threadUdp;

        void runUdpReceiver()
        {
            Ref<SocketEvent> ev = SocketEvent::createRead(m_socketUdp);
            String data = "Connection established";
            if (ev.isNull()) {
                return;
            }
            while (!Thread::isStoppingCurrent()) {
                SocketAddress address;
                char bufPacket[PACKET_SIZE];
                sl_int32 n = m_socketUdp->receiveFrom(address, bufPacket, PACKET_SIZE);
                m_socketUdp->sendTo(address, data.getData(), sizeof(data));
            }
        }
    }

    Ref<Socket> socketUdp = Socket::openUdp();
    String portUdp = "3030";
    if (socketUdp.isNotNull()) {
        if (socketUdp->bind(SocketAddress(portUdp))) {
            ret = new UdpSample();
            if (ret.isNotNull()) {
                ret->m_socketUdp = socketUdp;
                ret->m_threadUdp = Thread::start(SLIB_FUNCTION_REF(UdpSample, runUdpReceiver, ret));
                return ret;
            }
        } else {
            logError(String("Can not bind to udp port - ") + param.portUdp);
        }
        socketUdp->close();
    }


    // Client-side
    String data = "Server connected from client";
    Ref<Socket> socket = Socket::openUdp();
    SocketAddress sa;
    sa.ip = "172.20.2.1";
    sa.port = "3030";
    if (socket->connect(sa)) {
        socket->send(data.getData(), sizeof(data));
    }

Tcp socket server/client example
------------------------------------

.. code-block:: cpp

    // Server-side
    Ref<Socket> socket = Socket::openTcp();
    SocketAddress bindAddress;
    bindAddress.port = "3030";
    String data = "Connection established";

    if (socket->bind(bindAddress)) {
        if (socket->listen()) {
            // you should below code using Thread or AsyncIoInstance, Event
            while (Thread::isNotStoppingCurrent()) {
                Ref<Socket> socketAccept;
                SocketAddress addr;
                if (socket->accept(socketAccept, addr)) {
                    socket->send(data.getData(), sizeof(data));
                }
            }
        }
    }

    // Client-side
    String data = "Server connected from client";
    Ref<Socket> socket = Socket::openTcp();
    SocketAddress sa;
    sa.ip = "172.20.2.1";
    sa.port = "3030";
    if (socket->connect(sa)) {
        socket->send(data.getData(), sizeof(data));
    }
