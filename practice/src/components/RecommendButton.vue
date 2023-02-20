<template>
  <v-row justify="center">
    <v-col cols="auto">
      <v-btn-toggle
      class="recommend"
      v-model="clickedButton"
      group
      @change="countRecommend"
      >
        <div>
          <v-btn class="recommend" icon depressed value="recommend">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          <span>{{ vote.recommend }}</span>
        </div>

        <div>
          <v-btn class="nonRecommend ml-2" icon depressed value="nonRecommend">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          <span>{{ vote.nonRecommend }}</span>
        </div>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    vote: {
      type: Object
    },
  },
  data() {
    return {
        clickedButton: "",
    };
  },
  mounted() {
    this.clickedButton =
      this.vote.state === 0
        ? ""
        : this.vote.state === 1
        ? "recommend"
        : "nonRecommend";
  },
  methods: {
    countRecommend() {
        this.$emit("countRecommend", this.clickedButton);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn-toggle {
  &.recommend {
    .v-btn {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      &.v-btn--active {
        background-color: #285ef1 !important;
        .v-icon {
          color: white;
        }
      }
      + span {
        margin-left: 8px;
      }
      +.v-btn {
        margin-left: 10px;
      }
    }
    .recommend {
      background-color: #eee !important;
      .v-icon {
        color: #ccc;
      }
    }
    .nonRecommend {
      background-color: #bfc3cf !important;
      .v-icon {
        color: #fff
      }
    }
  }
}
</style>
