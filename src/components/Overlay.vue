<template>
  <div class="Overlay" :class="{ isVisible: showOverlay }">
    <section class="Overlay-info">
      <button class="Overlay-close" @click="close">
        <i class="fa fa-times"></i>
      </button>
      <h2>Thanks {{ firstname() }}</h2>
      <img class="Overlay-image" :src="getUserImage()" alt="User Image" />
      <p>We are so happy about your interest in this platform. Next you can find few information about you:</p>
      <section class="Overlay-content">
        <h3>Information</h3>
        <table class="Overlay-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Name </td>
              <td> {{ name() }} </td>
            </tr>
            <tr>
              <td> Repos </td>
              <td> {{ getData('public_repos') }} </td>
            </tr>
            <tr>
              <td> Gists </td>
              <td> {{ getData('public_gists') }} </td>
            </tr>
            <tr>
              <td> Bio </td>
              <td> {{ getData('bio') }} </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Overlay",
  computed: {
    ...mapState({
      showOverlay: state => state.showOverlay
    })
  },
  methods: {
    getUserImage() {
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo.avatar_url;
      }
      return "/img/user.png";
    },
    name() {
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo.name;
      }
      return 'Unknown';
    },
    getData(field) {
      if (this.$store.state.userInfo) {
        return this.$store.state.userInfo[field];
      }
      return '';
    },
    firstname() {
      return this.$store.state.firstName;
    },
    close(){
      this.$store.commit("hideOverlay");
    }
  }
};
</script>

<style lang="scss">
.Overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 1, 0.2);
  transition: all 0.2s ease;
  transform: rotateY(90deg);
  z-index: -1000;

  &.isVisible {
    transform: rotateY(0deg);
    z-index: 1000;
  }

  &-close {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    font-size: 16px;
  }

  &-image {
    border-radius: 50%;
    width: 80px;
  }

  &-content {
    overflow-x: hidden;
    overflow-y: scroll;
    max-height: 200px;
  }

  &-info {
    display: inline-block;
    width: 94%;
    border-radius: 5px;
    position: absolute;
    top: 10%;
    left: 3%;
    background-color: #fff;
  }

  &-table {
    width: 94%;
    margin-left: 3%;
    margin-bottom: 2em;
    text-align: center;
    border-radius: 3px;
    border: 1px solid rgb(34, 47, 58);
    thead {
      color: rgb(34, 47, 58);
    }
    tbody tr:nth-child(2n-1) {
      background-color: lightgray;
    }
  }

  @media screen and (min-width: 768px) {
    &-content {
      max-height: 800px;
    }
  }

  @media screen and (min-width: 1024px) {
    &-info {
      width: 60%;
      margin-left: 20%;
    }
    &-close {
      background-color: transparent;
      border: none;
    }
  }
}
</style>
