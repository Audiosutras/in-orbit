import React from 'react';

/* Props

  Percent = Number, passed from ProgressIteration as a child (Required)
  Diameter = Number, diameter of the circle to be created. (Default is 30) (Optional)
  StrokeWidth = Number, width of the stroke that revolves around the circle. Together with the diameter, the circle's radius is determined. (Default is 2) (Optional)
  Color = String, color of the Stroke, (Optional)
  OutlineColor = String, color of stationary circle, (Optional) (If passed, has precedence over other color styling, defaults to color, themeColor color has precedence over color)
  StrokeOpacity = Number (Optional)

*/

const Basic = ({ percent, diameter = 30, strokeWidth = 2, color = 'black', outlineColor, strokeOpacity = 0.7, showOutline = true, lg }) => {
  if (lg) diameter = 40;
  const radius = (diameter / 2) - (strokeWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;
  return (
    <svg
      className="progress-ring"
      height={diameter}
      width={diameter}
    >
      <circle
        className="progress-ring-circle-stroke"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: offset,
          transition: 'strokeDashoffset 0.35s',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
          textAlign: 'center',
        }}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={strokeOpacity}
        fill="transparent"
        r={radius}
        cx={diameter / 2}
        cy={diameter / 2}
      />
      {(showOutline) && (
        <circle
          className="progress-ring-circle"
          style={{opacity: 0.2}}
          stroke={outlineColor || color}
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
      )}
    </svg>
  );
};

/* return statement 
   <ProgressIteration>
      {({ percent, currentIndex }) => <ProgressCircle percent={percent} />}
     </ProgressIteration>

    currentIndex undefined unless paginateArr prop is passed to ProgressIteration
*/

export default Basic;
