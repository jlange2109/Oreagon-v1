/*
 * LangTalk.
 * (c) Copyright 2017-present, DirectProfile.
 *
 * YOU ARE NOT ALLOWED TO COPY OR USE ANY PARTS OF THIS CODE.
 */

 /* Check if the client is on a mobile device. */
 var isMobile = (function() { {
    return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
 })();

 var getFullURL = (function() {
	 var a;

	 return function(url) {
		 if(!a) a = document.createElement('a');
		 a.href = url;

		 return a.href;
	 };
 })();

 var stopPageLoading = (function() {
   window.stop(); // Stop loading the page.
   document.execCommand("Stop"); // If client is on IE or Edge..
 })();