import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LOSResult } from './calculations';

export async function exportPDF(data: {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  pendingOrders: number;
  receivedStock: number;
  result: LOSResult;
  timestamp: Date;
}) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 25;

  pdf.setFillColor(8, 145, 178);
  pdf.rect(0, 0, pageWidth, 35, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(28);
  pdf.setFont(undefined, 'bold');
  pdf.text('SightFlow', margin, 15);

  pdf.setFontSize(11);
  pdf.setFont(undefined, 'normal');
  pdf.text('Line of Sight Performance Report', margin, 23);

  pdf.setFontSize(9);
  pdf.setTextColor(240, 240, 240);
  pdf.text(`Generated: ${data.timestamp.toLocaleString()}`, margin, 30);

  yPosition = 50;

  const drawSection = (title: string, items: Array<{ label: string; value: string; highlight?: boolean }>) => {
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = 25;
    }

    pdf.setFillColor(245, 245, 245);
    pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 10, 2, 2, 'F');

    pdf.setTextColor(8, 145, 178);
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'bold');
    pdf.text(title, margin + 3, yPosition + 7);
    yPosition += 15;

    items.forEach((item, idx) => {
      if (yPosition > pageHeight - 35) {
        pdf.addPage();
        yPosition = 25;
      }

      if (item.highlight) {
        pdf.setFillColor(230, 247, 255);
        pdf.roundedRect(margin + 3, yPosition - 5, pageWidth - 2 * margin - 6, 10, 1, 1, 'F');
      }

      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.text(item.label, margin + 5, yPosition);

      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(item.highlight ? 8 : 30, item.highlight ? 145 : 30, item.highlight ? 178 : 30);
      const valueWidth = pdf.getTextWidth(item.value);
      pdf.text(item.value, pageWidth - margin - valueWidth - 5, yPosition);

      yPosition += 10;
    });

    yPosition += 5;
  };

  const inputItems = [
    { label: 'Demand (Sell Out)', value: `${data.sellOutHl.toFixed(2)} hl`, highlight: false },
    { label: 'Demand in Cases', value: `${data.result.sellOutCases.toFixed(0)} cases`, highlight: false },
    { label: 'Supply (Sell In)', value: `${data.sellInHl.toFixed(2)} hl`, highlight: false },
    { label: 'Supply in Cases', value: `${data.result.sellInCases.toFixed(0)} cases`, highlight: false },
    { label: 'Target Coverage (LOS)', value: `${data.desiredLos.toFixed(2)}%`, highlight: true },
  ];

  if (data.pendingOrders > 0) {
    inputItems.push({ label: 'Pending Orders', value: `${data.pendingOrders.toFixed(0)} cases`, highlight: false });
  }

  if (data.receivedStock > 0) {
    inputItems.push({ label: 'Incoming Stock', value: `${data.receivedStock.toFixed(0)} cases`, highlight: false });
    const HECTOLITER_TO_CASE = 0.09;
    const updatedSellIn = data.sellInHl + (data.receivedStock * HECTOLITER_TO_CASE);
    inputItems.push({ label: 'Updated Sell In (with incoming)', value: `${updatedSellIn.toFixed(2)} hl`, highlight: true });
  }

  drawSection('Input Parameters', inputItems);

  const performanceItems = [
    { label: 'Current Coverage (LOS)', value: `${data.result.currentLos.toFixed(2)}%`, highlight: true },
    { label: 'Performance Status', value: data.result.losStatus.toUpperCase(), highlight: false },
    { label: 'Variance from Target', value: `${(data.result.currentLos - data.desiredLos).toFixed(2)}%`, highlight: false },
  ];

  drawSection('Current Performance', performanceItems);

  const scenarioItems = [
    { label: 'Cases Needed to Target', value: `${data.result.casesNeeded.toFixed(0)} cases`, highlight: true },
    { label: 'Projected Demand (Sell Out)', value: `${data.result.newSellOutHl.toFixed(2)} hl`, highlight: false },
    { label: 'Projected Demand in Cases', value: `${data.result.newSellOutCases.toFixed(0)} cases`, highlight: false },
    { label: 'Coverage After Selling', value: `${data.result.losAfterSelling.toFixed(2)}%`, highlight: true },
  ];

  if (data.receivedStock > 0) {
    scenarioItems.push(
      { label: 'Updated Supply (Sell In)', value: `${data.result.newSellInHl.toFixed(2)} hl`, highlight: false },
      { label: 'Updated Supply in Cases', value: `${data.result.newSellInCases.toFixed(0)} cases`, highlight: false },
      { label: 'Coverage After Receiving', value: `${data.result.losAfterReceiving.toFixed(2)}%`, highlight: true }
    );
  }

  if (data.pendingOrders > 0) {
    const HECTOLITER_TO_CASE = 0.09;
    const adjustedSellOutHl = data.result.adjustedSellOut * HECTOLITER_TO_CASE;
    scenarioItems.push(
      { label: 'Pending Orders', value: `${data.pendingOrders.toFixed(0)} cases`, highlight: false },
      { label: 'Adjusted Demand (with orders)', value: `${data.result.adjustedSellOut.toFixed(0)} cases`, highlight: false },
      { label: 'Adjusted Demand in hl', value: `${adjustedSellOutHl.toFixed(2)} hl`, highlight: false },
      { label: 'Predicted Coverage (with orders)', value: `${data.result.predictedLos.toFixed(2)}%`, highlight: true }
    );
  }

  drawSection('Forecasting & Scenarios', scenarioItems);

  const footerY = pageHeight - 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);
  pdf.setFont(undefined, 'normal');
  pdf.text('SightFlow — Intelligent LOS Forecasting Platform', margin, footerY);
  pdf.text(`Page 1 of ${pdf.getNumberOfPages()}`, pageWidth - margin - 20, footerY);

  pdf.setFontSize(7);
  pdf.text('Optimize inventory. Maximize performance.', margin, footerY + 5);

  pdf.save(`sightflow-report-${Date.now()}.pdf`);
}

