document.addEventListener(
	"legacy-news",
	function(e) {
		switch (e.action) {
			case "show":
				show("news");
				break;
			case "set-unread-news-count":
				$.html("unread_news_counter", e.unreadNewsCount);
				$.visibility("unread_news_counter", e.unreadNewsCount > 0);
				break;
		}
	}
)
