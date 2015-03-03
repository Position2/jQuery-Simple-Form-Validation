(function($) {
    $.fn.simpleValidation = function(opts) {
        var options = $.extend({
                         "errorFieldClass"   : "error",
                         "errorMsgTag"       : "span",
                         "errorMsgClass"     : "errormsg",
                         "errorMsg"          : "Required Field",
                         "otherErrorMsg"     :  {
                                                    "email"        : "Please enter valid email",
                                                    "alphabet"     : "Please enter letters only",
                                                    "number"       : "Please enter numbers only",
                                                    "alphanumber"  : "Please don't enter any special character or space"
                                                }
                      }, opts);
        return this.each(function() {
            var curForm         = $(this),
                valChRaElems    = $("input[data-sfv-required='yes'][type='checkbox'],input[data-sfv-required='yes'][type='radio']",curForm),
                valElems        = $("input[data-sfv-required='yes'],input[data-sfv-validation]:not(input[data-sfv-required='yes']),input[data-sfv-regex]:not(input[data-sfv-required='yes']),select[data-sfv-required='yes'],textarea[data-sfv-required='yes']",curForm).not(valChRaElems),
                emailReg        = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                alphaReg        = /^[A-Za-z]+$/,
                numericReg      = /^[0-9]+$/,
                alphanumericReg = /^[0-9a-zA-Z]+$/,
                errorElem       = $("<"+options.errorMsgTag+"/>",{
                                      "class" : options.errorMsgClass
                                  });
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
                    disPattern      = dis.attr("data-sfv-regex"),
                    disPatErrorMsg  = dis.attr("data-sfv-regEx-errorMsg"),
                    disRequErrorMsg = dis.attr("data-sfv-require-errorMsg");
                if(disVal != "") {
                    if(dis.attr("type") == "email" || (dis.attr("data-sfv-validation") == "email")) {
                        (!emailReg.test(disVal)) ? addErrorMsg(dis,options.otherErrorMsg.email) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "alpha") {
                        (!alphaReg.test(disVal)) ? addErrorMsg(dis,options.otherErrorMsg.alphabet) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "number") {
                        (!numericReg.test(disVal)) ? addErrorMsg(dis,options.otherErrorMsg.number) : removeErrorMsg(dis); 
                    } else if(dis.attr("data-sfv-validation") == "alphanumber") {
                        (!alphanumericReg.test(disVal)) ? addErrorMsg(dis,options.otherErrorMsg.alphanumeric) : removeErrorMsg(dis); 
                    } else if(disPattern != "" &&  typeof(disPattern) != "undefined") {
                        disPattern = new RegExp("^" + disPattern + "$");
                        (!disPattern.test(disVal)) ? addErrorMsg(dis,disPatErrorMsg || options.errorMsg) : removeErrorMsg(dis); 
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
                valElems.add(valChRaElems).each(function() {
                    var disType = $(this).attr("type");
                    (disType == "checkbox" || disType == "radio") ? validateChRb(this) : validate(this);
                });
                if($("."+options.errorFieldClass+",."+options.errorMsgClass,$(this)).size() <= 0) {
                    return true;
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