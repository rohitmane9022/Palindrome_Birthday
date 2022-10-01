function reverseStr(str){
  var listofChars = str.split('');

  var reverseListodChars = listofChars.reverse();
  
  var reversedStr = reverseListodChars.join('');

  return reversedStr
}


function isPalindrome(str){
  var reverse = reverseStr(str);
  return str === reverse
}


function converDateTostr(date){
  var dateStr = { day: '',month: '',year: ''};

  if(date.day <10){
    dateStr.day = '0' + date.day
  }else{
    dateStr.day = date.day.toString()  }
  if(date.month < 10){
    dateStr.month = '0' + date.month;
  }else{
    dateStr.month= date.month.toString();
  }

  dateStr.year = date.year.toString();

  return dateStr
}

function getAllDateFormats(date) {
  var dateStr = converDateTostr(date);

  var ddmmyyyy = dateStr.day + dateStr.month +     
  dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

  
  var ddmmyy = dateStr.day + dateStr.month +     
  dateStr.year.slice(-2);
  var mmddyy =dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeForAllFormats(date){
   var listofPalindromes = getAllDateFormats(date)

  var flag = false;

  for (let i = 0; i < listofPalindromes.length; i++) {
    if (isPalindrome(listofPalindromes[i])) {
      flag = true;
      break
    }
  }
  return flag;
}


function isLeapYear(year){
  if( year % 400 === 0){
      return true
  }
  if(year % 100 === 0){
    return false
  }
  if(year % 4 === 0){
    return true
  }
  return false
}

function getNewDate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year

  var dayismonth = [31,28,30,31,30,31,31,30,31,31,31,31]

  if(month === 2){
    if(isLeapYear(year)){
      if(day > 29){
        day=1;
        month++
      }
      
      }
    else{
        if(day > 28){
          day= 1;
          month++;
        }
    }
  }
  else{
    if(day > dayismonth[month -1]){
      day = 1;
      month++
    }
  }
  if(month > 12){
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  }
}

function getNewpalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNewDate(date)

  while(1){
    ctr++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(isPalindrome){
      break
    }
    nextDate = getNewDate(nextDate)
  }
  return [ctr,nextDate];
}

var dateInputRef = document.querySelector('.bday-input');
var showBtnRef = document.querySelector('.show-btn');
var resultRef = document.querySelector('#output');

function clickHandler(e) {
var bdayStr = dateInputRef.value
  
 if(bdayStr !== ''){
    var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };
    
    var isPalindrome = checkPalindromeForAllFormats(date);

    if(isPalindrome){
       resultRef.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
    }
    else {
      var [ctr, nextDate] = getNewpalindromeDate(date);

      resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
    }
  }
}

showBtnRef.addEventListener('click', clickHandler)