document.addEventListener(
	"legacy-News",
	function(e) {
		switch (e.action) {
		case "show":
			show("News");
			break;
		case "set-unread-news-count":
			$.html("unread_news_counter", e.unreadNewsCount);
			$.visibility("unread_news_counter", e.unreadNewsCount > 0);
			break;
		default:
			console.error("Unexpected action: ", e.action);
			break;
		}
	}
);
