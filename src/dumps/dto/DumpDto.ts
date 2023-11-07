export class DumpDto {
  constructor(
    public dumpUrl?: string,
    public image?: string,
    public highlight: boolean = false
  ) {}
}
