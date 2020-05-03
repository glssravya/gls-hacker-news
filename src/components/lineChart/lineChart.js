import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { black } from 'color-name';
class LineChart extends React.Component{
    render (){
        let chartData = this.props.data;
        let votes = Array.from(chartData.values());
        let ids = Array.from(chartData.keys());
        let options = {
            title: {
              text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ids,
                label:'ID',
                title:{
                    text:'<strong>ID</strong>',
                    style:{
                        fontWeight:'bold',
                        color:black,
                        fontSize:'18px'
                    }
                }
            },
            yAxis:{
                lineWidth:1,
                title:{
                     text:'<strong>Votes</strong>',
                     style:{
                         fontWeight:'bold',
                         color:black,
                         fontSize:'18px'
                     }
                 }
            },
            series: [{
                data: votes,
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
        if(ids.length>0){
        return (
            <div className="lineChart">
                
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        );
        }else if(ids.length===0){

            return <div className="lineChart noRecords">All Records are hidden in this page.Plese use Next/Previous to Navigate</div>
        }else{
            return <div></div>
        }
    }

}
export default LineChart;