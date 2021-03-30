// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Hint, Sunburst } from "react-vis";
import { css } from "styled-components/macro";

const DATA = {
  children: [
    {
      children: [
        { bigness: 1, children: [], clr: "#DA8E68", name: "excellent" },
        { bigness: 1, children: [], clr: "#DA8E68", name: "chart" },
      ],
      clr: "#DA8E68",
    },
    {
      bigness: 1,
      children: [],
      clr: "#DA8E68",
      name: "cool",
      labelStyle: {
        fontSize: 20,
        fontWeight: "bold",
        "&::hover": {
          border: "1px solid red",
        },
        "&::before": {
          content: "",
          width: "100&",
          borderBottom: "solid 1px #fff",
          position: "absolute",
          left: "0",
          top: "50%",
          zIndex: 1,
        },
      },
    },
    { bigness: 1, children: [], clr: "#DA8E68", name: "dogs" },
    { bigness: 1, children: [], clr: "#DA8E68", name: "sunglasses" },
    {
      children: [
        { bigness: 1, children: [], clr: "#DA8E68", name: "great" },
        { bigness: 1, children: [], clr: "#DA8E68", name: "label" },
      ],
      clr: "#DA8E68",
    },
  ],
};

const tipStyle = {
  display: "flex",
  color: "#fff",
  background: "#000",
  alignItems: "center",
  padding: "5px",
};
const boxStyle = { height: "10px", width: "10px" };

function buildValue(hoveredCell: any) {
  const { radius, angle, angle0 } = hoveredCell;
  const truedAngle = (angle + angle0) / 2;
  return {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
  };
}

function renderLines() {
  const labelElements = document.querySelectorAll(
    `[class="rv-xy-plot__series--label-text"]`
  );
  const line = document.createElement("line");
  line.setAttribute("x1", "20");
  line.setAttribute("y1", "20");
  line.setAttribute("x2", "200");
  line.setAttribute("y2", "180");
  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "3");
  console.log(line);
  const newLabelElements: Element[] = [];

  labelElements.forEach((label: Element) => {
    console.log(label);
    label.insertBefore(line, null);
    newLabelElements.push(label);
  });

  console.log(newLabelElements);
  ReactDOM.render(
    newLabelElements,
    document.getElementById("rv-xy-plot__inner")
  );
}

export function Sunburstoe() {
  const [hoveredCell, setHoveredCell] = useState(false);
  const styles = css`
    * text {
      ::after {
        content: "swag";
        display: inline-block;
      }
      fill: black;
    }
  `;

  useEffect(() => {
    renderLines();
  }, []);

  return (
    <Sunburst
      // @ts-ignore
      data={DATA}
      css={styles}
      style={{ stroke: "#fff" }}
      // onValueMouseOver={(v) =>
      //     this.setState({ hoveredCell: v.x && v.y ? v : false })
      // }
      // onValueMouseOut={() => this.setState({ hoveredCell: false })}
      height={300}
      margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
      getLabel={(d: any) => d.name}
      getSize={(d: any) => d.bigness}
      getColor={(d: any) => d.clr}
      width={350}
      padAngle={() => 0.02}
    />
  );
}
