
======================
Variant Classes
======================

Variant
========

Variant object can contain various data type. Sometimes it is necessary to manipulate data whose type varies. In this case, you can use Variant Class.

Variant object can be constructed from int, unsigned int, long long, unsigned long long, float, double, bool, char*, void*, 
unsigned short*, String, Time, List, Map and references(Strong and Weak).

Example:
---------

The follwing code shows the use of Variant objects.

::

   Variant v1 = 100;
   Variant v2 = 3.141592;
   Console::println("%s,%s", v1, v2);

   Variant v3 = "123.4567";
   float v4 = v3.getFloat();

VariantList
============

It is same as List<Variant>.

Example:
---------

::

   VariantList v = {"SLib.io is so great!", 100 , 3.141592, "100"};

   for (Variant item : v) {
      Console::println("%s", item);
   }

VariantMap
===========

It is same as Map<String, Variant>.

Example:
---------

::

   VariantMap v = {{100, "item1"}, {"SLib.io is so great!", "item2"}, {3.141592, "item3"}};
   for (auto item : v) {
      Console::println("%s:%s", item.key, item.value);
   }

VariantMapList
===============

It is same as List < Map<String, Variant> >.

Example:
---------

::

   VariantMapList v = {{{100, "item1"}, {"SLib.io is so great!", "item2"}, {3.141592, "item3"}}, {{"Washington, D.C.", "item4"}, {"London", "item5"}, {"Madrid", "item6"}}};
   for (auto items : v) {
      for (auto item : items) {
         Console::println("%s:%s", item.key, item.value);
      }
   }