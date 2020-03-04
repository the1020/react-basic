import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState){
    //data의 내용이 변하지 않은 경우 render의 호출은 불필요
    if(this.props.data === newProps.data){
      return false;
    }
    return true;
  }
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i<data.length){
            lists.push(<li key={data[i].id}>
                <a href={"/content/"+data[i].id} 
                data-id={data[i].id}
                onClick={function(id, e){
                e.preventDefault();
                // this.props.onChange(e.target.dataset.id);
                this.props.onChange(id);
            }.bind(this, data[i].id)}>{data[i].title}</a></li>);
            i = i + 1;
        }
      return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
  
      );
    }
  }

  export default TOC;