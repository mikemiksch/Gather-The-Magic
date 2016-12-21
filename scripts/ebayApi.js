function _cb_findItemsByKeywords(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var html = [];
  html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var title = item.title;
    var pic = item.galleryURL;
    var viewitem = item.viewItemURL;
    if (null != title && null != viewitem) {
      html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' + '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
    }
  }
  html.push('</tbody></table');
  document.getElementsByClassName('ebay-listing').innerHTML = html.join('');
}

var ebayUrl = 'http://svcs.ebay.com/services/search/FindingService/v1';
ebayUrl += '?OPERATION-NAME=findItemsByKeywords';
ebayUrl += '&SERVICE-VERSION=1.0.0';
ebayUrl += '&SECURITY-APPNAME=MikeMiks-Gatherth-PRD-345ed6013-1d7cf14d';
ebayUrl += '&GLOBAL-ID=EBAY-US';
ebayUrl += '&RESPONSE-DATA-FORMAT=JSON';
ebayUrl += '&callback=_cb_findItemsByKeywords';
ebayUrl += '&REST-PAYLOAD';
ebayUrl += '&keywords=magic%20the%20gathering%20' + searchTerm;
ebayUrl += '&paginationInput.entriesPerPage=3';
s = document.createElement('script');
s.src = ebayUrl;
document.body.appendChild(s);
console.log(ebayUrl);
