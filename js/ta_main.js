$(document).ready(function() {
	$(".happening-now-list-section").hover(function() {
		$(this).append('<img src = "img/confirm_icon.png" class = "happening-now-list-finish clickable" />');
		$(".happening-now-list-finish").css('top', ($(this).height() - $('.happening-now-list-finish').height()) / 2);
	}, function() {
		$(".happening-now-list-finish").remove();
	});

	$(document).on("click", ".happening-now-list-finish", function() {
		var att_id = $(this).siblings('.happening-now-number').text();
		$.ajax({
			url: 'ajax/ta_finish.php',
			data: {att_id: att_id},
			type: 'POST'
		});

		$(this).siblings().hide();
		$(this).parent().slideToggle();
		$(this).remove();

		if (!$(".happening-now-list-section").last().hasClass("no-bottom-border")) {
			$(".happening-now-list-section").last().addClass("no-bottom-border");
		}
	});
});
