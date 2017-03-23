:template: sitemap.html

.. _slib_basic_arc:

=============================
Automatic Reference Counting
=============================

In C++ objects are allocated off the heap via new and freed via delete.
The most innovative technology is the implementation of Automatic Reference Counting in C++.

How ARC Works
=============

Every time you create a new instance of a class, ARC allocates a chunk of memory to 
store information about that instance. This memory holds information about the type of the instance, 
together with the values of any stored variables associated with that instance.

Additionally, when an instance is no longer needed, ARC frees up the memory used by that instance so that 
the memory can be used for other purposes instead. This ensures that class instances do not take up space in memory when they are no longer needed.

However, if ARC were to deallocate an instance that was still in use, it would no longer be possible 
to access that instance’s variables, or call that instance’s methods. Indeed, if you tried to access the instance, your app would most likely crash.

To make sure that instances don’t disappear while they are still needed, ARC tracks how many variables are currently referring to each class instance. ARC will not deallocate an instance as long as at least 
one active reference to that instance still exists.

To make this possible, whenever you assign a class instance to a variable, that variable makes a strong reference to the instance. The reference is called a “strong” reference because it keeps a firm hold on 
that instance, and does not allow it to be deallocated for as long as that strong reference remains.



ARC in Action
=============

Here is an example of how Automatic Reference Counting works. This example starts with a simple 
class called Person, which defines a variable called name:

.. code-block:: cpp

   class Person: public Referable
   {
   public:
      Person(String name):name(name)
      {
         Console::println("%s is being allocated", name);
      }
      ~Person()
      {
         Console::println("%s is being deallocated", name);
      }

   public:
      String name;
   };

The Person class has a structor that sets the instance's name and destructor that 
prints message when an instance of the class is deallocated.

The next code snippet defines threee variables of type Person, which are used to set up multiple 
references to a new Person instance.

.. code-block:: cpp

   Ref<Person> reference1;
   Ref<Person> reference2;
   Ref<Person> reference3;

You can now create a new Person instance and assign it to one of these three variables:

.. code-block:: cpp

   reference1 = new Person("Alex");
   // Prints "Alex is being allocated"

Note that the message "Alex is being allocated" is printed at the point that you call the 
Person class's structor.

Because there is at least one strong reference, ARC makes sure that this Person is kept in memory 
and is not deallocated.

If you assign the same Person instance to two more variables, two more strong references to that 
instance are established:

.. code-block:: cpp

   reference2 = reference1;
   reference3 = reference1;

There are now three strong references to this single Person instance.

If you break two of these strong references by assigning nullptr to two of the variables, 
a single strong reference remains, and the Person instance is not deallocated:

::

   reference1 = nullptr;
   reference2 = nullptr;

ARC does not deallocate the Person instance until the third and final strong reference is broken, 
at which point it is clear that you are no longer using the Person instance:

.. code-block:: cpp

   reference3 = nullptr;
   // Prints "Alex is being deallocated"

Strong reference variable is automatically broken when it’s life ends.

Example:

.. code-block:: cpp

   void test_strong_ref1()
   {
      do {
         Ref<Person> person = new Person(“Alex”);
         // Prints "Alex is being allocated"
      } while (false);
      // Prints "Alex is being deallocated"
   }

You can also use reference types as the return type of the functions.

Example:

.. code-block:: cpp

   Ref<Person> createPerson(String name)
   {
      if (name.isNotEmpty()) {
         return new Person(name);
         // Prints "Alex is being allocated"
      } else {
         return nullptr;
      }
   }

   void test_strong_ref2()
   {
      Ref<Person> man;
      do {
         Ref<Person> person = createPerson(“Alex”);
         if (person != nullptr) {
            man = person;
         }
      } while (false);
      man = nullptr;
      // Prints "Alex is being deallocated”
   }

Strong Reference Cycles Between Class Instances
================================================

In the examples above, ARC is able to track the number of references to the new Person instance you create and 
to deallocate that Person instance when it is no longer needed.

However, it is possible to write code in which an instance of a class never gets to a point where it has zero strong references. 
This can happen if two class instances hold a strong reference to each other, such that each instance keeps the other alive. 
This is known as a strong reference cycle.

