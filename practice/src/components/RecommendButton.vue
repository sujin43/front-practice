<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto" class="pa-0">
        <v-btn-toggle
          class="board"
          v-model="clickedButton"
          group
          @change="countRecommend"
        >
          <div>
            <v-btn class="recommend" icon absolute depressed value="recommend">
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
  </v-container>
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
$recommend-default-bg: #eee;
$recommend-default: #ccc;
$nonRecommend-default-bg: #bfc3cf;
$nonRecommend-default: #fff;
$btn-active: #285ef1;

.v-btn-toggle {
  &.board {
    .v-btn {
      width: 48px !important;
      height: 48px !important;
      border-radius: 50% !important;
      &.v-btn--active {
        background-color: $btn-active !important;
        .v-icon {
          color: white;
        }
      }
    }
    .recommend {
      background-color: $recommend-default-bg !important;
      .v-icon {
        color: $recommend-default;
      }
    }
    .nonRecommend {
      background-color: $nonRecommend-default-bg !important;
      .v-icon {
        color: $nonRecommend-default;
      }
    }
  }
}
</style>
