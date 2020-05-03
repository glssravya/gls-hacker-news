import React from 'react'
import {render, cleanup} from '@testing-library/react'
import LineChart from './../lineChart'

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    let chartData = new Map();
    chartData.set(1, 100);
    chartData.set(2, 200);

    const { asFragment } = render(<LineChart data={chartData}/>)
    
    expect(asFragment(<LineChart />)).toMatchSnapshot()
   });