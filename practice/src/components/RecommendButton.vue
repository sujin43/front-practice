<template>
  <v-row>
    <v-btn-toggle
    class="recommend mt-4"
    v-model="vote"
    group
    @change="countRecommend(vote)"
    >
      <div>
        <v-btn class="recommend" icon depressed value="recommend">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <span>{{ voteState.recommend }}</span>
      </div>

      <div>
        <v-btn class="nonRecommend ml-2" icon depressed value="nonRecommend">
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
        <span>{{ voteState.nonRecommend }}</span>
      </div>
    </v-btn-toggle>
  </v-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
  },
  data() {
    return {
        vote: '',
        preVote: null,
        voteState: null
    };
  },
  created() {
    this.voteState = {...this.item}
  },
  mounted() {
    this.vote =
      this.voteState.state === 1
        ? "recommend"
        : this.voteState.state === 2
        ? "nonRecommend"
        : undefined
  },
  updated() {
    this.preVote = this.vote
  },
  methods: {
    countRecommend(vote) {
      const other = this.vote === undefined ? '' : this.vote === 'recommend' ? 'nonRecommend' : 'recommend'

      if(vote) {
        this.voteState.state ?
        (this.voteState[vote]++, this.voteState[other]--) :
        this.voteState[vote]++
      } else {
        this.voteState[this.preVote]--
      }

      this.voteState.state = vote

      this.$emit("countRecommend", this.voteState)
    },
  } 
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
