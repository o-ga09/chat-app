export class User {
  constructor(
    readonly user_id: string,
    readonly user_name: string,
    readonly icon_url: string
  ) {}
}

export class Message {
  constructor(
    readonly id: number,
    readonly title: string,
    readonly destName: string,
    readonly sourceName: string,
    readonly contents: string,
    readonly received_at: Date,
    readonly delivery_at: Date
  ) {}

  formatedDate() {
    return this.received_at.toLocaleString("ja-JP");
  }
}
