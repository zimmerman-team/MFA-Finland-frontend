import JSPDF from "jspdf";
// @ts-ignore
import domtoimage from "dom-to-image";

export function exportPage(type: string) {
  const node = document.getElementById("root");
  const filter = (n: any) => n.id !== "page-ornament";
  if (type === "jpg") {
    domtoimage
      .toJpeg(node, { filter, bgcolor: "#f8f8f8" })
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
  } else if (type === "pdf") {
    domtoimage
      .toPng(node, { filter, bgcolor: "#f8f8f8" })
      .then((dataUrl: any) => {
        const htmlImage = new Image();
        htmlImage.src = dataUrl;
        const pdf = new JSPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(htmlImage, 0, 0, width, height);
        pdf.save("download.pdf");
      })
      .catch((error: any) => {
        console.error("oops, something went wrong!", error);
      });
  } else {
    domtoimage
      .toPng(node, {
        filter,
        bgcolor: "#f8f8f8",
      })
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
