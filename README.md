# jQuery Simple Form Validation

A Simple jQuery Plugin for Form Validation

SimpleValidation is a javascript form validation library.If you need to do some client side validation , simpleValidation is the best one.

Here the steps to configure...

**Step 1 :**
Download and link to the Jquery plugin

**Step 2 :**
	Download and link to the Jquery simpleValidation plugin

**Step 3 :**
	Add data attributes to the fields
	```
	<input type="text" data-sfv-required="yes" class="form-control" id="inputfirstname">
	```
**Step 4:**

	Fire the jQuery simpleValidation Plugin 
	```
	$(document).ready(function(){
	   $("#formid").simpleValidation();
	});
	```
