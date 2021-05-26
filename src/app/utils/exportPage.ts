import JSPDF from "jspdf";
// @ts-ignore
import domtoimage from "dom-to-image";
import background from "app/assets/background.png";

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
        const pdf = new JSPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
        const imgProps = pdf.getImageProperties(dataUrl);

        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = pdf.internal.pageSize.height;

        const widthRatio = pdfWidth / imgProps.width;
        const heightRatio = pdfHeight / imgProps.height;
        const ratio = Math.min(widthRatio, heightRatio);

        const w = imgProps.width * ratio;
        const h = imgProps.height * ratio;

        const x = (pdf.internal.pageSize.width - w) / 2;

        pdf.addImage(background, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.addImage(dataUrl, "PNG", x, 0, w, h);

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
