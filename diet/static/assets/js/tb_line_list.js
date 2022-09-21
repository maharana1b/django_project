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
		$("#eac_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				referred_for_tb_testing_date: {
					required: true
				},
				type_of_test: {
					required: function(element){
						return $("#referred_for_tb_testing_date").val() != "";
					},
				},
				diagnosed_with_tb: {
					required: function(element){
						return $("#type_of_test").val() != "";
					},
				},
				drug_resistance_status: {
					required: function(element){
						return $("#diagnosed_with_tb").val().toLowerCase() == "yes";
					},
				},
				date_of_tb_diagnosis: {
					required: function(element){
						return $("#diagnosed_with_tb").val().toLowerCase() == "yes";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				referred_for_tb_testing_date: {
					required: "Referred for TB testing (Current Month) is Required."
				},
				type_of_test: {
					required: "Type of Test is Required."
				},
				diagnosed_with_tb: {
					required: "Is the patient diagnosed with TB is Required."
				},
				drug_resistance_status: {
					required: "Drug Resistance status is Required."
				},
				date_of_tb_diagnosis: {
					required: "Date of TB Diagnosis is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#eac_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#eac_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#eac_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window);