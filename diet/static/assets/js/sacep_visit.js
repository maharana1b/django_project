(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {


		$(".dis_fut_dt").flatpickr({
			maxDate: "today",
			disableMobile: "true",
		});

		$(".basic_date").flatpickr({
			disableMobile: "true",
		});

		// Form Validation Check And Active
		form_validation();
	});

	/* ---- BEING: Validation Method ---- */

	// Alphanumeric
	$.validator.addMethod(
		"alphanumeric",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
		},
		"Alphanumeric Only Allowed."
	);

	/* ---- END: Validation Method ---- */
	
	/* ---- BEING: Validation ON Click ----- */

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
		$("#sacep_visit_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				sacep_number: {
					required: true,
					alphanumeric:true,
					minlength:3,
					maxlength:30
				},
				dacep_sacep_appointment_date: {
					required: true
				},
				plhas_attended_dacep_sacep_date: {
					required: true
				},
				type_of_dacep_sacep: {
					required: function(element){
						return $("#dacep_sacep_appointment_date").val() != "";
					},
				},
				dacep_sacep_advice: {
					required: true
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				sacep_number: {
					required: "Sacep Number is Required."
				},
				dacep_sacep_appointment_date: {
					required: "DACEP / SACEP Appointment Date is Required."
				},
				plhas_attended_dacep_sacep_date: {
					required: "PLHAs attended DACEP / SACEP Date is Required."
				},
				type_of_dacep_sacep: {
					required: "Type of DACEP / SACEP is Required."
				},
				date_as_per_sacep_dacep_advice: {
					required: "DACEP / SACEP Advice is Required."
				},
				dacep_sacep_advice: {
					required: "DACEP / SACEP Advice is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#sacep_visit_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#sacep_visit_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#sacep_visit_form")[0]);	
		}
	});

	/* ---- END: Validation ON Click ----- */
})(window);