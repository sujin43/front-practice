<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app">
    <h1>전국 미세먼지 현황</h1>
    <div class="content">
      <div class="top">
        <select>
          <option v-for="(region, idx) in regions" :key="idx">{{ region }}</option>
        </select>
        <span>조회 기준시각 : {{getDate}}</span>
      </div>
      <div class="print">
        <div class="data" style="background-color:#00B548"><!-- 좋음 009FF9, 보통  19B500, 나쁨 E0AF00, 매우나쁨 E05100 -->
          <span>보통<!-- 통합대기환경지수 : khaiGrade 1=좋음, 2=보통, 3=나쁨, 4=매우나쁨 --></span>
          <p>
            <span>미세먼지 농도 : 30<!-- 미세먼지(PM10) 농도 : pm10Value --></span>
            <span>초미세먼지 : 55<!-- 미세먼지(PM2.5) 농도 : pm25Value --></span>
          </p>
        </div>
      </div>
      <p class="note">
        공공데이터포털에서 제공하는 한국환경공단에어코리아대기오염정보 중 시도별 실시간 측정정보 api를 사용. <br/>
        https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15073861<br/>
        회원가입 후 활용신청 하면 개발단계는 바로 승인됨. 승인 후 마이페이지로 가서 활용 서비스에서 인증키 확인 가능. 각자 인증키 받아 사용할것.<br/>
        시도 선택값 : 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종 <br/>
        화면 진입시 기본값 서울로 조회.<br/>
        한 페이지 결과수를 10으로 정의하고, 첫번째 결과를 사용하되, 값이 null이거나 통신장애 등일경우 다음순위 결과를 사용한다.
        <br/>
        시도를 바꾸면 해당 시도로 재조회 하며, 조회시점에서 5분 경과시 재조회 한다.<br/>
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
      regions: ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'],
      region: '서울'
    };
  },
  computed: {
    getDate() {
      const date = new Date()
      return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const url = `https://api.odcloud.kr/api/RltmArpltnInforInqireSvrc/v1/getCtprvnRltmMesureDnsty?sidoName=${this.region}&serviceKey=%2B5%2BP5HKeQdGMu1R2PTwyKGVp6uVODEzC%2BSEr1r6aK%2Brzi04qlDnJAI%2BHAcPqROzCjTpWNpDHSIyuqrLHkrlUQw%3D%3D&returnType=json`
      await fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Network response was not ok')
          }
        })
        .then((json) => {
          console.log(json)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
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
    text-align:left;
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
          padding: 0 .5em;
        }
      }
    }
  }
}
</style>