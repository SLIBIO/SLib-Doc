.. _slib_basic_string:

======================
String Classes
======================


String
=======

String class provides an extensive set of APIs for working with UTF-8 strings, including method for comparing, searching, and other string operations. Behind the scenes, String uses implicit sharing (copy-on-write) to reduce memory usage and to avoid the needless copying of data.

It can be encoded and decoded to and from UTF-8, UTF-16, UTF-32.

String16
=========

String16 class is working with UTF-16 strings. All member functions are smiliar with String class.

Creating and Formatting the String
===================================

The most common and the one you are likely to be using is String::format()

::

   String name = "Johne"
   String message = String::format("Hello, %s!, You have %d new messages.", name, 20);

String formatting is smiliar with Java Formatter. Take a look at the Java documentation on `java.util.Formatter
<https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html>`_

You can also get the length of a string which can be obtained using getLength() method:

::

   String str = "SLib.io is so great!"
   int length = str.getLength();

Comparing Strings
==================

You can compare strings using equals() and compare() methods or comparison operators.

::

   String str = "SLib.io is so great!"

   if (!str.equals("SLib.io is so fantastic!")) {
      Console::println("No, They aren't both equal");
   }

   if (str == "SLib.io is so great!") {
      Console::println("Yes, They are both equal");
   }

   if (str > "SLib.io is so fantastic!" || str < "SLib.io is so fantastic!") {
      Console::println("No, They aren't both equal");
   }

   if (str.compare("SLib.io is so great!") == 0) {
      Console::println("Yes, They are both equal");
   }

Combining Strings
==================

You can combine strings using Concatenation operator.

::

   String str1 = "SLib.io"
   String16 str2 = "はとても素晴らしいです！"
   String str3 = str1 + str2;
   Console::println(str3);
   str1 += str2;
   Console::println(str1);

Searching Strings
==================

You can use indexOf() method to find out whether a substring exists.

::

   String str = "SLib.io is so great!"
   int index = str.indexOf("great");
   if (index < 0) {
      Console::println("Search string was not found");
   } else {
      Console::println("'great' starts at index %d", index);
   }

Splitting Strings into an Array
===============================

You can use a method called split() to achieve this:

::

   String str = "SLib.io is so great!";
   List<String> words = str.split(" ");

   for (String& word: words) {
      Console::println(word);
   }

You can use :aspect:`auto` specifier instead of List<String>:

::

   String str = "SLib.io is so great!";
   auto words = str.split(" ");

   for (auto& word: words) {
      Console::println(word);
   }

Replacing Substrings
=====================

You can use replaceAll() method.

::

   String str = "SLib.io is so great!";
   String str1 = str.replaceAll("great", "fantastic");

Changing Case
==============

String classes provide a few convenient methods for changing the case of a string. This can be used to normalize user submitted values.

::

   String str1= "hElLo wOrLD"
   Console::println("%s, %s", str1.toUpper(), str1.toLower());
   // Prints: HELLO WORLD, hello world

Numerical Conversions
======================

String classes define several conversion methods for interpreting strings as primitive values.

::

   String age = "25"
   int value1 = str1.parseInt();

   String hexString = "0f0c0d0b0ffff"
   long long value2 = hexString.parseInt64(16);