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

	$("#date_of_last_mentrual_period").change(function(event) {
		/* Act on the event */

		// Due Date of visit at ARTC Date Picker Set
		$(".max_nine_month").flatpickr({
			disableMobile: "true",
			// date of visit date select min date after 1 day
			minDate: new Date($(this).val()).fp_incr(1),
			// date of visit date select than max 180 days
			maxDate: new Date($(this).val()).fp_incr(280)
		});
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
		$("#pptct_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				current_pregnancy_status: {
					required: true
				},
				date_of_last_mentrual_period: {
					required: function(element){
						return $("#current_pregnancy_status").val().toLowerCase() == "anc";
					},
				},
				date_of_expected_date_of_delivery: {
					required: function(element){
						return $("#date_of_last_mentrual_period").val() != "";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				current_pregnancy_status: {
					required: "Current Pregnancy Status is Required."
				},
				date_of_last_mentrual_period: {
					required: "Date of Last Mentrual Period (LMP) is Required.",
				},
				date_of_expected_date_of_delivery: {
					required: "Date of Expected Date of Delivery (EDD) is Required.",
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#pptct_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#pptct_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#pptct_form")[0]);	
		}
	});

	/* ---- END: Form Validation ON Click ----- */

})(window);