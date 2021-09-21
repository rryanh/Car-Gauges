'use strict';
const serverIP = 'http://localhost:5000/';

const boostGauge = {
  fetchRoute: 'boost',
  gaugeElement: document.querySelector('.boost-gauge'),
  updateGauge(value) {
    changeGaugeValue(this.gaugeElement, value, 38, 'PSI', -14.7, 1);
  },
};

const oilPressure = {
  fetchRoute: 'oilPressure',
  gaugeElement: document.querySelector('.oil-pressure-gauge'),
  updateGauge(value) {
    changeGaugeValue(this.gaugeElement, value, 120, 'PSI');
  },
};

const turboOilTemp = {
  fetchRoute: 'oilTemp',
  gaugeElement: document.querySelector('.oil-temp-turbo'),
  updateGauge(value) {
    changeGaugeValue(this.gaugeElement, value, 130, 'C');
  },
};

const fetchData = function (server, gauge) {
  fetch(`${server + gauge.fetchRoute}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      gauge.updateGauge(res);
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    });
};

const changeGaugeValue = function (
  gauge,
  value,
  gaugeMaxValue,
  gaugeText,
  gaugeTextValueCorrection = 0,
  gaugeRounding = 0
) {
  value = value < 0 ? 0 : value > gaugeMaxValue ? gaugeMaxValue : value;
  gauge.querySelector('.gauge__fill').style.transform = `rotate(${
    value / (gaugeMaxValue * 2)
  }turn)`;

  try {
    gauge.querySelector('.gauge__cover').textContent = `${(
      value + gaugeTextValueCorrection
    ).toFixed(gaugeRounding)} ${gaugeText}`;
  } catch (error) {
    gauge.querySelector('.gauge__cover').textContent = `ERROR`;
  }
};

setInterval(function () {
  fetchData(serverIP, boostGauge);
}, 95);

setInterval(function () {
  fetchData(serverIP, oilPressure);
}, 95);

setInterval(function () {
  fetchData(serverIP, turboOilTemp);
}, 450);
