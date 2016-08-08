# jQuery Simple Form Validation

A Simple jQuery Plugin for Form Validation

SimpleValidation is a simplified jquery plugin to achieve client side form validation.

It provides a consolidated validation for all types of forms with lesser lines of code. Download this plugin now for an Abridged yet wholesome Form validation jquery

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

 * **data-sfv-ajax="true"**
   
   Form ajax submission
   
   ```HTML
   <form action="" id="" data-sfv-ajax="true">
   ```
 * **data-sfv-required="yes"**
 
 To make the field mandatory.
	
 * **data-sfv-validation**
  * data-sfv-validation="**email**"  : To validate email (*eg : abc@sample.com*)
  * data-sfv-validation="**alpha**"  : To validate alphabetic (*eg : abcdef*)
  * data-sfv-validation="**alphawithspace**"  : To validate alphabetic with space (*eg : abc def*)
  * data-sfv-validation="**number**" : To validate number (*eg : 12345*)
  * data-sfv-validation="**numberwithspace**" : To validate number with space (*eg : 123 45*)
  * data-sfv-validation="**alphanumeric**" : To validate alphanumeric (*eg : abc123*)
  * data-sfv-validation="**alphanumericwithspace**" : To validate alphanumeric with space (*eg : abc 123*)
 * **data-sfv-compare**
 
 To compare two fields.eg. Password and confirm password fields
 
 *Example :  data-sfv-compare="#fieldtocompare"*
 * **data-sfv-minlength**
 
 To validate the field with minimum letters. If the same attribute declared in form, it will validate all fields with minimum letters.
 
 *Example :  data-sfv-minlength="4"*
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
 
##Callbacks(if the form is ajax submit)
*  **beforeSubmit**
  
  Executes before the form submit

 *Example :*
 ```javascript
 $("#formid").simpleValidation({
     "beforeSubmit" : function(form) {
       //form - current form
       //add loader class to the form 
       form.addClass("loader")
     }
});
 ```
 
*  **After Submit**
  
  Executes immediately after the form is submitted

 *Example :*
 ```javascript
 $("#formid").simpleValidation({
      //options...
     },function(data,form) {
       //data - ajax value return
       //form - current form
       if(data == "succcess") {
        form.removeClass("loader")
       }
     }
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
	
