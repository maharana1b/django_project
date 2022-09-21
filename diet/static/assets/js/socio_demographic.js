(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {

		// On Page Load Focus on Complete Address Box
		$("#complete_address").focus();

		$(".dob_date_picker").flatpickr({
			allowInput:false,
			maxDate: "today",
			disableMobile: "true",
			// minDate: "today",
			disable:[function(date) {
				// Disable Current Date
				var today = new Date();
				today = Date.parse(today.getMonth()+1+'/'+today.getDate()+'/'+today.getFullYear());
				var selDate = Date.parse(date);
				if(selDate < today) {
					return false;
				}
				return true;
        	}]
		});

		// Form Validation Check And Active
		form_validation();
	});

	$("#registered_hrg").change(function(event) {
		/* Act on the event */
		if($(this).val() !=""){
			$(".is_registered_hrg").removeClass('d-none');
		}else{
			$(".is_registered_hrg").addClass('d-none');
		}
		clear_value();
	});

	$('#address_verified').change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == 'yes'){
			$('.is_address_verified_by').removeClass('d-none');
		}else{
			$('.is_address_verified_by').addClass('d-none');
		}
	});

	//Number Only
	$('.number_only').bind('keyup paste', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	$('.number_only').keypress(function (e) {    
		var charCode = (e.which) ? e.which : event.keyCode    
		if (String.fromCharCode(charCode).match(/[^0-9]/g))    
			return false;
	});

	/* ---- BEING: Validation Method ---- */

	// Alphanumeric with special characters (/ - allowed )
	$.validator.addMethod(
		"address",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9-,/'-#]+$/i.test(value);
		},
		"Alphanumeric with Special Characters (Comma, Back Slash, Space, Apostrophe, Hyphen, Hash)"
	);

	// lphanumeric And Space Allowed Only
	$.validator.addMethod(
		"alphanumeric_space",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9 ]+$/i.test(value);
		},
		"Alphanumeric And Space Allowed Only."
	);

	$.validator.addMethod(
		"alphanumeric_bslash",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9/]+$/i.test(value);
		},
		"Alphanumeric with special characters (back slash / allowed (No Spaces))."
	);

	$.validator.addMethod(
		"alphanumeric_bslash",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9/]+$/i.test(value);
		},
		"Alphanumeric with special characters (back slash / allowed (No Spaces))."
	);

	$.validator.addMethod(
		"not_zero",
		function (value, element) {
			return this.optional(element) || /^[1-9][0-9]*$/i.test(value);
		},
		"Pincode Not Start With Zero (0)."
	);

	/* ---- END: Validation Method ---- */


	/* ---- BEING: Socio Demographics Form Validation ON Click ----- */

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
		$("#socio_demographics_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			onfocus:function(element) {
				this.element(element);
			},
			rules: {
				complete_address: {
					required: true,
					minlength: 1,
					maxlength: 100,
					address: true,
				},
				tehsil: {
					required: false,
					minlength: 1,
					maxlength: 50,
					alphanumeric_space: true,
				},
				district: {
					required: true,
					minlength: 1,
					maxlength: 50,
					alphanumeric_space: true,
				},
				state: {
					required: true,
				},
				pincode:{
					required:true,
					not_zero:true,
					digits:true,
				},
				address_verified:{
					required:true,
				},
				address_verified_by:{
					required: function(element){
						return $("#address_verified").val().toLowerCase() == "yes";
					}
				},
				permanent_add: {
					required: true,
					minlength: 1,
					maxlength: 100,
					address: true,
				},
				permanent_add_tehsil: {
					required: false,
					minlength: 1,
					maxlength: 50,
					alphanumeric_space: true,
				},
				permanent_add_district: {
					required: true,
					minlength: 1,
					maxlength: 50,
					alphanumeric_space: true,
				},
				permanent_add_state: {
					required: true,
				},
				contact_one: {
					required: true,
					minlength: 10,
					maxlength: 10,
					digits:true
				},
				contact_two: {
					required: true,
					minlength: 10,
					maxlength: 10,
					digits:true
				},
				caregiver_contact: {
					required: false,
					minlength: 10,
					maxlength: 10,
					digits:true
				},
				aadhaar_card_no: {
					required: false,
					minlength: 12,
					maxlength: 12,
					digits:true
				},
				aadhaar_card_add: {
					required: false,
				},
				date_of_birth: {
					required: true,
				},
				gender: {
					required: true,
				},
				marital_status: {
					required: true,
				},
				category_caste: {
					required: false,
				},
				education: {
					required: true,
				},
				typology: {
					required: true,
				},
				cur_regular_partner: {
					required:false
				},
				registered_hrg: {
					required:false
				},
				name_of_ti: {
					required: function(element){
						return $("#registered_hrg").val() != "";
					}
				},
				kp_unique_code: {
					required: function(element){
						return $("#registered_hrg").val() != "";
					},
					alphanumeric_bslash:true
				},
				high_risk_behaviour: {
					required: function(element){
						return $("#registered_hrg").val() != "";
					}
				},
				hrg_behaviour: {
					required: function(element){
						return $("#registered_hrg").val() != "";
					}
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				complete_address: {
					required: "Complete Address Is Required.",
				},
				tehsil: {
					required: "Tehsil is Required.",
				},
				district: {
					required: "District is Required.",
				},
				state: {
					required: "State is Required.",
				},
				pincode:{
					required: "Pin Code is Required."
				},
				address_verified:{
					required: "Address Verified is Required."
				},
				address_verified_by:{
					required: "Address Verified By is Required."
				},
				permanent_add: {
					required: "Permanent Address is Required.",
				},
				permanent_add_tehsil: {
					required: "Permanent Address Tehsil is Required.",
				},
				permanent_add_district: {
					required: "Permanent Address District is Required.",
				},
				permanent_add_state: {
					required: "Permanent Address State is Required.",
				},
				contact_one: {
					required: "Contact Number 1 is Required.",
				},
				contact_two: {
					required: "Contact Number 2 is Required.",
				},
				caregiver_contact: {
					required: "Caregiver Contact is Required.",
				},
				aadhaar_card_no: {
					required: "Aadhar Card Number is Required.",
				},
				aadhaar_card_add: {
					required: "Aadhar Card Address is Required.",
				},
				date_of_birth: {
					required: "Date Of Birth is Required.",
				},
				gender: {
					required: "Gender is Required.",
				},
				marital_status: {
					required: "Marital Status is Required.",
				},
				category_caste: {
					required: "Category Caste is Required.",
				},
				education: {
					required: "Education is Required.",
				},
				typology: {
					required: "Typology is Required.",
				},
				cur_regular_partner: {
					required: "Current Regular Partner is Required.",
				},
				registered_hrg: {
					required: "Registered HRG is Required.",
				},
				name_of_ti: {
					required: "Name of TIs is Required.",
				},
				kp_unique_code: {
					required: "KP Unique Code is Required.",
				},
				high_risk_behaviour: {
					required: "High Risk Behaviour is Required.",
				},
				hrg_behaviour: {
					required: "Type of HRG Behaviour is Required.",
				},
			}
		});

		$(document).on("click", "#form_submit_btn", function (event) {
			event.preventDefault();
			form_validation();
			var validate = $("#socio_demographics_form").valid();
			if (validate == true) {
				var formData = new FormData($("#socio_demographics_form")[0]);
			}
		});
	}
	/* ---- END: Socio Demographics Form Validation ON Click ----- */

	function clear_value() {
		// when element hide than empty value.
		$("#socio_demographics_form div.d-none .form-group input").val('');
		$("#socio_demographics_form div.d-none .form-group select").val('');
	}
})(window);