
======================
ProgressBar
======================

A view that represents the progress of a task.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <progress width="10%sw"
            height="3%sw"
            max="100"
            value="20"/>
      </layout>
   </sapp>


To create a PickerView programmatically, you can use code like the following:

::

   Ref<ProgressBar> progressBar = new ProgressBar;
   progressBar->setWidth(200);
   progressBar->setHeight(50);
   progressBar->setMaximumValue(100);
   progressBar->setValue(20);
   addChild(progressBar);

XML attributes
==================

**orientation**

Specifies the orientation of this ProgressBar. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
horizontal     The ProgressBar places content horizontally.
vertical       The ProgressBar places content vertically.
============== =================================================================================================================================

**min**

Sets the minimum value of this ProgressBar. May be a float value.

**max**

Sets the maximum value of this ProgressBar. May be a float value.

**range**

Specifies the range of this ProgressBar. May be a float value.

**value**

Specifies the value of the primary progress. May be a float value.

**value2**

Specifies the value of the secondary progress. May be a float value.

**dual**

If true, the secondary progress will be shown. May be a boolean value, such as "true" or "false".

**discrete**

If true, the value of progress will be a multiple of the step. May be a boolean value, such as "true" or "false".

**step**

Sets the value of the step of the progresses. May be a float value.

**reversed**

If true, switchs the position of the progresses. May be a boolean value, such as "true" or "false".

**track**

Sets a drawable of the track. May be a drawable.

**progress**

Sets a drawable of the first progress. May be a drawable.

**progress2**

Sets a drawable of the second progress. May be a drawable.