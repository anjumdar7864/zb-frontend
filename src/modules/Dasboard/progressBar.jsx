export const CustomCircularProgress = ({
  percentage = 67,
  radius = 50,
  strokeWidth = 10,
  trailWidth = 4,
  size = 120,
  progressColor = '#00BD82',
  trailColor = '#C2FFEC',
  textColor = '#333',
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {/* Trail circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={trailColor}
          strokeWidth={trailWidth}
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </g>

      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="14"
        fontWeight={600}
        fill={textColor}
      >
        {percentage}%
      </text>
    </svg>
  );
};