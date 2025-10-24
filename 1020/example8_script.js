// example8_script.js
// 宣告一個學生物件，包含屬性與方法

var student = {
  name: '小明',
  id: 'A123456789',
  scores: [85, 90, 78],
  getAverage: function() {
    var sum = 0;
    for (var i = 0; i < this.scores.length; i++) {
      sum += this.scores[i];
    }
    return sum / this.scores.length;
  },

  info: function() {
    return '姓名：' + this.name + '\n學號：' + this.id;
  }, //會用,隔開不同的funtion

  getGrade :function(){//回傳平均分數對應等第（A/B/C/D/F）。
    let grade='';
    switch(true){//在 student 物件的方法 (method) 內部，你不能直接呼叫同一個物件的另一個方法。
        //使用 this 關鍵字，來告訴 JavaScript：「我要呼叫的是這個物件 (student) 裡面的 getAverage 方法。」
        case this.getAverage()>=90:
            grade='A';break;
        case this.getAverage()>=80:
            grade='B';break;
        case this.getAverage()>=70:
            grade='C';break;
        case this.getAverage()>=60:
            grade='D';break;
        case this.getAverage()<60:
            grade='F';break;
        }
    return grade;
  }
  //錯誤寫法:case getAverage() > 90:
  //錯誤原因:javaScript 會試圖在「全域 (global scope)」尋找一個叫做 getAverage 的函式，
  //但找不到，於是拋出一個錯誤：ReferenceError: getAverage is not defined。
};

var text = student.info() + '\n平均：' + student.getAverage().toFixed(2) + '\n平均分數等第:'+student.getGrade();
document.getElementById('result').textContent = text;
