<template>
  <div class="Step Step3" data-title="Permissions">
    <div class="Step3-container">
      <div class="Step3-imgContainer">
        <img
          class="Step3-image"
          src="//cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/11/github-security-lab-hed-796x448.png"
          alt="Secure image"
        />
      </div>
      <p>
        To continue the process you need to provide your email and accept the
        terms and conditions.
      </p>
      <form class="Step3-form" action="#" method="post">
        <div>
          <label for="email">Email:</label>
          <input
            class="Step-input Step3-input"
            id="email"
            name="email"
            type="text"
            :tabindex="currentStep === 2 ? 1 : -1"
            :value="email"
            @input="updateEmail"
            placeholder="jhon.doe@company.com"
          />
        </div>
        <br />
        <div class="Step3 termsAndCondSection">
          <input
            class="Step3-input"
            type="checkbox"
            :tabindex="currentStep === 2 ? 2 : -1"
            :checked="t_and_c"
            @input="updateTermsAndConds"
            name="termsAndConds"
            id="termsAndConds"
          />
          Do you accept
          <a href="#/terms" target="_blank" :tabindex="currentStep === 2 ? 3 : -1"
            >terms and conditions</a
          >?
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Step3",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      currentStep: state => state.currentStep,
      email: state => state.email,
      t_and_c: state => state.t_and_c
    })
  },
  methods: {
    /**
     * Update First Name
     */
    updateEmail(event) {
      this.$store.commit("email", event.target.value);
    },
    /**
     * Update terms and conditions in the vuex storage
     */
    updateTermsAndConds(event) {
      this.$store.commit("t_and_c", event.target.checked);
    }
  }
};
</script>

<style lang="scss">
.Step3 {
  display: table;
  &-container {
    display: table-cell;
    vertical-align: middle;
  }

  .termsAndCondSection {
    display: block;
    &-input {
      font-size: 16px;
    }
  }

  input[type="checkbox"] {
    transform: scale(1.5);
  }

  &-image {
    max-width: 12em;
  }

  &-separator {
    min-width: 1em;
    display: inline-block;
  }

  &-optionsContainer {
    margin-top: 1em;
  }

  &-option {
    font-size: 2em;
    display: inline-block;
    color: lightgray;
    border: 1px solid rgba(1, 1, 1, 0.08);
    padding: 0.2em 0.3em;
    border-radius: 5px;

    &.isActive {
      color: rgb(53, 170, 53);
      &.isNegative {
        color: tomato;
      }
    }
  }
}
</style>
