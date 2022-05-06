export const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.display = "flex";
    tooltipEl.style.justifyContent = "center";
    tooltipEl.style.height = "350px";
    tooltipEl.style.width = "350px";
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "white";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";
    tooltipEl.style.borderRadius = "5px";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  // const eventsImageObject = eventsImageObjectFn();
  const tooltipEl = getOrCreateTooltip(chart);
  const label = context.tooltip.dataPoints[0].dataset.label;
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b) => b.lines);

    const tableHead = document.createElement("thead");

    titleLines.forEach((title) => {
      const tr = document.createElement("tr");
      tr.style.borderWidth = 0;
      const th = document.createElement("th");
      th.style.borderWidth = 0;
      th.style.fontSize = "25px";
      const text = document.createTextNode(label);

      th.appendChild(text);
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement("tbody");
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];
      const trImage = document.createElement("tr");
      trImage.style.backgroundColor = "inherit";
      trImage.style.borderWidth = 0;

      const tdImage = document.createElement("td");
      tdImage.style.borderWidth = 0;
      // const image = document.createElement("img");
      // image.src = eventsImageObject[label];
      // image.style.height = "200px";
      // image.style.width = "200px";
      // trImage.appendChild(tdImage);
      // tdImage.appendChild(image);
      const span = document.createElement("span");
      span.style.background = colors.backgroundColor;
      span.style.borderColor = colors.borderColor;
      span.style.borderWidth = "2px";
      span.style.marginRight = "10px";
      span.style.height = "10px";
      span.style.width = "10px";
      span.style.display = "inline-block";

      const tr = document.createElement("tr");
      tr.style.backgroundColor = "inherit";
      tr.style.borderWidth = 0;

      const td = document.createElement("td");
      td.style.borderWidth = 0;

      //   const text = document.createTextNode(body);

      td.appendChild(span);
      //   td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(trImage);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector("table");

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};

export const colorGenerator = (length, opacity1, opacity2) => {
  const colorArray = [[], []];
  const colorRandomizer = () => {
    let randomNum = Math.random() * 255;
    randomNum = Math.ceil(randomNum);
    return randomNum;
  };

  for (let i = 0; i < length; i++) {
    let r, g, b;
    r = colorRandomizer();
    g = colorRandomizer();
    b = colorRandomizer();
    colorArray[0].push(`rgba(${r},${g},${b},${opacity1})`);
    colorArray[1].push(`rgba(${r},${g},${b},${opacity2})`);
  }
  return colorArray;
};
