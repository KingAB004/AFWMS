import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Historical water level data (last 24 hours)
const generateHistoricalData = () => {
  const data = [];
  const now = new Date();
  
  // Generate 24 data points (hourly for last 24 hours)
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    const hour = time.getHours();
    
    // Simulate water level that rises over time
    let level = 13.5;
    if (i < 12) level = 13.5 + (12 - i) * 0.15; // Rising trend
    else level = 13.0 + (23 - i) * 0.05; // Steady rise earlier
    
    data.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      level: parseFloat(level.toFixed(1)),
      hour: hour
    });
  }
  
  return data;
};

const data = generateHistoricalData();

export function WaterLevelChart() {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xs text-gray-600 mb-1">{payload[0].payload.time}</p>
          <p className="text-sm font-bold text-blue-600">{payload[0].value}m</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10, fill: '#6B7280' }}
            tickFormatter={(value, index) => {
              // Show only every 4th hour label to avoid crowding
              const hour = data[index]?.hour;
              return hour % 4 === 0 ? value : '';
            }}
          />
          <YAxis 
            domain={[12, 16]}
            tick={{ fontSize: 10, fill: '#6B7280' }}
            ticks={[12, 13, 14, 15, 16]}
            label={{ value: 'meters', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6B7280' }}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Reference lines for alert levels */}
          <line y1={15} y2={15} x1={0} x2="100%" stroke="#EAB308" strokeWidth={2} strokeDasharray="5 5" />
          
          <Area 
            type="monotone" 
            dataKey="level" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fill="url(#colorLevel)" 
            dot={false}
            activeDot={{ r: 5, fill: '#3B82F6' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
