exports.getWindowSize = stdout => (stdout.isTTY ? stdout.getWindowSize() : [200, 200]);
