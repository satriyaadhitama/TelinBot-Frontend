function convertGBtoTB(gigabytes: number) {
  const gigabytesPerTerabyte = 1024;
  return (gigabytes / gigabytesPerTerabyte).toFixed(2);
}

function truncate(str: string, n: number) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  }

export { convertGBtoTB, truncate };
