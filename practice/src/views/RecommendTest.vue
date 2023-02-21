<template>
    <div class="pa-8">
      <h2 class="mb-4">[추천/비추천 버튼]</h2>
      <RecommentButton :item="vote" @countRecommend="countRecommend"/>
    </div>
</template>

<script>
import RecommentButton from "../components/RecommendButton.vue";
export default {
    components: {
        RecommentButton
    },
    data() {
        return  {
            vote: {
                recommend: 4,
                nonRecommend: 2,
                state: null, //null: x, 1: recommend, 2: nonRecommend
            },
        }
    },
    methods: {
        countRecommend(state) {
            this.vote = {
                recommend: state.recommend,
                nonRecommend: state.nonRecommend,
                state: state.state === 'recommend' ? 1 : state.state === 'nonRecommend' ? 2 : null
            }
        }
    }
}
</script>

<style>

</style>