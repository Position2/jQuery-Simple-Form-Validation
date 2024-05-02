/**
 * jQuery Simple Form Validation
 * Copyright (c) 2017 Position2 Inc.
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 * https://github.com/Position2/jQuery-Simple-Form-Validation
 */
(function ($) {
	$.fn.simpleValidation = function (options, callback) {
		var settings = $.extend(
			{
				errorFieldClass: "error",
				errorMsgTag: "span",
				errorMsgClass: "errormsg",
				errorMsg: "Required Field",
				otherErrorMsg: {
					email: "Please enter a valid email",
					companyemail: "Please enter a company email",
					alphabet: "Please enter letters only",
					alphabetwithspace: "Please enter letters and spaces only",
					number: "Please enter numbers only",
					numberwithspace: "Please enter numbers and spaces only",
					alphanumeric: "Please don't enter any special characters or spaces",
					alphanumericwithspace: "Please don't enter any special characters",
					compare: "Please enter the same value again",
					minlength: "Please enter a minimum of {n} characters",
				},
				beforeSubmit: function () {},
			},
			options,
		);

		// Remove error message on click
		$("body").on(
			"click",
			settings.errorMsgTag + "." + settings.errorMsgClass,
			function () {
				$(this).fadeOut(function () {
					$(this).remove();
				});
			},
		);

		return this.each(function () {
			var form = $(this),
				ajax = form.attr("data-sfv-ajax") || false,
				minLen = form.attr("data-sfv-minlength") || 0,
				requiredElems = form.find("[data-sfv-required='yes']"),
				compareElem = $("[data-sfv-compare]", form);

			// Disable HTML5 default validation
			form.attr("novalidate", "");

			// Add error message
			function addErrorMessage(element, message, isErrorClass) {
				var target = $(element);
				if (!isErrorClass) target.addClass(settings.errorFieldClass);
				if (target.next("." + settings.errorMsgClass).length <= 0)
					$("<" + settings.errorMsgTag + "/>", {
						class: settings.errorMsgClass,
						text: message,
					}).insertAfter(target);
			}

			// Remove error message
			function removeErrorMessage(element) {
				var target = $(element),
					nextErrorMessage = target.next("." + settings.errorMsgClass);
				target.removeClass(settings.errorFieldClass);
				if (nextErrorMessage.length > 0) nextErrorMessage.remove();
			}

			// Validate input
			function validateInput(input) {
				var element = $(input),
					value = element.val().trim(),
					required = element.attr("data-sfv-required"),
					minLength = element.attr("data-sfv-minlength") || 0,
					pattern = element.attr("data-sfv-regex"),
					compare = element.attr("data-sfv-compare"),
					compareElement = $(compare),
					compareValue = compare ? compareElement.val().trim() : "",
					patternErrorMessage = element.attr("data-sfv-regEx-errorMsg"),
					requiredErrorMessage = element.attr("data-sfv-require-errorMsg");

				if (value !== "") {
					if (pattern) {
						pattern = new RegExp("^" + pattern + "$");
						!pattern.test(value)
							? addErrorMessage(
									element,
									patternErrorMessage || settings.errorMsg,
							  )
							: removeErrorMessage(element);
					} else if (compare && value !== compareValue) {
						addErrorMessage(compareElement, settings.otherErrorMsg.compare);
					} else if (minLength > 0 && value.length < minLength) {
						addErrorMessage(
							element,
							settings.otherErrorMsg.minlength.replace("{n}", minLength),
						);
					} else {
						removeErrorMessage(element);
					}
				} else if (required === "yes") {
					addErrorMessage(element, requiredErrorMessage || settings.errorMsg);
				}
			}

			// Validate checkbox and radio button
			function validateCheckboxRadio(element) {
				var group = $(element).attr("name"),
					errorMessage = $(element).attr("data-sfv-require-errorMsg");
				if ($("[name='" + group + "']:checked").length === 0) {
					addErrorMessage(
						$("[name='" + group + "']")
							.last()
							.next()[0],
						errorMessage || settings.errorMsg,
						true,
					);
				} else {
					removeErrorMessage(
						$("[name='" + group + "']")
							.last()
							.next()[0],
					);
				}
			}

			// On form submit
			form.on("submit", function (e) {
				var formData = $(this);
				requiredElems.each(function () {
					var type = $(this).attr("type");
					type === "checkbox" || type === "radio"
						? validateCheckboxRadio(this)
						: validateInput(this);
				});
				if (
					formData.find(
						"." +
							settings.errorFieldClass +
							":visible, ." +
							settings.errorMsgClass +
							":visible",
					).length === 0
				) {
					if (typeof settings.beforeSubmit === "function") {
						return settings.beforeSubmit.call(this, formData);
					}
					if (ajax) {
						$.ajax({
							type: form.attr("method"),
							url: form.attr("action"),
							data: formData.serialize(),
							success: function (data) {
								if (typeof callback === "function") {
									callback.call(this, data, formData);
								}
							},
						});
						return false;
					} else {
						return true;
					}
				}
				e.preventDefault();
			});

			// On focus
			form.find("input, select, textarea").on("focus", function () {
				removeErrorMessage(this);
			});

			// On blur
			form.find("input, select, textarea").on("blur", function () {
				validateInput(this);
			});

			// On click for checkbox and radio button
			form
				.find("input[type='checkbox'], input[type='radio']")
				.on("click", function () {
					validateCheckboxRadio(this);
				});
		});
	};
})(jQuery);
