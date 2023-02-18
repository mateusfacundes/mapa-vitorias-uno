import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function MainGrafico(props){
    console.log(props)
    const state = {
        options: {
            chart: {
              id: "basic-bar",
              toolbar: {
                show: false,
              },
              dropShadow: {
                enabled: false,
            }

            },
            xaxis: {
              show: false,
              categories: props.colunas,
              labels:{
                show: false
              }
            },
            yaxis: {
                show: false
                
            },
            plotOptions: {
                bar: {
                  distributed: true
                }
              }  

          },
          series: [
            {
              name: "pontuacao",
              data: props.pontuacao
            }
          ]
        }
    

    return(
        <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="500"
        />
    )
}