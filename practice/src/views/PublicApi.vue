<template>
  <div id="app" v-if="fromApi">
    <h1>전국 미세먼지 현황</h1>
    <div class="content">
      <div class="top">
        <select v-model="region" @change="getData">
          <option v-for="(region, idx) in regions" :key="idx">
            {{ region }}
          </option>
        </select>
        <span>조회 기준시각 : {{ getDate() }}</span>
      </div>
      <div class="print">
        <div class="data" :style="{'background-color': khaiGrade[fromApi.khaiGrade].bg}">
          <!-- 좋음 009FF9, 보통  19B500, 나쁨 E0AF00, 매우나쁨 E05100 -->
          <span>{{ khaiGrade[fromApi.khaiGrade].text }}<!-- 통합대기환경지수 : khaiGrade 1=좋음, 2=보통, 3=나쁨, 4=매우나쁨 --></span>
          <p>
            <span>미세먼지 농도 : {{ fromApi.pm10Value }}<!-- 미세먼지(PM10) 농도 : pm10Value --></span>
            <span>초미세먼지 : {{ fromApi.pm25Value}}<!-- 미세먼지(PM2.5) 농도 : pm25Value --></span>
          </p>
        </div>
      </div>
      <p class="note">
        공공데이터포털에서 제공하는 한국환경공단에어코리아대기오염정보 중 시도별
        실시간 측정정보 api를 사용. <br />
        https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861<br />
        회원가입 후 활용신청 하면 개발단계는 바로 승인됨. 승인 후 마이페이지로
        가서 활용 서비스에서 인증키 확인 가능. 각자 인증키 받아 사용할것.<br />
        시도 선택값 : 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원,
        충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종 <br />
        화면 진입시 기본값 서울로 조회.<br />
        한 페이지 결과수를 10으로 정의하고, 첫번째 결과를 사용하되, 값이
        null이거나 통신장애 등일경우 다음순위 결과를 사용한다.
        <br />
        시도를 바꾸면 해당 시도로 재조회 하며, 조회시점에서 5분 경과시 재조회
        한다.<br />
        조회때마다 경과 시간은 리셋됨.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromApi: null,
      regions: ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"],
      region: "서울",
      khaiGrade: { 1: {bg: '#009FF9', text: '좋음'}, 2: {bg: '#19B500', text: '보통'}, 3: {bg: '#E0AF00', text: '나쁨'},4: {bg: '#E05100', text: '매우나쁨'} },
      reloadFunction: null,
    };
  },
  mounted() {
    this.getData()
    this.reloadFunction = setInterval(() => { this.getData(); this.getDate(); }, 300000) //5분에 한 번씩 실행
  },
  methods: {
    getDate() {
      const date = new Date()
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    },
    async getData() {
      const url = `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=Ng4%2FISrjJiufoRAu%2F2EunlitOLvIycPxZ4USF9cGsZOd9d8p6R5kzLKawHagQ00MDSUxFmDjdNozDdbYt6YSMA%3D%3D&returnType=json&numOfRows=10&pageNo=1&sidoName=${this.region}&ver=1.0`;
      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error!");
          }
        })
        .then((json) => {
          let data = json.response.body.items;
          this.fromApi = data.find(
            (val) => ((val.khaiGrade !== null) && (val.pm10Value !== "-"))
          );
          this.getDate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 1.2em;
  select {
    font-size: 1.4em;
  }
  .note {
    text-align: left;
  }
  .content {
    width: 320px;
    margin: 0 auto;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .data {
      margin-top: 1em;
      padding: 2em;
      color: #fff;
      > span {
        font-size: 32px;
        font-weight: 700;
      }
      p {
        span {
          padding: 0 0.5em;
        }
      }
    }
  }
}
</style>