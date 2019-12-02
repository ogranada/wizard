<template>
  <div class="home">
    <Wizard
      :onStepChanged="this.updateStep"
      :isValidStep="isValidStep"
      :onFinish="onFinish"
    >
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard>
    <Overlay />
  </div>
</template>

<script>
// @ is an alias to /src
import Wizard from "@/components/Wizard.vue";
import Step1 from "@/components/steps/Step1.vue";
import Step2 from "@/components/steps/Step2.vue";
import Step3 from "@/components/steps/Step3.vue";
import Overlay from "@/components/Overlay.vue";

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    Wizard,
    Step1,
    Step2,
    Step3,
    Overlay
  },
  methods: {
    /**
     * Update a step value in the vuex storage
     */
    updateStep(step) {
      this.$store.commit("currentStep", step);
    },
    /**
     * Validate if step is valid
     */
    isValidStep(step) {
      const emailPattern = /^[a-zA-Z_](\w|\.)*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      switch (step) {
        case 0:
          return true;
        case 1:
          return Boolean(
            this.$store.state.firstName.length > 2 &&
              this.$store.state.lastName.length > 2 &&
              this.$store.state.ghUser.length > 2
          );
        case 2:
          return (
            emailPattern.test(this.$store.state.email) &&
            this.$store.state.t_and_c
          );
      }
    },
    /**
     * Function to be executed when wizard finishes.
     */
    async onFinish() {
      const user = this.$store.state.ghUser;
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (response.status === 200) {
        const userInfo = await response.json();
        window.console.log(userInfo);
        this.$store.commit("userInfo", userInfo);
      }
    }
  }
};
</script>

<style lang="scss">
.Step {
  &-input {
    border: 1px solid rgba(1, 1, 1, 0.1);
    border-radius: 5px;
    min-height: 2em;
    margin: 0.5em;
    min-width: 50%;
    padding: 0.3em;
    transition: all 0.2s ease-in-out;
    &:focus {
      outline: none;
      transform: scale(1.05);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
        0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
        0 16px 16px rgba(0, 0, 0, 0.12);
    }
    &::placeholder {
      color: rgba(1, 1, 1, 0.2);
    }
  }

  label {
    margin-right: 1em;
  }

  & &-textCentered {
    text-align: center;
    margin: 0;
  }

  @media screen and (min-width: 768px) {
    &-input {
      width: 70%;
    }
  }
}
</style>
