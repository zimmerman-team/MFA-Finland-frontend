export function shouldRender(location: any) {
  const arrayOfStrings = ["/about", "/feedback", "/statement"];
  const str = location.pathname;
  const found = arrayOfStrings.find((v) => str === v);
  if (found === undefined) {
    return true;
  } else {
    return false;
  }
}
