'use strict';
const serverIP = 'http://localhost:5000/';
const gauge = function (
  fetchRoute,
  gaugeElement,
  gaugeMaxValue,
  gaugeText,
  gaugeTextValueCorrection = 0,
  gaugeRounding = 0
) {
  this.fetchRoute = fetchRoute;
  this.gaugeElement = gaugeElement;
  this.gaugeMaxValue = gaugeMaxValue;
  this.gaugeText = gaugeText;
  this.gaugeTextValueCorrection = gaugeTextValueCorrection;
  this.gaugeRounding = gaugeRounding;
  this.gaugeText = gaugeText;
};

gauge.prototype.updateGauge = function (updateValue, gauge) {
  changeGaugeValue(
    updateValue,
    gauge.gaugeElement,
    gauge.gaugeMaxValue,
    gauge.gaugeText,
    gauge.gaugeTextValueCorrection,
    gauge.gaugeRounding
  );
};

const changeGaugeValue = function (
  value,
  gauge,
  gaugeMaxValue,
  gaugeText,
  gaugeTextValueCorrection = 0,
  gaugeRounding = 0
) {
  // checks if value is outside gauges range and sets it to min or max value to prevent gauge slider from over rotating
  let min = gauge.querySelector('.gauge-min');
  let max = gauge.querySelector('.gauge-max');
  let correctedValue =
    value < 0 ? 0 : value > gaugeMaxValue ? gaugeMaxValue : value;

  gauge.querySelector('.gauge__fill').style.transform = `rotate(${
    correctedValue / (gaugeMaxValue * 2)
  }turn)`;

  gauge.querySelector('.gauge__cover').textContent = `${(
    value + gaugeTextValueCorrection
  ).toFixed(gaugeRounding)} ${gaugeText}`;

  min.textContent =
    value.toFixed(gaugeRounding) < min.textContent
      ? value.toFixed(gaugeRounding)
      : min.textContent;
  max.textContent =
    value.toFixed(gaugeRounding) > max.textContent
      ? value.toFixed(gaugeRounding)
      : max.textContent;
};

const oilTemp = new gauge(
  'oilTemp',
  document.querySelector('.oil-temp-turbo'),
  150,
  'C'
);

const boostGauge = new gauge(
  'boost',
  document.querySelector('.boost-gauge'),
  38,
  'PSI',
  -14.7,
  1
);

const oilPressure = new gauge(
  'oilPressure',
  document.querySelector('.oil-pressure-gauge'),
  120,
  'PSI'
);

const fetchData = function (server, gauge) {
  fetch(`${server + gauge.fetchRoute}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      gauge.updateGauge(res, gauge);
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
};

setInterval(function () {
  fetchData(serverIP, boostGauge);
}, 96);

setInterval(function () {
  fetchData(serverIP, oilPressure);
}, 95);

setInterval(function () {
  fetchData(serverIP, oilTemp);
}, 451);
