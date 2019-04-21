import React from 'react';

/* Documentation

percent = Number, passed from ProgressIteration as a child (Required)
diameter = Number, diameter of the outer circle to be created. Inner circle's diameter is proportional to the diameter set here. (Default = 30)
strokeWidth = Number, width of the stroke that revolves around each circle. Helps determine radius. (Default = 2) 
Color = String, color of the Stroke (Default = 'grey')
outlineColor = String, color of stationary circle. (Optional, defaults color prop),
showOutline, = Pass prop to set to true. Stationary circles will be made visible
strokeOpacity = Float (0 - 1)
sync = Pass prop to set to true, align the beginning animation of both circles with the top of the page
genesis = Pass prop to set to true, a special variation of the animation
flash = Pass prop to set to true, whether or not the inner circle will appear filled at 90% and 94% completed. (Only an option if the genesis prop is set to true)
lg = Pass prop to set to true, (diameter is set to 40);

*/

const Hazard = ({ percent, diameter = 30, strokeWidth = 2, color = 'yellow', outlineColor, strokeOpacity = 1, showOutline, sync, genesis, flash, lg }) => {
  if (lg) diameter = 40;
  const radius = (diameter / 2) - (strokeWidth * 2);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - percent / 100 * circumference;
  const innerCoordinates = (diameter / 4);
  const counterDiameter = (diameter / 2);
  const counterRadius = (counterDiameter / 2) - (strokeWidth * 2);
  const counterCircumference = counterRadius * 2 * Math.PI;
  const counterPercent = percent * 2;
  const counterOffset = counterCircumference + counterPercent / 100 * circumference;

  const calStrokeOpacity = value => {
    if ((value >= 90 && value < 100 && value % 5 === 0) || (value > 45 && value <= 55 && value % 5 === 0)) {
      return 1;
    }
    return 0.7;
  }
  const outerRingStrokeOpacity = calStrokeOpacity(percent);

  return (
    <svg
      className="progress-ring"
      height={diameter}
      width={diameter}
    >
      <circle
        className="progress-ring-circle-stroke"
        style={{
          // strokeDasharray: `${(lg) ? 1.5 : 0.4}`,
          strokeDasharray: `${circumference} ${circumference}`,
          strokeDashoffset: offset,
          strokeLinecap: 'rounded',
          transition: 'strokeDashoffset 0.35s',
          transform: `${(sync) ? 'rotate(-90deg)' : 'rotate(-220deg)'}`,
          transformOrigin: '50% 50%',
          textAlign: 'center',
        }}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeOpacity={outerRingStrokeOpacity}
        fill="transparent"
        r={radius}
        cx={diameter / 2}
        cy={diameter / 2}
      />
      {(showOutline) && (
        <circle
          className="progress-ring-circle"
          style={{
            opacity: 0.3
          }}
          stroke={outlineColor || color}
          fill="transparent"
          r={radius}
          cx={diameter / 2}
          cy={diameter / 2}
        />
      )}
      <svg
        className="progress-counter-ring"
        height={counterDiameter}
        width={counterDiameter}
        y={innerCoordinates}
        x={innerCoordinates}
      >
        <circle 
          className="progress-ring-counter-circle-stroke"
          style={{
            strokeDasharray: `${(lg) ? 6.5: 3.5}`,
            strokeDashoffset: counterOffset,
            strokeLinecap: 'rounded',
            transition: 'strokeDashoffset 0.35s',
            transform: `${(sync) ? 'rotate(-90deg)' : 'rotate(30deg)'}`,
            transformOrigin: '50% 50%',
            textAlign: 'center',
          }}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={1}
          fill="transparent"
          fillOpacity={1}
          r={counterRadius}
          cx={counterDiameter / 2}
          cy={counterDiameter / 2}
        />
      </svg>
    </svg>
  );
};

/* return statement 
   <ProgressIteration>
      {({ percent }) => <Hazard percent={percent} />}
     </ProgressIteration>

    currentIndex undefined unless paginateArr prop is passed to ProgressIteration
*/

export default Hazard;
