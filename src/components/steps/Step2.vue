<template>
  <section class="Step Step2" data-title="Information">
    <form class="Step2-form" action="#" method="post">
      <div>
        <label for="name">First name:</label>
        <input
          class="Step-input"
          id="name"
          name="name"
          type="text"
          :step="currentStep"
          :tabindex="currentStep === 1 ? 1 : -1"
          :value="firstName"
          @input="updateFirstName"
          placeholder="Jhon"
        />
      </div>
      <div>
        <label for="lastname">Last name:</label>
        <input
          class="Step-input"
          id="lastname"
          name="lastname"
          type="text"
          :tabindex="currentStep === 1 ? 2 : -1"
          :value="lastName"
          @input="updateLastName"
          placeholder="Doe"
        />
      </div>
      <div>
        <label for="ghname">Github User:</label>
        <input
          class="Step-input"
          id="ghname"
          name="ghname"
          type="text"
          :tabindex="currentStep === 1 ? 3 : -1"
          :value="githubUser"
          @input="updateGithubUser"
          placeholder="the_real_doe"
        />
      </div>
    </form>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Step2",
  data() {
    return {
      name: "",
      lastname: "",
      ghname: ""
    };
  },
  computed: {
    ...mapState({
      firstName: state => state.firstName,
      lastName: state => state.lastName,
      githubUser: state => state.ghUser,
      currentStep: state => state.currentStep
    })
  },
  methods: {
    /**
     * Update First Name
     */
    updateFirstName(event) {
      this.$store.commit("firstName", event.target.value);
    },
    /**
     * Update Last Name
     */
    updateLastName(event) {
      this.$store.commit("lastName", event.target.value);
    },
    /**
     * Update Github user
     */
    updateGithubUser(event) {
      this.$store.commit("githubUser", event.target.value);
    }
  }
};
</script>

<style lang="scss">
.Step2 {
  text-align: right;
  display: table;
  &-form {
    display: table-cell;
    vertical-align: middle;
  }
}
</style>
