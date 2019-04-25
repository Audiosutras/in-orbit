# in-orbit
A react component library for rending beautiful progress circle animations.

[Documentation Website](https://docs-in-orbit.herokuapp.com/) 
The above documentation is hosted on Heroku. A server may need to be spun to server the content if the page hasn't been accessed for some time. Loading times may be slow, and on first load the page may show an application error. Just reload the page again and the content will be served.

## Tutorial

1. We have installed in-orbit using `npm i in-orbit` or `yarn add in-orbit`. Now let's import what we need. `ProgressIterator` is required. Available progress circle animations include `Basic`, `Revolve`, and `Hazard`. 
```javascript
  import React from 'react';
  import { ProgressIterator, Basic, Hazard, Revolve } from 'in-orbit';
```

2. Component Syntax.
  * We just want to use the animation when a certain condition is true (i.e. isLoading = true). Or we want to use the animation as a button by wrapping the animation in button tags. I'll leave it up to you. `percent` is a required prop. It is a child of ProgressIterator and must be passed to the animation component in order for it to render properly.

```javascript
// w/o array provided to ProgressIterator 
const Component = () => {
  return (
    <ProgressIterator>
      {({ percent }) => <Revolve percent={percent} />}
    </ProgressIterator>
  );
};
export default Component;
```
  * We have an array that we want to paginate through. We pass the array to the ProgressIterator component using the `paginateArr` prop. `currentIndex` is now made available in children along with `percent`. When the animation is completed, currentIndex is updated with the next index. ProgressIterator will continuously cycle through all indices of the provided array. In this example, whenever the animation completes, I want the color of the animation to change. `genesis` and `flash` are props that provide a special variation on the Revolve animation. They are optional.

```javascript
// w array provided to ProgressIterator, currentIndex becomes available in children
const colors = ['red', 'white', 'blue', 'green', 'orange'];
const Component = () => {
  return (
    <ProgressIterator paginateArr={colors}>
      {({ percent, currentIndex }) => <Revolve percent={percent} color={colors[currentIndex]} genesis flash />}
    </ProgressIterator>
  );
};
export default Component;
```

## API

| Property | Description | Type | Component | Default | 
| -------- | ----------- | :---:| :-------: | :------ |
| paginateArr | returns the currentIndex of the array passed in props to children. When the animation is completed, the currentIndex is updated and returned. Continuously cycles through the indices of the array provided. Useful for Pagination. | array | ProgressIterator | (Optional) |
| seconds | speed of the animation from start to completion | number | ProgressIterator | (Optional) |
| percent | passed as a prop from ProgressIterator component, responsible for animating animation components | number | Revolve, Basic, Hazard | required |
| diameter | diameter of the outer circle to be created. Inner circle's diameter is proportional to the diameter set here. | number | Revolve, Basic, Hazard | 30 |
| strokeWidth | 	width of the stroke that revolves around each circle. Helps determine radius. | number | Revolve, Basic, Hazard | 2 |
| color | color of the stroke | string | Revolve, Basic, Hazard | (Optional) |
| outlineColor | color of stationary circle | string | Revolve, Basic, Hazard | color prop |
| showOutline | pass prop to set to true. Stationary circle will be made visible. | boolean | Revolve, Basic, Hazard | false |
| sync | pass prop to set to true. Aligns the start of the animation with the top of the page. | boolean | Revolve, Hazard | false |
| genesis | pass prop to set to true, a special variation of the animation. | boolean | Revolve | false | 
| flash | pass prop to set to true, whether or not the inner circle will appear filled when animation is at 90% and 94% completed. | boolean | Revolve | false | 
| lg | pass prop to set to true, diameter is set to 40. | string | Revolve, Hazard, Basic | (Optional) | 
| strokeOpacity | used for setting the opacity of the animation. | Float (0 - 1) | Basic | 0.7 |