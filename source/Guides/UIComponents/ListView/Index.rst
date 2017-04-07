
======================
ListView
======================

ListView is a view that displays a list of scrollable items. The items come from the ListAdapter associated with this ListView.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <list name="list"
            width="fill"
            height="fill"
            item="listItem"
            scrollBars="none"/>
      </layout>

      <layout type="view"
         name="listItem"
         width="fill"
         height="20%sh"
         background="red">
         <label name="label"
            width="wrap"
            height="wrap"
            text="Hello World!"
            alignCenter="true"/>
      </layout>
   </sapp>

Building Adapter
=================

An adapter manages the data model and adapts it to the individual entries. Every item in the ListView displaying the data consists of a layout which can be as complex as you want.

A layout file for such a line might look like the following.

::

   <sapp version="1.0">
      <layout type="view"
         name="listItem"
         width="fill"
         height="20%sh"
         background="red">
         <label name="label"
            width="wrap"
            height="wrap"
            text="Hello World!"
            alignCenter="true"/>
      </layout>
   </sapp>

The adapter would inflate the layout for each row in its getView() method and assign the data to the individual views in the row.

::

   class MylistAdapter: public Referable, public IListViewAdapter
   {
   public:
      sl_uint64 getItemsCount(ListView* lv)
      {
         return 10;
      }

      Ref<View> getView(ListView*lv, sl_uint64 index, View* original)
      {
         Ref<View> view = new ui::listItem;
         return view;
      }
   }


You can specify the layout for a row in Adapter.

::

   class MyListAdapter: public Referable, public IListViewAdapter<ui::listItem>
   {
   public:
      sl_uint64 getItemsCount(ListView* lv) {
         return 10;
      }

      void onBindView(ListView* lv, sl_uint64 index, ui::listItem* view)
      {
      }
   }

The adapter is assigned to the ListView via the setAdapter() method.

::

   Ref<MyListAdapter> adapter = new MyListAdapter;
   list->setAdapter(adapter);

XML Attributes
=================

**item**

Specifies the layout for a row in this ListView.