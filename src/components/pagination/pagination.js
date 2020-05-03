import React from "react";
import {Link} from 'react-router-dom';
class Pagination extends React.Component {
  displayPagination(id) {
    id = parseInt(id);
    if (id) {
        let prevUrl = '';
    if(id===1){
        prevUrl = '/'
    }else{
        prevUrl = `/page/${id-1}`;
    }
    let nextId = id+1;
      return (
        <React.Fragment>
          <Link to={prevUrl} className="hide btn">Previous</Link>
          <span className="btn"> | </span>
          <Link to={`/page/${nextId}`} className="hide btn">Next</Link>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Link to={`/page/1`} className="hide btn">Next</Link>
        </React.Fragment>
      );
    }
  }
  render() {
    return (
      <div className="pagination">{this.displayPagination(this.props.id)}</div>
    );
  }
}

export default Pagination;
