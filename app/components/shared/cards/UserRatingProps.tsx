import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [{ name: "User Rating", value: 3.33, fill: "#7AC142" }];

const GaugeChart = () => {
  return (
    <div className="w-full h-60 bg-gray-900 p-4 rounded-xl">
      <h3 className="text-white text-sm">User Ratings</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" 
          cy="100%" 
          innerRadius="80%" 
          outerRadius="100%" 
          barSize={15} 
          startAngle={180} 
          endAngle={0} 
          data={data}
        >
          <RadialBar dataKey="value" />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-3xl text-green-400">
        3.33
      </div>
    </div>
  );
};

export default GaugeChart;
