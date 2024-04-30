(function ($) {
	$.fn.simpleValidation = function (options, callback) {
		const defaults = {
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
				minlength: "Please enter a minimum of {n} letters",
			},
			beforeSubmit: "",
		};

		const settings = $.extend({}, defaults, options);

		const removeErrorMsg = (elem) => {
			const $elem = $(elem);
			const $errorElem = $elem.next("." + settings.errorMsgClass);
			$elem.removeClass(settings.errorFieldClass);
			if ($errorElem.length > 0) $errorElem.remove();
		};

		const addErrorMsg = (elem, msg, errorClassno) => {
			const $elem = $(elem);
			if (!errorClassno) $elem.addClass(settings.errorFieldClass);
			if ($elem.next("." + settings.errorMsgClass).length <= 0) {
				const $errorElem = $("<" + settings.errorMsgTag + "/>", {
					class: settings.errorMsgClass,
				}).text(msg);
				$errorElem.insertAfter($elem);
			}
		};

		const validate = (elem) => {
			const $elem = $(elem);
			const val = $elem.val().trim();
			const name = $elem.attr("name");
			const required = $elem.attr("data-sfv-required");
			const minLength = $elem.attr("data-sfv-minlength") || 0;
			const pattern = $elem.attr("data-sfv-regex");
			const compare = $elem.attr("data-sfv-compare");
			const compareElem = $(compare);
			const compareVal =
				compare !== "" && typeof compare !== "undefined"
					? compareElem.val().trim()
					: "";
			const patternErrorMsg = $elem.attr("data-sfv-regEx-errorMsg");
			const requiredErrorMsg = $elem.attr("data-sfv-require-errorMsg");

			if (val !== "") {
				switch ($elem.attr("type")) {
					case "email":
						!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(val)
							? addErrorMsg(
									$elem,
									patternErrorMsg || settings.otherErrorMsg.email,
							  )
							: removeErrorMsg($elem);
						break;
					case "companyemail":
						// Update the regular expression for company email validation
						!/^[\w+\-.]+@(?!gmail\.com|hotmail\.com|live\.com|outlook\.com|yahoo\.com|ymail\.com|rocketmail\.com|aol\.com|mac\.com|me\.com|icloud\.com|inbox\.com|sina\.com|qq\.com|foxmail\.com|163\.com|126\.com|189\.cn|263\.net|yeah\.net|gmx\.com|gmx\.net|mail\.com|mail\.ru|rambler\.ru|lenta\.ru|autorambler\.ru|myrambler\.ru|ro\.ru|yandex\.ru|zoho\.com|msn\.com|webtown\.com|rediffmail\.com)([\w\-.]+@[^\s@]+\.[^\s@]+)?$/.test(
							val,
						)
							? addErrorMsg(
									$elem,
									patternErrorMsg || settings.otherErrorMsg.companyemail,
							  )
							: removeErrorMsg($elem);
						break;
					// Add other cases for validation types as needed
					default:
						// Handle other validation types
						break;
				}
			} else if (required === "yes") {
				addErrorMsg($elem, requiredErrorMsg || settings.errorMsg);
			}
		};

		const validateChRb = (elem) => {
			const $elem = $(elem);
			const name = $elem.attr("name");
			const requiredErrorMsg = $elem.attr("data-sfv-require-errorMsg");
			const $siblingElems = $("[name='" + name + "']", this);
			const $lastSiblingElem = $siblingElems.last()[0].nextSibling;
			!$siblingElems.is(":checked")
				? addErrorMsg(
						$lastSiblingElem,
						requiredErrorMsg || settings.errorMsg,
						true,
				  )
				: removeErrorMsg($lastSiblingElem);
		};

		return this.each(function () {
			const $form = $(this);
			const $formAjax = $form.attr("data-sfv-ajax") || false;
			const valElems = $(
				"input[data-sfv-required='yes'],input[data-sfv-validation],input[data-sfv-regex],input[data-sfv-compare],input[data-sfv-minlength],select[data-sfv-required],textarea[data-sfv-required]",
				$form,
			);
			const valChRaElems = $(
				"input[data-sfv-required='yes'][type='checkbox'],input[data-sfv-required='yes'][type='radio']",
				$form,
			);

			// Disable HTML5 default validation
			$form.attr("novalidate", "");

			// On Form submit
			$form.on("submit", function (e) {
				valElems.add(valChRaElems).each(function () {
					const type = $(this).attr("type");
					type === "checkbox" || type === "radio"
						? validateChRb(this)
						: validate(this);
				});

				if (
					$(
						"." +
							settings.errorFieldClass +
							":visible,." +
							settings.errorMsgClass +
							":visible",
						$(this),
					).length <= 0
				) {
					if (typeof settings.beforeSubmit === "function") {
						return settings.beforeSubmit.call(this, $form);
					}
					if ($formAjax) {
						e.preventDefault();
						$.ajax({
							type: $form.attr("method"),
							url: $form.attr("action"),
							data: $form.serialize(),
							success: function (data) {
								if (typeof callback === "function") {
									callback.call(this, data, $form);
								}
							},
						});
					}
				} else {
					e.preventDefault();
				}
			});

			// On Focus
			valElems.on("focus", function (e) {
				removeErrorMsg(e.target);
			});

			// On Blur
			valElems.on("blur", function (e) {
				validate(e.target);
			});

			// On click: checkbox & radio button
			valChRaElems.on("click", function (e) {
				validateChRb(e.target);
			});
		});
	};
})(jQuery);
