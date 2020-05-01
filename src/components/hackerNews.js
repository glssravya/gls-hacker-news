import React from 'react';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchHackerNews} from '../actions/index';
import './hackerNews.css';

class HackerNews extends React.Component{
    constructor(props){
        super(props)
        this.renderNews = this.renderNews.bind(this);
        this.getRelativeTime = this.getRelativeTime.bind(this);
        this.getWebsite = this.getWebsite.bind(this);
    }

    componentDidMount(){
        this.props.fetchHackerNews();
    }

    getWebsite(url){
        if(url){
            return new URL(url).hostname;
        }else{
            return '-';
        }
        
    }

    getRelativeTime(timeStamp){
        var now = new Date()
        const seconds = parseInt(now.getTime()/1000 - parseInt(timeStamp));
        if (seconds < 60) {
            return seconds + ' seconds';
        }
        if (seconds < 3600) {
            return parseInt(seconds / 60) + ' minutes';
        }
        if (seconds <= 86400) {
            return parseInt(seconds / 3600) + ' hours';
        }
        if (seconds > 86400) {
            return parseInt(seconds / 86400) + ' days';
        }
    }
    renderNews(news,index){
         return(
            <tr key={news.objectID}>
                <td className="commentsCount">{(news.num_comments>=0)?news.num_comments:'-'}</td>
                <td className="upvoteCount">0</td>
                <td className="upvoteCol"><div className="upvote"></div></td>
                <td className="newsTitle" id="title">{news.title} 
                    {/* <span> ({new URL(news.url).hostname}) by </span> */}
                    <span> ({this.getWebsite(news.url)}) by </span> 
                    <span>{news.author}</span> 
                    <span> {this.getRelativeTime(news.created_at_i)} ago [ </span>
                    <span>hide</span>
                    <span> ]</span>
                </td>
            </tr>
        )
    }
    render(){
        console.log("render:"+this)
        return (
            <div>
           
            <table>
                <thead>
                    <tr>
                        <th className="commentsCountTh">Comments</th>
                        <th className="upvoteCountTh">Vote Count</th>
                        <th className="upvoteColTh">UpVote</th>
                        <th className="newsTitleTh">News Details</th>
                    </tr>

                </thead>
                <tbody>

                    {this.props.hackerNews.hits ? this.props.hackerNews.hits.map(this.renderNews):""}
                    
                </tbody>
            </table>
            </div>
        )
    }
}
function mapStateToProps({hackerNews}){
   
    return {hackerNews}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchHackerNews},dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(HackerNews);