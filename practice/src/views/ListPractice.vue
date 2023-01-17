<template>
  <div>
    <ul class="menu">
      <li v-for="(item, idx) in menus" :key="idx">
        <div class="item">
          <input :id="item.id" type="text" v-model="item.text" />
          <input type="hidden" v-model="item.value" />
          <span @dblclick="focusInput(item.id)"></span>
        </div>
      </li>
    </ul>
    
    <div class="context-menu" v-clickoutside="closeContext">
      <ul>
        <li><button type="button">Rename menu</button></li> 
        <li><button type="button">Delete menu</button></li> 
      </ul>
    </div>
    <p class="note">
      menus 데이터 갯수만큼 .menu li를 loop 돌려 생성합니다.<br />
      각각 li 의 span을 클릭하면 형제 요소인 input[type='text']에 포커스가 가고, 입력값을 선택(selection) 합니다.<br />
      각각 li 마다 우클릭을 하면 .context-menu를 우클릭한 포지션 위로 띄우고, 
      이때 뜬 .context-menu의 'Rename menu'를 클릭하면 .context-menu를 띄우기 위해 클릭한 li의 input[type='text']에 포커스가 가고, 입력값을 선택(selection) 합니다(.item 내의 span 클릭과 동일 동작).<br />
      .menu li 우클릭시 브라우저 기본 context menu는 뜨지 않아야 합니다.<br />
      'Delete menu'를 클릭하면 메뉴를 해당 .menu의 해당 li를(정확히는 menus 데이터의 해당 오브젝트를) 삭제합니다.<br />
      .contex-memu는 영역 내의 버튼을 클릭하면 해당 메소드를 실행하고 닫히고, .contex-memu 외의 요소에 클릭, 포커스 이벤트가 발생하면 닫힙니다.<br />
      
    </p>
  </div>
</template>


<script>
import Vue from 'vue'

Vue.directive('clickoutside', {
  inserted: (elem, binding, vnode) => {
    elem.clickOutsideEvent = function (event) {
      if (!(elem == event.target || elem.contains(event.target))) {
        vnode.context[binding.expression](event)
      }
    }
    document.addEventListener('click', elem.clickOutsideEvent)
    document.addEventListener('touchstart', elem.clickOutsideEvent)
  },
  unbind: function (element) {
    document.removeEventListener('click', element.clickOutsideEvent)
    document.removeEventListener('touchstart', element.clickOutsideEvent)
  },
  stopProp(event) {
    event.stopPropagation()
  },
})
export default {
  
  data() {
    return {
      menus: [
        {id: 'menuItem1', value: 'menu1', text: 'Menu 1', selected: false},
        {id: 'menuItem2', value: 'menu2', text: 'Menu 2', selected: false},
        {id: 'menuItem3', value: 'menu3', text: 'Menu 3', selected: false},
        {id: 'menuItem4', value: 'menu4', text: 'Menu 4', selected: false},
        {id: 'menuItem5', value: 'menu5', text: 'Menu 5', selected: false},
        {id: 'menuItem6', value: 'menu6', text: 'Menu 6', selected: false},
      ]
    };
  },
  mounted() {
    
  },
  methods: {
    focusInput(id){
      document.getElementById(id).focus()
    },
    menuContext(e, id){
      console.log(e)
      console.log(id)
      e.preventDefault();
    },
    closeContext(){
      console.log('click outside context menu')
    },
  }
};
</script>

<style lang="scss">
  #app {
    padding: 1em;
    * {
      box-sizing: border-box;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
  .note {
    padding: 1em 0;
    line-height: 1.5em;
  }
  .menu {
    width: 240px;
    li {
      ~ li {
        margin-top: -1px;
      }
    }
    .item {
      position: relative;
      border: 1px solid #ddd;
      input[type='text'] {
        display: block;
        width: 100%;
        font-size: 12px;
        line-height: 32px;
        padding: .3em;
        border: none;
      }
      span {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  .context-menu {
    position: fixed;
    left: 10px;
    top: 300px;
    background: #000;
    color: #fff;
    li {
      padding: 0 .5em;
      button {
        border: none;
        background: transparent;
        color: #fff;
        font-size: 11px;
        line-height: 24px;
        cursor: pointer;
      }
      ~ li {
        border-top: 1px solid #333;
      }
    }
  }
</style>
