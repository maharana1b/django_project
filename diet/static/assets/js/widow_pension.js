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

	// form_validation function create
	function form_validation() {
		$("#widow_pension_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				eligible_for_widow_pension: {
					required: false
				},
				date_of_death_of_husband: {
					required: true
				},
				"documents_available[]": {
					required: function(element){
						return $("#eligible_for_widow_pension").val().toLowerCase() == "yes";
					},
					// minlength: 2
				},
				documents_submission_date: {
					required: function(element){
						return $("#eligible_for_widow_pension").val().toLowerCase() == "yes";
					},
				},
				financial_assistance_permissible: {
					required: function(element){
						return $("input[name='documents_available[]']:checked").length > 1 ;
					},
				},
				start_date_of_widow_pension: {
					required: function(element){
						return $("#financial_assistance_permissible").val().toLowerCase() == "yes";
					},
				},
				call_date: {
					required:false,
				},
				call_status: {
					required: function(element){
						return $("#call_date").val() != "";
					},
				},
				status_of_widow_pension_yojana: {
					required:true,
				},
				discontinuation_date: {
					required: function(element){
						const arr = ['Permanent', 'Temporary'];
						return !!~jQuery.inArray($("#status_of_widow_pension_yojana").val(), arr);
					},
				},
				discontinuation_reason: {
					required: function(element){
						const arr = ['Permanent'];
						return !!~jQuery.inArray($("#status_of_widow_pension_yojana").val(), arr);
					},
				},
				temporary_discontinuation: {
					required: function(element){
						const arr = ['Temporary'];
						return !!~jQuery.inArray($("#status_of_widow_pension_yojana").val(), arr);
					},
				},
				scheme_restarted_date: {
					required: function(element){
						const arr = ['Scheme Restarted'];
						return !!~jQuery.inArray($("#status_of_widow_pension_yojana").val(), arr);
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				eligible_for_widow_pension: {
					required: "Eligible for Widow Pension is Required."
				},
				date_of_death_of_husband: {
					required: "Date of death of Husband is Required."
				},
				"documents_available[]": {
					required: "Documents Available is Required.",
					// minlength: "Please Select at Least 2 Documents."
				},
				documents_submission_date: {
					required: "Documents Submission Date is Required."
				},
				financial_assistance_permissible: {
					required: "Financial Assistance Permissible is Required."
				},
				start_date_of_widow_pension: {
					required: "Date of start of Widow Pension Scheme is Required."
				},
				call_date: {
					required: "Call Date is Required."
				},
				call_status: {
					required: "Call Status is Required."
				},
				status_of_widow_pension_yojana: {
					required: "Status of Widow Pension Yojana is Required."
				},
				discontinuation_date: {
					required: "Discontinuation Date is Required."
				},
				discontinuation_reason: {
					required: "Reason for Permanent Discontinuation is Required."
				},
				temporary_discontinuation: {
					required: "Reason for Temparoy Discontinuation is Required."
				},
				scheme_restarted_date: {
					required: "Scheme Restarted date is Required."
				},
			}
		});
	}// Function END 

	$(document).on("click", "#widow_pension_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#widow_pension_form").valid();
		if (validate == true) {
			//form is valid
			var formData = new FormData($("#widow_pension_form")[0]);	

			var docs_available_arr = new Array();
			$.each( $("input[name='documents_available[]']:checked"), function(index, el) {
				documents_available.push($(this).val());
			});
			// $("input[name='documents_available[]']:checked").length; // get lenght docs
			console.log('===  widow_pension.js [107] ===', docs_available_arr);
		}
	});

})(window);