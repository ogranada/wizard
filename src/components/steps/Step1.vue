<template>
  <div class="Step Step1" data-title="Welcome">
    <div class="Step1-container">
      <div class="Step1-imgContainer">
        <img
          class="Step1-image"
          src="//github.githubassets.com/images/modules/logos_page/Octocat.png"
          alt="gh logo"
        />
      </div>
      <div class="Step1-content">
        <p>
          This is just a guide to get few information and make you part of our
          great family.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step1"
};
</script>

<style lang="scss">
.Step1 {
  position: relative;
  display: table;
  height: 80vh;

  &-container {
    display: table-cell;
    vertical-align: middle;
    width: 100%;
    text-align: center;
  }

  &-image {
    display: inline-block;
    position: relative;
    max-width: 100px;
    margin: 2em 0 0;
  }

  &-content {
    display: inline-block;
  }
}
</style>
