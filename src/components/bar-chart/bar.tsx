import { select } from 'd3-selection';
import { Transition } from 'd3-transition'; // Extends d3-selection
import * as React from 'react';

export interface BarChartDatum {
  color: string;
  value: number;
  id: string;
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  transition: Transition<any, any, any, any>; // TODO: better typings
}

export default class Bar extends React.Component<BarProps> {
  private _rectRef?: SVGElement | null;

  public componentDidMount() {
    this.updateHeight(true);
  }

  public componentDidUpdate(prevProps: BarProps) {
    if (prevProps.height !== this.props.height) {
      this.updateHeight(false);
    }
  }

  // We use D3 to handle the height while React handles other attributes
  private updateHeight(initialDraw: boolean) {
    const { y, height, transition } = this.props;

    if (initialDraw) {
      select(this._rectRef!)
        .attr('y', y)
        .attr('height', height);
    } else {
      select(this._rectRef!)
        .transition(transition)
        .attr('y', y)
        .attr('height', height);
    }
  }

  public render() {
    const { x, width, fill } = this.props;

    return (
      <rect
        x={x}
        width={width}
        fill={fill}
        ref={ref => (this._rectRef = ref)}
      />
    );
  }
}
