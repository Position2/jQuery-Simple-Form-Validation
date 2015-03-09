# jQuery Simple Form Validation
A Simple jQuery Plugin for Form Validation
  SimpleValidation is a javascript form validation library.If you need to do some client side validation , simpleValidation is the best one.
  
  Here the steps to configure... 
    Step 1 :
    	Download and link to the Jquery plugin
    Step 2 :
    	Download and link to the Jquery simpleValidation plugin
    Step 3 :
    	Add data attributes to the fields
    	Example : 
    		<input type="text" data-sfv-required="yes" class="form-control" id="inputfirstname">
    Step 4:
    	Fire the jQuery simpleValidation Plugin 
    	$(document).ready(function(){
    	   $("#formid").simpleValidation();
    	});

  Data attributes
  	1.data-sfv-required="yes"
  		To make the field mandatory.
  	2.data-sfv-validation
  		1.data-sfv-validation="email"
  			To validate email (eg : abc@sample.com )
  		2.data-sfv-validation="alpha"
  			To validate alphabetic (eg : abcdef )
  		3.data-sfv-validation="number"
  			To validate number (eg : 12345 )
  		4.data-sfv-validation="alphanumeric"
  			To validate alphanumeric (eg : abc123 )
  	3.data-sfv-require-errorMsg
  		To add Required error message for a particular field.
  		Example : 
  			data-sfv-require-errorMsg="Please Enter First Name"
  	4.data-sfv-regex
  		To validate particular field by your own regular expression.
  		Example :
  			data-sfv-regEx="[\+]\d{2}[\(]\d{2}[\)]\d{4}[\-]\d{4}"	
  	5.data-sfv-regEx-errorMsg
  		To add Regular expression mismatch error message for a particular field.
  		Example 1:
  			data-sfv-regEx-errorMsg="Please enter valid phone number ex:+99(99)9999-9999"
  		Example 2 (for email,alpha,number,alphanumeric) :
  			data-sfv-regEx-errorMsg="Please enter valid email Id(or)Please enter only number(or)text(or)alpanumeric"
  
  Plugin Options
  	1.errorFieldClass
  		To change the error field class (Default : error)
  	Example :
  		$("#formid").simpleValidation({
  			"errorFieldClass"	: "invalidfield"
  		});
  	2.errorMsgTag
  		To change the error message field tag (Default : span)
  	Example :
  		//If you want to show the error message in "div" tag...
  		$("#formid").simpleValidation({
  			"errorMsgTag" 		: "div"
  		});
  	3.errorMsgClass
  		To change the error message field class (Default : errormsg)
  	Example :
  		$("#formid").simpleValidation({
  			"errorMsgClass" 	: "errorMsg",
  		});
  	4.errorMsg
  		To change the error message (Default : Required Field)
  	Example :
  		$("#formid").simpleValidation({
  			"errorMsg" 			: "Required Field",
  		});
  
  Style the error message and field
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
