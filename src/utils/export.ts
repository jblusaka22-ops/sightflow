import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { LOSResult } from './calculations';

export async function exportPDF(data: {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
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
  let yPosition = 20;

  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.text('SightFlow — LOS Report', 20, yPosition);
  yPosition += 15;

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(100, 100, 100);
  pdf.text(`Generated: ${data.timestamp.toLocaleString()}`, 20, yPosition);
  yPosition += 10;

  pdf.setDrawColor(200, 200, 200);
  pdf.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 8;

  const sections = [
    {
      title: 'Input Data',
      content: [
        [`Sell Out: ${data.sellOutHl.toFixed(2)} hl (${data.result.sellOutCases.toFixed(0)} cases)`],
        [`Sell In: ${data.sellInHl.toFixed(2)} hl (${data.result.sellInCases.toFixed(0)} cases)`],
        [`Desired LOS: ${data.desiredLos.toFixed(2)}%`],
      ],
    },
    {
      title: 'Current Performance',
      content: [
        [`Current LOS: ${data.result.currentLos.toFixed(2)}%`],
        [`Status: ${data.result.losStatus.toUpperCase()}`],
      ],
    },
    {
      title: 'Predictions & Scenarios',
      content: [
        [`Cases Needed: ${data.result.casesNeeded.toFixed(0)} cases`],
        [`New Sell Out: ${data.result.newSellOutHl.toFixed(2)} hl`],
        [`LOS After Selling: ${data.result.losAfterSelling.toFixed(2)}%`],
        [`Predicted LOS with Pending Orders: ${data.result.predictedLos.toFixed(2)}%`],
      ],
    },
  ];

  pdf.setFont(undefined, 'bold');
  pdf.setFontSize(12);

  sections.forEach((section) => {
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setTextColor(0, 0, 0);
    pdf.text(section.title, 20, yPosition);
    yPosition += 8;

    pdf.setFont(undefined, 'normal');
    pdf.setFontSize(10);

    section.content.forEach((line) => {
      if (yPosition > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(line[0], 25, yPosition);
      yPosition += 6;
    });

    yPosition += 3;
    pdf.setFont(undefined, 'bold');
    pdf.setFontSize(12);
  });

  pdf.save('sightflow-los-report.pdf');
}

export function exportCSV(data: {
  sellOutHl: number;
  sellInHl: number;
  desiredLos: number;
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
    [],
    ['Current Performance'],
    ['Current LOS (%)', data.result.currentLos.toFixed(2)],
    ['Status', data.result.losStatus.toUpperCase()],
    [],
    ['Predictions & Scenarios'],
    ['Cases Needed', data.result.casesNeeded.toFixed(0)],
    ['New Sell Out (hl)', data.result.newSellOutHl.toFixed(2)],
    ['New Sell Out (cases)', data.result.newSellOutCases.toFixed(0)],
    ['LOS After Selling (%)', data.result.losAfterSelling.toFixed(2)],
    ['New Sell In (hl)', data.result.newSellInHl.toFixed(2)],
    ['New Sell In (cases)', data.result.newSellInCases.toFixed(0)],
    ['LOS After Receiving (%)', data.result.losAfterReceiving.toFixed(2)],
    ['Predicted LOS with Pending Orders (%)', data.result.predictedLos.toFixed(2)],
  ];

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
