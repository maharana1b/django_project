(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {
		$(".dis_fut_dt").flatpickr({
			dateFormat: "d-m-Y",
			maxDate: "today",
			allowInput: 'true',
            allowInvalidPreload: 'true',
			// onReady: function (selectedDates, dateStr, instance) {
			// 	if (instance.isMobile) {
			// 		$(instance.mobileInput).attr('step', null);
			// 	}
			// },
			disableMobile: "true",
			// wrap: true,
		});
		// Form Validation Check And Active
		form_validation();
		// Select DropDown Data Set
		fetch_data();
		state_district_set();
	});

	$("#transferred_in").change(function(event) {
		/* Act on the event */
		if( $(this).val() == "2" ){
			$('.trans_in').removeClass('d-none');
		}else{
			$('.trans_in').addClass('d-none');
			clear_value();
		}
	});



	$("#status_pre_art_care").change(function(event) {
		/* Act on the event */
		if($(this).val() == "2" || $("#status_art_care").val() == '2'){
			$(".is_died").removeClass('d-none');
			$('.is_transferred_artc').addClass('d-none');
		}else{
			$('.is_died').addClass('d-none');
			$('.is_reason_death').addClass('d-none');
			$('.is_of_death').addClass('d-none');
			$('.is_transferred_artc').addClass('d-none');
			clear_value();
		}

		if($(this).val() == "5"){
			$(".is_transfer_out").removeClass('d-none');
		}else{
			$('.is_transfer_out').addClass('d-none');
			$('.is_of_death').addClass('d-none');
			$('.is_transferred_artc').addClass('d-none');
			clear_value();
		}
	});

	$("#status_art_care").change(function(event) {
		/* Act on the event */
		if($(this).val() == "2" || $("#status_pre_art_care").val() == '2'){
			$(".is_died").removeClass('d-none');
			$('.is_transferred_artc').addClass('d-none');
		}else{
			$('.is_died').addClass('d-none');
			$('.is_reason_death').addClass('d-none');
			$('.is_of_death').addClass('d-none');
			$('.is_transferred_artc').addClass('d-none');
			clear_value();
		}

		if($(this).val() == "6"){
			$(".is_transfer_out").removeClass('d-none');
		}else{
			$('.is_transfer_out').addClass('d-none');
			clear_value();
		}
	});

	$("#date_of_death").change(function(event) {
		/* Act on the event */
		if($(this).val() !=""){
			$(".is_of_death").removeClass('d-none');
		}else{
			$(this).val('');
			$('.is_of_death').addClass('d-none');
			clear_value();
		}
	});

	$("#cause_of_death").change(function(event) {
		/* Act on the event */
		if($(this).val() == "e40b2369-ed8e-4cb2-9977-ff266738413c"){
			$(".is_reason_death").removeClass('d-none');
		}else{
			$('.is_reason_death').addClass('d-none');
			clear_value();
		}
	});

	$("#his_take_pvt_ngo").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "2"){
			$(".is_dt_of_ngo").removeClass('d-none');
		}else{
			$('.is_dt_of_ngo').addClass('d-none');
			clear_value();
		}
	});
 
	if(addform.toLowerCase() == 'true'){
		$("#status_pre_art_care").change(function(event) {
			/* Act on the event */
			if($(this).val() == "6"){
				$(".is_art_reg").removeClass('d-none');
			}else{
				$('.is_art_reg').addClass('d-none');
				clear_value();
			}
		});
	
	}
	else{
		$("#status_pre_art_care").change(function(event) {
			if($(this).val() == "6"){
				$(".is_art_reg").removeClass('d-none');
			}
		})
	}

	$("#diagnosed_tb").change(function(event) {
		/* Act on the event */
		if($(this).val() == "2"){
			$(".is_diagnosed").removeClass('d-none');
		}else{
			$('.is_diagnosed').addClass('d-none');
			clear_value();
		}
	});

	$("#transferred_in_status").change(function(event) {
		if($(this).val() == "2"){
			$(".is_art_reg").removeClass('d-none');
		}else{
			$('.is_art_reg').addClass('d-none');
				clear_value();
		}
	});

	$("#trans_out_conf_date").change(function(event) {
		/* Act on the event */
		if($(this).val() != "" || $("#status_pre_art_care").val() == "5"){
			$(".is_transferred_artc").removeClass('d-none');
		}else{
			$('.is_transferred_artc').addClass('d-none');
			clear_value();
		}
	});

	/* ---- BEING: Validation Method ---- */
	// Alphabets with special character (only apostrophe ‘ and space allowed)
	$.validator.addMethod(
		"alpa_asp_sp",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z ']+$/i.test(value);
		},
		"Only apostrophe ‘ and space allowed."
	);

	// Alphanumeric with special character (only back slash / allowed)
	$.validator.addMethod(
		"alpnum_bck_sls",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9/']+$/i.test(value);
		},
		"Only back slash / allowed."
	);

	// Alphanumeric with special character no space Allowed
	$.validator.addMethod(
		"alpnum_specil_no_space",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9/'"._^%$#!~@,-=+*]+$/i.test(value);
		},
		"Space not allowed."
	);

	// alphanumeric and hyphen
	$.validator.addMethod(
		"alpnum_dash",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9-]+$/i.test(value);
		},
		"Alphanumeric with special character (only hyphen allowed)."
	);

	// Alphanumeric with special characters (/ - allowed )
	$.validator.addMethod(
		"alpnum_slas_dash",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9-/]+$/i.test(value);
		},
		"Alphanumeric with special characters (/ - allowed )."
	);

	
	// Date Lessthan Equal Check
	$.validator.addMethod(
		"updatevalue",
		function (value, element, params) {
			if(value == "4"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	$.validator.addMethod(
		"updatevalue_3",
		function (value, element, params) {
			if(value == "3"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	$.validator.addMethod(
		"updatecausedeath",
		function (value, element, params) {
			if(value == "8da296f8-8333-4230-940b-d5b531bcdbad"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	$.validator.addMethod(
		"transferredstateupdate",
		function (value, element, params) {
			if(value == "2881"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	// Date Lessthan Equal Check
	$.validator.addMethod(
		"transferreddistrictupdate",
		function (value, element, params) {
			if(value == "2882"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	// Date Lessthan Equal Check
	$.validator.addMethod(
		"transferredartupdate",
		function (value, element, params) {
			if(value == "2883"){
				return false
			}else{
				return true
			}
		},
		"This option is added for data import purpose. Please select a different option."
	);

	$.validator.addMethod(
		"exlessThan",
		function (value, element, params) {
			if (!/Invalid|NaN/.test(new Date(value))) {
				return new Date(value) < new Date($(params).val());
			}
			return (isNaN(value) && isNaN($(params).val())) || Number(value) < Number($(params).val());
		},
		"Date Must be less than {0}."
	);

	// Minimum 3 Character Or Maximum 50 Character Allowed
	$.validator.addMethod('three_min_fifty_max', function (value) { 
		return /^.{3,50}$/i.test(value);
	}, 'Please enter minimum 3 or maximum 50 character.');

	/* ---- END: Validation Method ---- */

	/* ---- BEING: ART Registration Form Validation ON Click ----- */

	$.validator.setDefaults({
		errorElement: "span",
		errorPlacement: function (error, element) {
			if (element.hasClass('js-flatpickr') && element.next('.js-flatpickr').length) {
				error.insertAfter(element.next('.js-flatpickr'));
			}else{
				error.addClass("invalid-feedback");
				element.closest(".form-group").append(error);
			}
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
		$("#art_registration_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				patient_name: {
					required: true,
					maxlength: 50,
					minlength: 3,
					alpa_asp_sp: true,
				},
				last_visit_date: {
					required: true,
					validDate: '#date_of_registration',
					validDatetoday:  '#date_of_registration'
					// step: false,
					// date:true,
				},
				pre_art_no: {
					required: true,
					maxlength: 50,
					minlength: 3,
					alpnum_bck_sls: true,
				},
				status_pre_art_care: {
					required: true,
				},
				date_of_death: {
					required: true,
					validDate: '#date_of_death',
					validDatetoday:  '#date_of_death',
					greaterThan:"#date_of_registration"
					// step: false,
				},
				transferred_in: {
					required: true,
				},
				art_reg_diabetes: {
					required: true,
				},
				art_reg_hypertention: {
					required: true,
				},
				transferred_in_state: {
					required: true,
					transferredstateupdate: '#transferred_in_state',
				},
				transferred_in_district: {
					required: true,
					transferreddistrictupdate: '#transferred_in_district',
				},
				transferred_in_art: {
					required: true,
					transferredartupdate: '#transferred_in_art',
				},
				date_art_init: {
					required: true,
					validDate: '#date_art_init',
					validDatetoday:  '#date_art_init',
					// step: false,
				},
				his_take_pvt_ngo: {
					required: true,
					updatevalue_3:  '#his_take_pvt_ngo',
				},
				dt_of_pvt_ngo: {
					required: false,
					validDate: '#dt_of_pvt_ngo',
					validDatetoday: '#validDate',
					lessThan: '#date_of_registration'
					// step: false,
				},
				confirm_hiv_date: {
					required: true,
					validDate: '#confirm_hiv_date',
					validDatetoday:  '#confirm_hiv_date',
					lessThan:"#date_of_registration"
					// step: false,
				},
				transferred_in_status: {
					required: true
				},
				place_of_hiv: {
					required: true,
					minlength:3, 
					maxlength:50,
				},
				pid_num: {
					required: true,
					minlength:1, 
					maxlength:70,
					// alpnum_specil_no_space:true
				},
				hiv_report: {
					required: true,
					updatevalue:"#hiv_report",
				},
				cause_of_death:{
					required: true,
					updatecausedeath:"#cause_of_death",
				},
				art_reg_no: {
					required: true,
					minlength:1,
					maxlength:50,
					alpnum_bck_sls:true
				},
				date_start_art: {
					required: true,
					validDate: '#date_start_art',
					validDatetoday: '#date_start_art'
					// step: false,
				},
				status_art_care: {
					required: true,
				},
				diagnosed_tb: {
					required: true,
					updatevalue_3: '#diagnosed_tb'
				},
				nikshay_id: {
					required: false,
					digits: true,
					minlength:8,
					maxlength:8
				},
				samvaad_id: {
					required: false,
					digits: true,
					minlength:1,
					maxlength:20
				},
				trans_out_conf_date: {
					required: true,
					validDate: '#trans_out_conf_date',
					validDatetoday: '#trans_out_conf_date',
					greaterThan:"#date_of_registration"
					// step: false,
				},
				trans_artc_code: {
					required: true,
					minlength:3,
					maxlength:100,
					alpnum_dash:true,
				},
				disclosure_with_family:{
					required: true,
					updatevalue_3:"#disclosure_with_family",
				},
				reason_death: {
					required: true,
					minlength:3,
					maxlength:100,
					// alpnum_slas_dash:true
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				patient_name: {
					required: "Patient Name is Required.",
					asp_sp: "Only apostrophe ‘ and space allowed.",
				},
				
				last_visit_date: {
					required: "Date of Registration is Required.",
				},
				pre_art_no: {
					required: "Pre ART No is Required.",
				},
				status_pre_art_care: {
					required: "Status in Pre-ART care is Required.",
				},
				transferred_in: {
					required:"Transferred-in is Required.",
				},
				transferred_in_status:{
					required:"Transfer in status is Required.",
				},
				transferred_in_state: {
					required:"State is Required.",
				},
				transferred_in_district: {
					required:"District is Required.",
				},
				transferred_in_art: {
					required: "Transfer-In from ART is Required.",
				},
				date_art_init: {
					required:"Date of ART initiation (Transfer - In) is Required.",
				},
				his_take_pvt_ngo: {
					required:"History to taken treatment from Private/NGO is Required.",
				},
				dt_of_pvt_ngo: {
					required:"Date of ART initiation (if taken from Private/NGO) is Required.",
					lessThan:"Date should be same or smaller than date of registration."
				},
				confirm_hiv_date: {
					required:"Date of confirmed HIV+ Test is required.",
					lessThan:"Date should be same or smaller than date of registration"
				},
				place_of_hiv: {
					required:"Place of HIV test (ICTC Code) is Required.",
				},
				pid_num: {
					required: "PID Number is Required.",
				},
				hiv_report: {
					required: "HIV Report is Required.",
				},
				cause_of_death:{
					required: "Cause of death is Required.",
				},
				art_reg_no: {
					required: "ART Reg No is Required.",
				},
				status_art_care: {
					required: "Status in ART care is Required.",
				},
				date_start_art: {
					required: "Date of Start of ART is Required.",
				},
				diagnosed_tb: {
					required: "Diagnosed with TB is Required.",
				},
				nikshay_id: {
					required: "Nikshay ID is Required.",
				},
				samvaad_id: {
					required: "Samvaad Application ID is Required.",
				},
				trans_out_conf_date: {
					required: "Transfer out confirmation Date is Required.",
					greaterThan: "Date should be greater then date of Registration.",
				},
				trans_artc_code: {
					required: "Transferred ARTC code is Required."
				},
				disclosure_with_family:{
					required: "Disclosure with Family is Required."
				},
				art_reg_diabetes:{
					required: "Diabetes is Required.",
				},
				art_reg_hypertention:{
					required: "Hypertention is Required.",
				},
				date_of_death: {
					required: "Date of Death/Date of Death Reported is Required.",
					greaterThan: "Date should be greater then date of Registration.",
				},
			},
		});
	}

	function clear_value() {
		// when element hide than empty value.
		$("#art_registration_form div.d-none .form-group input").val('');
		$("#art_registration_form div.d-none .form-group select").val('');
	}

	$(document).on("click", "#reg_form_submit_btn", function (event) {
		event.preventDefault();
		form_validation();		
		var validate = $("#art_registration_form").valid();
		if (validate == true) {
			var formData = new FormData($("#art_registration_form")[0]);
		}
	});
	/* ---- END: ART Registration Form Validation ON Click ----- */


})(window);