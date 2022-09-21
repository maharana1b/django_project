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
		$("#adr_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				current_side_effects: {
					required: true
				},
				grade: {
					required: function(element){
						return $("#current_side_effects").val() != "";
					},
				},
				date_of_onset_of_adverse_effect: {
					required: function(element){
						return $("#current_side_effects").val() != "";
					},
				},
				arvs_due_to_symptom: {
					required: function(element){
						return $("#current_side_effects").val() != "";
					},
				},
				concomitant_medication: {
					required: function(element){
						return $("#current_side_effects").val() != "";
					},
				},
				actions_taken: {
					required: function(element){
						return $("#current_side_effects").val() != "";
					},
				},
				referred_for_hospitalization: {
					required: false
				},
				follow_up_outcomes: {
					required: false
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				current_side_effects: {
					required: "Current Side Effects is Required."
				},
				grade: {
					required: "Grade is Required.",
				},
				date_of_onset_of_adverse_effect: {
					required: "Date Of Onset of Adverse Effect is Required.",
				},
				arvs_due_to_symptom: {
					required: "Has patient missed any doses of ARVs due to symptom is Required.",
				},
				concomitant_medication: {
					required: "Concomitant Medication is Required.",
				},
				actions_taken: {
					required: "Actions Taken is Required.",
				},
				referred_for_hospitalization: {
					required: "Referred For Hospitalization is Required.",
				},
				follow_up_outcomes: {
					required: "Follow Up Outcomes is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#adr_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#adr_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#adr_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window);