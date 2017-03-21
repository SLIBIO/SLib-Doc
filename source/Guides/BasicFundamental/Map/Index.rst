
======================
Map Classes
======================

HashMap
========

HashMap class based implementation of the IMap interface.

Hash map uses a hash function to compute an index into an array of slots, from which the desired value can be found. Internally, the elements are not sorted 
in any particular order, but organized into slot. Which slot an element is placed into depends entirely on the hash of its key.

TreeMap
========

TreeMap class based implementation of the IMap interface.

TreeMap is based on Red-Black tree. It provides an efficient means of sorting key/value pairs in sorted order. 
TreeMap class implements Map interface similar to HashMap. The main difference between them is that HashMap is an unordered collection while TreeMap is sorted 
in the ascending order of its keys.

ListMap
========

ListMap class based implementation of the IMap interface.

ListMap is a generic key->value mapping data structure that is designed to be more memory efficient than a HashMap. It keeps its mappings in an array data structure -- 
an integer array of hash codes for each item, and an Object array of the key/value pairs. This allows it to avoid having to create an extra object for every entry 
put into the map, and it also tries to control the growth of the size of these arrays more aggressively.

Map
====

Map<K, V>, internally, contains only Ref<IMap<K, V>> member variable, so it can be used as reference variables in any scope, and also used as function argument and return type.

Adding & Removing Elements
=============================================

You can add and remove elements using put() and remove() methods.

::

   Map<String, String> capitals;
   capitals.put("China", "Beijing");
   capitals.put("Spain", "Madrid");
   capitals.put("United Kingdom", "London");
   capitals.put("United States of America", "Washington, D.C.");
   capitals.remove("Spain");

Reading from a Map
====================

You can use [] operator to access the value for a key. The getValue() method is the other common way to access values.

::

   Map<String, String> capitals;
   capitals.put("China", "Beijing");
   capitals.put("Spain", "Madrid");
   capitals.put("United Kingdom", "London");
   capitals.put("United States of America", "Washington, D.C.");
   
   auto capitalOfSpain = capitals["Spain"];
   String capitalOfChina =  capitals.getValue("China");

Enumerating Maps
=================

Range-based for loop is the most efficient way to enumerate a Map.

::

   Map<String, String> capitals;
   capitals.put("China", "Beijing");
   capitals.put("Spain", "Madrid");
   capitals.put("United Kingdom", "London");
   capitals.put("United States of America", "Washington, D.C.");

   for (String item : capitals) {
      Console::println("%s", item.key);
   }

You can isolate a Map's keys/values with the getAllKeys()/getAllValues() methods.

::

   List<String> keys = capitals.getAllKeys();
   List<String> values = capitals.getAllValues();

Combining Maps
===============

Map object can be expanded by adding the conents of another Map to its collection via the putAll() methods.

::

   Map<String, String> capitals;
   capitals.put("China", "Beijing");
   capitals.put("Japan", "Tokyo");
   capitals.put("Singapore", "Singapore");
   capitals.put("Malaysia", "Kuala Lumpur");

   Map<String, String> others;
   others.put("Spain", "Madrid");
   others.put("United Kingdom", "London");
   others.put("United States of America", "Washington, D.C.");
   others.put("Finland", "Kuala Helsinki");

   capitals.putAll(others);