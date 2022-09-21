(function (window, undefined) {
	'use strict';

	// Page Load Execute 
	$(function() {
		$(".dis_fut_dt").flatpickr({
			maxDate: "today",
			disableMobile: "true",
		});

		$(".basic_date").flatpickr({
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

	$("#no_of_children").keyup(function(event) {
		/* Act on the event */
		if($(this).val() >= 1 ){
			$("#add_child_btn").prop("disabled", false);
		}else{
			$("#add_child_btn").prop("disabled", true);;
		}
	});

	/* ---- BEING: Validation Method ---- */

	// Alphanumeric with special characters (/ - allowed )
	$.validator.addMethod(
		"alpnum_slas_dash",
		function (value, element) {
			return this.optional(element) || /^[a-zA-Z0-9-/]+$/i.test(value);
		},
		"Alphanumeric with special characters (/ - allowed )."
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
		$("#family_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				spouse_status: {
					required: true
				},
				spouse_residing_status: {
					required: true
				},
				spouse_due_for_testing: {
					required: false
				},
				due_date_for_spouse_testing: {
					required: false
				},
				spouse_hiv_testing_date: {
					required: false
				},
				spouse_on_art_number: {
					required: function(element){
						return $("#spouse_status").val().toLowerCase() == "positive";
					},
				},
				artc_name_of_spouse: {
					required: function(element){
						return $("#spouse_status").val().toLowerCase() == "positive";
					},
				},
				family_id: {
					required:false,
					alpnum_slas_dash:true,
					minlength:3,
					maxlength:20
				},
				no_of_children: {
					required:false,
					minlength:1,
					maxlength:2
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				spouse_status: {
					required: "Spouse Status is Required."
				},
				spouse_residing_status: {
					required: "Spouse Residing Status is Required."
				},
				spouse_due_for_testing: {
					required: "Spouse Due For Testing is Required."
				},
				due_date_for_spouse_testing: {
					required: "Due Date For Spouse Testing is Required."
				},
				spouse_hiv_testing_date: {
					required: "Spouse Hiv Testing Date is Required."
				},
				spouse_on_art_number: {
					required: "Spouse On-ART Number is Required."
				},
				artc_name_of_spouse: {
					required: "ARTC name of Spouse is Required."
				},
				family_id: {
					required: "Family ID is Required."
				},
			}
		});
	}// Function END 

	// Child Form Validation
	function child_form_validation() {
		$("#child_add_form").validate({
			ignore:":not(:visible)",
			focusCleanup: true,
			onfocusout: function(element) {
				this.element(element);
			},
			rules: {
				child_date_of_birth: {
					required: true
				},
				child_gender: {
					required: true
				},
				child_for_hiv: {
					required: true
				},
				child_hiv_status: {
					required: true
				},
			},
			onkeyup: function(element) {
				this.element(element);
			},
			messages: {
				child_date_of_birth: {
					required: "Child Date of Birth is Required."
				},
				child_gender: {
					required: "Children Gender is Required."
				},
				child_for_hiv: {
					required: "Children Tested for HIV is Required."
				},
				child_hiv_status: {
					required: "HIV Status if Less Than 18 yrs is Required."
				},
			}
		});
	}

	$(document).on("click", "#family_form_submit_btn", function (event) {
		event.preventDefault();
		/* Act on the event */

		form_validation();		
		var validate = $("#family_form").valid();
		if (validate == true) {
			//form is valid
			var formData = new FormData($("#family_form")[0]);	
		}
	});

	$(document).on('click', '#add_child_modal_btn', function(event) {
		event.preventDefault();
		/* Act on the event */

		child_form_validation();
		var validate = $("#child_add_form").valid();
		console.log('===  family.js [208] ===', validate);
		//form is valid = true
		if (validate == true) {
			var formDataArr = $("#child_add_form").serializeArray(); // formData in Array Value
			var rowCount = $('#children_tbl tbody tr').length; // table body get row count
			var dataArr = {}; // create object for single object data
			++rowCount; // increment row count
			formDataArr.forEach((value, key) => {
				dataArr[value.name] = value.value;
			});
			var html = "<tr data-id=''> <th scope='row'>"+rowCount+"</th> <td>"+dataArr.child_date_of_birth+"</td> <td>"+dataArr.child_gender+"</td> <td>"+dataArr.child_for_hiv+"</td> <td>"+dataArr.child_hiv_status+"</td> <td> <div class='d-flex'> <a class='btn btn-sm btn-dark mr-25' id='edit_row'>Edit</a> <a class='btn btn-sm btn-danger' id='delete_row'>Delete</a> </div> </td> </tr>";
			$("#children_tbl tbody").append(html); // row add
			$('#child_add_modal').modal('hide'); // Close Modal
			$('#child_add_form').trigger("reset"); // reset from values
			table_reindex(); // table re-index
		}
	});

	// Modal Close Than Reset Form Values
	$('#child_add_modal').on('hidden.bs.modal', function () {
		$('#child_add_form').trigger("reset"); // reset modal form
		setTimeout(function() {
			$("#add_child_modal_btn").removeClass('d-none'); // show save button
			$("#save_child_modal_btn").addClass('d-none'); // hide add button
		}, 1000);
		$('form#child_add_form span').remove(); // Remove Error Message
		$('form#child_add_form :input').removeClass('is-invalid'); // Remove Validation Class
		// var validator = $("#child_add_form").validate();
		// validator.resetForm(); // reset validation error
	});

	// Delete Row
	$(document).on('click', '#delete_row', function(event) {
		event.preventDefault();
		/* Act on the event */
		
		$(this).parent().parent().parent().remove(); // Remove Table Row
		table_reindex(); // table re-index
	});

	$("#children_tbl").on('click','#edit_row',function(){

         // get the current row data
         var currentRow = $(this).closest("tr"); 
         var id = currentRow.data('id')
         var no_index = currentRow.find("th:eq(0)").html(); // get current row 1st table cell TH value
         var child_date_of_birth = currentRow.find("td:eq(0)").html(); // get current row 2st table cell TD value
         var child_gender = currentRow.find("td:eq(1)").html(); // get current row 3nd table cell TD value
         var child_for_hiv = currentRow.find("td:eq(2)").html(); // get current row 4rd table cell  TD value
         var child_hiv_status = currentRow.find("td:eq(3)").html(); // get current row 5rd table cell  TD value

         $("#edit_row").val(id);  // Edit ID set

         // set modal data 
         $("#child_date_of_birth").val(child_date_of_birth);
         $("#child_gender").val(child_gender);
         $("#child_for_hiv").val(child_for_hiv);
         $("#child_hiv_status").val(child_hiv_status);

         // button hide/show
         $("#add_child_modal_btn").addClass('d-none');
         $("#save_child_modal_btn").removeClass('d-none');

         // modal open
         $("#child_add_modal").modal("show");
    });

	$(document).on('click', "#save_child_modal_btn", function(event) {
		event.preventDefault();
		/* Act on the event */
		var id = $("#edit_row").val(); // get edit tr data-id
		child_form_validation();
		var validate = $("#child_add_form").valid();
		//form is valid = true
		if (validate == true) {
			var child_date_of_birth = $("#child_date_of_birth").val();
			var child_gender = $("#child_gender").val();
			var child_for_hiv = $("#child_for_hiv").val();
			var child_hiv_status = $("#child_hiv_status").val();
			var html = "<th scope='row'>"+id+"</th> <td>"+child_date_of_birth+"</td> <td>"+child_gender+"</td> <td>"+child_for_hiv+"</td> <td>"+child_hiv_status+"</td> <td> <div class='d-flex'> <a class='btn btn-sm btn-dark mr-25' id='edit_row'>Edit</a> <a class='btn btn-sm btn-danger' id='delete_row'>Delete</a> </div> </td>";
			$("tr[data-id='"+ id +"']").html(html); // html data set
			$("#child_add_modal").modal("hide"); // modal hide
			$("#edit_row").val(''); // edit ID clear
		}
	});

	// table re-index data-id and no sequence 
	function table_reindex() {
		var index = 1;
		$('#children_tbl > tbody > tr').each(function() {		
			$(this).each(function() {
				$(this).attr('data-id', index); // data-id tag update id index
				$(this).find('th:first').html(index); // first td cell value change index
			});
			index++;
		});
	}

	/* ---- END: ART Registration Form Validation ON Click ----- */

})(window);