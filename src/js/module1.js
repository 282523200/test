function addCookie(key, value, days) {
	var date = new Date();
	date.setDate(date.getDate() + days);
	document.cookie = `${key} = ${encodeURI(value)}; expires = ${date}`;
}

function getCookie(key) {
	var arr = decodeURI(document.cookie).split('; ');
	for (var i = 0; i < arr.length; i++) {
		arr1 = arr[i].split('=');
		if (arr1[0] == key) {
			return arr1[1];
		}
	}
}

function delCookie(key) {
	addCookie(key, '', -1);
}

export {
	addCookie,getCookie, delCookie
};