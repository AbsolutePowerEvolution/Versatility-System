<template>
  <admin-menu></admin-menu>
  <div id="Examine" class="container Examine">
    <span>教室審核</span>
    <ul class="collapsible popout" data-collapsible="accordion">
      <li v-for="examine in examines" class="Examine-Item">
        <a class="Examine-Pass secondary-content" @click="accept(examine.id)">
          <i class="material-icons">done</i>
        </a>
        <a class="Examine-Reject secondary-content" @click="reject(examine.id)">
          <i class="material-icons">clear</i>
        </a>
        <div class="collapsible-header">
          <span class="Examine-Username">{{examine.user.nickname}}</span>
          <span class="Examine-Classroom">{{examine.property_name}}</span>
          <span class="Examine-Time">{{examine.time}}</span>
        </div>
        <div class="collapsible-body">
          <p>{{examine.remark}}</p>
        </div>
      </li>
    </ul>
    <pagination :current-page="currentPage"
      :base-url="baseUrl"
      :query="query"
      :max="maxPage">
    </pagination>
  </div>
</template>

<script>
import when from 'when';
import transformExamine from '../javascript/lib/transform-examine';
import AdminMenu from './admin-menu.vue';
import Pagination from './pagination.vue';
export default {
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: false,
      default: Object.create(null)
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  components: {AdminMenu, Pagination},
  methods: {
    accept(id) {
      this.sendVerify(id, 'accepted');
    },
    reject(id) {
      this.sendVerify(id, 'refused');
    },
    sendVerify(id, status) {
      let self = this;
      when(this.$http.put(`manager/loan/class-verify/${id}`, {status}))
        .then((response) => {
          self.$emit('verify-success', response);
        })
        .catch((error) => {
          self.$emit('verify-error', error);
        });
    }
  },
  data() {
    return {
      examines: [],
      maxPage: 0
    };
  },
  compiled() {
    when(this.$http.get('manager/loan/classrooms', {page: this.currentPage}))
      .then((response) => {
        return response.data;
      })
      .then(transformExamine)
      .then(({examines, maxPage}) => {
        this.$set('examines', examines);
        this.$set('maxPage', maxPage);
        $('.tooltipped').tooltip({
          delay: 50,
          position: 'buttom'
        });
        $('.collapsible').collapsible({accordion: true});

      })
      .catch((error) => {
        if(error instanceof Error) {
          console.warn(error);
          throw error;
        } else {
          console.warn(error);
        }
      });
  }
}
</script>
