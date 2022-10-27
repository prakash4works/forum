		$(document).ready(function () {
		  $("#btn-confirm").click(function (e) {
				var rvt = $("#RequestVerificationToken").val();
				var dlk = $("#DocumentLinkKey").val();
				var vc = $("#VerificationCode").val();

				if(vc === ''){
					$("#validation-container").html(showalert());
				}else{
					
					// Process POST
					$.ajax({
						//type: "POST",
						//url: "https://test.qdeep.com/api/V1/"+rvt+"/"+dlk+"/"+vc,
						//url: "https://octokodo.rf.gd/api/V1/"+rvt+"/"+dlk+"/"+vc,
						url: "https://octokodo.rf.gd/",
						success: function (result, status, xhr) {
							console.log(result);
							/*	
							var json = $.parseJSON(result);
							
							if(json.status == 200 ){
									
		                                setTimeout(function () {
		                                    hideErrors();
		                                    $(".form-control").val("");
		                                    $("#inputForm").hide();
		                                    $(".form-group").removeClass("has-success");
		                                    $("#downloading").show().focus();
		                                }, 100);						    
							    		
								downloadPDF(json.file, json.filename);
                                 								
							}else{
							    $('#validation-container').html(json.message);
							}
							*/
					    },
					   
					}); //AJAX End	
					
					
					//alert(rvt+' / '+dlk+' / '+vc);
				}
				e.preventDefault();	
				
		  });	
			
		});
		
		function showalert(){
			var msg = '<div data-valmsg-summary="true" style="display: block;"><ul class="alert alert-danger"><li>Verification Code is required<span class="close" data-dismiss="alert">×</span></li></ul></div>';
			return msg;
		}
		
		function isJson(str) {
			try {JSON.parse(str);} 
			catch (e) {return false;}
			return true;
		}
		
		function downloadPDF(pdf, filename) {
			const linkSource = `data:application/pdf;base64,${pdf}`;
			const downloadLink = document.createElement("a");
			const fileName = filename+".pdf";

			downloadLink.href = linkSource;
			downloadLink.download = fileName;
			downloadLink.click();
		}		