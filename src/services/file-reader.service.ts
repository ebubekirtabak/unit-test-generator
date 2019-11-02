export class FileReaderService {

  constructor() {

  }

  readFileByUrl(path: string) {
    var fs = require('fs');
    fs.readFile(path, (err, data) => {
      if (err) { throw err; }
      return data;
    });
  }
}
