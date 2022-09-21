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
		$("#covid_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				covid_19_vaccine_taken: {
					required: false
				},
				date_of_first_dose: {
					required: function(element){
						return $("#covid_19_vaccine_taken").val().toLowerCase() == "yes";
					},
				},
				date_of_second_dose: {
					required: function(element){
						return $("#covid_19_vaccine_taken").val().toLowerCase() == "yes";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				covid_19_vaccine_taken: {
					required: "COVID 19 Vaccine Taken is Required."
				},
				date_of_first_dose: {
					required: "Date of 1st Dose is Required.",
				},
				date_of_second_dose: {
					required: "Date of 2nd Dose is Required.",
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#covid_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#covid_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#covid_form")[0]);	
		}
	});

	/* ---- END: Form Validation ON Click ----- */

})(window);