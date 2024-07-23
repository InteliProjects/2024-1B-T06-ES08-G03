export class GlobalState {
  private static instance: GlobalState;
  public scaleFactor: number;

  private constructor() {
    this.scaleFactor = 1; // 1 means normal processing time
  }

  public static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState();
    }
    return GlobalState.instance;
  }

  public setScaleFactor(factor: number) {
    this.scaleFactor = factor;
  }

  public getScaleFactor(): number {
    return this.scaleFactor;
  }
}

export default GlobalState;