You resolve strong reference cycles by defining some of the relationships between classes as weak or pointer instead of as strong references. 
This process is described in :ref:`Resolving Strong Reference Cycles Between Class Instances <resolving_strong_reference_cycles>`. However, before you learn how to resolve a strong reference cycle, 
it is useful to understand how such a cycle is caused.

Here’s an example of how a strong reference cycle can be created by accident. This example defines 
two classes called Person and Apartment, which model a block of apartments and its residents:

.. code-block:: cpp

   class Apartment: public Referable
   {
   public:
      Apartment(String unit): unit(unit)
      {
      }
	
      ~Apartment()
      {
         Console::println("Apartment %s is being deleted", unit);
      }
	
   public:
      String unit;
      Ref<Person> tenant;
   };

   class Person: public Referable
   {
   public:
      Person(String name):name(name)
      {	
      }

      ~Person()
      {
         Console::println("%s is being deleted", name);
      }
   public:
      String name;
      Ref<Apartment> apartment;
   };

Every Person instance has a name variable and an apartment variable.

Similarly, every Apartment instance has a unit variable and has an tenant variable. 
Both of these classes also define a destructor, which prints the fact that an instance of that class is being deallocated. 
This enables you to see whether instances of Person and Apartment are being deallocated as expected.

This next code snippet defines two variables called john and unit4A, which will be set to a specific Apartment and Person instance below.

.. code-block:: cpp

   Ref<Person> john;
   Ref<Apartment> unit4A;

You can now create a specific Person instance and Apartment instance and assign these new instances to the john and unit4A variables:

.. code-block:: cpp

   john = new Person("John");
   unit4A = new Apartment("4A");

Here’s how the strong references look after creating and assigning these two instances. 
The john variable now has a strong reference to the new Person instance, and the unit4A variable 
has a strong reference to the new Apartment instance:

.. figure:: /Images/strong_reference_cycling.png

You can now link the two instances together so that the person has an apartment, and the apartment has a tenant.

.. code-block:: cpp

   john->apartment = unit4A;
   unit4A->tenant = john;

Here’s how the strong references look after you link the two instances together:

.. figure:: /Images/strong_reference_cycling2.png

Unfortunately, linking these two instances creates a strong reference cycle between them. 
The Person instance now has a strong reference to the Apartment instance, and the Apartment instance has a strong reference 
to the Person instance. Therefore, when you break the strong references held by the john and unit4A variables, 
the reference counts do not drop to zero, and the instances are not deallocated by ARC:

.. code-block:: cpp

    john = nullptr;
    unit4A = nullptr;

Note that neither deinitializer was called when you set these two variables to nullptr. 
The strong reference cycle prevents the Person and Apartment instances from ever being deallocated, causing a memory leak in your app.

Here’s how the strong references look after you set the john and unit4A variables to nullptr:

.. figure:: /Images/strong_reference_cycling3.png

The strong references between the Person instance and the Apartment instance remain and cannot be broken.

.. _resolving_strong_reference_cycles:

Resolving Strong Reference Cycles Between Class Instances
=========================================================

SLib.io provides two ways to resolve strong reference cycles when you work with variables of class type: weak references and pointers.

Weak reference and pointer enable one instance in a reference cycle to refer to the other instance without keeping a strong hold on it. 
The instances can then refer to each other without creating a strong reference cycle.

Use a weak reference when the other instance has a shorter lifetime—that is, when the other instance can be deallocated first. 
In the Apartment example above, it is appropriate for an apartment to be able to have no tenant at some point in its lifetime, 
and so a weak reference is an appropriate way to break the reference cycle in this case.
In contrast, use an pointer when the other instance has the same lifetime or a longer lifetime.

Weak references
---------------

A weak reference is a reference that does not keep a strong hold on the instance it refers to, and so does not stop ARC from disposing of the referenced instance. 
This behavior prevents the reference from becoming part of a strong reference cycle. 

Because a weak reference does not keep a strong hold on the instance it refers to, it is possible for that instance to be deallocated 
while the weak reference is still referring to it. Therefore, ARC automatically sets a weak reference to nullptr when the instance that it refers to is deallocated.
And, because weak references need to allow their value to be changed to nullptr at runtime.

