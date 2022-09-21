(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {
		// Form Validation Check And Active
		form_validation();
	});

	/* ---- BEING: Form Validation ON Click ----- */

	$.validator.setDefaults({
		errorElement: "span",
		errorPlacement: function (error, element) {
			error.addClass("invalid-feedback");
			element.closest(".form-group").append(error);
		},
		highlight: function (element, errorClass, validClass) {
			$(element).addClass("is-invalid");
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).removeClass("is-invalid");
			// $(element).addClass("is-valid"); // Valid Class Add 
		},
	});

	// form_validation function create
	function form_validation() {
		$("#counselling_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				counselling_sessions_conducted: {
					required: true
				},
				disclosure_status: {
					required: false
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				counselling_sessions_conducted: {
					required: "Counselling Sessions Conducted is Required."
				},
				disclosure_status: {
					required: "Disclosure Status is Required.",
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#counselling_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#counselling_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#counselling_form")[0]);	
		}
	});

	/* ---- END: Form Validation ON Click ----- */

})(window);