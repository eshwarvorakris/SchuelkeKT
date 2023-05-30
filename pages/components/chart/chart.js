import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ data, chartType = "bar" }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Create the chart instance
    const chart = new Chart(ctx, {
      type: chartType,
      data: data,
      options: {
        maintainAspectRatio:false

      },
    });

    return () => {
      // Cleanup chart on unmount
      chart.destroy();
    };
  }, [data]);

  return (
    <div style={{height:'450px'}}>
      <canvas ref={chartRef} style={{height:'100%'}}/>
    </div>
  );
};

export default ChartComponent;