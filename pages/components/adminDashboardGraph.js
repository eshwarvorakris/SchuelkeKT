import AdminGraph1 from "./chart/adminGraph1";
import AdminGraph2 from "./chart/adminGraph2";
export default function adminDashboardGraph() {



  const chartData = {
    labels: [''],
    datasets: [
      {
        label: 'Learning Hour',
        data: [52],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Enroleed Trainees',
        data: [200],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Time For Completion',
        data: [32],
        backgroundColor: 'rgba(255, 185, 185, 0.2)',
        borderColor: 'rgba(255, 185, 185, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="graph-container">
        <AdminGraph1 />
        <AdminGraph2 />
      </div>
    </>
  );
}