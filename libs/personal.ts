export class PersonalData {
  constructor(readonly name: string, readonly surname: string, private job: string){}

  get userJob(): string {
    return this.job;
  };
  set changeJob(newJob: string) {
    this.job = newJob;
  };
}