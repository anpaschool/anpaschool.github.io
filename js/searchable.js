/**
* Code to Implement Search Functionality
*/
$('#searchText').keyup(function() {
	var $rows = $('#searchable tr');
	
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
	 
    $rows.addClass('alert-success').filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
		//console.log(!~text.indexOf(val));
        return !~text.indexOf(val);
    }).removeClass('alert-success');
	
	if(val==""){
		$rows.removeClass('alert-success'); 
		$(this).removeClass('alert-danger');
		return;
	}
	$(this).removeClass('alert-danger');
	if(!$('.alert-success').length>0) $(this).addClass('alert-danger');
	
});

