
======================
List Classes
======================

CList
========

CList<T> is a sequence container that encapsulates dynamic size arrays. The elements are stored contiguously, 
which means that elements can be accessed not only through iterators, but also using offsets on regular pointers to elements. This means that a pointer to an element of 
a CList<T> may be passed to any function that expects a pointer to an element of an array.

CList<T> inherited from Referable.

List
======

List<T>, internally, contains only Ref<CList<T>> member variable, so it can be used as reference variables in any scope, and also used as function argument and return type.

::

   List<int> getList()
   {
      List<int> ret;
      // list operations
      …
      return ret;
   }

Creating Arrays
================

You can define an array object using an array of objects of type const T. Another way to create arrays is using createFromElements() method. 
Both the approaches are shown below:

::

   List<String> colors = {"Red", "Green", "Blue", "Yellow", "Orange"};
   List<String> cities = List<String>::createFromElements("New York", "Los Angeles", "Chicago", "Houston", "Philadelphia");

Enumerating Arrays
===================

Enumerating over an array is possible using any of the following two ways:

::

   List<String> cities = {"New York", "Los Angeles", "Chicago", "Houston", "Philadelphia"};

   for (auto& city : cities) {
      Console::println("%s", city);
   }

   for (int i = 0; i < cities.getCount(); i++) {
       Console::println("%s", cities[i]);
   }

Combining Arrays
=================

Arrays can be combined via addAll().

::

   List<String> cities = List<String>::createFromElements("New York", "Los Angeles", "Chicago", "Houston", "Philadelphia");
   List<String> moreCities = List<String>::createFromElements("Phoenix", "San Antonio", "San Diego", "Dallas", "San Jose");

   cities.addAll(moreCities);

Membership Checking
====================

The contains() method returns true if the object is in the array, false otherwise. The indexOf() returns the index of the first occurrence of the 
requested object or -1 if it is not in the array.

::

   List<String> cities = List<String>::createFromElements("New York", "Los Angeles", "Chicago", "Houston", "Philadelphia");

   if (cities.contains("Chicago")) {
      Console::println("Chicago is a city of United States");
   }

   if (cities.contains("HOUSTON", EqualsIgnoreCaseString())) {
      Console::println("HOUSTON is a city of United States");
   }

   int index = cities.indexOf("Chicago");

Sorting Arrays
===============

You can sort an array with the sort() method.

::

   List<String> cities = List<String>::createFromElements("New York", "Los Angeles", "Chicago", "Houston", "Philadelphia");
   
   cities.sort(false);
   for (String& city : cities) {
      Console::println("%s", city);
   }
   // Prints "Chicago", "Houston", "Los Angeles", "New York", "Philadelphia"

   cities.sort(true);
   for (String& city : cities) {
      Console::println("%s", city);
   }
   // Prints "Philadelphia", "New York", "Los Angeles", "Houston", "Chicago"

Thread Safe
===============

Most of CList and List methods are implemented in thread-safe model but if you don't need locking on this List<T> object, you can use lock-free operations (ending with _NoLock) for the performance optimization.

::

   List<int> getList()
   {
      List<int> ret; // the object is only used in single thread before returning, so we can use lock-free operations for performace optimization
      for (sl_uint32 i = 0; i < 10; i++) {
         ret.add_NoLock(i); // add_NoLock() is lock-free version of add()
      }
      return ret;
   }