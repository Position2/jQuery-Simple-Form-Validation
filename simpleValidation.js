/*
Simple form validation
https://github.com/Position2/jQuery-Simple-Form-Validation 
*/
(function($) {
    $.fn.simpleValidation = function(opts, callback) {
        var options = $.extend({ 
                         "errorFieldClass"   : "error",
                         "errorMsgTag"       : "span",
                         "errorMsgClass"     : "errormsg",
                         "errorMsg"          : "Required Field",
                         "otherErrorMsg"     :  {
                                                    "email"                     : "Please enter valid email",
                                                    "companyemail"              : "Please enter company email",
                                                    "alphabet"                  : "Please enter letters only",
                                                    "alphabetwithspace"         : "Please enter letters & space only",
                                                    "number"                    : "Please enter numbers only",
                                                    "numberwithspace"           : "Please enter numbers & space only",
                                                    "alphanumeric"              : "Please don't enter any special character or space",
                                                    "alphanumericwithspace"     : "Please don't enter any special character",
                                                    "compare"                   : "Please enter the same value again",
                                                    "minlength"                 : "Please enter minimum {n} letters"
                                                },
                         "beforeSubmit"        : ""
                      }, opts);
        // remove errormsg on click
        $("body").on("click",options.errorMsgTag+"."+options.errorMsgClass,function() {
            $(this).fadeOut(function() {
                $(this).remove();
            });
        });
        return this.each(function() {
            var curForm             = $(this),
                curFormAjax         = curForm.attr("data-sfv-ajax") || false,
                curFormMinL         = curForm.attr("data-sfv-minlength") || 0,
                valChRaElems        = $("input[data-sfv-required='yes'][type='checkbox'],input[data-sfv-required='yes'][type='radio']",curForm),
                valElems            = $("input[data-sfv-required='yes'],input[data-sfv-validation]:not(input[data-sfv-required='yes']),input[data-sfv-regex]:not(input[data-sfv-required='yes']),input[data-sfv-compare]:not(input[data-sfv-required='yes']),input[data-sfv-minlength]:not(input[data-sfv-required='yes']),select[data-sfv-required='yes'],textarea[data-sfv-required='yes']",curForm).not(valChRaElems),
                cmpElem             = $("input[data-sfv-compare]",curForm),
                emailReg            = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                ComEmailReg         = /^([\w+\-\.]+@(?!gmail.com)(?!hotmail.com)(?!live.com)(?!outlook.com)(?!yahoo.com)(?!ymail.com)(?!rocketmail.com)(?!aol.com)(?!mac.comme.com)(?!icloud.com)(?!inbox.com)(?!sina.com)(?!qq.com)(?!foxmail.com)(?!163.com)(?!126.com)(?!189.cn 263.net)(?!yeah.net)(?!gmx.com)(?!gmx.net)(?!mail.com)(?!mail.ru)(?!rambler.ru)(?!lenta.ru)(?!autorambler.ru)(?!myrambler.ru)(?!ro.ru)(?!yandex.ru)(?!zoho.com)(?!msn.com)(?!webtown.com)(?!rediffmail.com)([\w\-]+\.)+[\w\-]{2,4})?$/,
                alphaReg            = /^[A-Za-z]+$/,
                numericReg          = /^[0-9]+$/,
                alphanumericReg     = /^[0-9a-zA-Z]+$/,
                alphaWSReg          = /^[A-Za-z ]+$/,
                numericWSReg        = /^[0-9 ]+$/,
                alphanumericWSReg   = /^[0-9a-zA-Z ]+$/,
                errorElem           = $("<"+options.errorMsgTag+"/>",{
                                      "class" : options.errorMsgClass
                                  });
            if(cmpElem.size() > 0) {
                valElems = valElems.add($(cmpElem.attr("data-sfv-compare")));
            }
            //Disable HTML5 default validation
            curForm.attr("novalidate","");
            //Add Erro message
            function addErrorMsg(elem,msg,errorClassno) {
                var dis     = $(elem);
                if(!errorClassno)
                    dis.addClass(options.errorFieldClass);
                if(dis.next("."+options.errorMsgClass).size() <= 0)
                    errorElem.clone().text(msg).insertAfter(dis);
            }
            //Remove Error Message
            function removeErrorMsg(elem) {
                var dis          = $(elem),
                    nErrorElem   = dis.next("."+options.errorMsgClass);
                dis.removeClass(options.errorFieldClass);
                if(nErrorElem.size() > 0)
                    nErrorElem.remove();    
            }
            //Validate text,email,select
            function validate(elem) {
                var dis             = $(elem),
                    disVal          = dis.val().trim(),
                    disName         = dis.attr("name"),
                    disRequ         = dis.attr("data-sfv-required"),
                    disMinL         = dis.attr("data-sfv-minlength") || 0,
                    disPattern      = dis.attr("data-sfv-regex"),
                    disCompare      = dis.attr("data-sfv-compare"),
                    disCompareElem  = $(disCompare),
                    compareElem     = $("[data-sfv-compare]",curForm),
                    compareElemW    = $(compareElem.attr("data-sfv-compare")),
                    disCompareVal   = disCompare != "" &&  typeof(disCompare) != "undefined" ? disCompareElem.val().trim() : "",
                    disPatErrorMsg  = dis.attr("data-sfv-regEx-errorMsg"),
                    disRequErrorMsg = dis.attr("data-sfv-require-errorMsg");
                if(disVal != "") {
                    if (dis.attr("type") == "companyemail" || (dis.attr("data-sfv-validation") == "companyemail")) {
                        if (!emailReg.test(disVal)) {
                            addErrorMsg(dis, disPatErrorMsg || options.otherErrorMsg.email);
                        } else if (!ComEmailReg.test(disVal)) {
                            addErrorMsg(dis, disPatErrorMsg || options.otherErrorMsg.companyemail);
                        } else {
                            removeErrorMsg(dis);
                        }
                    } else if(dis.attr("type") == "email" || (dis.attr("data-sfv-validation") == "email")) {
                        (!emailReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.email) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "alpha") {
                        (!alphaReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.alphabet) : removeErrorMsg(dis); 
                    }  else if(dis.attr("data-sfv-validation") == "alphawithspace") {
                        (!alphaWSReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.alphabetwithspace) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "number") {
                        (!numericReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.number) : removeErrorMsg(dis); 
                    }  else if(dis.attr("data-sfv-validation") == "numberwithspace") {
                        (!numericWSReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.numberwithspace) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "alphanumeric") {
                        (!alphanumericReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.alphanumeric) : removeErrorMsg(dis); 
                    }  else if(dis.attr("data-sfv-validation") == "alphanumericwithspace") {
                        (!alphanumericWSReg.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.alphanumericwithspace) : removeErrorMsg(dis); 
                    } else if(disPattern != "" &&  typeof(disPattern) != "undefined") {
                        disPattern = new RegExp("^" + disPattern + "$");
                        (!disPattern.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.errorMsg) : removeErrorMsg(dis); 
                    } else if(disCompare != "" &&  typeof(disCompare) != "undefined" && disCompareElem.size() > 0 && disCompareVal != "") {
                        (disVal != disCompareVal) ? addErrorMsg(disCompareElem,disPatErrorMsg || options.otherErrorMsg.compare) : removeErrorMsg(disCompareElem); 
                    } else if(compareElemW.attr("id") == dis.attr("id") && typeof(compareElemW.attr("id")) != "undefined") {
                        (disVal != compareElem.val()) ? addErrorMsg(dis,disPatErrorMsg || options.otherErrorMsg.compare) : removeErrorMsg(dis); 
                    } else if(disMinL > 0 || curFormMinL > 0) { 
                        if(disMinL > 0 && disVal.length < disMinL) {
                            var MLerrorMsg = (disPatErrorMsg || options.otherErrorMsg.minlength).replace("{n}", disMinL);
                            addErrorMsg(dis,MLerrorMsg);
                        } else if(disMinL <= 0 && curFormMinL.length > 0 && disVal.length < curFormMinL) {
                            var MLerrorMsg = (disPatErrorMsg || options.otherErrorMsg.minlength).replace("{n}", curFormMinL);
                            addErrorMsg(dis,MLerrorMsg);
                        } else {
                            removeErrorMsg(dis);
                        }
                    } else {
                        removeErrorMsg(dis);
                    }
                } else if(disRequ == "yes") {
                    addErrorMsg(dis,disRequErrorMsg || options.errorMsg);
                }
            }
            //Validate checkbox,radio button
            function validateChRb(elem) {
                var dis             = $(elem),
                    disname         = dis.attr("name"),
                    disRequErrorMsg = dis.attr("data-sfv-require-errorMsg");
                    disSibElem      = $("[name='"+disname+"']"),
                    disSibLElem     = disSibElem.last()[0].nextSibling;
                (!disSibElem.is(":checked")) ? addErrorMsg(disSibLElem,disRequErrorMsg || options.errorMsg,true) : removeErrorMsg(disSibLElem);
            }
            //on Form submit
            curForm.on("submit",function(e) {
                var disForm = $(this);
                valElems.add(valChRaElems).each(function() {
                    var disType = $(this).attr("type");
                    (disType == "checkbox" || disType == "radio") ? validateChRb(this) : validate(this);
                });
                if($("."+options.errorFieldClass+":visible,."+options.errorMsgClass+":visible",$(this)).size() <= 0) {
                    if(curFormAjax) {
                        if (typeof options.beforeSubmit == 'function') {
                            options.beforeSubmit.call(this,disForm);
                        }
                        $.ajax({
                            type    : curForm.attr("method"),
                            url     : curForm.attr("action"),
                            data    : disForm.serialize(),
                            success : function(data) {
                                if (typeof callback == 'function') {
                                    callback.call(this,data,disForm);
                                }
                            }
                        });
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                e.preventDefault();
            });
            //On Focus
            valElems.on("focus",function(e) {
                removeErrorMsg(e.target);
            });
            //On Blur
            valElems.on("blur",function(e) {
                validate(e.target);
            });
            //On click : checkbox & radiobutton
            valChRaElems.on("click",function(e) {
                validateChRb(e.target)
            });
        });
    }
})(jQuery);
