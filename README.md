# Front-End Practice
프론트엔드 관련 과제

## Context Menu
- menus 데이터 갯수만큼 .menu li를 loop 돌려 생성합니다.
- 각각 li 의 span을 클릭하면 형제 요소인 input[type='text']에 포커스가 가고, 입력값을 선택(selection) 합니다.
- 각각 li 마다 우클릭을 하면 .context-menu를 우클릭한 포지션 위로 띄우고, 
- 이때 뜬 .context-menu의 'Rename menu'를 클릭하면 .context-menu를 띄우기 위해 클릭한 li의 input[type='text']에 포커스가 가고, 입력값을 선택(selection) 합니다(.item 내의 span 클릭과 동일 동작).
- .menu li 우클릭시 브라우저 기본 context menu는 뜨지 않아야 합니다.
- 'Delete menu'를 클릭하면 메뉴를 해당 .menu의 해당 li를(정확히는 menus 데이터의 해당 오브젝트를) 삭제합니다.
- .contex-memu는 영역 내의 버튼을 클릭하면 해당 메소드를 실행하고 닫히고, .contex-memu 외의 요소에 클릭, 포커스 이벤트가 발생하면 닫힙니다.


## Public API
- 공공데이터포털에서 제공하는 한국환경공단에어코리아대기오염정보 중 시도별 실시간 측정정보 api를 사용.
- 시도 선택값 : 서울, 부산, 대구, 인천, 광주, 대전, 울산, 경기, 강원, 충북, 충남, 전북, 전남, 경북, 경남, 제주, 세종
- 화면 진입시 기본값 서울로 조회.
- 한 페이지 결과수를 10으로 정의하고, 첫번째 결과를 사용하되, 값이 null이거나 통신장애 등일경우 다음순위 결과를 사용한다.
- 시도를 바꾸면 해당 시도로 재조회 하며, 조회시점에서 5분 경과시 재조회한다.
- 조회때마다 경과 시간은 리셋됨.


## Array Method
- dataSet의 두 배열을 각각 좌우 컬럼(.coiumn)에 div.set을 루프 시키면서 뿌립니다.
- .set은 클릭 시 선택이 되며 클래스 'selected'가 추가됩니다.
- 다른 .set을 클릭하면 기존에 클릭했던 .set은 'selected' 클래스가 삭제됩니다.
- .set 노드를 위아래 혹은 좌우 컬럼으로 이동하면 selected 값은 삭제됩니다.
- .button.left, .button.left는 선택된 노드가 없으면 disabled처리 및 .disabled 클래스 추가하고, 선택된 .set 노드가 있을 경우 .button.left, .button.left를 클릭해서 해당 노드를 이동할 컬럼의 맨 마지막으로 옮깁니다.
- 또한 각 .set 노드는 내부의 .button.up, .button.down을 클릭해서 위 아래로 순서를 변경할 수 있습니다.
- 순서는 순환하지 않고, 첫번째 노드는 up 동작을 막고, 마지막 노드는 down 동작을 막아야 합니다.
- 이 동작은 selected 여부와 관계 없습니다.
- 또한 .button.up, .button.down 클릭 시 .set으로 이벤트가 전파되지 않도록 막습니다.
- 하단의 Reset 버튼은 초기에 disabled처리 및 .disabled 클래스 추가합니다.
- 변경된 값이 있을 경우에만 disabled 속성을 삭제합니다.(정렬 등을 하다가 초기값과 동일해지면 역시 disabled 처리)
- Reset 버튼 클릭시 모든 변경값을 무시하고 최초 데이터 상태로 되돌립니다.
- Save 버튼 클릭시 현재 정렬된 좌우 데이터 값을 console.log로 찍습니다.
- 키워드 : JavaScript Array Methods, $set


## RecommendTest
- 게시글 추천/비추천 컴포넌트 구현