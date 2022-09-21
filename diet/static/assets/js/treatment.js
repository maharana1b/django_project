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

		// Select DropDown Data Set
		treatment_regimen_set();
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

	// Alphanumeric
	$.validator.addMethod(
		"alphanumeric",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
		},
		"Alphanumeric Only Allowed."
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
		$("#treatment_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				date_of_start_of_pre_emptive_therapy: {
					required: true
				},
				date_of_completion_of_pre_emptive_therapy: {
					required: false,
					greaterThan:"#date_of_start_of_pre_emptive_therapy"
				},
				treatment_initiated_regimen: {
					required: false,
				},
				date_of_treatment_regiemen_change: {
					required: false,
				},
				changed_treatment_regimen: {
					required: false,
				},
				reasons_for_change_of_treatment_regimen: {
					required: function(element){
						return $("#date_of_treatment_regiemen_change").val().toLowerCase() != "";
					},
				},
				treatment_line_current: {
					required: true,
				},
				present_arv_drug_regimen: {
					required: true,
				},
				single_drugs: {
					required: function(element){
						return $("#treatment_line_current").val().toLowerCase() == "single drug";
					},
				},
				date_of_initiation_on_single_drugs: {
					required: function(element){
						return $("#treatment_line_current").val().toLowerCase() == "single drug";
					},
				},
				reasons_for_single_drugs: {
					required: function(element){
						return $("#treatment_line_current").val().toLowerCase() == "single drug";
					},
					alphanumeric:true,
					maxlength:100
				},
				diabetes: {
					required: false,
				},
				hypertention: {
					required: false,
				},
				cardiovascular_disease: {
					required: false,
				},
				cpt_status: {
					required: false,
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				date_of_start_of_pre_emptive_therapy: {
					required: "Date Of Start Of Pre-Emptive Therapy is Required."
				},
				date_of_completion_of_pre_emptive_therapy: {
					required: "Date Of Completion Of Pre-Emptive Therapy is Required.",
					greaterThan:"Date should not be smaller than date starting Pre-Emptive Therapy."
				},
				treatment_initiated_regimen: {
					required: "Treatment initiated - Regimen is Required.",
				},
				date_of_treatment_regiemen_change: {
					required: "Date Of Treatment Regiemen Change is Required.",
				},
				changed_treatment_regimen: {
					required: "Changed Treatment Regimen is Required.",
				},
				reasons_for_change_of_treatment_regimen: {
					required: "Reasons For Change Of Treatment Regimen is Required.",
				},
				treatment_line_current: {
					required: "Treatment Line Current is Required.",
				},
				present_arv_drug_regimen: {
					required: "Present ARV Drug Regimen is Required.",
				},
				single_drugs: {
					required: "If on single drugs, Name of Single Drugs is Required.",
				},
				date_of_initiation_on_single_drugs: {
					required: "Date of Initiation On Single Drugs is Required.",
				},
				reasons_for_single_drugs: {
					required: "Reasons for Single Drugs is Required.",
				},
				diabetes: {
					required: "Diabetes is Required.",
				},
				hypertention: {
					required: "Hypertention is Required.",
				},
				cardiovascular_disease: {
					required: "Cardiovascular Disease is Required.",
				},
				cpt_status: {
					required: "CPT status is Required.",
				},
			}
		});
	}// Function END 

	// Submit Check Validation
	$(document).on("click", "#treatment_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#treatment_form").valid();
		if (validate == true) {
			//form is valid

			// Form Submit Alert
			alert("Form Submitted.");

			// Get While Form Data
			var formData = new FormData($("#treatment_form")[0]);	
		}
	});

	function fetch_data() {
		var getData = $.ajax({
			type: 'GET',
			url: '../assets/json/treatment_regimen.json',
			dataType: 'json',
			async: false,
			cache: false,
			contentType: false,
			processData: false,
		})
		.done(function(data) {
			return data
		}).responseJSON;
		return getData;
	}

	function treatment_regimen_set() {
		var JSONdata = fetch_data();
		var tr_Options = "";
		var journal_tr_IdArray = [];

		tr_Options = "<option value='' selected>Select</option>";
		$.each(JSONdata, function(key, row){
			if( journal_tr_IdArray.indexOf(row.treatment_regimen) == -1 ){
				tr_Options += '<option value="'+row.treatment_regimen+'">'+row.treatment_regimen+'</option>';
				journal_tr_IdArray.push(row.treatment_regimen);
			}
		});

		// Treatment Regimen Options Set
		$('#treatment_initiated_regimen').html(tr_Options);
		$('#changed_treatment_regimen').html(tr_Options);
		$('#present_arv_drug_regimen').html(tr_Options);
	}

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window)