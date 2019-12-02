<template>
  <section class="Wizard">
    <div class="Wizard-container" :style="{ width: this.width }">
      <div class="Wizard-header">
        <div class="Wizard-title">{{ getCurrentTitle() }}</div>
      </div>
      <div
        class="Wizard-inner"
        :style="{
          left: getStepOffset(),
          width: `calc(${this.width} * ${this.steps})`
        }"
      >
        <slot></slot>
      </div>
      <div class="Wizard-footer">
        <button
          class="Wizard-button"
          tabindex="101"
          :disabled="!hasPreviousStep()"
          @click="previousStep"
        >
          Previous
        </button>
        <span class="Wizard-footerSpacer"></span>
        <button
          class="Wizard-button isPrimary"
          tabindex="100"
          v-if="!isLastStep()"
          :disabled="!hasNextStep()"
          @click="nextStep"
        >
          Next
        </button>
        <button
          class="Wizard-button isPrimary"
          tabindex="100"
          v-if="isLastStep()"
          :disabled="!canFinish()"
          @click="onFinish"
        >
          Finish
        </button>
      </div>
    </div>
  </section>
</template>

<script>
const LEFT_KEY = 37;
const RIGHT_KEY = 39;

export default {
  name: "Wizard",
  props: {
    onStepChanged: Function,
    onFinish: Function,
    isValidStep: Function
  },
  data() {
    return {
      step: 0,
      steps: 0,
      width: "80vw",
      height: "",
      titles: []
    };
  },
  mounted() {
    window.addEventListener("resize", this.updateStepsSizes);
    document.addEventListener("keyup", this.onKeyPressed);
    this.updateStepsSizes();
  },
  methods: {
    /**
     * Check if can press the finish button
     */
    canFinish() {
      let canFinish = false;
      if (this.isValidStep) {
        canFinish = this.isValidStep(this.step);
      }
      return canFinish;
    },
    /**
     * Update step sizes according device and content
     */
    updateStepsSizes() {
      this.steps = this.$slots.default.length;
      this.width = `${this.$el.clientWidth}px`;
      this.titles = [];
      let height = -1;
      this.$slots.default.forEach(step => {
        step.elm.classList.add("Wizard-step");
        step.elm.style.width = this.width;
        height =
          step.elm.clientHeight > height ? step.elm.clientHeight : height;
        this.titles.push(step.elm.getAttribute("data-title"));
      });
      this.height = `${height}px`;
      this.$slots.default.forEach(step => {
        step.elm.classList.add("Wizard-step");
        step.elm.style.height = this.height;
      });
    },
    isLastStep() {
      return this.step === this.steps - 1;
    },
    hasNextStep() {
      let isValid = true;
      if (this.isValidStep) {
        isValid = this.isValidStep(this.step);
      }
      return this.step + 1 < this.steps && isValid;
    },
    refocus() {
      setTimeout(() => {
        const fe = this.$el.querySelector('.Wizard-inner [tabindex="1"]');
        if (fe) {
            fe.focus();
        }
      }, 800);
    },
    nextStep() {
      if (this.hasNextStep()) {
        this.step++;
        if (this.onStepChanged) {
          this.onStepChanged(this.step);
          this.refocus();
        }
      }
    },
    hasPreviousStep() {
      return this.step - 1 >= 0;
    },
    previousStep() {
      if (this.hasPreviousStep()) {
        this.step--;
        if (this.onStepChanged) {
          this.onStepChanged(this.step);
          this.refocus();
        }
      }
    },
    /**
     * Return the value of the step offset according number of steps
     * and content of wizard steps.
     */
    getStepOffset() {
      return `calc( -${this.width} * ${this.step} )`;
    },
    /**
     * Return current title according wizard step
     */
    getCurrentTitle() {
      return this.titles[this.step];
    },
    /**
     * Allow user to press keys and navigate to next/previous step
     */
    onKeyPressed(evt) {
      if (!evt.shiftKey) {
        return;
      }
      document.activeElement.blur();
      switch (evt.keyCode) {
        case LEFT_KEY:
          this.previousStep();
          break;
        case RIGHT_KEY:
          this.nextStep();
          break;
      }
    }
  }
};
</script>

<style lang="scss">
$buttonColor: rgb(115, 201, 241);
$disabledColor: rgba(166, 204, 240, 0.6);

.Wizard {
  position: relative;

  &-title {
    font-weight: bold;
    font-size: 1.5em;
    min-height: 1.5em;
  }

  &-container {
    background-color: white;
    overflow: hidden;
    width: 80vw;
  }

  &-inner {
    overflow: hidden;
    transition: left 0.5s ease-in-out;
    position: relative;
    left: 0;
    width: calc(80vw * 3);
  }

  &-step {
    float: left;
    height: 100%;
    width: 80vw;
    box-sizing: border-box;
  }

  &-footer {
    text-align: center;
    padding: 0 0.4em 0.4em;
  }

  &-button {
    width: 45%;
    min-height: 2em;
    background-color: transparent;
    font-weight: bold;
    color: $buttonColor;
    border-radius: 5px;
    border: 1px solid $buttonColor;
    padding: 1em;
    font-size: 14px;

    &.isPrimary {
      background-color: $buttonColor;
      color: white;
      &:disabled {
        background-color: $disabledColor;
        color: white;
      }
    }

    &:focus {
      outline-color: rgba(180, 210, 255, 0.001);
    }
    &:disabled {
      color: $disabledColor;
      border-color: $disabledColor;
    }
  }

  &-footerSpacer {
    display: inline-block;
    width: 10%;
  }

  @media screen and (min-width: 768px) {
    max-width: 60%;
    margin-left: 20%;

    &-step {
      padding: 0 1em;
    }
    &-button {
      width: 150px;
    }
    &-title {
      margin: 1em 0 0.5em;
      font-size: 2em;
    }
    &-footerSpacer {
      width: 2em;
    }
  }
}
</style>
