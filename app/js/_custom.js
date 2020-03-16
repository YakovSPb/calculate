"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // SEPARATOR
  var thousandSeparator = function thousandSeparator(str) {
    var parts = (str + '').split('.'),
        main = parts[0],
        len = main.length,
        output = '',
        i = len - 1;

    while (i >= 0) {
      output = main.charAt(i) + output;

      if ((len - i) % 3 === 0 && i > 0) {
        output = ' ' + output;
      }

      --i;
    }

    if (parts.length > 1) {
      output += '.' + parts[1];
    }

    return output;
  }; // POLZINOK ONE


  var priceGeneral = 300000;
  var polzunokInput1 = document.getElementById('polzunok__input_1');
  $(".js-range-slider").ionRangeSlider({
    min: 300000,
    max: 6000000,
    step: 100000,
    onLoad: function onLoad(obj) {
      alert('hey');
    },
    onChange: function onChange(obj) {
      polzunokInput1.innerHTML = thousandSeparator(obj.from) + ' ₽';
      priceGeneral = obj.from;
      calculate();
    }
  });
  $(".js-range-slider2").ionRangeSlider({
    min: 12,
    max: 120,
    step: 1,
    from: 12,
    onLoad: function onLoad(obj) {},
    onChange: function onChange(obj) {
      polzunok2Input = thousandSeparator(obj.from);
      setYears();
      calculate();
    }
  });
  var rate = 12.6;
  var numbersYears = document.getElementById('pol_yaers');
  var wordYears = document.getElementById('pol_yaers_after');
  var numbersMonth = document.getElementById('pol_month');
  var wordMonth = document.getElementById('pol_month_after');
  var sumTotal = document.getElementById('result__number');
  var polzunok2Input = 12;

  function setYears() {
    var year = Math.floor(polzunok2Input / 12);
    var months = polzunok2Input - year * 12;
    var yearWord = 'год';
    var monthsWord = 'месяц';

    if (year >= 2 && year <= 4) {
      yearWord = 'года';
    } else if (year >= 5 && year <= 10) {
      yearWord = 'лет';
    }

    numbersYears.innerHTML = year;
    wordYears.innerHTML = yearWord;

    if (months == 1) {
      numbersMonth.innerHTML = months;
      wordMonth.innerHTML = monthsWord;
    } else if (months >= 2 && months <= 4) {
      monthsWord = 'месяца';
      numbersMonth.innerHTML = months;
      wordMonth.innerHTML = monthsWord;
    } else if (months >= 5 && months <= 12) {
      monthsWord = 'месяцев';
      numbersMonth.innerHTML = months;
      wordMonth.innerHTML = monthsWord;
    } else {
      numbersMonth.innerHTML = '';
      wordMonth.innerHTML = '';
    }
  }

  setYears();
  var total = 0;

  function calculate() {
    var sum = priceGeneral;
    var perc = rate;
    var i = new Array(1, 12);
    var term = polzunok2Input;
    var p = perc / 1200;
    var a = p * Math.pow(1 + p, term) / (Math.pow(1 + p, term) - 1); //Math.pow - возведение в степень (арг-т, степень)

    a = (a * 10000) / 10000;
    var month_p = a * sum;
    var total_p = term * month_p;
    var over_p = total_p - sum;
    var sel_val = new Array("рублей", "долларов", "евро");
    total = Math.round(month_p);
    sumTotal.innerHTML = thousandSeparator(total);
  }

  calculate();
});