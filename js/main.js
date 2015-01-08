$(document).ready(function() {
	$(document).on("click", ".happening-now-list-delete", function() {
		$(this).parent().remove();
		if (!$(".happening-now-list-section").last().hasClass("no-bottom-border")) {
			$(".happening-now-list-section").last().addClass("no-bottom-border");
		}
	});
});



function addNewSection() {
	var category = $("#happening-now-category").val();

	if (category == "") {
		alert("Please choose a category in order to register!");
		return false;
	} else {
		$(".happening-now-list-section").last().removeClass("no-bottom-border");
		var problem = $("#happening-now-problem").val();
		$("#happening-now-list").append('<div class = "happening-now-list-section no-bottom-border center">\
			<div class = "happening-now-list-section-text left font-size-14 border-box">\
				<span class = "timestamp orange">[Timestamp]</span> \
				<span class = "category">'+category+'</span>: \
				<span class = "problem">\
					'+problem+'\
				</span>\
			</div>\
			<img src = "img/delete_icon.png" class = "happening-now-list-delete red clickable" />\
		</div>');
	}
}