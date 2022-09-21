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
		$("#lac_visit_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				date_of_enrollment_in_lac: {
					required: true
				},
				date_of_visit_to_lac: {
					required: true,
					greaterThan:"#date_of_enrollment_in_lac",
				},
				due_date_of_visit: {
					required: true,
					greaterThan:"#date_of_visit_to_lac",
				},
				adherence: {
					required: function(element){
						return $("#date_of_visit_to_lac").val() != "";
					},
				},
				current_status_in_lac: {
					required: true,
				},
				four_s_screening: {
					required: function(element){
						return $("#date_of_visit_to_lac").val() != "";
					},
				},
				weight_loss_gain: {
					required: false,
				},
				fever: {
					required: true,
				},
				cough: {
					required: true,
				},
				referred_for_tb_testing: {
					required: function(element){
						return $("#four_s_screening").val().toLowerCase() == "4S +ve";
					},
				},
				type_of_test: {
					required: function(element){
						return $("#referred_for_tb_testing").val() != "";
					},
				},
				if_retained_by_nodal_artc_date: {
					required: false,
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				date_of_enrollment_in_lac: {
					required: "Date of enrollment in LAC is Required."
				},
				date_of_visit_to_lac: {
					required: "Date of visit to LAC is Required.",
					greaterThan:"Date Should be Greater Than Date of Enrollment in LAC."
				},
				due_date_of_visit: {
					required: "Due Date of visit is Required."
				},
				adherence: {
					required: "Adherence is Required."
				},
				current_status_in_lac:{
					required: "Current Status in LAC/LAC+ is Required.",
				},
				four_s_screening:{
					required: "4S Screening is Required.",
				},
				weight_loss_gain:{
					required: "Weight Loss/Gain is Required.",
				},
				fever:{
					required: "Fever is Required.",
				},
				cough:{
					required: "Cough is Required.",
				},
				referred_for_tb_testing:{
					required: "Referred for TB Testing (Current Month) is Required.",
				},
				type_of_test:{
					required: "Type of Test is Required.",
				},
				if_retained_by_nodal_artc_date:{
					required: "If retained by Nodal ARTC Date is Required.",
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#lac_visit_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#lac_visit_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#lac_visit_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */
})(window);