The example below is identical to the Person and Apartment example from above, with one important difference. 
This time around, the Apartment type’s tenant is declared as a weak reference:

.. code-block:: cpp

   class Apartment: public Referable
   {
   public:
      Apartment(String unit): unit(unit)
      {
      }
	
      ~Apartment()
      {
         Console::println("Apartment %s is being deleted", unit);
      }
	
   public:
      String unit;
      WeakRef<Person> tenant;
   };

   class Person: public Referable
   {
   public:
      Person(String name):name(name)
      {	
      }

      ~Person()
      {
         Console::println("%s is being deleted", name);
      }
   public:
      String name;
      Ref<Apartment> apartment;
   };

The strong references from the two variables (john and unit4A) and the links between the two instances are created as before:

.. code-block:: cpp

   Ref<Person> john;
   Ref<Apartment> unit4A;

   john = new Person("John");
   unit4A = new Apartment("4A");

   john->apartment = unit4A;
   unit4A->tenant = john;

Here’s how the references look now that you’ve linked the two instances together:

.. figure:: /Images/weak_reference.png

The Person instance still has a strong reference to the Apartment instance, but the Apartment instance now has a weak reference 
to the Person instance. This means that when you break the strong reference held by the john variable by setting it to null, 
there are no more strong references to the Person instance:

.. code-block:: cpp

   john = nullptr;
   // Prints "John is being deleted"

Because there are no more strong references to the Person instance, it is deallocated and the tenant variable is set to null:

.. figure:: /Images/weak_reference2.png

The only remaining strong reference to the Apartment instance is from the unit4A variable. 
If you break that strong reference, there are no more strong references to the Apartment instance:

.. code-block:: cpp

   unit4A = nullptr;
 // Prints "Apartment 4A is being deleted"

Because there are no more strong references to the Apartment instance, it too is deallocated:

.. figure:: /Images/weak_reference3.png

Pointer
------------------

The following example defines two classes, Customer and CreditCard, which model a bank customer and 
a possible credit card for that customer. These two classes each store an instance of the other class as a variable. 
This relationship has the potential to create a strong reference cycle.

The relationship between Customer and CreditCard is slightly different from the relationship between Apartment and 
Person seen in the weak reference example above. In this data model, a customer may or may not have a credit card, 
but a credit card will always be associated with a customer. A CreditCard instance never outlives the Customer that it refers to. 
To represent this, the Customer class has a card variable, but the CreditCard class has 
a pointer of Customer instance.

Furthermore, a new CreditCard instance can only be created by passing a number value and a customer instance to a custom CreditCard constructor. 
This ensures that a CreditCard instance always has a customer instance associated with it when the CreditCard instance is created.

.. code-block:: cpp

   class CreditCard: public Referable
   {
   public:
      CreditCard(String number, Customer* customer): number(number), customer(customer)
      {
      }
	
      ~CreditCard()
      {
         Console::println("Card #%s is being deleted", number);
      }
   public:
      String number;
      Customer* customer;
   };

   class Customer: public Referable
   {
   public:
      Customer(String name, String number):name(name)
      {
          card = new CreditCard(number, this);
      }
	
      ~Customer()
      {
         Console::println("%s is being deleted", name);
      }
   public:
      String name;
      Ref<CreditCard> card;
   };

This next code snippet defines a Customer variable called john, which will be used to store a reference to a specific customer.

.. code-block:: cpp

   Ref<Customer> john;

You can now create a Customer instance, and use it to initialize and assign a new CreditCard instance as that customer’s card variable:

.. code-block:: cpp

    john = new Customer("John", "1234_5678_9012_3456");

The Customer instance now has a strong reference to the CreditCard instance, 
and the CreditCard instance has a pointer to the Customer instance.

Because there are no more strong references to the Customer instance, 
it is deallocated. After this happens, there are no more strong references to the CreditCard instance, and it too is deallocated:

.. code-block:: cpp

   john = nullptr;
   // Prints "John is being deleted"
   // Prints "Card #1234_5678_9012_3456 is being deleted"