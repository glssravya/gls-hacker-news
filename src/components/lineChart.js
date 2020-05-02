import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { black } from 'color-name';
class LineChart extends React.Component{
    render (){
        console.log(this.props,'props from line chart');
        let chartData = this.props.data;
        let options = {
            title: {
              text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: Object.keys(chartData),
                label:'ID',
                title:{
                   // enabled:true,
                    text:'<strong>ID</strong>',
                    style:{
                        fontWeight:'bold',
                        color:black
                    }
                }
            },
            yAxis:{
                //lineColor: '#FF0000',
                lineWidth:1,
                title:{
                    // enabled:true,
                     text:'<strong>Votes</strong>',
                     style:{
                         fontWeight:'bold',
                         color:black
                     }
                 }
            },
            series: [{
                data: Object.values(chartData),
                label:'fghjk',
                showInLegend: false,  
            }],
            chart: {
                backgroundColor: 'rgb(246, 246, 239)',
                type: 'line'
            },
            plotOptions: {
                series: {
                    color: 'steelblue'
                }
            },
    
          }
        if(Object.keys(this.props.data).length>0){
        return (
            <div className="lineChart">
                
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        );
        }else{
            return <div></div>
        }
    }

}
export default LineChart;