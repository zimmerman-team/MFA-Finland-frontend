// @ts-ignore
import domtoimage from "dom-to-image";

export function exportPage(type: string) {
  const node = document.getElementById("root");
  if (type === "jpg") {
    domtoimage
      .toJpeg(node, { bgcolor: "#f8f8f8" })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  } else if (type === "svg") {
    domtoimage
      .toSvg(node, { bgcolor: "#f8f8f8" })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  } else {
    domtoimage
      .toPng(node, { bgcolor: "#f8f8f8" })
      .then((dataUrl: any) => {
        const link = document.createElement("a");
        link.download = "download.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  }
}
