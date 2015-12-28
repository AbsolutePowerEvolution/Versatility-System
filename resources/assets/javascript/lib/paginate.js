import {assign, range} from 'lodash';

module.exports = ((context, data, baseUrl) => {
  if(!data.current_page) {
    return;
  }

  let currentPage = data.current_page;
  let lastPage = data.last_page;
  let prevUrl = data.prev_page_url ?
    `${baseUrl}?page=${currentPage - 1}` : null;
  let nextUrl = data.next_page_url ?
    `${baseUrl}?page=${currentPage + 1}` : null;
  let minPage = currentPage > lastPage - 10 ? lastPage - 10 : currentPage;
  let maxPage = Math.min(currentPage + 10, lastPage);
  let pages = Array.prototype.map.call(range(minPage, maxPage + 1), (num) => {
    return {num: num, url: `${baseUrl}?page=${num}`};
  });
  assign(context, {
    prevUrl: prevUrl,
    nextUrl: nextUrl,
    pages: pages
  });
  return () => {
    let ele = document.getElementById(`pagination-${currentPage}`);
    ele.className = 'active';
  };
});
