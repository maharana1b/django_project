(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {
		// Form Validation Check And Active
		form_validation();

		$(".basic_date").flatpickr({
			disableMobile: "true",
		});
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
				date_of_eac_session_conducted: {
					required: true
				},
				type_of_eac: {
					required: function(element){
						return $("#date_of_eac_session_conducted").val() != "";
					},
				},
				issues_identified: {
					required: function(element){
						return $("#date_of_eac_session_conducted").val() != "";
					},
				},
				name_of_counsellor: {
					required: function(element){
						return $("#date_of_eac_session_conducted").val() != "";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				date_of_eac_session_conducted: {
					required: "Date Of EAC Session Conducted is Required."
				},
				type_of_eac: {
					required: "Type of EAC is Required."
				},
				issues_identified: {
					required: "Issues Identified is Required."
				},
				name_of_counsellor: {
					required: "Name of Counsellor is Required."
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
			var formData = new FormData($("#eac_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window);