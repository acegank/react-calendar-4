import './calendar.less'
import React, { Component } from 'react'
import BaseModule from '../../libs/BaseModule'

//<Calendar date="2016-02-01" orderDays={8} />


export default class Calendar extends BaseModule {
    constructor(props) {
        super(props);
        this.state.dateArr = []
        this.state.year = 1
        this.state.month = 1
        this.state.orderDays = props.orderDays || 8
        this.weekArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        this.state.show = 'card hide'
        this.state.dateStr = props.date ? this.getDateStr(this.props.date) : this.util.dateFormat(new Date().getTime(), 'yyyy年MM月dd日') + '（' +  this.weekArr[new Date().getDay()] + '）'
    }

    componentDidMount(){
        this.getDateArray()
    }

    previousMonth(){
        let month = this.state.month -1
        let year = this.state.year
        if(month<0){
            month = 11
            year -= 1
        }
        
        this.getDateArray(year,month)
    }

    nextMonth(){
        let month = this.state.month +1
        let year = this.state.year
        if(month>11){
            month = 0
            year += 1
        }
        this.getDateArray(year,month)
    }

    getDateStr(str) {
        let arr = str.split('-')
        let year = Number(arr[0])
        let month = Number(arr[1]) - 1
        let day = Number(arr[2])
        return this.util.dateFormat(new Date(year,month,day).getTime(), 'yyyy年MM月dd日') + '（' +  this.weekArr[new Date(year,month,day).getDay()] + '）'
    }

    setDateStr(str){
        this.setState({
            dateStr:this.getDateStr(str)
        })
    }

    getDateArray (y,m){
        let today = this.props.date || this.util.dateFormat(new Date().getTime(), 'yyyy-MM-dd')
        let arr = today.split('-')
        let year = typeof y == 'number' ? y : Number(arr[0])
        let month = typeof m == 'number' ? m : Number(arr[1]) - 1
        let weekStart = new Date(year, month, 1).getDay()
        let days = new Date(year, month+1, 0).getDate()
        // console.log(days)
        // console.log(weekStart)
        let dateArr = []
        for(let i=0; i < days; i++){
            dateArr.push({
                num: i+1,
                url: `${year}-${this.util.fillZero(month+1)}-${this.util.fillZero(i+1)}`,
                className:'',
                date: new Date(year,month,i+1).getTime()
            })
        }
        // console.log(dateArr)
        if(weekStart != 0){
            let prevYear = year
            let prevMon = month - 1
            if(prevMon<0){
                prevMon = 11
                prevYear -= 1
            }
            for(let i=0; i<weekStart; i++){
                let prevDay = new Date(year, month, 0-i).getDate()
                dateArr.unshift({
                    num: prevDay,
                    url: `${prevYear}-${this.util.fillZero(prevMon+1)}-${this.util.fillZero(prevDay)}`,
                    className:'',
                    date: new Date(prevYear,prevMon,prevDay).getTime()
                })
            }

        }
        // console.log(dateArr)
        // console.log(dateArr.length)
        let n = 1
        while(dateArr.length <= 42){
            let nextYear = year
            let nextMon = month + 1
            if(nextMon>11){
                nextMon = 0
                nextYear += 1
            }
            dateArr.push({
                num: n,
                url: `${nextYear}-${this.util.fillZero(nextMon+1)}-${this.util.fillZero(n)}`,
                className:'',
                date: new Date(nextYear,nextMon,n).getTime()
            })
            n++
        }
        //console.log(dateArr)
        let nowTime = new Date()
        let curDay = new Date(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate()).getTime()

        for(let i=0;i<dateArr.length;i++){
            if(dateArr[i].date == curDay){
                dateArr[i].className = 'cur'
            }else if(curDay < dateArr[i].date && dateArr[i].date < (curDay + 1000*60*60*24*this.state.orderDays)){
                dateArr[i].className = 'active'
            }else if(dateArr[i].date >= (curDay + 1000*60*60*24*this.state.orderDays)){
                dateArr[i].className = 'not'
            }
        }
        

        this.setState({
            dateArr: dateArr,
            year:year,
            month:month
        })
    }

    switchCal() {
        this.setState({
            show: this.state.show == 'card' ? 'card hide' : 'card'
        })
    }

    render() {
        return (
            <div className="calendar">
                <input type="button" value={this.state.dateStr} className="calendar-btn" onClick={this.switchCal.bind(this)}></input>
                <span className="icon"></span>
                <div className={this.state.show}>
                    <div className="card-header">
                        <span className="previous" onClick={this.previousMonth.bind(this)}>◀</span>
                        <span className="year-month">{`${this.state.year}年${this.state.month+1}月`}</span>
                        <span className="next" onClick={this.nextMonth.bind(this)}>▶</span>
                    </div>
                    <table>
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    this.state.dateArr.slice(0,7).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.dateArr.slice(7,14).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.dateArr.slice(14,21).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.dateArr.slice(21,28).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.dateArr.slice(28,35).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                            <tr>
                                {
                                    this.state.dateArr.slice(35,42).map((item,index)=>{
                                        return item.className == 'not' ? 
                                            <td key={index} >
                                                <span className={item.className}>{item.num}</span>
                                            </td>
                                            :
                                            <td key={index} >
                                                <a className={item.className} href="#" onClick={this.setDateStr.bind(this,item.url)}>{item.num}</a>
                                            </td>

                                    })
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}