export function exportCSV(data: {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
  pendingOrders: number;
  receivedStock: number;
  result: LOSResult;
  timestamp: Date;
}) {
  const rows = [
    ['SightFlow — Line of Sight Report'],
    [`Generated: ${data.timestamp.toISOString()}`],
    [],
    ['Input Data'],
    ['Sell Out (hl)', data.sellOutHl.toFixed(2)],
    ['Sell Out (cases)', data.result.sellOutCases.toFixed(0)],
    ['Sell In (hl)', data.sellInHl.toFixed(2)],
    ['Sell In (cases)', data.result.sellInCases.toFixed(0)],
    ['Desired LOS (%)', data.desiredLos.toFixed(2)],
  ];

  if (data.pendingOrders > 0) {
    rows.push(['Pending Orders (cases)', data.pendingOrders.toFixed(0)]);
  }

  if (data.receivedStock > 0) {
    rows.push(['Incoming Stock (cases)', data.receivedStock.toFixed(0)]);
    const HECTOLITER_TO_CASE = 0.09;
    const updatedSellIn = data.sellInHl + (data.receivedStock * HECTOLITER_TO_CASE);
    rows.push(['Updated Sell In with incoming (hl)', updatedSellIn.toFixed(2)]);
  }

  rows.push(
    [],
    ['Current Performance'],
    ['Current LOS (%)', data.result.currentLos.toFixed(2)],
    ['Status', data.result.losStatus.toUpperCase()],
    ['Variance from Target (%)', (data.result.currentLos - data.desiredLos).toFixed(2)],
    [],
    ['Predictions & Scenarios'],
    ['Cases Needed', data.result.casesNeeded.toFixed(0)],
    ['New Sell Out (hl)', data.result.newSellOutHl.toFixed(2)],
    ['New Sell Out (cases)', data.result.newSellOutCases.toFixed(0)],
    ['LOS After Selling (%)', data.result.losAfterSelling.toFixed(2)],
  );

  if (data.receivedStock > 0) {
    rows.push(
      ['New Sell In (hl)', data.result.newSellInHl.toFixed(2)],
      ['New Sell In (cases)', data.result.newSellInCases.toFixed(0)],
      ['LOS After Receiving (%)', data.result.losAfterReceiving.toFixed(2)]
    );
  }

  if (data.pendingOrders > 0) {
    rows.push(
      ['Adjusted Sell Out with Orders (cases)', data.result.adjustedSellOut.toFixed(0)],
      ['Predicted LOS with Pending Orders (%)', data.result.predictedLos.toFixed(2)]
    );
  }

  const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `sightflow-los-report-${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
