(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {


		$(".dis_fut_dt").flatpickr({
			maxDate: "today",
			disableMobile: "true",
			// wrap: true
		});

		$(".basic_date").flatpickr({
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
			if (!/Invalid|NaN/.test(new Date(value))) {
				return new Date(value) > new Date($(params).val());
			}
			return (isNaN(value) && isNaN($(params).val())) || Number(value) > Number($(params).val());
		},
		"Date Must be greater than {0}."
	);

	// Alphanumeric
	$.validator.addMethod(
		"alphanumeric_space",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9 ]+$/i.test(value);
		},
		"Alphanumeric And Space Only Allowed."
	);

	/* ---- END: Validation Method ---- */

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
		$("#tb_register_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				where_patient_diagnosed: {
					required: true
				},
				type_of_tb_diagnosed: {
					required: true
				},
				if_ep_tb: {
					required: function(element){
						return $("#type_of_tb_diagnosed").val().toLowerCase() == "extra pulmonary tb (clinically diagnosed)";
					},
				},
				bank_details_collected: {
					required: true
				},
				dbt_received: {
					required: function(element){
						return $("#bank_details_collected").val().toLowerCase() == "yes";
					},
				},
				reasons_for_bank_details: {
					required: function(element){
						return $("#dbt_received").val().toLowerCase() == "no";
					},
					alphanumeric_space:true,
					maxlength:150
				},
				type_of_patient: {
					required: true
				},
				date_of_starting_att: {
					required: false
				},
				if_not_initiated_on_att_reason: {
					required: function(element){
						return $("#date_of_starting_att").val().toLowerCase() == "";
					},
				},
				type_of_facility_tb_treatment: {
					required: true
				},
				if_r_resistant: {
					required: false
				},
				follow_up_sputum: {
					required: true
				},
				date_of_follow_up_sputum: {
					required: function(element){
						return $("#follow_up_sputum").val().toLowerCase() != "";
					},
				},
				date_of_tb_treatment_completion: {
					required: true,
					greaterThan:"#date_of_starting_att"
				},
				treatment_outcome: {
					required: false,
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				where_patient_diagnosed: {
					required: "Where was the patient diagnosed is Required."
				},
				type_of_tb_diagnosed: {
					required: "Type of TB diagnosed is Required."
				},
				if_ep_tb: {
					required: "If EP TB (Clinically Diagnosed), Site of EPTB is Required."
				},
				bank_details_collected: {
					required: "Bank Details Collected is Required."
				},
				dbt_received: {
					required: "DBT Received is Required."
				},
				reasons_for_bank_details: {
					required: "Reasons for not received Bank details or starting DBT is Required."
				},
				type_of_patient: {
					required: "Type of Patient is Required."
				},
				date_of_starting_att: {
					required: "Date of starting ATT is Required."
				},
				if_not_initiated_on_att_reason: {
					required: "If not initiated on ATT, reason for the same is Required."
				},
				type_of_facility_tb_treatment: {
					required: "Type of facility from where the patient is receiving TB treatment is Required."
				},
				if_r_resistant: {
					required: "If R resistant, LPA Done is Required."
				},
				follow_up_sputum: {
					required: "Follow-up Sputum / other investigation is Required."
				},
				date_of_follow_up_sputum: {
					required: "Date of Follow-up Sputum / other investigation is Required."
				},
				date_of_tb_treatment_completion: {
					required: "Date of TB treatment completion is Required.",
					greaterThan:"Date Should Not Be Smaller Than Date of Starting ATT."
				},
				treatment_outcome: {
					required: "Treatment outcome is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#tb_register_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#tb_register_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#tb_register_form")[0]);	
		}
	});

	/* ---- END: Form Validation ON Click ----- */

})(window);