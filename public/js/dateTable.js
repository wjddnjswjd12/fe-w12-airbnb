//날짜 테이블 만들기
class Calendar {
  constructor() {
    this.today = new Date();
    this.countMonth = 0;
    this.prevButton = document.querySelector(".calTable__mainBar__prevButton");
    this.nextButton = document.querySelector(".calTable__mainBar__nextButton");
    this.leftCalendar = document.querySelector(
      ".calendar_container__left__calTable"
    );
    this.rightCalendar = document.querySelector(
      ".calendar_container__right__calTable"
    );
    this.prevButtonClicked();
    this.nextButtonClicked();
  }
  showCurrentCal() {
    this.buildCalendar(this.leftCalendar, 0);
  }
  showNextCal() {
    this.buildCalendar(this.rightCalendar, 1);
  }

  prevButtonClicked() {
    this.prevButton.addEventListener("click", () => {
      this.countMonth--;
      this.showCurrentCal();
      this.showNextCal();
    });
  }

  nextButtonClicked() {
    this.nextButton.addEventListener("click", () => {
      this.countMonth++;
      this.showCurrentCal();
      this.showNextCal();
    });
  }

  getInitialDate(cell, row, currentDate, cnt) {
    //1일이 몇요일인지 찾기
    for (let i = 0; i < currentDate.getDay(); i++) {
      cell = row.insertCell();
      cnt += 1;
    }
  }

  addDates(calendar, currentDate, numOfDaysInMonth) {
    //찾은 1일부터 날짜 집어넣기
    let cnt = 0;
    let row = calendar.insertRow();
    let cell;

    this.getInitialDate(cell, row, currentDate, cnt);

    for (let i = 1; i <= numOfDaysInMonth; i++) {
      cell = row.insertCell();
      cell.innerHTML = i;

      cnt++;
      if (cnt % 7 === 0) {
        cell.innerHTML = i;
        row = calendar.insertRow();
      }
    }
  }

  buildCalendar(calendar, num_checkNextCal) {
    //num_checkNextCal은 다음달 캘린더이면 1 아니면 0을 받는 파라미터. 아래 함수들에서 + 해준다
    const currentDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + this.countMonth + num_checkNextCal,
      1
    ); //현재 날짜의 month에 해당하는 1일
    const numOfDaysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(); //현재 날짜의 month에 해당하는 마지막 일 (ex 28, 30, 31)

    const yymm = document.querySelector(`.yearMonth${num_checkNextCal + 1}`);
    yymm.innerHTML = `${currentDate.getFullYear()}년 ${
      currentDate.getMonth() + 1
    }월`;

    while (calendar.rows.length > 2) {
      //prev버튼, next버튼 클릭 될때마다 새로 build 해야 하기에 이전에 build한 내용들 삭제
      calendar.deleteRow(calendar.rows.length - 1);
    }
    this.addDates(calendar, currentDate, numOfDaysInMonth);
  }
}

window.addEventListener("load", () => {
  let calendar = new Calendar();
  calendar.showCurrentCal();
  calendar.showNextCal();
});
