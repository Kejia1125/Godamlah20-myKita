declare interface Window {
  NDEFReader: any;
}

declare class NDEFReader {
  scan(): Promise<void>;
  write(data: string): Promise<void>;
}
