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
		$("#lac_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				whether_linked: {
					required: false
				},
				name_of_lac: {
					required: function(element){
						return $("#whether_linked").val().toLowerCase() == "link-out";
					},
				},
				date_of_link_out: {
					required: function(element){
						return $("#whether_linked").val().toLowerCase() == "link-out";
					},
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				whether_linked: {
					required: "Whether Linked to LAC/LAC+ is Required."
				},
				name_of_lac: {
					required: "Name Of LAC/LAC+ is Required."
				},
				date_of_link_out: {
					required: "Date of Link Out is Required."
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#lac_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#lac_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#lac_form")[0]);	
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */
})(window);