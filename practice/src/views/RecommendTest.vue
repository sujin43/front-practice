<template>
    <div>
      <h2>[추천/비추천 버튼]</h2>
      <RecommentButton :vote="vote"/>
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
                state: 0, //0: x, 1: recommend, 2: nonRecommend
            },
        }
    }
}
</script>

<style>

</style>