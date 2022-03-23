export class Gauge {
  name!: string;
  value!: number | string;
  offset!: number;
  rounding!: number;
  unit!: string;
  min: number | string = Infinity;
  max: number | string = -Infinity;

  constructor(name: string, offset: number, rounding: number, unit: string) {
    this.name = name;
    this.offset = offset;
    this.rounding = rounding;
    this.unit = unit;
  }

  update(value: number) {
    this.value = (value + this.offset).toFixed(this.rounding);
    this.min = +this.value < this.min ? this.value : this.min;
    this.max = +this.value > this.max ? this.value : this.max;
    return this;
  }
}
