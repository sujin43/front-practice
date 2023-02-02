<!-- Use preprocessors via the lang attribute! e.g. <template lang="pug"> -->
<template>
  <div id="app">
    <div class="wrap-list">
      <div class="column">
        <div class="set" v-for="(data, idx) in dataSetDump[0]" :key="data.id" @click="setSelected(data.id, 'left')" :class="{'selected': data.id === selected}">
          <span class="name">{{data.name}}</span>
          <div class="buttons">
            <button type="button" class="button up" @click.stop="moveListUpDown(idx, 'left', 'up')" :disabled="idx === 0"><span>앞으로</span></button>
            <button type="button" class="button down" @click.stop="moveListUpDown(idx, 'left', 'down')" :disabled="idx === dataSetDump[0].length - 1"><span>뒤로</span></button>
          </div>
        </div>
      </div>
      <div class="column control">
        <button type="button" :class="{'button left': true, 'disabled': disabledLeft}" :disabled="disabledLeft" @click="moveListSide"><span>왼쪽 컬럼으로 이동</span></button>
        <button type="button" :class="{'button right': true, 'disabled': disabledRight}" :disabled="disabledRight" @click="moveListSide"><span>오른쪽 컬럼으로 이동</span></button>
      </div>
      <div class="column">
        <div class="set" v-for="(data, idx) in dataSetDump[1]" :key="data.id" @click="setSelected(data.id, 'right')" :class="{'selected': data.id === selected}">
          <span class="name">{{data.name}}</span>
          <div class="buttons">
            <button type="button" class="button up" @click.stop="moveListUpDown(idx, 'right', 'up')" :disabled="idx === 0"><span>앞으로</span></button>
            <button type="button" class="button down" @click.stop="moveListUpDown(idx, 'right', 'down')" :disabled="idx === dataSetDump[1].length - 1"><span>뒤로</span></button>
          </div>
        </div>
      </div>
    </div>
    <div class="submit">
      <button type="button" :class="{'button reset': true, 'disabled': resetDisabled}" :disabled="resetDisabled" @click="reset"><span>Reset</span></button>
      <button type="button" class="button" @click="save"><span>Save</span></button>
    </div>
    <ul class="note">
      <li>dataSet의 두 배열을 각각 좌우 컬럼(.coiumn)에 div.set을 루프 시키면서 뿌립니다.</li>
      <li>.set은 클릭 시 선택이 되며 클래스 'selected'가 추가됩니다.</li>
      <li>다른 .set을 클릭하면 기존에 클릭했던 .set은 'selected' 클래스가 삭제됩니다.</li>
      <li>.set 노드를 위아래 혹은 좌우 컬럼으로 이동하면 selected 값은 삭제됩니다.</li>
      <li>.button.left, .button.left는 선택된 노드가 없으면 disabled처리 및 .disabled 클래스 추가하고, 선택된 .set 노드가 있을 경우 .button.left, .button.left를 클릭해서 해당 노드를 이동할 컬럼의 맨 마지막으로 옮깁니다.</li>
      <li>또한 각 .set 노드는 내부의 .button.up, .button.down을 클릭해서 위 아래로 순서를 변경할 수 있습니다. <br />
        순서는 순환하지 않고, 첫번째 노드는 up 동작을 막고, 마지막 노드는 down 동작을 막아야 합니다.<br />
        이 동작은 selected 여부와 관계 없습니다. <br />
        또한 .button.up, .button.down 클릭 시 .set으로 이벤트가 전파되지 않도록 막습니다. </li>
      <li>하단의 Reset 버튼은 초기에 disabled처리 및 .disabled 클래스 추가합니다.<br />변경된 값이 있을 경우에만 disabled 속성을 삭제합니다.(정렬 등을 하다가 초기값과 동일해지면 역시 disabled 처리)</li>
      <li>Reset 버튼 클릭시 모든 변경값을 무시하고 최초 데이터 상태로 되돌립니다.</li>
      <li>Save 버튼 클릭시 현재 정렬된 좌우 데이터 값을 console.log로 찍습니다.</li>
      <li>키워드 : JavaScript Array Methods, $set</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSetDump: [], //dataSet을 복제
      dataSet: [[
        {id: 'seq1000001', name: 'Left data 1'},
        {id: 'seq1000002', name: 'Left data 2'},
        {id: 'seq1000003', name: 'Left data 3'},
        {id: 'seq1000004', name: 'Left data 4'},
        {id: 'seq1000005', name: 'Left data 5'},
        {id: 'seq1000006', name: 'Left data 6'},
        {id: 'seq1000007', name: 'Left data 7'},
        {id: 'seq1000008', name: 'Left data 8'},
        {id: 'seq1000009', name: 'Left data 9'},
      ],[
        {id: 'seq2000001', name: 'Right data 1'},
        {id: 'seq2000002', name: 'Right data 2'},
        {id: 'seq2000003', name: 'Right data 3'},
        {id: 'seq2000004', name: 'Right data 4'},
        {id: 'seq2000005', name: 'Right data 5'},
        {id: 'seq2000006', name: 'Right data 6'},
        {id: 'seq2000007', name: 'Right data 7'},
        {id: 'seq2000008', name: 'Right data 8'},
      ]],
      selected: "",
      selectedPos: "",
      resetDisabled: true
    };
  },
  watch: {
    dataSetDump: {
        deep: true,
        handler(newValue) {
            JSON.stringify(newValue) === JSON.stringify(this.dataSet) 
            ? this.resetDisabled = true
            : this.resetDisabled = false
        }            
    }
  },
  computed: {
    disabledLeft() {
        return !this.selected || this.selectedPos === "left" //왼쪽 이동 버튼 비활성화 조건 체크
    },
    disabledRight() {
        return !this.selected ||this.selectedPos === "right" //오른쪽 이동 버튼 비활성화 조건 체크
    }
  },
  mounted() {
    this.dataSetDump = this.dataSet.map(data => [...data])
  },
  methods: {
    setSelected(id, pos) {
        this.selected = id
        this.selectedPos = pos
    },
    moveListUpDown(idx, pos, movePos) {
        const arrayIdx = pos === 'left' ? 0 : 1
        const item = this.dataSetDump[arrayIdx].splice(idx, 1) //선택된 아이템
        movePos === 'up' //리스트 위치 이동
        ? this.dataSetDump[arrayIdx].splice(idx-1, 0, item[0])
        : this.dataSetDump[arrayIdx].splice(idx+1, 0, item[0])
        this.selected = "" //selected 초기화
    },
    moveListSide() {
        let arrayIdx, otherIdx = "";
        this.selectedPos === 'left' ? (arrayIdx = 0, otherIdx = 1) : (arrayIdx = 1, otherIdx = 0)

        const item = this.dataSetDump[arrayIdx].find(data => data.id === this.selected) //선택된 아이템
        const itemIdx = this.dataSetDump[arrayIdx].indexOf(item)
        this.$delete(this.dataSetDump[arrayIdx], itemIdx)
        this.$set(this.dataSetDump[otherIdx], this.dataSetDump[otherIdx].length, item)
        this.selected = "" //selected 초기화
    },
    reset() {
        this.dataSetDump = this.dataSet.map(data => [...data])
    },
    save() {
        console.log(this.dataSetDump)
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
  margin-top: 60px;
}
  button {
    cursor: pointer;
  }
  .note {
    margin: 2em auto 0;
    text-align: left;
    width: 480px;
    font-size: 13px;
    li {
      line-height: 1.333em;
      padding-left: .5em;
      text-indent: -.3em;
      &::before {
        content: '\022C5';
        display: inline-block;
        font-size: 16px;
      }
      ~ li {
        margin-top: .3em;
      }
    }
  }
  .submit {
    margin-top: 1em;
    .button {
      appearance: none;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      padding: .4em .6em;
      &.reset {
        background: #bbb;
      }
      &.disabled {
        opacity: .5;
        cursor: default;
      }
    }
  }
  .wrap-list {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    width: 480px;
    height: 360px;
    margin: 0 auto;
    border: 1px solid #ebebeb;
    .column {
      flex: 5 1 0;
      ~ .column {
        border-left: 1px solid #ebebeb;
      }
      .button {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        background: none;
        span {
          font-size: 0;
        }
      }
      &.control {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .button {
          &::before {
            display: inline-block;
            content: '\027A1';
            font-size: 14px;
          }
          &.left {
            &::before {
              transform: rotate(180deg);
            }
          }
          &.disabled {
            opacity: .5;
            cursor: default;
          }
        }
      }
      .set {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .6em .8em;
        border-bottom: 1px solid #ebebeb;
        font-size: 12px;
        &.selected {
          background-color: #ebebeb;
        }
        .button {
          background-color: #fff;
          &::before {
            display: inline-block;
            content: '\027A1';
            transform: rotate(-90deg);
            font-size: 10px;
          }
          &.down {
            &::before {
              transform: rotate(90deg);
            }
          }
        }
      }
    }
  }
</style>
