(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {


		$(".dis_fut_dt").flatpickr({
			maxDate: "today",
			disableMobile: "true",
		});

		$("#ipt_start_date").change(function(event) {
			/* Act on the event */

			// Due Date of visit at ARTC Date Picker Set
			$(".max_six_month").flatpickr({
				// date of visit date select min date after 1 day
				minDate: new Date($(this).val()).fp_incr(1),
				// date of visit date select than max 180 days
				maxDate: new Date($(this).val()).fp_incr(180)
				disableMobile: "true",
			});
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
		$("#ipt_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				ipt_status: {
					required: true
				},
				ipt_start_date: {
					required: function(element){
						return $("#ipt_status").val().toLowerCase() == "yes";
					},
				},
				ipt_completed_date: {
					required: false,
					greaterThan:"#ipt_start_date"
				},
				ipt_outcome: {
					required: true
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				ipt_status: {
					required: "IPT Status is Required."
				},
				ipt_start_date: {
					required: "IPT Start Date is Required."
				},
				ipt_completed_date: {
					required: "IPT Completed Date is Required.",
					greaterThan:"Date should Not be Smaller Than IPT Start Date."
				},
				ipt_outcome: {
					required: "IPT Outcome is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#ipt_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#ipt_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#ipt_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window)