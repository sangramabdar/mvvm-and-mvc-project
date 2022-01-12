export const isNameValid = (name: string) =>
  name.length >= 5 && name.length <= 12;

type CallBack<T> = {
  callback: (value: T) => boolean;
  error: string;
};

class Schema<T> {
  _required: boolean = false;
  callbacks: Array<CallBack<T>> = [];
  type: string = "";
  key: string = "";

  constructor(key: string) {
    this.key = key;
  }

  validate(value: T) {
    console.log(this.callbacks);
    if (typeof value !== this.type) {
      throw new Error(`${this.key} must be ${this.type}`);
    }

    for (let { callback, error } of this.callbacks) {
      if (!callback(value)) {
        throw new Error(error);
      }
    }
  }
}

class StringSchema extends Schema<string> {
  maxLength: number = 0;
  minLength: number = 0;

  constructor(key: string) {
    super(key);
    console.log(key);
    this.type = "string";
  }

  #max = (name: string) => name.length <= this.maxLength;
  #min = (name: string) => name.length >= this.minLength;
  #required = (name: string) => name.length >= 1;

  #isString = (name: string) => {
    let format = /^[A-Za-z]+$/;

    if (!name.match(format)) {
      return false;
    }
    return true;
  };

  #isNumber = (name: string) => {
    let format = /^[0-9]+$/;

    if (!name.match(format)) {
      return false;
    }
    return true;
  };

  max(length: number) {
    this.maxLength = length;

    this.callbacks.push({
      callback: this.#max,
      error: `name should contain at least ${length} characters,`,
    });

    return this;
  }

  min(length: number) {
    this.minLength = length;

    this.callbacks.push({
      callback: this.#min,
      error: `name should contain at most ${length} characters,`,
    });
    return this;
  }

  required() {
    this.callbacks.push({
      callback: this.#required,
      error: `name must not be empty,`,
    });

    return this;
  }
  onlyAplhabates() {
    this.callbacks.push({
      callback: this.#isString,
      error: "enter only alphabtes",
    });
    return this;
  }

  onlyDigits() {
    this.callbacks.push({
      callback: this.#isNumber,
      error: `${this.key} should contain only numbers`,
    });
    return this;
  }
}

class NumberSchema extends Schema<number> {
  constructor(key: string) {
    super(key);
    this.type = "number";
  }

  #isNotNegative(value: number) {
    if (value < 0) return false;
    return true;
  }

  notNegative() {
    this.callbacks.push({
      callback: this.#isNotNegative,
      error: `${this.key} must not be negative`,
    });
    return this;
  }
}

class GenderSchema extends Schema<string> {
  constructor(key: string) {
    super(key);
    this.type = "string";
  }

  #maleOrFemale(value: string) {
    if (value === "male") return true;
    if (value === "female") return true;
    return false;
  }

  maleOrfemale() {
    this.callbacks.push({
      callback: this.#maleOrFemale,
      error: "gender must be male or female",
    });
    return this;
  }
}

export { Schema, StringSchema, NumberSchema, GenderSchema };
