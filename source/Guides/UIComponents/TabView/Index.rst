
======================
TabView
======================

A view that allows the user to select one of multiple stacked views.

::

   <sapp version="1.0">
      <layout type="page"
         name="MyPage">
         <tab
		width='90%'
		height='70%'
		orientation='horizontal'
		tabWidth='10%sw'
		tabHeight='3.5%sw'
		backgroundColor='none'
		barBackground='@drawable/ui_tab_bar_back, horizontal-three-patch(1.5%sw, 1.5%sw, 30, 30)'
		tabBackground='@drawable/ui_tab_normal'
		selectedTabBackground='@drawable/ui_tab_selected'
		hoverTabBackground='@drawable/ui_tab_normal'
		contentBackground='@drawable/ui_tab_back, nine-patch(4%sw, 4%sw, 4%sw, 4%sw, 100, 100, 100, 100)'
		labelColor='white'
		selectedLabelColor='white'
		hoverLabelColor='red'
		padding='3%sw'
		fontSize='1.5%sw'
		labelAlign='top|center'
		labelMarginTop='1.5%sw'/>
      </layout>
   </sapp>

Responding to to User Interactions
===================================

You can respond to select item in two ways.
   
**Setting Callback using Lambda Expression**

::

   tab->setOnSelectTab([](TabView* tabView, sl_uint32 index){

   });

**Setting CallBack using member function**

::

   tab->setOnSelectTab(SLIB_FUNCTION_WEAKREF(MyScreen, onSelectTab, this));

XML attributes
==================

**orientation**

Specifies the orientation for the tabs.

**tabWidth**

Specifies the width of a tab. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**tabHeight**

Sepcifies the height of a tab. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**barBackground**

Specifies the background of the tab bar. May be a drawable.

**contentBackground**

Specifies the background of this TabView. May be a drawable.

**tabBackground**

Specifies the background of a tab. May be a drawable.

**selectedTabBackground**

Specifies the background of a selected tab. May be a drawable.

**hoverTabBackground**

Specifies the hover background of a tab. May be a drawable.

**labelColor**

Specifies the color of the title of a tab. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**selectedLabelColor**

Specifies the color of the title of a selected tab. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**hoverLabelColor**

Specifies the color of the hover title of a tab. The values that can be set, are hexadecimal strings and colors, such as "#c8c8c8", "red", "rgb(255, 200, 200)" and "rgba(200, 200, 200, 200)"

**labelAlign**

Specifies the align of the title of a tab. Must be one of the following constant values.

============== =================================================================================================================================
Constant       Description
============== =================================================================================================================================
center         Place the title to the center of this tab in both the vertical and horizontal axis, not changing its size.
left           Push the title to the left of this tab, not changing its size.
right          Push the title to the right of this tab, not changing its size.
middle         Place the title in the middle of this tab, not changing its size.
top            Push the titleto the top of this tab, not changing its size.
bottom         Push the title to the bottom of this tab, not changing its size.
top|center     You can combine multiple values of the above constants.
============== =================================================================================================================================

**labelMarginLeft**

Specifies extra space on the left side of the title. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**labelMarginTop**

Specifies extra space on the top side of the title. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**labelMarginRight**

Specifies extra space on the right side of the title. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.

**labelMarginBottom**

Specifies extra space on the bottom side of the title. Avaiable units and constants are: fill, wrap, px, sw, sh, smin, smax, vw, vh, vmin, vmax, sp.