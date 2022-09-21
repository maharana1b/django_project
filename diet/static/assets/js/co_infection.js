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

	/* ---- BEING: Validation Method ---- */

	// Date Greater Than Check 
	$.validator.addMethod(
		"greaterThan",
		function (value, element, params) {
			if( $(params).val().length != "0" ){
				if (!/Invalid|NaN/.test(new Date(value))) {
					return new Date(value) > new Date($(params).val());
				}
				return (isNaN(value) && isNaN($(params).val())) || Number(value) > Number($(params).val());
			}else{
				return true;
			}
		},
		"Date Must be greater than {0}."
	);

	/* ---- END: Validation Method ---- */

	/* ---- BEING: ART Registration Form Validation ON Click ----- */

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

	function form_validation() {
		$("#co_infection_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				co_infection: {
					required: false
				},
				date_of_diagnosis: {
					required: false
				},
				date_of_treatment_start: {
					required: function(element){
						return $("#date_of_diagnosis").val() != "";
					},
					greaterThan:"#date_of_diagnosis"
				},
				date_of_treatment_complete: {
					required: function(element){
						return $("#date_of_treatment_start").val() != "";
					},
				},
				outcome: {
					required: function(element){
						return $("#date_of_treatment_start").val() != "";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				co_infection: {
					required: "Co-infection is Required."
				},
				date_of_diagnosis: {
					required: "Date of diagnosis (Every Co-infection) is Required."
				},
				date_of_treatment_start: {
					required: "Date of Treatment Start is Required.",
					greaterThan: "Date should not be smaller than Date of Diagnosis."
				},
				date_of_treatment_complete: {
					required: "Date of Treatment Complete is Required.",
				},
				outcome: {
					required: "Outcome is Required."
				},
			}
		});
	}// Function END 
	
	// Submit Check Validation
	$(document).on("click", "#co_infection_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#co_infection_form").valid();
		if (validate == true) {
			//form is valid
			var formData = new FormData($("#co_infection_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */
})(window);