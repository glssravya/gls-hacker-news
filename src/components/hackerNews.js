import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchHackerNews } from "../actions/index";
import "./hackerNews.css";

class HackerNews extends React.Component {
  constructor(props) {
    super(props);
    this.renderNews = this.renderNews.bind(this);
    this.getRelativeTime = this.getRelativeTime.bind(this);
    this.getWebsite = this.getWebsite.bind(this);
    this.getVotesCount = this.getVotesCount.bind(this);
    this.getHiddenPosts = this.getHiddenPosts.bind(this);
    this.state = {upvotes:{},hiddenPosts:[]}
  }

  componentDidMount() {
    this.props.fetchHackerNews();
    this.getHiddenPosts();
  }
  getHiddenPosts(){
    let hiddenPosts = JSON.parse(localStorage.getItem('hiddenPosts'));
    if(!hiddenPosts){
      hiddenPosts = [];
    }
    this.setState({hiddenPosts}) 
  }
  getWebsite(url) {
    if (url) {
      return new URL(url).hostname;
    } else {
      return "-";
    }
  }
  getVotesCount(id,votes){
    let localvotes = JSON.parse(localStorage.getItem(id));
    let total = votes;
    if(localvotes){
      total+=localvotes;
    }
    return total;
  }
  upVotePost(id,votesCount){
    let votes = JSON.parse(localStorage.getItem(id));
    if(votes)
      votes++;
    else
      votes = 1;
    localStorage.setItem(id,votes);
    const upvotes = { ...this.state.upvotes, [id]: votesCount+votes }
    this.setState({ upvotes });
  }
  hidePost(id){
      let hiddenPosts = JSON.parse(localStorage.getItem('hiddenPosts'));
      if(!hiddenPosts){
        hiddenPosts = [];
      }
      hiddenPosts.push(id);
      localStorage.setItem('hiddenPosts',JSON.stringify(hiddenPosts));
      this.setState({hiddenPosts}) 
  }
  showRows(id){
    if(this.state.hiddenPosts.indexOf(id)===-1){
      return true;
    }else{
      return false;
    }
  }
  getRelativeTime(timeStamp) {
    var now = new Date();
    const seconds = parseInt(now.getTime() / 1000 - parseInt(timeStamp));
    if (seconds < 60) {
      return seconds + " seconds";
    }
    if (seconds < 3600) {
      return parseInt(seconds / 60) + " minutes";
    }
    if (seconds <= 86400) {
      return parseInt(seconds / 3600) + " hours";
    }
    if (seconds > 86400) {
      return parseInt(seconds / 86400) + " days";
    }
  }

  renderNews(news, index) {
    let showRow = this.showRows(news.objectID);
    if(showRow){
      return (
        <tr key={news.objectID}>
          <td className="commentsCount">
            {news.num_comments >= 0 ? news.num_comments : "-"}
          </td>
      <td className="upvoteCount">{(this.state.upvotes[news.objectID])?this.state.upvotes[news.objectID]:this.getVotesCount(news.objectID,news.points)}</td>
          <td className="upvoteCol">
            <button className="upvote" onClick={() => this.upVotePost(news.objectID,news.points)}></button>
          </td>
          <td className="newsTitle" id="title">
            {news.title}
            <span> ({this.getWebsite(news.url)}) by </span>
            <span>{news.author}</span>
            <span> {this.getRelativeTime(news.created_at_i)} ago [ </span>
            <span><button className="hide" onClick={() => this.hidePost(news.objectID)}>hide</button></span>
            <span> ]</span>
          </td>
        </tr>
            
      );
    }
  }

  render() {
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
            {this.props.hackerNews.hits
              ? this.props.hackerNews.hits.map(this.renderNews)
              : ""}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ hackerNews }) {
  return { hackerNews };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchHackerNews }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HackerNews);
