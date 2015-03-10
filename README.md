# jQuery Simple Form Validation

A Simple jQuery Plugin for Form Validation

SimpleValidation is a simplified jquery plugin to achieve client side form validation.

It provides a consolidated validation for all types of forms with lesser lines of code. Download this plugin validation now for an Abridged yet wholesome Form validation jquery

Here the steps to configure...

**Step 1 :** Download and link to the Jquery plugin

**Step 2 :** Download and link to the Jquery simpleValidation plugin

**Step 3 :** Add data attributes to the fields
```HTML
	<input type="text" data-sfv-required="yes" class="form-control" id="inputfirstname">
```
**Step 4:** Fire the jQuery simpleValidation Plugin 
```javascript
$(document).ready(function(){
   $("#formid").simpleValidation();
});
```

##Data attributes

 * **data-sfv-required="yes"**
 
 To make the field mandatory.
	
 * **data-sfv-validation**
  * data-sfv-validation="**email**"  : To validate email (*eg : abc@sample.com*)
  * data-sfv-validation="**alpha**"  : To validate alphabetic (*eg : abcdef*)
  * data-sfv-validation="**number**" : To validate number (*eg : 12345*)
  * data-sfv-validation="**alphanumeric**" : To validate alphanumeric (*eg : abc123*)
 * **data-sfv-require-errorMsg**
 
 To add Required error message for a particular field.
 
 *Example :  data-sfv-require-errorMsg="Please Enter First Name"*
 * **data-sfv-regex**
 
 To validate particular field by your own regular expression.
 
 *Example : data-sfv-regEx="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"*
 
 * **data-sfv-regEx-errorMsg**
 
 To add Regular expression mismatch error message for a particular field.
 
 *Example 1: data-sfv-regEx-errorMsg="Please enter valid phone number ex:+99(99)9999-9999"*
 
 *Example 2 (for email,alpha,number,alphanumeric) : data-sfv-regEx-errorMsg="Please enter valid email Id(or)Please enter only number(or)text(or)alpanumeric"*

##Plugin Options
*  **errorFieldClass**

 To change the error field class (Default : error)
 
 *Example :*
 ```javascript
$("#formid").simpleValidation({
     "errorFieldClass" : "invalidfield"
});
 ```
*  **errorMsgTag**

 To change the error message field tag (Default : span)
 
 *Example :*
 ```javascript
//If you want to show the error message in "div" tag...
$("#formid").simpleValidation({
     "errorMsgTag" : "div"
});
 ```
*  **errorMsgClass**

 To change the error message field class (Default : errormsg)
 
 *Example :*
 ```javascript
 $("#formid").simpleValidation({
     "errorMsgClass" : "errorMsg",
});
 ```
*  **errorMsg**

 To change the error message (Default : Required Field)
 
 *Example :*
 ```javascript
 $("#formid").simpleValidation({
     "errorMsg" : "Required Field",
});
 ```

##Style error message and field

```css
//Styling error field
#formid input.error,#formid textarea.error {
   background-color:#f2dede;
   border-color: #a94442;
   color:#a94442;
}

//Styling error message
#formid span.errormsg {
   color: #ff0000;
}
```
	
