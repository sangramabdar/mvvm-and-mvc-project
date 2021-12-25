class ResponseBuilder<T> {
  private timeStamp: number;
  private error: string = "";
  private status: number = 200;
  private payload: T;
  constructor() {
    this.timeStamp = Date.now();
  }

  setError(error: string) {
    this.error = error;
    return this;
  }

  setStatus(status: number) {
    this.status = status;
    return this;
  }

  setPayload(payload: T) {
    this.payload = payload;
    return this;
  }

  build() {
    return this;
  }
}

export default ResponseBuilder;
