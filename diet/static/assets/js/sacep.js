(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {


		$(".dis_fut_dt").flatpickr({
			maxDate: "today",
			disableMobile: "true",
		});

		// Form Validation Check And Active
		form_validation();
	});

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
		$("#sacep_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				referral_to_sacep_dacep: {
					required: true
				},
				dacep_sacep_referral_date: {
					required: true
				},
				date_as_per_sacep_dacep_advice: {
					required: true
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				referral_to_sacep_dacep: {
					required: "Reason for Referral to SACEP/DACEP is Required."
				},
				dacep_sacep_referral_date: {
					required: "DACEP / SACEP Referral Date is Required."
				},
				date_as_per_sacep_dacep_advice: {
					required: "Treatment Change Date As Per SACEP/DACEP Advice is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#sacep_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#sacep_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#sacep_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */
})(window);