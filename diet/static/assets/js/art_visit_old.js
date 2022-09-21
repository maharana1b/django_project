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

	//Number Only
	$('.number_only').bind('keyup paste', function(){
		this.value = this.value.replace(/[^0-9]/g, '');
	});

	$('.number_only').keypress(function (e) {    
		var charCode = (e.which) ? e.which : event.keyCode    
		if (String.fromCharCode(charCode).match(/[^0-9]/g))    
			return false;
	});

	//Number with dot
	$('.num_with_dot').bind('keyup paste', function(){
		this.value = this.value.replace(/[^0-9.]/g, '');
	});

	$('.num_with_dot').keypress(function (e) {    
		var charCode = (e.which) ? e.which : event.keyCode    
		if (String.fromCharCode(charCode).match(/[^0-9.]/g))    
			return false;
	});

	$("#date_of_visit").change(function(event) {
		/* Act on the event */

		// Due Date of visit at ARTC Date Picker Set
		$(".max_six_month").flatpickr({
			disableMobile: "true",
			// date of visit date select min date after 1 day
			minDate: new Date($(this).val()).fp_incr(1),
			// date of visit date select than max 180 days
			maxDate: new Date($(this).val()).fp_incr(180)
		});
	});

	// Hide Show Field
	$("#four_s_screening_conduted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_screening_conducted").removeClass('d-none');
		}else{
			$(".is_screening_conducted").addClass('d-none');
		}
	});

	$("#blood_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_blood_test_conducted").removeClass('d-none');
		}else{
			$(".is_blood_test_conducted").addClass('d-none');
		}
	});

	$("#liver_function_test").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_liver_function_test").removeClass('d-none');
		}else{
			$(".is_liver_function_test").addClass('d-none');
		}
	});

	$("#c_reactive_protein_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_c_reactive_protein_conducted").removeClass('d-none');
		}else{
			$(".is_c_reactive_protein_conducted").addClass('d-none');
		}
	});

	$("#hbv_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_hbv_test_conducted").removeClass('d-none');
		}else{
			$(".is_hbv_test_conducted").addClass('d-none');
		}
	});

	$("#hcv_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_hcv_test_conducted").removeClass('d-none');
		}else{
			$(".is_hcv_test_conducted").addClass('d-none');
		}
	});

	$("#tb_lam_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_tb_lam_test_conducted").removeClass('d-none');
		}else{
			$(".is_tb_lam_test_conducted").addClass('d-none');
		}
	});

	$("#craig_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_craig_test_conducted").removeClass('d-none');
		}else{
			$(".is_craig_test_conducted").addClass('d-none');
		}
	});

	$("#syphilis_test_conducted").change(function(event) {
		/* Act on the event */
		if($(this).val().toLowerCase() == "yes"){
			$(".is_syphilis_test_conducted").removeClass('d-none');
		}else{
			$(".is_syphilis_test_conducted").addClass('d-none');
		}
	});

	/* ---- BEING: Validation Method ---- */

	// Alphanumeric
	$.validator.addMethod(
		"alphanumeric",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
		},
		"Alphanumeric Only Allowed."
	);

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

	/* ---- END: Validation Method ---- */


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
		$("#art_visit_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				date_of_visit: {
					required: true
				},
				plhas_visit_status: {
					required: true
				},
				no_of_pills: {
					required: true,
					maxlength: 3,
					minlength: 1,
					digits:true
				},
				cd4_test_conducated: {
					required: true,
				},
				cd4_count: {
					required: function(element){
						return $("#cd4_test_conducated").val().toLowerCase() == "yes";
					},
					digits:true,
					min:1,
					max:1500,
					minlength:1,
					maxlength:4
				},
				viral_load: {
					required: function(element){
						return $("#cd4_test_conducated").val().toLowerCase() == "yes";
					},
				},
				reason_viral_load: {
					required: function(element){
						return $("#cd4_test_conducated").val().toLowerCase() == "yes";
					},
				},
				viral_load_count: {
					required: function(element){
						return $("#cd4_test_conducated").val().toLowerCase() == "yes";
					},
					digits:true,
					min:1,
					max:1500,
					minlength:1,
					maxlength:4
				},
				height: {
					required: true,
					maxlength:5,
					minlength:1
				},
				weight: {
					required: true,
					maxlength:3,
					minlength:1
				},
				systolic: {
					digits:true,
					required: true,
					maxlength:3,
					minlength:1
				},
				diastolic: {
					digits:true,
					required: true,
					maxlength:3,
					minlength:1
				},
				four_s_screening_conduted: {
					required: false
				},
				fever: {
					required: function(element){
						return $("#four_s_screening_conduted").val().toLowerCase() == "yes";
					},
				},
				cough: {
					required: function(element){
						return $("#four_s_screening_conduted").val().toLowerCase() == "yes";
					},
				},
				four_s_screening: {
					required: function(element){
						return $("#four_s_screening_conduted").val().toLowerCase() == "yes";
					},
				},
				blood_test_conducted: {
					required: false,
				},
				hemoglobin: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					minlength:1,
					maxlength:5
				},
				fasting: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					minlength:1,
					maxlength:5
				},
				post_prandial: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					minlength:1,
					maxlength:5
				},
				random: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					minlength:1,
					maxlength:5
				},
				serum_creatinine: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					minlength:1,
					maxlength:5
				},
				total_cholestrol: {
					required: function(element){
						return $("#blood_test_conducted").val().toLowerCase() == "yes";
					},
					digits:true,
					min:1,
					max:1500,
					minlength:1,
					maxlength:5
				},
				liver_function_test: {
					required: true
				},
				s_bilirubin: {
					required: function(element){
						return $("#liver_function_test").val().toLowerCase() == "yes";
					},
				},
				sgot_ast: {
					required: function(element){
						return $("#liver_function_test").val().toLowerCase() == "yes";
					},
				},
				sgpt_alt: {
					required: function(element){
						return $("#liver_function_test").val().toLowerCase() == "yes";
					},
				},
				c_reactive_protein_conducted: {
					required: true
				},
				c_reactive_protein: {
					required: function(element){
						return $("#c_reactive_protein_conducted").val().toLowerCase() == "yes";
					},
				},
				hbv_test_conducted: {
					required: false,
				},
				result_of_hbv_test: {
					required: function(element){
						return $("#hbv_test_conducted").val().toLowerCase() == "yes";
					},
				},
				hcv_test_conducted: {
					required: true,
				},
				result_of_hcv_test: {
					required: function(element){
						return $("#hcv_test_conducted").val().toLowerCase() == "yes";
					},
				},
				tb_lam_test_conducted: {
					required: true,
				},
				result_of_tb_lam_test: {
					required: function(element){
						return $("#tb_lam_test_conducted").val().toLowerCase() == "yes";
					},
				},
				craig_test_conducted: {
					required: true,
				},
				result_of_craig: {
					required: function(element){
						return $("#craig_test_conducted").val().toLowerCase() == "yes";
					},
				},
				cryptococcal_meningitis_date: {
					required: function(element){
						return $("#result_of_craig").val().toLowerCase() == "positive";
					},
				},
				cryptococcal_meningitis_place: {
					required: function(element){
						return $("#result_of_craig").val().toLowerCase() == "positive";
					},
					alphanumeric:true,
					minlength:3,
					maxlength:100
				},
				dia_crptococcal_meningitis: {
					required: function(element){
						return $("#result_of_craig").val().toLowerCase() == "positive";
					}
				},
				due_date_of_visit_at_artc: {
					required: true,
					greaterThan:"#date_of_visit",
				},
				any_oi: {
					required: false,
				},
				syphilis_test_conducted: {
					required: true,
				},
				syphilis: {
					required: function(element){
						return $("#syphilis_test_conducted").val().toLowerCase() == "yes";
					}
				},
				indication_for_adm: {
					required: false
				},
				who_staging: {
					required: true
				},
				co_morbidity: {
					required: false
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				date_of_visit: {
					required: "Date of Visit is Required."
				},
				plhas_visit_status: {
					required: "PLHAs Visit Status is Required."
				},
				no_of_pills: {
					required: "No of Pills Remaining With PLHAs is Required."
				},
				cd4_test_conducated: {
					required: "CD4 Test Conducted is Required."
				},
				cd4_count: {
					required: "CD4 Count is Required."
				},
				viral_load: {
					required: "Viral load Test Conducted is Required."
				},
				viral_load_count: {
					required: "Viral Load Count is Required."
				},
				height: {
					required: "Height is Required.",
				},
				weight: {
					required: "Weight is Required.",
				},
				systolic: {
					required: "Systolic is Required.",
				},
				diastolic: {
					required: "Diastolic is Required.",
				},
				four_s_screening_conduted: {
					required: "4S Screening Conduted is Required.",
				},
				fever: {
					required: "Fever is Required.",
				},
				cough: {
					required: "Cough is Required.",
				},
				four_s_screening: {
					required: "4S Screening is Required.",
				},
				blood_test_conducted: {
					required: "Blood Test Conducted is Required.",
				},
				hemoglobin: {
					required: "Hemoglobin is Required.",
				},
				fasting: {
					required: "Fasting is Required.",
				},
				post_prandial: {
					required: "Post Prandial is Required.",
				},
				random: {
					required: "Random is Required.",
				},
				serum_creatinine: {
					required: "Serum Creatinine is Required.",
				},
				total_cholestrol: {
					required: "Total Cholestrol is Required.",
				},
				liver_function_test: {
					required: "Liver Function Test Conducted is Required.",
				},
				s_bilirubin: {
					required: "S. Bilirubin is Required.",
				},
				sgot_ast: {
					required: "SGOT(AST) is Required.",
				},
				sgpt_alt: {
					required: "SGPT(ALT) is Required.",
				},
				c_reactive_protein_conducted: {
					required: "C Reactive Protein Conducted is Required.",
				},
				c_reactive_protein: {
					required: "C Reactive Protein is Required.",
				},
				hbv_test_conducted: {
					required: "HBV Test Conducted is Required.",
				},
				result_of_hbv_test: {
					required: "Result of HBV Test is Required.",
				},
				hcv_test_conducted: {
					required: "HCV Test Conducted is Required.",
				},
				result_of_hcv_test: {
					required: "Result of HCV Test is Required."
				},
				tb_lam_test_conducted: {
					required: "TB LAM test conducted is Required."
				},
				result_of_tb_lam_test: {
					required: "Result of TB LAM Test is Required."
				},
				craig_test_conducted: {
					required: "CrAIG test conducted is Required."
				},
				result_of_craig: {
					required: "Result of CrAIG is Required."
				},
				cryptococcal_meningitis_date: {
					required: "Referral details for Cryptococcal Meningitis (Date) is Required."
				},
				cryptococcal_meningitis_place: {
					required: "Referral details for Cryptococcal Meningitis (Place) is Required."
				},
				dia_crptococcal_meningitis: {
					required: "Referral details for Cryptococcal Meningitis (Diagnosis of Crptococcal Meningitis) is Required."
				},
				due_date_of_visit_at_artc: {
					required: "Due Date of visit at ARTC is Required.",
					greaterThan:"Date should not be smaller than Date of visit (Current month).",
				},
				any_oi: {
					required: "Any OI is Required.",
				},
				syphilis_test_conducted: {
					required: "Syphilis Test Conducted is Required.",
				},
				syphilis: {
					required: "Syphilis is Required.",
				},
				indication_for_adm: {
					required: "Indication For ADM is Required.",
				},
				who_staging: {
					required: "WHO Staging is Required.",
				},
				co_morbidity: {
					required: "Co-Morbidity is Required.",
				},
			}
		});
	}// Function END 

	function clear_value() {
		// when element hide than empty value.
		$("#art_visit_form div.d-none .form-group input").val('');
		$("#art_visit_form div.d-none .form-group select").val('');
	}

	$(document).on("click", "#reg_form_submit_btn", function (event) {
		event.preventDefault();
		form_validation();		
		var validate = $("#art_visit_form").valid();
		if (validate == true) {
			var formData = new FormData($("#art_visit_form")[0]);
		}
	});

	/* ---- END: ART Registration Form Validation ON Click ----- */
})(window);