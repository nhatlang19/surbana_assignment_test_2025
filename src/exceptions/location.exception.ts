export class LocationNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocationNotFoundException';
  }
}

export class DuplicateLocationNumberException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateLocationNumberException';
  }
}
