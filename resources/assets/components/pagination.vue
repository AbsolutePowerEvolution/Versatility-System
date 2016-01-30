<template>
  <ul class="pagination center">
    <li :class="{'waves-effect': prevUrl, disabled: !prevUrl}">
      <a :href="prevUrl"><i class="material-icons">chevron_left</i></a>
    </li>
    <li v-for="page in pages"
      id="pagination-{{page.num}}"
      :class="{'waves-effect': page.num !== currentPage, 'active': page.num === currentPage}"><a :href="page.url">{{page.num}}</a></li>
    <li :class="{'waves-effect': nextUrl, disabled: !nextUrl}">
      <a :href="nextUrl"><i class="material-icons">chevron_right</i></a>
    </li>
  </ul>
</template>

<script>
import $ from 'jquery';
import lodash from 'lodash';
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    baseUrl: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    query: {
      type: Object,
      required: false,
      default: Object.create(null)
    }
  },
  computed: {
    pages() {
      let minPage = Math.max(this.currentPage - 5, 1);
      let maxPage = Math.min(minPage + 10, this.max);
      if(maxPage === this.max) {
        minPage = Math.max(maxPage - 10, 1);
      }
      return lodash.times(maxPage - minPage + 1, (i) => {
        let page = minPage + i;
        return {
          num: page,
          url: this.pageUrl.call(this, page)
        };
      });
    },
    prevUrl() {
      let currentPage = this.currentPage;
      return currentPage === 1 ?
        null :
        this.pageUrl.call(this, currentPage - 1);
    },
    nextUrl() {
      let currentPage = this.currentPage;
      return currentPage === this.max ?
        null :
        this.pageUrl.call(this, currentPage + 1);
    }
  },
  methods: {
    pageUrl(page) {
      let query = lodash.assign({}, this.query, {page: page});
      let param = $.param(query);
      return `${this.baseUrl}?${param}`;
    }
  }
}
</script>
