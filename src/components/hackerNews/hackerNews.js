import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchHackerNews, fetchNewsByPage } from "../../actions/index";
import "./hackerNews.css";
import LineChart from "../lineChart/lineChart";
import Pagination from "../pagination/pagination";

class HackerNews extends React.Component {
  constructor(props) {
    super(props);
    this.renderNews = this.renderNews.bind(this);
    this.getRelativeTime = this.getRelativeTime.bind(this);
    this.getWebsite = this.getWebsite.bind(this);
    this.getVotesCount = this.getVotesCount.bind(this);
    this.getHiddenPosts = this.getHiddenPosts.bind(this);
    this.state = { upvotes: {}, hiddenPosts: [], id: "" };
  }

  componentDidMount() {
    let id = "";
    if (this.props.match) {
      id = this.props.match.params.id;
      this.setState({ id });
    }

    if (id) {
      this.props.fetchNewsByPage(id);
    } else {
      this.props.fetchHackerNews();
    }
    this.getHiddenPosts();
  }
  componentDidUpdate(prevProps) {
    let id = "";
    if (this.props.match.params) {
      id = this.props.match.params.id;
      if (this.state.id !== id) {
        this.setState({ id });
        if (id) {
          this.props.fetchNewsByPage(id);
        }else{
            this.props.fetchHackerNews();
        }
        this.getHiddenPosts();
      }
    }
  }
  getHiddenPosts() {
    let hiddenPosts = JSON.parse(localStorage.getItem("hiddenPosts"));
    if (!hiddenPosts) {
      hiddenPosts = [];
    }
    this.setState({ hiddenPosts });
  }
  getWebsite(url) {
    if (url) {
      return new URL(url).hostname;
    } else {
      return "-";
    }
  }
  getVotesCount(id, votes) {
    let localvotes = JSON.parse(localStorage.getItem(id));
    let total = votes;
    if (localvotes) {
      total += localvotes;
    }
    return total;
  }
  upVotePost(id, votesCount) {
    let votes = JSON.parse(localStorage.getItem(id));
    if (votes) votes++;
    else votes = 1;
    localStorage.setItem(id, votes);
    const upvotes = { ...this.state.upvotes, [id]: votesCount + votes };
    this.setState({ upvotes });
  }
  hidePost(id) {
    let hiddenPosts = JSON.parse(localStorage.getItem("hiddenPosts"));
    if (!hiddenPosts) {
      hiddenPosts = [];
    }
    hiddenPosts.push(id);
    localStorage.setItem("hiddenPosts", JSON.stringify(hiddenPosts));
    this.setState({ hiddenPosts });
  }
  showRows(id) {
    if (this.state.hiddenPosts.indexOf(id) === -1) {
      return true;
    } else {
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
  getLineChartData(data) {
    let chartData = new Map();
    if (data) {
      data.map(post => {
        if(this.state.hiddenPosts.indexOf(post.objectID)===-1){
          chartData.set(post.objectID, post.points);
          let localUpvotes = JSON.parse(localStorage.getItem(post.objectID));
          if (localUpvotes) {
             chartData.set(
              post.objectID,
              chartData.get(post.objectID) + localUpvotes
            );
          }
          
        }
        return chartData
      });
    }
    return chartData;
  }

  renderNews(news, index) {
    let showRow = this.showRows(news.objectID);
    if (showRow) {
      return (
        <tr key={news.objectID}>
          <td className="commentsCount">
            {news.num_comments >= 0 ? news.num_comments : "-"}
          </td>
          <td className="upvoteCount">
            {this.state.upvotes[news.objectID]
              ? this.state.upvotes[news.objectID]
              : this.getVotesCount(news.objectID, news.points)}
          </td>
          <td className="upvoteCol">
            <button
              aria-label="upvote"
              className="upvote"
              onClick={() => this.upVotePost(news.objectID, news.points)}
            ></button>
          </td>
          <td className="newsTitle">
            {news.title}
            <span> ({this.getWebsite(news.url)}) by </span>
            <span>{news.author}</span>
            <span> {this.getRelativeTime(news.created_at_i)} ago [</span>
            <span>
              <button
                aria-label="hide"
                className="hide"
                onClick={() => this.hidePost(news.objectID)}
              >
                hide
              </button>
            </span>
            <span>]</span>
          </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <table className="newstable">
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
              : <tr><td colSpan="4" align="center">Loading Data..!</td></tr>}
          </tbody>
        </table>
        <Pagination id={this.state.id} />
        {this.props.hackerNews.hits ?
        <LineChart data={this.getLineChartData(this.props.hackerNews.hits)}  />
        :<div></div>}
      </div>
    );
  }
}

function mapStateToProps({ hackerNews }) {
  return { hackerNews };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchHackerNews, fetchNewsByPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HackerNews);
