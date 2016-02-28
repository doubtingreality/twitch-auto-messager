if ($('.chat-container').length > 0) {
	var automessager_style = document.createElement("style");
	automessager_style.appendChild(document.createTextNode(".auto-automessager-holder.minimized { min-height: 4rem !important; height: 4rem !important; max-height: 4rem !important; width: 4.8rem; } .auto-automessager-holder.minimized * { display: none; } .auto-automessager-holder.minimized .automessager-min-button { display: block !important; }"));
	document.body.appendChild(automessager_style);

	var automessager_holder = document.createElement("div");
	automessager_holder.classList.add('auto-automessager-holder');
	automessager_holder.classList.add('minimized');
	automessager_holder.setAttribute("style", "position: fixed;bottom: 0; left: 1rem; overflow: hidden; min-height: 21rem;z-index: 999;background: #282828;padding: 1rem 1.5rem 1.5rem 1.5rem;");
	automessager_holder.innerHTML = "<div class='automessager-close-button' style='float: right; margin-left: 1rem; cursor: pointer; width: 2rem; border: 1px solid #444; text-align: center;'>&#10060;</div><div class='automessager-min-button' style='float: right; cursor: pointer; width: 2rem; border: 1px solid #444; text-align: center;'>&#95;</div><br><textarea class='automessager-input' style='margin: 0.5rem 0 1.5rem 0; background-color: rgb(20,20,20);color: #D3D3D3;border: solid 1px #333;'></textarea><br><input value='5' onkeypress='return event.charCode >= 48 && event.charCode <= 57' type='text' style='padding: 0.5rem; width: 120px;background-color: rgb(20,20,20);color: #D3D3D3;border: solid 1px #333;' placeholder='Interval (seconds)' class='automessager-interval-input'><button class='button primary float-right stop-automessager-button' disabled>Stop</button><button class='button primary float-right start-automessager-button' style='margin-right: 1rem;'>Start</button>";
	document.body.appendChild(automessager_holder);

	var automessager_interval;
	var $automessager_chat_input   = $('.chat_text_input');
	var $automessager_chat_button  = $('.send-chat-button');

	var $automessager_holder         = $('.auto-automessager-holder');
	var $automessager_automessager_input     = $('.automessager-input');
	var $automessager_start_button   = $('.start-automessager-button');
	var $automessager_stop_button    = $('.stop-automessager-button');
	var $automessager_interval_input = $('.automessager-interval-input');
	var $automessager_min_button     = $('.automessager-min-button');
	var $automessager_close_button   = $('.automessager-close-button');

	var evenodd = 0;
	var chat_message = "";

	$automessager_min_button.click(function() { $automessager_holder.toggleClass('minimized') });
	$automessager_close_button.click(function() { stop_automessager(); $automessager_holder.remove(); });

	$automessager_start_button.click(function() { start_automessager(); });
	$automessager_stop_button.click(function() { stop_automessager(); });

	function start_automessager() {
		chat_message = $automessager_automessager_input.val();
		$automessager_start_button.attr("disabled", "disabled");
		$automessager_automessager_input.attr("disabled", "disabled");
		$automessager_interval_input.attr("disabled", "disabled");
		$automessager_stop_button.removeAttr("disabled");

		automessager_interval = setInterval(function() {
			if (evenodd === 0) {
				evenodd = -1;
				$automessager_chat_input.val(chat_message);
			} else {
				evenodd = 0;
				$automessager_chat_input.val(chat_message+" .");
			}
			$automessager_chat_button.click();

		}, $automessager_interval_input.val()*1000);
	}

	function stop_automessager() {
		$automessager_start_button.removeAttr("disabled");
		$automessager_automessager_input.removeAttr("disabled", "disabled");
		$automessager_interval_input.removeAttr("disabled", "disabled");
		$automessager_stop_button.attr("disabled", "disabled");
		clearInterval(automessager_interval);
	}
}