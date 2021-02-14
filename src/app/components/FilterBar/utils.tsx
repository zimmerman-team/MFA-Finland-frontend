export function shouldRender(location: any) {
  const urls = ["/about", "/feedback", "/statement", "/project/"];
  const currentLocation = location.pathname;
  let found = urls.some((url) => {
    return currentLocation.includes(url);
  });
  if (found === false) {
    return true;
  } else {
    return false;
  }
}

export function getMockData() {
  return [
    { name: "2020" },
    { name: "Organisation Category A" },
    { name: "Organisation A" },
    { name: "Sector A" },
    { name: "Sector B" },
    { name: "Cancelled" },
    { name: "Reimbursed" },
    { name: "eimbursed" },
    { name: "imbursed" },
    { name: "mbursed" },
    { name: "bursed" },
    { name: "ursed" },
    { name: "rsed" },
    { name: "sed" },
    { name: "ed" },
    { name: "d" },
    { name: "di" },
    { name: "dic" },
    { name: "dict" },
    { name: "dicte" },
    { name: "dictee" },
  ];
}
