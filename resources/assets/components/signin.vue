<template>
  <div class="signin-card">
    <div class="row">
      <div class="col s12 m4 offset-m4">
        <div class="card z-depth-3">
          <div class="container">
            <div class="row">
              <div class="card-content black-text center-align">
                <span class="card-title">資訊工程學系<br>系務系統</span>
              </div>
              <form @submit.prevent="doSignin">
                <div class="input-field">
                  <i class="material-icons prefix">account_box</i>
                  <input type="text"
                    id="username"
                    name="username"
                    v-model="username">
                  <label for="username">Username</label>
                </div>
                <div class="input-field">
                  <i class="material-icons prefix">lock</i>
                  <input type="password"
                    id="password"
                    name="password"
                    v-model="password">
                  <label for="password">Password</label>
                </div>
                <div class="card-action center">
                  <button class="waves-effect btn"
                     type="button" @click.stop="doSignin">
                     Login
                   </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let userSym = Symbol('user');
  let managerSym = Symbol('manager');
  export default {
    data() {
      return {
        username: '',
        password: '',
        USER: userSym,
        MANAGER: managerSym
      };
    },
    methods: {
      doSignin(event) {
        let username = this.$data.username;
        let password = this.$data.password;
        let data = {
          username,
          password
        };
        this.$http.post('/api/auth/login', data)
          .then((response) => {
            console.log(response);
            if(response.data.status) {
              let sym = response.data.is_student ? userSym : managerSym;
              this.$emit('login', sym);
            } else {
              this.$emit('fail');
            }
          }, (response) => {
            console.log(response);
            this.$emit('error', response);
          });
      }
    }
  }
</script>
